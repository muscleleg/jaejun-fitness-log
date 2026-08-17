const { birthYear, heightCm, defaultReps } = window.fitnessProfile;
const compositionStandards = window.bodyCompositionStandards;
const policy = window.coachingPolicy;
const muscleMap = window.muscleMapConfig;
const freeSugarPolicy = policy.nutrition.freeSugar;
const freeSugarReferenceMax = Math.round(freeSugarPolicy.referenceCalories * freeSugarPolicy.maximumEnergyRatio / freeSugarPolicy.caloriesPerGram);
const freeSugarReferenceIdeal = Math.round(freeSugarPolicy.referenceCalories * freeSugarPolicy.idealEnergyRatio / freeSugarPolicy.caloriesPerGram);
const exercisesById = new Map(window.exerciseCatalog.map((exercise) => [exercise.id, exercise]));
const healthRecords = window.healthRecordData.map((record) => ({
  ...record,
  workouts: record.workouts?.map((workout) => {
    const exercise = exercisesById.get(workout.exerciseId);
    if (!exercise) {
      console.warn(`등록되지 않은 운동 ID: ${workout.exerciseId}`);
      return {
        ...workout,
        name: workout.exerciseId,
        reps: workout.reps ?? (workout.repsBySet?.length ? null : defaultReps),
        primaryMuscles: [],
        secondaryMuscles: []
      };
    }
    return {
      ...workout,
      name: exercise.name,
      reps: workout.reps ?? (workout.repsBySet?.length ? null : defaultReps),
      primaryMuscles: exercise.primaryMuscles,
      secondaryMuscles: exercise.secondaryMuscles
    };
  }) ?? []
}));
const currentYear = new Date().getFullYear();
document.getElementById("age").textContent = currentYear - birthYear;
document.getElementById("profile-height").textContent = `${heightCm} cm`;
document.getElementById("profile-birth-year").textContent = `${birthYear}년`;
document.getElementById("profile-default-reps").textContent = `세트당 ${defaultReps}회`;
document.getElementById("goal-statement").textContent = policy.goal.statement;
const preferredExerciseCount = window.exerciseCatalog.filter((exercise) => exercise.preferred !== false).length;
document.getElementById("goal-focus").textContent = `우선 관찰: ${policy.goal.focusAreas.join(" · ")} · 운영: ${policy.goal.preferExistingExercises ? `익숙한 ${preferredExerciseCount}종목 우선` : "필요에 따라 종목 조정"}`;
document.getElementById("muscle-map-window-description").textContent = `최근 최대 ${policy.recentWorkoutCount}회의 주동근과 보조근을 앞·뒤 인체 도해에 연결한다.`;

const dashboardViews = new Set(["home", "workout", "body", "nutrition", "data"]);
const dashboardAliases = {
  records: "workout",
  analysis: "body",
  routine: "workout"
};
const dashboardTabButtons = [...document.querySelectorAll("[data-dashboard-tab]")];
const dashboardPanels = [...document.querySelectorAll("[data-dashboard-panel]")];
const requestedDashboardView = new URLSearchParams(window.location.search).get("view");
const legacyDashboardView = window.location.hash.slice(1);
const normalizeDashboardView = (view) => dashboardAliases[view] ?? view;
const normalizedRequestedView = normalizeDashboardView(requestedDashboardView);
const normalizedLegacyView = normalizeDashboardView(legacyDashboardView);
const activeDashboardView = dashboardViews.has(normalizedRequestedView)
  ? normalizedRequestedView
  : dashboardViews.has(normalizedLegacyView) ? normalizedLegacyView : "home";
const dashboardTitles = {
  home: "홈",
  workout: "운동",
  body: "신체",
  nutrition: "식사",
  data: "전체 데이터"
};

dashboardTabButtons.forEach((link) => {
  if (link.dataset.dashboardTab === activeDashboardView) {
    link.setAttribute("aria-current", "page");
  } else {
    link.removeAttribute("aria-current");
  }
});
dashboardPanels.forEach((panel) => {
  panel.hidden = panel.dataset.dashboardPanel !== activeDashboardView;
});
const dashboardFooter = document.querySelector(".footer");
dashboardPanels
  .filter((panel) => panel.dataset.dashboardPanel === activeDashboardView)
  .sort((a, b) => Number(a.dataset.dashboardOrder) - Number(b.dataset.dashboardOrder))
  .forEach((panel) => dashboardFooter.before(panel));
document.title = `${dashboardTitles[activeDashboardView]} · 상체 만들기 기록`;

muscleMap.zones.forEach((zone) => {
  const element = document.querySelector(`.muscle-zone.${zone.className}`);
  if (element) element.dataset.muscles = zone.muscles.join(",");
});

const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const renderSourceLinks = (sources) => sources
  .map((source) => `<a href="${escapeHtml(source.href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.label)} ↗</a>`)
  .join("");

