window.coachingPolicy = Object.freeze({
  goal: {
    statement: "옷을 입었을 때 어깨가 넓고 상체가 좋아 보이는 균형 잡힌 체형을 만든다.",
    focusAreas: ["측면·후면 어깨", "상부 가슴", "광배근", "팔", "자세"],
    preferExistingExercises: true
  },
  recentWorkoutCount: 3,
  stimulus: {
    primaryWeight: 1,
    secondaryWeight: 0.5,
    mediumRatio: 0.4,
    highRatio: 0.8,
    labels: { 1: "낮음", 2: "중간", 3: "높음" }
  },
  progression: {
    targetReps: window.fitnessProfile.defaultReps,
    minimumRir: 2,
    requiredSessions: 2,
    sources: [
      { label: "ACSM 2026 근력운동 권고", href: "https://www.acsm.org/wp-content/uploads/2026/03/Resistance-Training-Position-Stand-infographic.pdf" },
      { label: "RIR와 근성장 메타분석", href: "https://pubmed.ncbi.nlm.nih.gov/38970765/" }
    ]
  },
  nutrition: {
    proteinTargetPerKg: 1.6,
    adultReference: {
      label: "2025 한국인 영양소 섭취기준 · 남성 30~49세",
      energyKcal: 2500,
      carbohydrateEnergyRatio: { min: 0.5, max: 0.65 },
      totalFatEnergyRatio: { min: 0.15, max: 0.3 },
      saturatedFatEnergyRatioMax: 0.1,
      fiberMinGrams: 30,
      sodiumMaxMg: 2000,
      sources: [
        { label: "2025 한국인 영양소 섭취기준", href: "https://www.kns.or.kr/fileroom/FileRoom_view.asp?BoardID=Kdr&idx=167" },
        { label: "WHO 건강한 식사 기준", href: "https://www.who.int/news-room/fact-sheets/detail/healthy-diet" },
        { label: "WHO 지방·탄수화물 지침", href: "https://www.who.int/news/item/17-07-2023-who-updates-guidelines-on-fats-and-carbohydrates" }
      ]
    },
    freeSugar: {
      maximumEnergyRatio: 0.1,
      idealEnergyRatio: 0.05,
      caloriesPerGram: 4,
      sources: [
        { label: "WHO 성인·어린이 유리당 섭취 지침", href: "https://www.who.int/publications/i/item/WHO-NMH-NHD-15.3" }
      ]
    }
  }
});
