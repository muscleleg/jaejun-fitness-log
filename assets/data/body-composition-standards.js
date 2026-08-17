window.bodyCompositionStandards = Object.freeze({
  bmi: {
    chart: { min: 15, max: 35 },
    normal: { min: 18.5, max: 22.9 },
    categories: [
      { maxExclusive: 18.5, label: "한국비만학회 기준 저체중" },
      { maxExclusive: 23, label: "한국비만학회 기준 정상" },
      { maxExclusive: 25, label: "한국비만학회 기준 비만 전단계" },
      { maxExclusive: 30, label: "한국비만학회 기준 1단계 비만" },
      { maxExclusive: 35, label: "한국비만학회 기준 2단계 비만" },
      { maxExclusive: null, label: "한국비만학회 기준 3단계 비만" }
    ]
  },
  bodyFatPercent: {
    chart: { min: 5, max: 35 },
    upperBandMargin: 2,
    maleAgeRanges: [
      { ageMin: 20, ageMax: 39, min: 8, max: 20, label: "20–39세 남성 연구 참고" },
      { ageMin: 40, ageMax: 59, min: 11, max: 22, label: "40–59세 남성 연구 참고" },
      { ageMin: 60, ageMax: 79, min: 13, max: 25, label: "60–79세 남성 연구 참고" }
    ]
  },
  fatMassIndex: {
    chart: { min: 0, max: 12 },
    normal: { min: 3, max: 6 },
    categories: [
      { maxExclusive: 2, label: "NHANES 기반 심한 지방 부족 구간" },
      { maxExclusive: 2.3, label: "NHANES 기반 중간 지방 부족 구간" },
      { maxExclusive: 3, label: "NHANES 기반 가벼운 지방 부족 구간" },
      { maxInclusive: 6, label: "NHANES 기반 남성 정상 구간" },
      { maxInclusive: 9, label: "NHANES 기반 지방 과다 구간" },
      { maxInclusive: null, label: "NHANES 기반 비만 구간" }
    ]
  },
  fatFreeMassIndex: {
    youngMaleMedian: 18.9
  },
  bodyWaterPercent: {
    chart: { min: 40, max: 75 },
    adultReference: { min: 50, max: 65 }
  },
  interpretationNote: "체지방률·FMI·FFMI 참고값은 서로 다른 모집단과 측정법에서 나온 선별 지표이며 진단 기준이 아니다. 생체전기저항 측정값은 수분 섭취·식사·운동·측정 시각에 따라 달라질 수 있으므로 같은 조건의 여러 주 추세를 우선한다.",
  sources: [
    { label: "한국비만학회 2022 임상지침", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10088549/" },
    { label: "Gallagher 연령별 체지방 연구", href: "https://pubmed.ncbi.nlm.nih.gov/10966886/" },
    { label: "NHANES FMI 분류 연구", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2737140/" },
    { label: "FFMI 연령별 참고 연구", href: "https://pubmed.ncbi.nlm.nih.gov/12080449/" },
    { label: "성인 체수분 참고 문헌", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10710856/" }
  ]
});