document.getElementById("composition-note").innerHTML = `<strong>해석 주의</strong> ${escapeHtml(compositionStandards.interpretationNote)}`;
document.getElementById("composition-evidence-links").innerHTML = renderSourceLinks(compositionStandards.sources);
document.getElementById("progression-rule").innerHTML = `
  <strong>증량 규칙</strong><br>
  같은 중량으로 모든 세트 ${policy.progression.targetReps}회를 정확한 자세로 마치고, 마지막 세트에도 ${policy.progression.minimumRir}회 이상 더 할 여유가 있는 상태가 ${policy.progression.requiredSessions}회 연속 확인되면 다음 운동에서 가장 작은 단위로 중량을 올린다. ${policy.progression.targetReps}회째 자세가 무너지거나 한계라면 중량을 유지한다.
  <div class="evidence-links">${renderSourceLinks(policy.progression.sources)}</div>
`;

const categoryLabel = (value, categories) => categories.find((category) => {
  if (Object.hasOwn(category, "maxExclusive")) {
    return category.maxExclusive === null || value < category.maxExclusive;
  }
  return category.maxInclusive === null || value <= category.maxInclusive;
})?.label ?? "참고 구간 없음";

const formatDate = (date) => new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "short"
}).format(new Date(`${date}T00:00:00`));

const valueWithUnit = (value, unit = "kg") =>
  value === null || value === undefined || value === "" ? "—" : `${escapeHtml(value)} ${unit}`;

const formatWorkoutReps = (workout) => workout.repsBySet?.length
  ? workout.repsBySet.join("·")
  : workout.reps ?? defaultReps;

const metricDate = (record) => record
  ? `${new Intl.DateTimeFormat("ko-KR", { month: "long", day: "numeric" }).format(new Date(`${record.date}T00:00:00`))} 기록`
  : "기록 없음";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const renderReferenceBar = ({ label, value, scaleMin, scaleMax, rangeMin, rangeMax }) => {
  const toPosition = (number) => ((clamp(number, scaleMin, scaleMax) - scaleMin) / (scaleMax - scaleMin)) * 100;
  const bandLeft = toPosition(rangeMin);
  const bandWidth = toPosition(rangeMax) - bandLeft;
  const markerLeft = toPosition(value);
  return `
    <div class="reference-row">
      <div class="reference-labels"><span>${escapeHtml(label)}</span><span>${rangeMin}–${rangeMax}</span></div>
      <div class="range-track" aria-label="${escapeHtml(label)} 참고 범위 ${rangeMin}에서 ${rangeMax}, 현재 ${value.toFixed(1)}">
        <span class="range-band" style="left:${bandLeft.toFixed(2)}%;width:${bandWidth.toFixed(2)}%"></span>
        <i class="range-marker" style="left:${markerLeft.toFixed(2)}%"></i>
      </div>
    </div>
  `;
};

