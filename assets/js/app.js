const { birthYear, heightCm, defaultReps } = window.fitnessProfile;
const compositionStandards = window.bodyCompositionStandards;
const policy = window.coachingPolicy;
const muscleMap = window.muscleMapConfig;
const nutritionReference = policy.nutrition.adultReference;
const freeSugarPolicy = policy.nutrition.freeSugar;
const freeSugarReferenceMax = Math.round(nutritionReference.energyKcal * freeSugarPolicy.maximumEnergyRatio / freeSugarPolicy.caloriesPerGram);
const freeSugarReferenceIdeal = Math.round(nutritionReference.energyKcal * freeSugarPolicy.idealEnergyRatio / freeSugarPolicy.caloriesPerGram);
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
    ${estimate.freeSugar ? `<small><strong>유리당 기준:</strong> WHO 권고는 하루 에너지의 10% 미만, 가능하면 5% 미만이다. ${nutritionReference.energyKcal.toLocaleString("ko-KR")}kcal 참고치에 적용하면 각각 약 ${freeSugarReferenceMax}g·${freeSugarReferenceIdeal}g 미만이다.</small>` : ""}
    ${estimate.freeSugar ? `<div class="estimate-sources">${renderSourceLinks(freeSugarPolicy.sources)}</div>` : ""}
    ${estimate.sources?.length ? `<div class="estimate-sources">${estimate.sources.map((source) => `<a href="${escapeHtml(source.href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.label)}</a>`).join("")}</div>` : ""}
  </div>
` : "";

const sortedRecords = [...healthRecords].sort((a, b) => b.date.localeCompare(a.date));
const recordsWithBody = sortedRecords.filter((record) => record.body && Object.values(record.body).some((value) => value !== null && value !== undefined && value !== ""));
const recordsWithWorkout = sortedRecords.filter((record) => record.workouts?.length);
const recordsWithMeals = sortedRecords.filter((record) => record.meals?.length);
const rollingWindowDays = policy.rollingWindowDays ?? 7;
const dateFromKey = (date) => new Date(`${date}T00:00:00`);
const latestRecordDate = sortedRecords[0]?.date;
const rollingWindowEnd = latestRecordDate ? dateFromKey(latestRecordDate) : new Date();
const rollingWindowStart = new Date(rollingWindowEnd);
rollingWindowStart.setDate(rollingWindowEnd.getDate() - rollingWindowDays + 1);
const rollingRecords = sortedRecords.filter((record) => {
  const date = dateFromKey(record.date);
  return date >= rollingWindowStart && date <= rollingWindowEnd;
});
const rollingWorkoutRecords = rollingRecords.filter((record) => record.workouts?.length);
const rollingMealRecords = rollingRecords.filter((record) => record.meals?.length);
const rollingRangeLabel = latestRecordDate
  ? `${new Intl.DateTimeFormat("ko-KR", { month: "numeric", day: "numeric" }).format(rollingWindowStart)}–${new Intl.DateTimeFormat("ko-KR", { month: "numeric", day: "numeric" }).format(rollingWindowEnd)}`
  : "기록 대기 중";

const sumWorkoutSets = (workouts) => workouts.reduce((sum, workout) => sum + (Number(workout.sets) || 0), 0);

const recordQualityLabels = (record) => {
  const labels = [];
  const hasBody = record.body && Object.values(record.body).some((value) => value !== null && value !== undefined && value !== "");
  const hasMeals = record.meals?.length;
  const hasWorkout = record.workouts?.length;
  const hasWorkoutQuality = hasWorkout && record.workouts.every((workout) =>
    (workout.lastSetRir !== null && workout.lastSetRir !== undefined)
      || Boolean(workout.difficulty)
  );

  if (!hasBody) labels.push("체성분 없음");
  if (hasWorkout && !hasWorkoutQuality) labels.push("RIR·난이도 미완성");
  if (!hasMeals) labels.push("식사 없음");
  if (hasMeals && !record.nutritionEstimate?.nutrients) labels.push("상세 영양 추정 없음");
  if (!hasWorkout && Array.isArray(record.workouts)) labels.push("휴식일");
  return labels.length ? labels : ["핵심 기록 완료"];
};

const renderQualityBadges = (record) => {
  const labels = recordQualityLabels(record);
  const complete = labels.length === 1 && labels[0] === "핵심 기록 완료";
  return `<div class="quality-badges" aria-label="기록 완성도">${labels.map((label) => `<span class="quality-badge${complete ? " complete" : ""}">${escapeHtml(label)}</span>`).join("")}</div>`;
};

const formatNutritionNumber = (value) => Number(value).toLocaleString("ko-KR", {
  maximumFractionDigits: Number.isInteger(value) ? 0 : 1
});

const buildNutrientDefinitions = (weight) => {
  const energy = nutritionReference.energyKcal;
  const proteinTarget = Math.round(weight * policy.nutrition.proteinTargetPerKg);
  const carbohydrateMin = Math.round(energy * nutritionReference.carbohydrateEnergyRatio.min / 4);
  const carbohydrateMax = Math.round(energy * nutritionReference.carbohydrateEnergyRatio.max / 4);
  const fatMin = Math.round(energy * nutritionReference.totalFatEnergyRatio.min / 9);
  const fatMax = Math.round(energy * nutritionReference.totalFatEnergyRatio.max / 9);
  const saturatedFatMax = energy * nutritionReference.saturatedFatEnergyRatioMax / 9;

  return {
    energy: { label: "에너지", type: "range", targetMin: energy * 0.9, targetMax: energy * 1.1, targetLabel: `참고 ${energy.toLocaleString("ko-KR")}kcal`, percentBasis: energy, percentLabel: "참고치" },
    protein: { label: "단백질", type: "minimum", targetMin: proteinTarget, targetLabel: `개인 목표 ${proteinTarget}g`, percentBasis: proteinTarget, percentLabel: "개인 목표" },
    carbohydrate: { label: "탄수화물", type: "range", targetMin: carbohydrateMin, targetMax: carbohydrateMax, targetLabel: `권고 ${carbohydrateMin}~${carbohydrateMax}g`, percentBasis: carbohydrateMin, percentLabel: "권고 하한" },
    totalFat: { label: "지방", type: "range", targetMin: fatMin, targetMax: fatMax, targetLabel: `권고 ${fatMin}~${fatMax}g`, percentBasis: fatMax, percentLabel: "권고 상한" },
    saturatedFat: { label: "포화지방", type: "maximum", targetMax: saturatedFatMax, targetLabel: `상한 약 ${Math.round(saturatedFatMax)}g 미만`, percentBasis: saturatedFatMax, percentLabel: "상한" },
    freeSugar: { label: "유리당", type: "maximum", targetMax: freeSugarReferenceMax, targetLabel: `상한 ${freeSugarReferenceMax}g · 이상적 ${freeSugarReferenceIdeal}g 미만`, percentBasis: freeSugarReferenceMax, percentLabel: "상한" },
    fiber: { label: "식이섬유", type: "minimum", targetMin: nutritionReference.fiberMinGrams, targetLabel: `목표 ${nutritionReference.fiberMinGrams}g 이상`, percentBasis: nutritionReference.fiberMinGrams, percentLabel: "목표" },
    sodium: { label: "나트륨", type: "maximum", targetMax: nutritionReference.sodiumMaxMg, targetLabel: `상한 ${nutritionReference.sodiumMaxMg.toLocaleString("ko-KR")}mg 미만`, percentBasis: nutritionReference.sodiumMaxMg, percentLabel: "상한" }
  };
};

const nutrientStatus = (intake, definition) => {
  if (definition.type === "minimum") {
    if (intake.max < definition.targetMin) return { key: "low", label: "부족 추정" };
    if (intake.min >= definition.targetMin) return { key: "ok", label: "목표 충족" };
    return { key: "mixed", label: "충족 가능" };
  }
  if (definition.type === "maximum") {
    if (intake.min > definition.targetMax) return { key: "high", label: "상한 초과" };
    if (intake.max <= definition.targetMax) return { key: "ok", label: "상한 이내" };
    return { key: "high", label: "초과 가능" };
  }
  if (intake.max < definition.targetMin) return { key: "low", label: "권고 미달" };
  if (intake.min > definition.targetMax) return { key: "high", label: "권고 초과" };
  if (intake.min >= definition.targetMin && intake.max <= definition.targetMax) return { key: "ok", label: "권고 범위" };
  return { key: "mixed", label: "권고와 겹침" };
};

const renderNutrientCard = (key, intake, definition) => {
  const status = nutrientStatus(intake, definition);
  const targetAnchor = definition.targetMax ?? definition.targetMin;
  const scaleMax = Math.max(intake.max * 1.08, targetAnchor * 1.35, definition.targetMin ?? 0);
  const targetStart = definition.type === "maximum" ? 0 : definition.targetMin;
  const targetEnd = definition.type === "minimum" ? scaleMax : definition.targetMax;
  const percent = (value) => Math.round(value / definition.percentBasis * 100);
  const position = (value) => Math.max(0, Math.min(100, value / scaleMax * 100));
  const intakeLeft = position(intake.min);
  const intakeRight = position(intake.max);

  return `
    <article class="nutrient-card" data-status="${status.key}" data-nutrient="${escapeHtml(key)}">
      <div class="nutrient-card-head">
        <h3>${escapeHtml(definition.label)}</h3>
        <span class="nutrient-status">${escapeHtml(status.label)}</span>
      </div>
      <div class="nutrient-values">
        <strong>${formatNutritionNumber(intake.min)}~${formatNutritionNumber(intake.max)}${escapeHtml(intake.unit)}</strong>
        <span>${escapeHtml(definition.targetLabel)}</span>
      </div>
      <div class="nutrient-track" aria-label="${escapeHtml(definition.label)} 추정 섭취 범위와 목표 비교">
        <span class="nutrient-target-band" style="left:${position(targetStart)}%;width:${Math.max(0, position(targetEnd) - position(targetStart))}%"></span>
        <span class="nutrient-intake-range" style="left:${intakeLeft}%;width:${Math.max(2, intakeRight - intakeLeft)}%"></span>
      </div>
      <small class="nutrient-percent">${escapeHtml(definition.percentLabel)}의 ${percent(intake.min)}~${percent(intake.max)}%</small>
    </article>
  `;
};

const renderNutrientBalance = (record) => {
  const grid = document.getElementById("nutrient-balance-grid");
  if (!grid || !record?.nutritionEstimate?.nutrients) return;
  const referenceWeight = Number(record.body?.weight) || Number(recordsWithBody.find((item) => Number(item.body?.weight))?.body.weight);
  if (!referenceWeight) return;
  const definitions = buildNutrientDefinitions(referenceWeight);
  const nutrients = record.nutritionEstimate.nutrients;
  const cards = Object.entries(definitions)
    .filter(([key]) => nutrients[key])
    .map(([key, definition]) => renderNutrientCard(key, nutrients[key], definition));
  const balancePoint = record.advice?.points?.find((point) => ["영양 균형", "당·나트륨"].includes(point.label));
  const sugarPoint = record.advice?.points?.find((point) => ["유리당", "당·나트륨"].includes(point.label));
  const referenceSources = [...nutritionReference.sources, ...freeSugarPolicy.sources];

  document.getElementById("nutrient-balance-date").textContent = formatDate(record.date);
  grid.innerHTML = cards.join("");
  document.getElementById("nutrient-balance-feedback").innerHTML = `
    <strong class="feedback-title">오늘의 피드백</strong>
    ${escapeHtml(balancePoint?.text ?? "영양소별 추정 범위를 다음 기록과 비교합니다.")}
    ${sugarPoint && sugarPoint !== balancePoint ? `<span class="nutrition-focus-point">${escapeHtml(sugarPoint.text)}</span>` : ""}
  `;
  document.getElementById("nutrition-reference-note").textContent = `${nutritionReference.label}의 ${nutritionReference.energyKcal.toLocaleString("ko-KR")}kcal는 같은 연령대 남성의 집단 참고치이며 개인 처방값이 아니다. 실제 필요량은 활동량과 목표에 따라 달라진다. 파란 막대는 음식량이 불명확해 생기는 추정 범위다.`;
  document.getElementById("nutrition-reference-links").innerHTML = renderSourceLinks(referenceSources);
};

const latestMealRecord = recordsWithMeals[0];
if (latestMealRecord) {
  const estimate = latestMealRecord.nutritionEstimate;
  const nutritionPoint = latestMealRecord.advice?.points?.find((point) => ["영양", "단백질"].includes(point.label));
  const sugarPoint = latestMealRecord.advice?.points?.find((point) => ["유리당", "당·나트륨"].includes(point.label));
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
  renderNutrientBalance(latestMealRecord);
}

const rollingWorkoutEntries = rollingWorkoutRecords.flatMap((record) =>
  record.workouts.map((workout) => ({ date: record.date, workout }))
);
const rollingTotalSets = sumWorkoutSets(rollingWorkoutEntries.map(({ workout }) => workout));
const rollingQualityEntries = rollingWorkoutEntries.filter(({ workout }) =>
  workout.lastSetRir !== null && workout.lastSetRir !== undefined || Boolean(workout.difficulty)
);
const rollingMuscleLoad = new Map();
const addRollingMuscleLoad = (muscle, value) => rollingMuscleLoad.set(muscle, (rollingMuscleLoad.get(muscle) ?? 0) + value);
rollingWorkoutEntries.forEach(({ workout }) => {
  workout.primaryMuscles?.forEach((muscle) => addRollingMuscleLoad(muscle, (workout.sets ?? 0) * policy.stimulus.primaryWeight));
  workout.secondaryMuscles?.forEach((muscle) => addRollingMuscleLoad(muscle, (workout.sets ?? 0) * policy.stimulus.secondaryWeight));
});
const topRollingMuscles = [...rollingMuscleLoad.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3);
const chronologicalWorkoutDates = rollingWorkoutRecords.map((record) => dateFromKey(record.date)).sort((a, b) => a - b);
const workoutGaps = chronologicalWorkoutDates.slice(1).map((date, index) =>
  Math.round((date - chronologicalWorkoutDates[index]) / 86400000)
);
const shortestWorkoutGap = workoutGaps.length ? Math.min(...workoutGaps) : null;
const rollingBodyDays = rollingRecords.filter((record) => record.body).length;
const rollingDetailedNutritionDays = rollingMealRecords.filter((record) => record.nutritionEstimate?.nutrients).length;

document.getElementById("weekly-coaching-range").textContent = rollingRangeLabel;
document.getElementById("weekly-coaching-metrics").innerHTML = `
  <div class="metric"><span>운동일</span><strong>${rollingWorkoutRecords.length}일</strong><time class="metric-date">최근 ${rollingWindowDays}일</time></div>
  <div class="metric"><span>총 운동량</span><strong>${rollingTotalSets}세트</strong><time class="metric-date">${rollingWorkoutEntries.length}개 종목 기록</time></div>
  <div class="metric"><span>식사 기록</span><strong>${rollingMealRecords.length}일</strong><time class="metric-date">상세 분석 ${rollingDetailedNutritionDays}일</time></div>
  <div class="metric"><span>체성분 측정</span><strong>${rollingBodyDays}일</strong><time class="metric-date">같은 조건 추세 우선</time></div>
`;
document.getElementById("weekly-training-insight").innerHTML = `
  <div class="insight-item"><strong>빈도와 총량</strong>${rollingWorkoutRecords.length}일에 ${rollingTotalSets}세트가 기록됐다.${shortestWorkoutGap === null ? "" : ` 가장 짧은 운동 간격은 ${shortestWorkoutGap}일이다.`} 이 수치만으로 과훈련을 단정할 수 없어 통증·수면·마지막 세트 여유를 함께 본다.</div>
  <div class="insight-item"><strong>가장 많이 포함된 부위</strong>${topRollingMuscles.length ? topRollingMuscles.map(([muscle, score]) => `${escapeHtml(muscle)} ${formatNutritionNumber(score)}점`).join(" · ") : "운동 기록 없음"} · 주동근 1, 보조근 0.5 가중치의 상대적 집계다.</div>
`;
document.getElementById("weekly-data-quality").innerHTML = `
  <div class="insight-item"><strong>증량 판단 데이터</strong>RIR·난이도가 있는 운동은 ${rollingQualityEntries.length}/${rollingWorkoutEntries.length}개다. 다음 운동에서는 각 종목 마지막 세트의 남은 반복 수를 가장 먼저 기록한다.</div>
  <div class="insight-item"><strong>추세 판단 데이터</strong>체성분 ${rollingBodyDays}일 · 상세 영양 ${rollingDetailedNutritionDays}일이다. 체성분은 최소 ${policy.bodyTrendMinimumMeasurements ?? 5}회가 쌓일 때까지 단일 증감을 결론으로 쓰지 않는다.</div>
`;

const nutritionReferenceWeight = Number(recordsWithBody.find((record) => Number(record.body?.weight))?.body.weight);
const nutritionDefinitions = Number.isFinite(nutritionReferenceWeight) ? buildNutrientDefinitions(nutritionReferenceWeight) : null;
const analyzableNutritionRecords = rollingMealRecords.filter((record) => record.nutritionEstimate?.nutrients);
const countNutrientStatus = (key, statusKeys) => analyzableNutritionRecords.filter((record) => {
  const intake = record.nutritionEstimate.nutrients[key];
  const definition = nutritionDefinitions?.[key];
  return intake && definition && statusKeys.includes(nutrientStatus(intake, definition).key);
}).length;
const proteinCompleteDays = countNutrientStatus("protein", ["ok"]);
const proteinPossibleDays = countNutrientStatus("protein", ["mixed"]);
const sugarHighDays = countNutrientStatus("freeSugar", ["high"]);
const sodiumHighDays = countNutrientStatus("sodium", ["high"]);
const sweetPattern = /사탕|과자|주스|야채농장|더위사냥|로투스|약과|치킨팝|크래커/;
const sweetFoodDays = rollingMealRecords.filter((record) =>
  record.meals.some((meal) => meal.items.some((item) => sweetPattern.test(item)))
).length;

document.getElementById("nutrition-weekly-range").textContent = rollingRangeLabel;
document.getElementById("nutrition-weekly-metrics").innerHTML = `
  <div class="metric"><span>분석 가능한 식사</span><strong>${analyzableNutritionRecords.length}일</strong><time class="metric-date">식사 기록 ${rollingMealRecords.length}일</time></div>
  <div class="metric"><span>단백질 목표 확실 충족</span><strong>${proteinCompleteDays}일</strong><time class="metric-date">충족 가능 ${proteinPossibleDays}일</time></div>
  <div class="metric"><span>유리당 초과 가능</span><strong>${sugarHighDays}일</strong><time class="metric-date">상한 ${freeSugarReferenceMax}g 기준</time></div>
  <div class="metric"><span>단 간식·음료 등장</span><strong>${sweetFoodDays}일</strong><time class="metric-date">제품·주스·과자 포함</time></div>
`;
document.getElementById("nutrition-weekly-feedback").innerHTML = `
  <strong class="feedback-title">이번 기간의 패턴</strong>
  상세 추정이 가능한 ${analyzableNutritionRecords.length}일 중 단백질 목표를 확실히 채운 날은 ${proteinCompleteDays}일이고, 유리당 초과 가능일은 ${sugarHighDays}일, 나트륨 초과 가능일은 ${sodiumHighDays}일이다. 단 음식 자체를 금지하기보다 주스·아이스크림·과자가 겹치는 날을 줄이고, 운동일 저녁에 단백질 30~40g이 분명한 식품을 먼저 배치한다.
  <span class="muted">음식량이 불명확한 날의 범위 추정이므로 일수는 확정 섭취량이 아니라 위험 신호로 본다.</span>
`;

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

const exerciseHistories = new Map();
recordsWithWorkout.forEach((record) => {
  record.workouts.forEach((workout) => {
    const history = exerciseHistories.get(workout.exerciseId) ?? [];
    history.push({ date: record.date, workout });
    exerciseHistories.set(workout.exerciseId, history);
  });
});

const completesTargetReps = (workout) => {
  if (workout.repsBySet?.length) {
    return workout.repsBySet.length === workout.sets
      && workout.repsBySet.every((reps) => Number(reps) >= policy.progression.targetReps);
  }
  return Number(workout.reps) >= policy.progression.targetReps;
};

const hasExecutionIssue = (workout) => /통증|중단|미달|무너/.test(workout.formStatus ?? "");
const workoutRir = (workout) => {
  if (workout.lastSetRir === null || workout.lastSetRir === undefined || workout.lastSetRir === "") return null;
  const value = Number(workout.lastSetRir);
  return Number.isFinite(value) ? value : null;
};

const progressionRows = [...exerciseHistories.values()].map((history) => {
  const latest = history[0];
  const recent = history.slice(0, policy.progression.requiredSessions);
  const latestComplete = completesTargetReps(latest.workout);
  const latestRir = workoutRir(latest.workout);
  const successfulSessions = recent.filter(({ workout }) =>
    completesTargetReps(workout)
      && !hasExecutionIssue(workout)
      && workoutRir(workout) !== null
      && workoutRir(workout) >= policy.progression.minimumRir
  ).length;

  let verdict = { key: "missing", label: "RIR 필요", detail: "모든 세트 완료 여부만으로는 증량하지 않는다." };
  if (hasExecutionIssue(latest.workout) || !latestComplete) {
    verdict = { key: "adjust", label: "수행 조정", detail: "반복 미달·중단 또는 통증 기록을 먼저 정리한다." };
  } else if (successfulSessions >= policy.progression.requiredSessions) {
    verdict = { key: "candidate", label: "증량 후보", detail: "연속 성공 조건을 충족했다. 다음 최소 단위를 검토한다." };
  } else if (latestRir !== null) {
    verdict = { key: "hold", label: "현재 유지", detail: `성공 조건 ${successfulSessions}/${policy.progression.requiredSessions}회. 같은 중량에서 누적한다.` };
  }

  return { history, latest, recent, verdict, latestRir };
}).sort((a, b) => a.latest.workout.name.localeCompare(b.latest.workout.name, "ko"));

document.getElementById("progression-table-body").innerHTML = progressionRows.map(({ latest, recent, verdict, latestRir }) => `
  <tr>
    <td data-label="운동">${escapeHtml(latest.workout.name)}</td>
    <td data-label="최근 수행">${escapeHtml(latest.workout.detail || `${latest.workout.sets}세트 × ${formatWorkoutReps(latest.workout)}회`)}<br><small>${escapeHtml(metricDate(latest))}</small></td>
    <td data-label="최근 2회">${recent.map(({ date, workout }) => `${escapeHtml(new Intl.DateTimeFormat("ko-KR", { month: "numeric", day: "numeric" }).format(dateFromKey(date)))} · ${escapeHtml(formatWorkoutReps(workout))}회`).join("<br>")}</td>
    <td data-label="수행 품질">${escapeHtml(latest.workout.formStatus ?? latest.workout.difficulty ?? (latestRir === null ? "RIR·난이도 미기록" : `마지막 세트 RIR ${latestRir}`))}</td>
    <td data-label="현재 판정"><span class="status-pill ${verdict.key}">${escapeHtml(verdict.label)}</span><br><small>${escapeHtml(verdict.detail)}</small></td>
  </tr>
`).join("");
const progressionCounts = progressionRows.reduce((counts, row) => {
  counts[row.verdict.key] = (counts[row.verdict.key] ?? 0) + 1;
  return counts;
}, {});
document.getElementById("progression-summary").textContent = `증량 후보 ${progressionCounts.candidate ?? 0} · 조정 ${progressionCounts.adjust ?? 0} · RIR 필요 ${progressionCounts.missing ?? 0}`;
document.getElementById("progression-feedback").innerHTML = `
  <strong>현재 가장 중요한 입력</strong><br>
  기록된 종목 중 증량 후보는 ${progressionCounts.candidate ?? 0}개다. 반복 미달이나 중단이 있는 종목은 먼저 수행을 안정시키고, 나머지는 마지막 세트에 몇 회 더 할 수 있었는지를 남겨야 연속 ${policy.progression.requiredSessions}회 규칙을 자동 판정할 수 있다.
`;

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

const bodyTrendDefinitions = [
  { key: "weight", label: "체중", unit: "kg" },
  { key: "skeletalMuscle", label: "골격근량", unit: "kg" },
  { key: "bodyFat", label: "체지방량", unit: "kg" },
  { key: "bodyWater", label: "체수분", unit: "L" }
];
const chronologicalBodyRecords = [...recordsWithBody].reverse();
const renderTrendCard = ({ key, label, unit }) => {
  const points = chronologicalBodyRecords
    .map((record) => ({ date: record.date, value: Number(record.body?.[key]) }))
    .filter((point) => Number.isFinite(point.value));
  if (!points.length) return "";
  const values = points.map((point) => point.value);
  const first = points[0];
  const latest = points.at(-1);
  const delta = latest.value - first.value;
  const rawMin = Math.min(...values);
  const rawMax = Math.max(...values);
  const padding = Math.max((rawMax - rawMin) * 0.25, 0.2);
  const scaleMin = rawMin - padding;
  const scaleMax = rawMax + padding;
  const x = (index) => points.length === 1 ? 50 : 8 + index / (points.length - 1) * 84;
  const y = (value) => 94 - (value - scaleMin) / (scaleMax - scaleMin) * 76;
  const linePoints = points.map((point, index) => `${x(index).toFixed(1)},${y(point.value).toFixed(1)}`).join(" ");
  const deltaClass = delta < 0 ? " down" : "";
  const deltaText = `${delta > 0 ? "+" : ""}${delta.toFixed(1)}${unit}`;

  return `
    <article class="trend-card">
      <div class="trend-card-head">
        <div><h3>${escapeHtml(label)}</h3><p class="muted">현재 ${latest.value.toFixed(1)}${escapeHtml(unit)}</p></div>
        <span class="trend-change${deltaClass}">${escapeHtml(deltaText)}</span>
      </div>
      <svg class="trend-chart" viewBox="0 0 100 110" role="img" aria-label="${escapeHtml(label)} ${points.length}회 변화">
        <line class="grid-line" x1="8" y1="18" x2="92" y2="18"></line>
        <line class="grid-line" x1="8" y1="56" x2="92" y2="56"></line>
        <line class="grid-line" x1="8" y1="94" x2="92" y2="94"></line>
        ${points.length > 1 ? `<polyline class="data-line" points="${linePoints}"></polyline>` : ""}
        ${points.map((point, index) => `<circle class="data-point" cx="${x(index).toFixed(1)}" cy="${y(point.value).toFixed(1)}" r="3"><title>${escapeHtml(formatDate(point.date))} ${point.value.toFixed(1)}${escapeHtml(unit)}</title></circle>`).join("")}
      </svg>
      <p class="trend-meta">${escapeHtml(formatDate(first.date))} → ${escapeHtml(formatDate(latest.date))} · ${points.length}회 측정</p>
    </article>
  `;
};

if (recordsWithBody.length) {
  const minimumMeasurements = policy.bodyTrendMinimumMeasurements ?? 5;
  document.getElementById("body-trend-status").textContent = recordsWithBody.length >= minimumMeasurements
    ? `${recordsWithBody.length}회 · 추세 관찰 가능`
    : `${recordsWithBody.length}/${minimumMeasurements}회 · 판단 보류`;
  document.getElementById("body-trend-grid").innerHTML = bodyTrendDefinitions.map(renderTrendCard).join("");
  document.getElementById("body-trend-note").innerHTML = `<strong>해석</strong> 현재 ${recordsWithBody.length}회 측정이라 선은 변화 사실만 보여준다. 같은 기기·비슷한 시간·비슷한 수분과 식사 조건의 측정이 ${minimumMeasurements}회 이상 쌓인 뒤 여러 주 방향을 판단한다.`;
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
      <div class="record-meta"><time datetime="${escapeHtml(record.date)}">${escapeHtml(formatDate(record.date))}</time>${renderQualityBadges(record)}</div>
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
      <div class="record-meta"><time datetime="${escapeHtml(record.date)}">${escapeHtml(formatDate(record.date))}</time>${renderQualityBadges(record)}</div>
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
      <div class="record-meta"><time datetime="${escapeHtml(record.date)}">${escapeHtml(formatDate(record.date))}</time>${renderQualityBadges(record)}</div>
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