const renderCompositionAnalysis = (record) => {
  const body = record?.body;
  const weight = Number(body?.weight);
  if (!Number.isFinite(weight) || weight <= 0) return;

  const heightM = heightCm / 100;
  const age = currentYear - birthYear;
  const bmi = weight / (heightM ** 2);
  const normalWeightMin = compositionStandards.bmi.normal.min * (heightM ** 2);
  const normalWeightMax = compositionStandards.bmi.normal.max * (heightM ** 2);
  const bodyFatPercent = Number.isFinite(Number(body?.bodyFat)) ? (Number(body.bodyFat) / weight) * 100 : null;
  const bodyWaterPercent = Number.isFinite(Number(body?.bodyWater)) ? (Number(body.bodyWater) / weight) * 100 : null;
  const skeletalMusclePercent = Number.isFinite(Number(body?.skeletalMuscle)) ? (Number(body.skeletalMuscle) / weight) * 100 : null;
  const fatFreeMass = Number.isFinite(Number(body?.bodyFat)) ? weight - Number(body.bodyFat) : null;
  const fatMassIndex = Number.isFinite(Number(body?.bodyFat)) ? Number(body.bodyFat) / (heightM ** 2) : null;
  const fatFreeMassIndex = fatFreeMass === null ? null : fatFreeMass / (heightM ** 2);
  const skeletalMuscleIndex = Number.isFinite(Number(body?.skeletalMuscle)) ? Number(body.skeletalMuscle) / (heightM ** 2) : null;
  const muscleToFatRatio = Number.isFinite(Number(body?.skeletalMuscle)) && Number.isFinite(Number(body?.bodyFat)) && Number(body.bodyFat) > 0
    ? Number(body.skeletalMuscle) / Number(body.bodyFat)
    : null;
  const bodyFatReference = compositionStandards.bodyFatPercent.maleAgeRanges.find((range) =>
    age >= range.ageMin && age <= range.ageMax
  ) ?? compositionStandards.bodyFatPercent.maleAgeRanges.at(-1);

  const bmiStatus = categoryLabel(bmi, compositionStandards.bmi.categories);
  const bodyFatStatus = bodyFatPercent === null
    ? "측정값 없음"
    : bodyFatPercent < bodyFatReference.min
      ? "연령대 남성 연구 참고 구간보다 낮음"
      : bodyFatPercent <= bodyFatReference.max
        ? bodyFatPercent >= bodyFatReference.max - compositionStandards.bodyFatPercent.upperBandMargin
          ? "연령대 남성 연구 참고 구간 안 · 상단 쪽"
          : "연령대 남성 연구 참고 구간 안"
        : "연령대 남성 연구 참고 구간보다 높음";
  const bodyFatPositionSummary = bodyFatPercent === null
    ? "측정값이 없다"
    : bodyFatPercent < bodyFatReference.min
      ? "구간보다 낮다"
      : bodyFatPercent <= bodyFatReference.max
        ? bodyFatPercent >= bodyFatReference.max - compositionStandards.bodyFatPercent.upperBandMargin
          ? "구간 안에서도 상단에 가깝다"
          : "구간 안이다"
        : "구간보다 높다";
  const fatMassIndexStatus = fatMassIndex === null
    ? "측정값 없음"
    : categoryLabel(fatMassIndex, compositionStandards.fatMassIndex.categories);
  const waterStatus = bodyWaterPercent === null
    ? "측정값 없음"
    : bodyWaterPercent >= compositionStandards.bodyWaterPercent.adultReference.min
      && bodyWaterPercent <= compositionStandards.bodyWaterPercent.adultReference.max
      ? "문헌의 일반적 성인 범위 안"
      : "측정 조건과 반복 추세 확인 필요";
  const ffmiDifference = fatFreeMassIndex === null
    ? null
    : fatFreeMassIndex - compositionStandards.fatFreeMassIndex.youngMaleMedian;
  const verdictTitle = bodyFatPercent === null
    ? "현재 위치: 체중은 정상 범위, 지방·제지방 평가는 측정값이 더 필요"
    : "현재 위치: 체중과 지방은 건강 참고 구간, 상체 근육 증가가 더 직접적인 우선순위";
  const verdictBody = bodyFatPercent === null
    ? `BMI ${bmi.toFixed(1)}는 한국 정상 체중 범위다. 체지방량이 없는 날은 이전 값을 가져오지 않으므로 지방·제지방 지표를 판정하지 않는다.`
    : `BMI ${bmi.toFixed(1)}와 FMI ${fatMassIndex.toFixed(1)}는 각각 한국 정상 체중·NHANES 남성 정상 지방량 구간이다. 체지방률 ${bodyFatPercent.toFixed(1)}%는 ${escapeHtml(bodyFatReference.label)} ${escapeHtml(bodyFatPositionSummary)}. 현재 수치만 보면 큰 폭의 감량보다 체지방이 빠르게 늘지 않도록 관리하면서 제지방·골격근량을 늘리는 방향이 목표에 더 맞다.`;

  document.getElementById("composition-analysis-date").textContent = formatDate(record.date);
  document.getElementById("composition-verdict").innerHTML = `
    <strong>${escapeHtml(verdictTitle)}</strong>
    ${verdictBody}
  `;
  document.getElementById("composition-analysis").innerHTML = `
    <article class="composition-card">
      <div class="composition-card-head"><h3>BMI</h3><span class="composition-value">${bmi.toFixed(1)}</span></div>
      <p class="composition-status">${escapeHtml(bmiStatus)}</p>
      <div class="reference-stack">
        ${renderReferenceBar({ label: "한국 성인 정상 BMI", value: bmi, scaleMin: compositionStandards.bmi.chart.min, scaleMax: compositionStandards.bmi.chart.max, rangeMin: compositionStandards.bmi.normal.min, rangeMax: compositionStandards.bmi.normal.max })}
      </div>
      <p class="composition-detail">${heightCm}cm 기준 한국 정상 체중 범위는 약 ${normalWeightMin.toFixed(1)}–${normalWeightMax.toFixed(1)}kg. 현재 ${weight.toFixed(1)}kg은 범위 안이며, BMI는 지방과 근육을 구분하지 못한다.</p>
    </article>
    <article class="composition-card">
      <div class="composition-card-head"><h3>체지방률</h3><span class="composition-value">${bodyFatPercent === null ? "—" : `${bodyFatPercent.toFixed(1)}%`}</span></div>
      <p class="composition-status">${escapeHtml(bodyFatStatus)}</p>
      ${bodyFatPercent === null ? "" : `<div class="reference-stack">
        ${renderReferenceBar({ label: bodyFatReference.label, value: bodyFatPercent, scaleMin: compositionStandards.bodyFatPercent.chart.min, scaleMax: compositionStandards.bodyFatPercent.chart.max, rangeMin: bodyFatReference.min, rangeMax: bodyFatReference.max })}
      </div>`}
      <p class="composition-detail">체지방량 ${valueWithUnit(body?.bodyFat)} ÷ 체중 ${weight.toFixed(1)}kg. Gallagher 연구가 BMI 경계와 연령·성별을 연결해 제안한 참고 구간이며 공식 진단선은 아니다.</p>
    </article>
    <article class="composition-card">
      <div class="composition-card-head"><h3>체지방량지수 · FMI</h3><span class="composition-value">${fatMassIndex === null ? "—" : fatMassIndex.toFixed(1)}</span></div>
      <p class="composition-status">${escapeHtml(fatMassIndexStatus)}</p>
      ${fatMassIndex === null ? "" : `<div class="reference-stack">
        ${renderReferenceBar({ label: "NHANES 남성 정상 FMI", value: fatMassIndex, scaleMin: compositionStandards.fatMassIndex.chart.min, scaleMax: compositionStandards.fatMassIndex.chart.max, rangeMin: compositionStandards.fatMassIndex.normal.min, rangeMax: compositionStandards.fatMassIndex.normal.max })}
      </div>`}
      <p class="composition-detail">체지방량 ÷ 키²로 체지방을 키에 맞춰 비교한다. 현재 약 ${fatMassIndex?.toFixed(1) ?? "—"}kg/m²로 남성 정상 분류 ${compositionStandards.fatMassIndex.normal.min}–${compositionStandards.fatMassIndex.normal.max}kg/m² 안이다.</p>
    </article>
    <article class="composition-card">
      <div class="composition-card-head"><h3>제지방량지수 · FFMI</h3><span class="composition-value">${fatFreeMassIndex === null ? "—" : fatFreeMassIndex.toFixed(1)}</span></div>
      <p class="composition-status">${fatFreeMassIndex === null ? "측정값 없음" : `젊은 남성 연구 중앙값 ${compositionStandards.fatFreeMassIndex.youngMaleMedian}보다 ${Math.abs(ffmiDifference).toFixed(1)} ${ffmiDifference >= 0 ? "높음" : "낮음"}`}</p>
      <p class="composition-detail">제지방량 ${fatFreeMass?.toFixed(1) ?? "—"}kg ÷ 키². 현재 ${fatFreeMassIndex?.toFixed(1) ?? "—"}kg/m²는 근육을 포함한 지방 이외 조직의 크기를 보여준다. 비교 연구는 스위스 백인 표본이므로 결핍 판정이 아니라 근육 증가 추세의 보조 기준으로만 사용한다.</p>
    </article>
    <article class="composition-card">
      <div class="composition-card-head"><h3>체수분률</h3><span class="composition-value">${bodyWaterPercent === null ? "—" : `${bodyWaterPercent.toFixed(1)}%`}</span></div>
      <p class="composition-status">${escapeHtml(waterStatus)}</p>
      ${bodyWaterPercent === null ? "" : `<div class="reference-stack">
        ${renderReferenceBar({ label: "일반적 성인 참고", value: bodyWaterPercent, scaleMin: compositionStandards.bodyWaterPercent.chart.min, scaleMax: compositionStandards.bodyWaterPercent.chart.max, rangeMin: compositionStandards.bodyWaterPercent.adultReference.min, rangeMax: compositionStandards.bodyWaterPercent.adultReference.max })}
      </div>`}
      <p class="composition-detail">체수분 ${valueWithUnit(body?.bodyWater, "L")} ÷ 체중 ${weight.toFixed(1)}kg. 하루 수분 상태 판정값이 아니라 반복 측정용 지표다.</p>
    </article>
    <article class="composition-card">
      <div class="composition-card-head"><h3>골격근 지표</h3><span class="composition-value">${skeletalMusclePercent === null ? "—" : `${skeletalMusclePercent.toFixed(1)}%`}</span></div>
      <p class="composition-status">공인 정상 범위 없음 · 현재 기준점</p>
      <p class="composition-detail">골격근량/체중 ${skeletalMusclePercent?.toFixed(1) ?? "—"}% · 골격근량/키² ${skeletalMuscleIndex?.toFixed(1) ?? "—"}kg/m² · 골격근/지방 ${muscleToFatRatio?.toFixed(2) ?? "—"}배. 전신 골격근량은 사지근육량 기반 근감소증 기준과 비교할 수 없어 같은 기기의 변화만 본다.</p>
    </article>
  `;
};

const renderNutritionEstimate = (estimate) => estimate ? `
  <div class="estimate-box">
    <div class="estimate-values">
      <span>추정 열량 ${escapeHtml(estimate.calories)}</span>
      <span>추정 단백질 ${escapeHtml(estimate.protein)}</span>
      ${estimate.freeSugar ? `<span>추정 유리당 ${escapeHtml(estimate.freeSugar)}</span>` : ""}
    </div>
    <small><strong>가정:</strong> ${escapeHtml(estimate.assumptions)}</small>
    <small><strong>판단 기준:</strong> ${escapeHtml(estimate.target)}</small>
    ${estimate.freeSugar ? `<small><strong>유리당 기준:</strong> WHO 권고는 하루 에너지의 10% 미만, 가능하면 5% 미만이다. ${freeSugarPolicy.referenceCalories.toLocaleString("ko-KR")}kcal 기준 각각 ${freeSugarReferenceMax}g·${freeSugarReferenceIdeal}g 미만이다.</small>` : ""}
    ${estimate.freeSugar ? `<div class="estimate-sources">${renderSourceLinks(freeSugarPolicy.sources)}</div>` : ""}
    ${estimate.sources?.length ? `<div class="estimate-sources">${estimate.sources.map((source) => `<a href="${escapeHtml(source.href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.label)}</a>`).join("")}</div>` : ""}
  </div>
` : "";

const sortedRecords = [...healthRecords].sort((a, b) => b.date.localeCompare(a.date));
const recordsWithBody = sortedRecords.filter((record) => record.body && Object.values(record.body).some((value) => value !== null && value !== undefined && value !== ""));
const recordsWithWorkout = sortedRecords.filter((record) => record.workouts?.length);
const recordsWithMeals = sortedRecords.filter((record) => record.meals?.length);

const latestMealRecord = recordsWithMeals[0];
if (latestMealRecord) {
  const estimate = latestMealRecord.nutritionEstimate;
  const nutritionPoint = latestMealRecord.advice?.points?.find((point) => point.label === "영양");
  const sugarPoint = latestMealRecord.advice?.points?.find((point) => point.label === "유리당");
  document.getElementById("nutrition-overview-date").textContent = formatDate(latestMealRecord.date);
  document.getElementById("nutrition-overview-metrics").innerHTML = `
    <div class="metric"><span>추정 섭취 열량</span><strong>${estimate ? escapeHtml(estimate.calories) : "—"}</strong></div>
    <div class="metric"><span>추정 단백질</span><strong>${estimate ? escapeHtml(estimate.protein) : "—"}</strong></div>
    <div class="metric"><span>추정 유리당</span><strong>${estimate?.freeSugar ? escapeHtml(estimate.freeSugar) : "—"}</strong></div>
  `;
  document.getElementById("nutrition-focus").innerHTML = `
    <strong class="feedback-title">가장 먼저 볼 점</strong>
    ${escapeHtml(nutritionPoint?.text ?? "식사량과 단백질 추정치를 다음 기록과 비교합니다.")}
    ${sugarPoint ? `<span class="nutrition-focus-point">${escapeHtml(sugarPoint.text)}</span>` : ""}
    ${estimate?.target ? `<span class="muted">${escapeHtml(estimate.target)}</span>` : ""}
    ${estimate?.freeSugar ? `<div class="evidence-links">${renderSourceLinks(freeSugarPolicy.sources)}</div>` : ""}
  `;
}

const recentMuscleRecords = recordsWithWorkout.slice(0, policy.recentWorkoutCount);
const latestMuscleRecord = recentMuscleRecords[0];
if (latestMuscleRecord) {
  const buildMuscleScores = (workouts) => {
    const scores = new Map();
    const addScore = (muscle, score) => scores.set(muscle, (scores.get(muscle) ?? 0) + score);
    workouts.forEach((workout) => {
      workout.primaryMuscles?.forEach((muscle) => addScore(muscle, (workout.sets ?? 0) * policy.stimulus.primaryWeight));
      workout.secondaryMuscles?.forEach((muscle) => addScore(muscle, (workout.sets ?? 0) * policy.stimulus.secondaryWeight));
    });
    return scores;
  };

  const muscleLevel = (score, maxScore) => {
    const ratio = maxScore ? score / maxScore : 0;
    return ratio >= policy.stimulus.highRatio
      ? 3
      : ratio >= policy.stimulus.mediumRatio
        ? 2
        : ratio > 0 ? 1 : 0;
  };
  const levelLabel = policy.stimulus.labels;

  const renderMuscleMap = (scores, title) => {
    const maxScore = Math.max(0, ...scores.values());
    document.getElementById("muscle-map-selection").textContent = title;

    document.querySelectorAll(".muscle-zone").forEach((zone) => {
      const muscles = zone.dataset.muscles.split(",");
      const score = Math.max(...muscles.map((muscle) => scores.get(muscle) ?? 0));
      zone.dataset.level = muscleLevel(score, maxScore);
    });

    document.getElementById("muscle-tags").innerHTML = [...scores.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([muscle, score]) => {
        const level = muscleLevel(score, maxScore);
        return `<span class="muscle-chip level-${level}">${escapeHtml(muscle)} · ${levelLabel[level]}</span>`;
      })
      .join("");
  };

  const recentWorkoutEntries = recentMuscleRecords.flatMap((record) =>
    record.workouts.map((workout) => ({ date: record.date, workout }))
  );
  const recentWorkouts = recentWorkoutEntries.map((entry) => entry.workout);
  const overallScores = buildMuscleScores(recentWorkouts);
  const totalSets = (workouts) => workouts.reduce((sum, workout) => sum + (workout.sets ?? 0), 0);

  const uniqueExerciseEntries = (entries) => {
    const seen = new Set();
    return entries.filter(({ workout }) => {
      if (seen.has(workout.name)) return false;
      seen.add(workout.name);
      return true;
    });
  };

  const renderHistoryTable = (title, description, historyEntries) => {
    const panel = document.getElementById("exercise-history-panel");
    const tableBody = document.getElementById("workout-history-table-body");
    document.getElementById("exercise-history-title").textContent = title;
    document.getElementById("exercise-history-description").textContent = description;
    tableBody.innerHTML = historyEntries.map(({ date, workout }) => `
      <tr>
        <td class="date-cell" data-label="날짜">${escapeHtml(formatDate(date))}</td>
        <td class="exercise-cell" data-label="운동">${escapeHtml(workout.name)}</td>
        <td class="detail-cell" data-label="중량·수행">${escapeHtml(workout.detail || "상세 중량 미기록")}</td>
        <td class="number-cell" data-label="세트">${workout.sets ?? "—"}세트</td>
        <td class="number-cell" data-label="횟수">${escapeHtml(formatWorkoutReps(workout))}회</td>
        <td class="muscle-cell" data-label="난이도·자세">${escapeHtml(workout.lastSetRir ?? workout.difficulty ?? workout.formStatus ?? "미기록")}</td>
      </tr>
    `).join("");
    panel.hidden = false;
  };

  const renderExerciseHistory = (exerciseName) => {
    const historyEntries = recordsWithWorkout.flatMap((record) =>
      record.workouts
        .filter((workout) => workout.name === exerciseName)
        .map((workout) => ({ date: record.date, workout }))
    );
    renderHistoryTable(
      `${exerciseName} 수행 이력`,
      `${historyEntries.length}회 기록 · 날짜별 중량과 수행 품질 변화를 비교한다.`,
      historyEntries
    );
  };

  const renderExerciseCards = (entries, scopeLabel, scores) => {
    const workouts = entries.map((entry) => entry.workout);
    const displayEntries = uniqueExerciseEntries(entries);
    const exerciseList = document.getElementById("exercise-filter-list");
    const historyPanel = document.getElementById("exercise-history-panel");
    historyPanel.hidden = true;
    document.getElementById("selected-workout-title").textContent = `${scopeLabel} 운동 기록`;
    document.getElementById("selected-workout-description").textContent = "전체 운동 박스는 선택 기간의 전체 목록을, 개별 운동 박스는 해당 종목의 모든 날짜별 이력을 펼친다.";
    document.getElementById("selected-workout-volume").textContent = `${displayEntries.length}종목 · 누적 ${totalSets(workouts)}세트`;

    exerciseList.innerHTML = `
      <button class="exercise-filter" type="button" data-exercise-index="all" aria-pressed="true">
        <strong>${escapeHtml(scopeLabel)} 전체 운동</strong>
        <small>선택 기간의 자극 합산 · 누르면 전체 운동 목록 표시</small>
      </button>
      ${displayEntries.map(({ workout }, index) => `
        <button class="exercise-filter" type="button" data-exercise-index="${index}" aria-pressed="false">
          <strong>${escapeHtml(workout.name)}</strong>
          <small>${escapeHtml(workout.detail || `${workout.sets ?? 0}세트 × ${formatWorkoutReps(workout)}회`)}</small>
          <small>주동: ${escapeHtml(workout.primaryMuscles?.join(", ") || "미분류")} · 보조: ${escapeHtml(workout.secondaryMuscles?.join(", ") || "없음")}</small>
        </button>
      `).join("")}
    `;

    exerciseList.querySelectorAll(".exercise-filter").forEach((button) => {
      button.addEventListener("click", () => {
        exerciseList.querySelectorAll(".exercise-filter").forEach((item) => item.setAttribute("aria-pressed", "false"));
        button.setAttribute("aria-pressed", "true");
        const index = button.dataset.exerciseIndex;
        if (index === "all") {
          renderMuscleMap(scores, `${scopeLabel} 상체 분포`);
          renderHistoryTable(
            `${scopeLabel} 전체 운동 목록`,
            `${entries.length}개 수행 기록 · 선택한 기간에 실시한 모든 운동을 날짜별로 표시한다.`,
            entries
          );
          return;
        }
        const workout = displayEntries[Number(index)].workout;
        renderMuscleMap(buildMuscleScores([workout]), workout.name);
        renderExerciseHistory(workout.name);
      });
    });
  };

  const selectMuscleDate = (dateKey) => {
    document.querySelectorAll(".muscle-date-filter").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.date === dateKey));
    });

    if (dateKey === "recent") {
      document.getElementById("muscle-map-date").textContent = `최근 ${recentMuscleRecords.length}회 · ${formatDate(latestMuscleRecord.date)} 기준`;
      renderMuscleMap(overallScores, "최근 운동 전체의 상체 분포");
      renderExerciseCards(recentWorkoutEntries, `최근 ${recentMuscleRecords.length}회`, overallScores);
      return;
    }

    const record = recentMuscleRecords.find((item) => item.date === dateKey);
    if (!record) return;
    const dateLabel = formatDate(record.date);
    const scores = buildMuscleScores(record.workouts);
    document.getElementById("muscle-map-date").textContent = dateLabel;
    renderMuscleMap(scores, `${dateLabel} 상체 분포`);
    renderExerciseCards(record.workouts.map((workout) => ({ date: record.date, workout })), dateLabel, scores);
  };

  document.getElementById("muscle-date-list").innerHTML = `
    <button class="muscle-date-filter" type="button" data-date="recent" aria-pressed="true">최근 ${recentMuscleRecords.length}회 전체</button>
    ${recentMuscleRecords.map((record) => `
      <button class="muscle-date-filter" type="button" data-date="${record.date}" aria-pressed="false">${escapeHtml(formatDate(record.date))}</button>
    `).join("")}
  `;
  document.querySelectorAll(".muscle-date-filter").forEach((button) => {
    button.addEventListener("click", () => selectMuscleDate(button.dataset.date));
  });
  selectMuscleDate("recent");
}

const latestWorkoutDate = recordsWithWorkout[0]?.date;
const initialCalendarDate = latestWorkoutDate
  ? new Date(`${latestWorkoutDate}T00:00:00`)
  : new Date();
let calendarYear = initialCalendarDate.getFullYear();
let calendarMonth = initialCalendarDate.getMonth();

const toDateKey = (year, month, day) =>
  `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

const renderCalendar = () => {
  const firstDay = new Date(calendarYear, calendarMonth, 1);
  const lastDay = new Date(calendarYear, calendarMonth + 1, 0);
  const leadingDays = firstDay.getDay();
  const totalCells = Math.ceil((leadingDays + lastDay.getDate()) / 7) * 7;
  const workoutMap = new Map(recordsWithWorkout.map((record) => [record.date, record]));

  document.getElementById("calendar-title").textContent = `${calendarYear}년 ${calendarMonth + 1}월`;

  const cells = [];
  for (let index = 0; index < totalCells; index += 1) {
    const cellDate = new Date(calendarYear, calendarMonth, index - leadingDays + 1);
    const year = cellDate.getFullYear();
    const month = cellDate.getMonth();
    const day = cellDate.getDate();
    const dateKey = toDateKey(year, month, day);
    const record = workoutMap.get(dateKey);
    const outside = month !== calendarMonth;
    const exerciseCount = record?.workouts?.length ?? 0;
    const ariaLabel = record
      ? `${year}년 ${month + 1}월 ${day}일, 운동 ${exerciseCount}종목`
      : `${year}년 ${month + 1}월 ${day}일`;

    cells.push(`<div class="calendar-day${outside ? " outside" : ""}${record ? " workout" : ""}" role="gridcell" aria-label="${ariaLabel}"><span>${day}</span></div>`);
  }

  document.getElementById("calendar-grid").innerHTML = cells.join("");

  const monthWorkouts = recordsWithWorkout.filter((record) => {
    const date = new Date(`${record.date}T00:00:00`);
    return date.getFullYear() === calendarYear && date.getMonth() === calendarMonth;
  });
  const exerciseTotal = monthWorkouts.reduce((sum, record) => sum + record.workouts.length, 0);
  document.getElementById("calendar-summary").textContent = monthWorkouts.length
    ? `${calendarMonth + 1}월 운동 ${monthWorkouts.length}일 · 기록된 종목 ${exerciseTotal}개`
    : `${calendarMonth + 1}월에는 아직 운동 기록이 없습니다.`;
};

document.getElementById("calendar-prev").addEventListener("click", () => {
  calendarMonth -= 1;
  if (calendarMonth < 0) {
    calendarMonth = 11;
    calendarYear -= 1;
  }
  renderCalendar();
});

document.getElementById("calendar-next").addEventListener("click", () => {
  calendarMonth += 1;
  if (calendarMonth > 11) {
    calendarMonth = 0;
    calendarYear += 1;
  }
  renderCalendar();
});

renderCalendar();

document.getElementById("total-days").textContent = `${sortedRecords.length}일`;
document.getElementById("workout-days").textContent = `${recordsWithWorkout.length}일`;
document.getElementById("meal-days").textContent = `${recordsWithMeals.length}일`;

if (sortedRecords.length) {
  const hasBodyValue = (record, key) => record.body?.[key] !== null
    && record.body?.[key] !== undefined
    && record.body?.[key] !== "";
  const latestBodyMetricRecords = {
    weight: sortedRecords.find((record) => hasBodyValue(record, "weight")),
    skeletalMuscle: sortedRecords.find((record) => hasBodyValue(record, "skeletalMuscle")),
    bodyFat: sortedRecords.find((record) => hasBodyValue(record, "bodyFat")),
    bodyWater: sortedRecords.find((record) => hasBodyValue(record, "bodyWater"))
  };
  const latestWorkoutRecord = recordsWithWorkout[0];
  const latestNutritionRecord = sortedRecords.find((record) => record.nutritionEstimate);
  const latestAdviceRecord = sortedRecords.find((record) => record.advice);
  const latestActionRecord = sortedRecords.find((record) => record.actions?.length);
  const latestWorkout = latestWorkoutRecord ? `${latestWorkoutRecord.workouts.length}종목` : "—";
  const totalSets = latestWorkoutRecord?.workouts.reduce((sum, workout) => sum + (workout.sets ?? 0), 0) ?? 0;
  const proteinReferenceWeight = Number(latestBodyMetricRecords.weight?.body?.weight);
  const proteinTarget = Number.isFinite(proteinReferenceWeight)
    ? `약 ${Math.round(proteinReferenceWeight * policy.nutrition.proteinTargetPerKg)}g (최근 체중 기준)`
    : "체중 기록 필요";

  document.getElementById("latest-date").textContent = "항목별 최신 기록";
  document.getElementById("latest-metrics").innerHTML = `
    <div class="metric"><span>몸무게</span><strong>${valueWithUnit(latestBodyMetricRecords.weight?.body?.weight)}</strong><time class="metric-date">${metricDate(latestBodyMetricRecords.weight)}</time></div>
    <div class="metric"><span>골격근량</span><strong>${valueWithUnit(latestBodyMetricRecords.skeletalMuscle?.body?.skeletalMuscle)}</strong><time class="metric-date">${metricDate(latestBodyMetricRecords.skeletalMuscle)}</time></div>
    <div class="metric"><span>체지방량</span><strong>${valueWithUnit(latestBodyMetricRecords.bodyFat?.body?.bodyFat)}</strong><time class="metric-date">${metricDate(latestBodyMetricRecords.bodyFat)}</time></div>
    <div class="metric"><span>체수분</span><strong>${valueWithUnit(latestBodyMetricRecords.bodyWater?.body?.bodyWater, "L")}</strong><time class="metric-date">${metricDate(latestBodyMetricRecords.bodyWater)}</time></div>
    <div class="metric"><span>최근 운동</span><strong>${escapeHtml(latestWorkout)}</strong><time class="metric-date">${metricDate(latestWorkoutRecord)}</time></div>
  `;

  document.getElementById("session-summary").innerHTML = `
    <div class="metric"><span>운동량</span><strong>${latestWorkoutRecord ? `${latestWorkoutRecord.workouts.length}종목 · ${totalSets}세트` : "—"}</strong><time class="metric-date">${metricDate(latestWorkoutRecord)}</time></div>
    <div class="metric"><span>추정 섭취 열량</span><strong>${latestNutritionRecord ? escapeHtml(latestNutritionRecord.nutritionEstimate.calories) : "—"}</strong><time class="metric-date">${metricDate(latestNutritionRecord)}</time></div>
    <div class="metric"><span>추정 단백질</span><strong>${latestNutritionRecord ? `${escapeHtml(latestNutritionRecord.nutritionEstimate.protein)} / 목표 ${escapeHtml(proteinTarget)}` : "—"}</strong><time class="metric-date">${metricDate(latestNutritionRecord)}</time></div>
  `;

  renderCompositionAnalysis(latestBodyMetricRecords.weight);

  if (latestAdviceRecord?.advice) {
    const feedbackContent = latestAdviceRecord.advice.points?.length
      ? `<ul class="feedback-points">${latestAdviceRecord.advice.points.map((point) => `<li><strong>${escapeHtml(point.label)}</strong>${escapeHtml(point.text)}</li>`).join("")}</ul>`
      : escapeHtml(latestAdviceRecord.advice.body ?? "");
    const feedbackSources = latestAdviceRecord.advice.sources?.length
      ? `<div class="evidence-links">${renderSourceLinks(latestAdviceRecord.advice.sources)}</div>`
      : "";
    document.getElementById("advice").innerHTML = `<strong class="feedback-title">${escapeHtml(latestAdviceRecord.advice.title)}</strong>${feedbackContent}${feedbackSources}`;
  }

  if (latestActionRecord) {
    document.getElementById("next-actions").innerHTML = latestActionRecord.actions
      .map((action) => `<li>${escapeHtml(action)}</li>`)
      .join("");
  }
}

if (recordsWithBody.length) {
  document.getElementById("body-history-wrap").hidden = false;
  document.getElementById("body-history-empty").hidden = true;
  document.getElementById("body-history").innerHTML = recordsWithBody.map((record) => `
    <tr>
      <td data-label="날짜">${escapeHtml(formatDate(record.date))}</td>
      <td data-label="몸무게">${valueWithUnit(record.body?.weight)}</td>
      <td data-label="골격근량">${valueWithUnit(record.body?.skeletalMuscle)}</td>
      <td data-label="체지방량">${valueWithUnit(record.body?.bodyFat)}</td>
      <td data-label="체수분">${valueWithUnit(record.body?.bodyWater, "L")}</td>
    </tr>
  `).join("");
}

if (recordsWithMeals.length) {
  document.getElementById("nutrition-list").innerHTML = recordsWithMeals.map((record) => `
    <article class="record">
      <time datetime="${escapeHtml(record.date)}">${escapeHtml(formatDate(record.date))}</time>
      <div>
        ${record.meals.map((meal) => `
          <h4>${escapeHtml(meal.label)}</h4>
          <p>${escapeHtml(meal.items.join(", "))}</p>
        `).join("")}
        ${renderNutritionEstimate(record.nutritionEstimate)}
      </div>
    </article>
  `).join("");
}

if (recordsWithWorkout.length) {
  document.getElementById("workout-list").innerHTML = recordsWithWorkout.map((record) => `
    <article class="record">
      <time datetime="${escapeHtml(record.date)}">${escapeHtml(formatDate(record.date))}</time>
      <div>
        <ul class="plain-list">
          ${record.workouts.map((workout) => `<li><strong>${escapeHtml(workout.name)}</strong>${workout.detail ? ` · ${escapeHtml(workout.detail)}` : ""}</li>`).join("")}
        </ul>
      </div>
    </article>
  `).join("");
}

if (sortedRecords.length) {
  document.getElementById("record-list").innerHTML = sortedRecords.map((record) => `
    <article class="record">
      <time datetime="${escapeHtml(record.date)}">${escapeHtml(formatDate(record.date))}</time>
      <div class="record-columns">
        <div>
          <h4>상태</h4>
          <p>몸무게 ${valueWithUnit(record.body?.weight)} · 골격근량 ${valueWithUnit(record.body?.skeletalMuscle)} · 체지방량 ${valueWithUnit(record.body?.bodyFat)} · 체수분 ${valueWithUnit(record.body?.bodyWater, "L")}</p>
          ${record.condition ? `<p class="muted">${escapeHtml(record.condition)}</p>` : ""}
        </div>
        <div>
          <h4>운동</h4>
          <p>${record.workouts?.length ? record.workouts.map((workout) => `${escapeHtml(workout.name)}${workout.detail ? ` (${escapeHtml(workout.detail)})` : ""}`).join(", ") : "기록 없음"}</p>
          <h4 style="margin-top: 14px;">식사</h4>
          <p>${record.meals?.length ? record.meals.map((meal) => `${escapeHtml(meal.label)}: ${escapeHtml(meal.items.join(", "))}`).join(" / ") : "기록 없음"}</p>
          ${renderNutritionEstimate(record.nutritionEstimate)}
        </div>
      </div>
    </article>
  `).join("");
}
