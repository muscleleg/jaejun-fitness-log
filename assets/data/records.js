// 새 기록은 날짜별 객체로 이 배열에 추가한다. 같은 날짜의 후속 정보는 기존 객체에 병합한다.
window.healthRecordData = [
  {
    date: "2026-08-21",
    workouts: [
      {
        exerciseId: "cable-one-arm-lateral-raise",
        sets: 5,
        reps: 10,
        detail: "한 팔당 5kg · 양쪽 각 5세트 × 10회"
      },
      {
        exerciseId: "seated-row",
        sets: 5,
        reps: 10,
        detail: "30kg · 5세트 × 10회"
      },
      {
        exerciseId: "cable-overhead-triceps-extension",
        sets: 5,
        reps: 10,
        detail: "25kg 4세트 × 10회 + 30kg 1세트 × 10회",
        formStatus: "30kg 1세트 시험 수행"
      },
      {
        exerciseId: "assisted-pull-up-machine",
        sets: 4,
        repsBySet: [10, 10, 10, 5],
        detail: "표시 중량 35kg · 세트별 10·10·10·5회 후 중단 · 보조 중량 여부 미확인",
        formStatus: "4세트째 5회 후 중단"
      },
      {
        exerciseId: "reverse-pec-deck-fly",
        sets: 5,
        repsBySet: [10, 10, 5, 5, 5],
        detail: "20kg · 2세트 × 10회 + 3세트 × 5회",
        formStatus: "3세트째부터 목표 반복 수 미달"
      },
      {
        exerciseId: "machine-shoulder-press",
        sets: 5,
        reps: 10,
        detail: "15kg · 5세트 × 10회"
      },
      {
        exerciseId: "machine-chest-press",
        sets: 5,
        reps: 10,
        detail: "30kg · 5세트 × 10회"
      }
    ],
    meals: [
      {
        label: "점심 · 급식",
        items: ["돈사태모듬장조림", "부산식 비빔당면", "흑미밥 또는 쌀밥 (종류·양 미확인)", "짜글이", "꽃맛살야채볶음", "고구마순나물", "씨리얼샐러드", "콩나물무침", "포기김치", "갈아만든 배주스"]
      },
      {
        label: "저녁",
        items: ["오리온 치킨팝 (양 미확인)", "미역국 (양·건더기 미확인)"]
      },
      {
        label: "음료·간식",
        items: ["아메리카노 2잔 (사이즈·첨가물 미확인)", "파스퇴르 100% 유기농 야채농장 과일&야채 190ml 1팩 (당류 12g)", "빙그레 더위사냥 1개"]
      }
    ],
    nutritionEstimate: {
      calories: "약 1,600~2,350 kcal",
      protein: "약 44~72g",
      freeSugar: "약 65~115g",
      nutrients: {
        energy: { min: 1600, max: 2350, unit: "kcal" },
        protein: { min: 44, max: 72, unit: "g" },
        carbohydrate: { min: 220, max: 340, unit: "g" },
        totalFat: { min: 42, max: 82, unit: "g" },
        saturatedFat: { min: 9, max: 22, unit: "g" },
        freeSugar: { min: 65, max: 115, unit: "g" },
        fiber: { min: 10, max: 21, unit: "g" },
        sodium: { min: 3000, max: 6100, unit: "mg" }
      },
      assumptions: "급식은 밥 한 공기, 장조림·비빔당면·짜글이는 각각 소~보통 1인분, 나머지는 소량 반찬으로 가정했다. 갈아만든 배주스는 1팩, 치킨팝은 과거 기록과 같은 65g 한 봉지, 미역국은 보통 한 그릇으로 추정했다. 야채농장은 사용자 확인값인 당류 12g을 반영했다. 더위사냥은 140ml 1개 기준 열량 약 125~130kcal·당류 16~17g을 반영했고, 아메리카노는 무가당으로 계산했다. 밥·장조림·짜글이의 실제 양, 치킨팝의 실제 섭취량, 배주스 용량이 전체 범위를 가장 크게 만든다.",
      target: "최근 측정 체중 65.8kg 기준 단백질 우선 목표는 약 105g/일이다. 에너지·탄수화물·지방·식이섬유는 2025 한국인 영양소 섭취기준의 남성 30~49세 참고치와, 포화지방·유리당·나트륨은 WHO 상한과 비교한다. 2,500kcal는 집단 참고치라 개인 필요량과 다를 수 있다.",
      sources: [
        { label: "식약처 K-FIND 식품영양성분 DB", href: "https://various.foodsafetykorea.go.kr/nutrient/" },
        { label: "오리온 치킨팝 공식 제품정보", href: "https://www.orionworld.com/goods/view/25?badge=&category=&goodsno=18&keyname=&keyword=&page=1" },
        { label: "사용자가 확인한 야채농장 상품", href: "https://www.coupang.com/vp/products/67924173?itemId=226881573&vendorItemId=91639101275" },
        { label: "빙그레 더위사냥 공식 제품정보", href: "https://www.bing.co.kr/product/detail?PDT=20" },
        { label: "운동 성인 단백질 근거", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5477153/" }
      ]
    },
    condition: "상체 운동 실시 · 총 34세트 · 음식 중량 미기록 · 체성분 미측정",
    advice: {
      title: "운동은 유지했고, 오늘은 단백질보다 당·나트륨이 더 앞섰다",
      points: [
        {
          label: "운동량",
          text: "기존에 쓰던 7종목으로 상체 34세트를 수행했다. 어깨·등·가슴·삼두를 고르게 다뤘고, 새 종목을 추가할 필요는 없다."
        },
        {
          label: "어시스트 풀업",
          text: "19일과 같은 10·10·10·5회다. 앞 3세트는 안정적이지만 마지막 세트가 5회에서 멈췄으므로 표시 중량 35kg을 유지한다. 보조 중량 기구라면 도움을 조금 늘리고, 실제 저항 표시면 중량을 낮춰 4세트의 반복 급락을 줄인다."
        },
        {
          label: "삼두",
          text: "25kg 4세트 뒤 30kg 1세트 10회 성공은 좋은 시험 기록이다. 다만 한 세트만으로 전체 증량 조건은 충족하지 않았다. 다음에는 25kg 5세트를 안정적으로 끝내거나, 자세와 여유 반복 수를 기록하며 30kg 시험 세트만 유지한다."
        },
        {
          label: "후면 어깨",
          text: "리버스 펙덱 20kg은 2세트만 10회를 채우고 이후 5회로 떨어졌다. 다음에는 20kg 2세트 × 10회 후 15kg으로 3세트 × 10회를 채우거나, 15kg에서 5세트 × 10회로 회복한다. 20kg 전체 5세트 증량은 아직 이르다."
        },
        {
          label: "프레스",
          text: "머신 숄더프레스 15kg과 체스트프레스 30kg은 각각 5세트 × 10회를 완료했다. 마지막 세트에도 2회 이상 더 할 여유가 있었는지와 자세를 다음 운동에 남겨야 두 운동일 연속 기준으로 증량을 판단할 수 있다."
        },
        {
          label: "단백질",
          text: "식사는 약 1,600~2,350kcal, 단백질 44~72g으로 추정한다. 운동한 날의 우선 목표 105g에 약 33~61g 모자랄 가능성이 크다. 급식 장조림만으로는 부족할 수 있어 저녁에 치킨팝 대신 또는 추가로 살코기·달걀·두부·프로틴 음료처럼 단백질이 분명한 식품이 필요했다."
        },
        {
          label: "당·나트륨",
          text: "유리당은 약 65~115g으로 WHO 참고 상한 약 63g을 넘었을 가능성이 높다. 배주스, 야채농장 12g, 더위사냥 16~17g과 양념 메뉴가 겹쳤다. 나트륨도 장조림·짜글이·김치·치킨팝 영향으로 약 3,000~6,100mg으로 높을 수 있다."
        },
        {
          label: "회복",
          text: "운동량이 34세트였던 날이라 단 간식만 늘리기보다 수분을 충분히 마시고, 다음 끼니에서 담백한 단백질과 채소·통곡물을 보완하는 편이 회복과 체성분 목표에 유리하다."
        }
      ]
    },
    actions: [
      "다음 풀업은 같은 설정에서 4세트 모두 10회를 우선 목표로 한다.",
      "리버스 펙덱은 실패 반복을 누적하지 말고 15kg 백오프 세트로 10회를 확보한다.",
      "다음 끼니에 단백질 30~40g을 추가하고, 주스·아이스크림·과자는 하루 한 가지로 줄인다.",
      "프레스와 삼두의 마지막 세트 여유 반복 수(RIR)와 어깨 통증 유무를 기록한다."
    ]
  },
  {
    date: "2026-08-20",
    workouts: [],
    meals: [
      { label: "점심", items: ["로스카츠 (세트 구성·양 미확인)"] },
      { label: "저녁", items: ["스팸 김치볶음밥 (양 미확인)", "두부전 (양·소스 미확인)", "파스퇴르 100% 유기농 야채농장 과일&야채 190ml 1팩 (당류 12g)"] },
      { label: "음료", items: ["아메리카노 2잔 (사이즈·첨가물 미확인)"] }
    ],
    nutritionEstimate: {
      calories: "약 1,550~2,450 kcal",
      protein: "약 60~98g",
      freeSugar: "약 26~55g",
      nutrients: {
        energy: { min: 1550, max: 2450, unit: "kcal" },
        protein: { min: 60, max: 98, unit: "g" },
        carbohydrate: { min: 170, max: 275, unit: "g" },
        totalFat: { min: 63, max: 118, unit: "g" },
        saturatedFat: { min: 12, max: 30, unit: "g" },
        freeSugar: { min: 26, max: 55, unit: "g" },
        fiber: { min: 5, max: 13, unit: "g" },
        sodium: { min: 3000, max: 6200, unit: "mg" }
      },
      assumptions: "로스카츠는 밥·양배추·소스가 함께 나오는 보통 1인 세트일 수 있어 이를 포함한 범위로, 스팸 김치볶음밥은 밥 한 공기와 스팸 약 60~120g, 두부전은 두부 약 100~200g과 부침기름·간장 소스를 가정했다. 야채농장은 사용자 확인값인 당류 12g을 반영했고, 아메리카노는 무가당으로 계산했다. 로스카츠 세트의 밥·소스 양, 스팸 사용량, 두부전의 기름과 간장 소스가 범위를 가장 크게 만든다.",
      target: "최근 측정 체중 65.8kg 기준 단백질 우선 목표는 약 105g/일이다. 에너지·탄수화물·지방·식이섬유는 2025 한국인 영양소 섭취기준의 남성 30~49세 참고치와, 포화지방·유리당·나트륨은 WHO 상한과 비교한다. 2,500kcal는 집단 참고치라 개인 필요량과 다를 수 있다.",
      sources: [
        { label: "식약처 K-FIND 식품영양성분 DB", href: "https://various.foodsafetykorea.go.kr/nutrient/" },
        { label: "식약처 두부 영양정보", href: "https://various.foodsafetykorea.go.kr/nutrient/general/food/detail.do?searchFoodCd=P106-000000100-0001&searchMonthCd=AVG&searchRegionCd=ZZ" },
        { label: "사용자가 확인한 야채농장 상품", href: "https://www.coupang.com/vp/products/67924173?itemId=226881573&vendorItemId=91639101275" },
        { label: "운동 성인 단백질 근거", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5477153/" }
      ]
    },
    condition: "운동하지 않음 · 체성분 미측정 · 음식 중량 미기록",
    advice: {
      title: "현재 판정: 휴식은 적절하고, 오늘은 단백질 보완과 나트륨 관리가 우선이다",
      points: [
        { label: "휴식", text: "전날 39세트 상체 운동 뒤 오늘은 운동하지 않았다. 어깨 프레스 볼륨이 컸던 만큼 휴식일은 회복에 적절하다." },
        { label: "영양", text: "약 1,550~2,450kcal와 단백질 60~98g으로 추정한다. 단백질은 목표 105g의 57~93%라 오늘 기록만 보면 부족 가능성이 높다. 추가 식사를 한다면 스팸이나 튀김보다 두부·달걀·생선·살코기처럼 비교적 담백한 단백질을 우선한다." },
        { label: "영양 균형", text: "지방은 권고 상한 83g의 76~142%로 높을 수 있고, 나트륨은 약 3,000~6,200mg으로 상한 2,000mg의 150~310%다. 로스카츠·스팸·김치와 간장 소스가 겹친 영향이다." },
        { label: "유리당", text: "유리당은 약 26~55g으로 참고 상한 약 63g 안일 가능성이 있다. 야채농장 12g과 돈가스·볶음밥 소스가 주된 원인이라 오늘은 단 음료를 추가하지 않으면 관리 가능한 범위다." },
        { label: "식이섬유", text: "식이섬유는 5~13g으로 30g 목표보다 부족하다. 다음 끼니에 통과일 1개와 채소 또는 콩류를 더하면 가장 간단하게 보완된다." },
        { label: "추정 오차", text: "로스카츠 세트의 밥·소스 양과 스팸 김치볶음밥의 스팸 사용량이 열량·나트륨 범위를 크게 만든다." }
      ]
    },
    actions: [
      "오늘 남은 식사에는 국물·가공육·짠 반찬을 더하지 않는다.",
      "배가 고프면 과자보다 무가당 그릭요거트, 두부, 달걀, 우유 중 하나를 선택해 단백질을 보완한다.",
      "다음 끼니에 채소 반찬과 통과일을 함께 먹어 식이섬유를 보완한다.",
      "다음 상체 운동 전에는 어깨 통증과 전면 어깨 피로가 남아 있는지 확인하고, 남아 있으면 프레스 중량을 올리지 않는다."
    ]
  },
  {
    date: "2026-08-19",
    workouts: [
      { exerciseId: "cable-one-arm-lateral-raise", sets: 5, reps: 10, detail: "한 팔당 5kg · 양쪽 각 5세트 × 10회" },
      { exerciseId: "seated-row", sets: 5, reps: 10, detail: "30kg · 5세트 × 10회" },
      { exerciseId: "cable-overhead-triceps-extension", sets: 5, reps: 10, detail: "25kg · 5세트 × 10회" },
      { exerciseId: "assisted-pull-up-machine", sets: 4, repsBySet: [10, 10, 10, 5], detail: "표시 중량 35kg · 세트별 10·10·10·5회 후 중단 · 보조 중량 여부 미확인", formStatus: "4세트째 5회 후 중단" },
      { exerciseId: "reverse-pec-deck-fly", sets: 5, reps: 10, detail: "15kg · 5세트 × 10회" },
      { exerciseId: "machine-shoulder-press", sets: 10, reps: 10, detail: "15kg · 5세트 × 10회 2회 수행 · 총 10세트 × 10회", formStatus: "동일 종목이 두 번 기재되어 총 10세트로 기록" },
      { exerciseId: "machine-chest-press", sets: 5, reps: 10, detail: "30kg · 5세트 × 10회" }
    ],
    meals: [
      { label: "점심 · 급식", items: ["닭고기 데리야끼구이", "칠리탕수강정", "보리밥 또는 쌀밥 (종류·양 미확인)", "오이냉국", "아기볼어묵조림", "와사비쌈무", "레몬샐러드", "부추적양파무침", "포기김치", "샤인머스캣주스"] },
      { label: "저녁", items: ["명란젓 (양 미확인)", "닭갈비 (양 미확인)", "프로틴 음료 1개 (제품·영양성분 미확인)"] },
      { label: "음료·간식", items: ["아메리카노 2잔 (사이즈·첨가물 미확인)", "레몬 사탕 1개 (개수 미확인으로 1개 가정)", "파스퇴르 100% 유기농 야채농장 과일&야채 190ml 1팩 (당류 12g)"] }
    ],
    nutritionEstimate: {
      calories: "약 1,610~2,830 kcal",
      protein: "약 68~125g",
      freeSugar: "약 70~155g",
      nutrients: {
        energy: { min: 1610, max: 2830, unit: "kcal" },
        protein: { min: 68, max: 125, unit: "g" },
        carbohydrate: { min: 220, max: 358, unit: "g" },
        totalFat: { min: 42, max: 107, unit: "g" },
        saturatedFat: { min: 9, max: 30, unit: "g" },
        freeSugar: { min: 70, max: 155, unit: "g" },
        fiber: { min: 10, max: 24, unit: "g" },
        sodium: { min: 3000, max: 6500, unit: "mg" }
      },
      assumptions: "점심 급식은 각 단백질 메뉴를 소~보통 1인분, 밥은 한 공기, 나머지는 소량 반찬으로 가정했다. 데리야끼·칠리탕수 소스와 샤인머스캣주스의 당류, 냉국·어묵조림·절임·김치의 나트륨을 범위로 반영했다. 저녁 닭갈비는 보통 1인분, 명란젓은 약 20~50g, 프로틴 음료는 일반적인 15~24g 단백질 제품 1개로 추정했다. 야채농장은 사용자 확인값인 당류 12g을 반영했다. 아메리카노는 무가당으로, 레몬 사탕은 1개로 가정했다. 프로틴 음료의 제품명, 밥 종류·양, 닭갈비와 급식 두 단백질 메뉴의 실제 양이 전체 범위를 가장 크게 만든다.",
      target: "최근 측정 체중 65.8kg 기준 단백질 우선 목표는 약 105g/일이다. 에너지·탄수화물·지방·식이섬유는 2025 한국인 영양소 섭취기준의 남성 30~49세 참고치와, 포화지방·유리당·나트륨은 WHO 상한과 비교한다. 2,500kcal는 집단 참고치라 개인 필요량과 다를 수 있다.",
      sources: [
        { label: "식약처 K-FIND 식품영양성분 DB", href: "https://various.foodsafetykorea.go.kr/nutrient/" },
        { label: "식약처 명란 영양정보 예시", href: "https://various.foodsafetykorea.go.kr/nutrient/general/food/detail.do?dbGrpCm=A&searchFoodCd=P120-600060000-1992" },
        { label: "사용자가 확인한 야채농장 상품", href: "https://www.coupang.com/vp/products/67924173?itemId=226881573&vendorItemId=91639101275" },
        { label: "운동 성인 단백질 근거", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5477153/" }
      ]
    },
    condition: "상체 운동 실시 · 총 39세트 · 머신 숄더프레스 동일 기록 2회를 총 10세트로 합산 · 음식 중량과 프로틴 음료 제품 미기록",
    advice: {
      title: "현재 판정: 풀업은 전진했지만, 어깨 프레스 10세트는 다음 증량보다 회복 확인이 먼저다",
      points: [
        { label: "풀업", text: "어시스트 풀업은 17일 10·7·6·4회에서 10·10·10·5회로 앞의 세 세트를 채웠다. 분명한 수행 향상이지만 마지막 세트가 5회라 보조를 줄이거나 난도를 올리지는 않는다. 같은 표시 중량에서 4세트 모두 10회를 안정적으로 채운 뒤 여유 반복 수를 기록한다." },
        { label: "훈련량", text: "총 39세트다. 머신 숄더프레스를 두 번 수행한 것이 맞다면 전면 어깨 직접 세트만 10세트이고 체스트프레스의 보조 자극까지 겹친다. 다음 상체 운동에서는 머신 숄더프레스를 5세트로 두고, 어깨 통증이나 피로가 있으면 중량을 올리지 않는다." },
        { label: "등·후면 어깨", text: "시티드 로우 5세트, 풀업 4세트, 리버스 펙덱 15kg 5세트로 등과 후면 어깨 자극은 충분하다. 리버스 펙덱은 16일의 15kg 2세트에서 이번에는 5세트 모두 10회라 같은 자세가 유지됐다면 좋은 진전이다." },
        { label: "영양", text: "약 1,610~2,830kcal와 단백질 68~125g으로 추정한다. 단백질은 목표 105g의 65~119%로 프로틴 음료의 실제 단백질과 닭갈비·급식 양에 따라 부족하거나 충족할 수 있다." },
        { label: "유리당", text: "약 70~155g으로 참고 상한 약 63g의 111~246%다. 샤인머스캣주스와 야채농장, 데리야끼·칠리 소스, 사탕이 함께 들어가 상한 초과로 추정한다. 오늘은 추가 단 음료·간식보다 물이나 무가당 음료를 선택한다." },
        { label: "나트륨·식이섬유", text: "나트륨은 약 3,000~6,500mg으로 상한 2,000mg의 150~325%이고, 식이섬유는 10~24g으로 30g 목표에 못 미친다. 절임·김치·어묵조림·명란젓은 적당히 두고, 다음 끼니는 통과일이나 채소를 더하는 쪽이 좋다." },
        { label: "추정 오차", text: "프로틴 음료의 제품과 단백질 함량, 샤인머스캣주스의 용량, 밥과 닭갈비의 실제 양이 추정 범위를 크게 만든다." }
      ]
    },
    actions: [
      "다음 상체 운동에서는 머신 숄더프레스를 5세트만 하고, 15kg에서 마지막 세트의 여유 반복 수와 어깨 통증 여부를 남긴다.",
      "어시스트 풀업은 같은 표시 중량으로 4세트 모두 10회를 채우는 것을 다음 목표로 둔다.",
      "오늘 남은 식사에는 단 음료·사탕·가공 간식을 더하지 않고, 물 또는 무가당 음료를 선택한다.",
      "다음 끼니에 통과일 1개와 채소 또는 콩류를 더해 식이섬유를 보완한다.",
      "프로틴 음료의 제품명이나 단백질 g을 알면 오늘 단백질 추정을 바로 좁힐 수 있다."
    ]
  },
  {
    date: "2026-08-18",
    workouts: [],
    meals: [
      { label: "점심", items: ["김치두루치기 (양 미확인)", "현미밥 또는 쌀밥 (종류·양 미확인)", "멸치땅콩조림", "오뚜부추된장 (사용자 표현·정확한 음식명 미확인)", "건포도샐러드", "쑥갓당근절임", "깍두기"] },
      { label: "저녁", items: ["장어구이 (양·양념 종류 미확인)", "밥 (양 미확인)", "파스퇴르 100% 유기농 야채농장 과일&야채 190ml 1팩 (당류 12g)", "레몬 사탕 2개"] },
      { label: "간식", items: ["오리온 치킨팝 65g 1봉지 (맛 미확인)"] }
    ],
    nutritionEstimate: {
      calories: "약 2,040~2,790 kcal",
      protein: "약 78~109g",
      freeSugar: "약 60~97g",
      nutrients: {
        energy: { min: 2040, max: 2790, unit: "kcal" },
        protein: { min: 78, max: 109, unit: "g" },
        carbohydrate: { min: 253, max: 336, unit: "g" },
        totalFat: { min: 76, max: 119, unit: "g" },
        saturatedFat: { min: 21, max: 36, unit: "g" },
        freeSugar: { min: 60, max: 97, unit: "g" },
        fiber: { min: 12, max: 26, unit: "g" },
        sodium: { min: 3000, max: 5600, unit: "mg" }
      },
      assumptions: "점심은 구내식당 또는 일반 식사의 각 메뉴를 보통 1인분·소량 반찬으로, 저녁 밥은 한 공기, 장어구이는 약 150~200g으로 가정했다. 식품의약품안전처 고추장 장어구이 100g 자료(259kcal·단백질 19.82g·지방 17.21g·나트륨 322mg)를 장어 참고값으로 썼다. 야채농장은 사용자 확인값인 팩당 당류 12g, 치킨팝은 65g 한 봉지와 공식 열량 333~338kcal를 반영했다. 치킨팝의 맛과 상세 영양표가 확인되지 않아 탄수화물·지방·당류·나트륨은 유사 제품 범위로 추정했다. `오뚜부추된장`은 정확한 음식명을 확인할 수 없어 소량의 채소·된장 반찬으로 계산했다. 김치두루치기 양, 장어 중량, 샐러드 드레싱이 전체 범위를 가장 크게 만든다.",
      target: "최근 측정 체중 65.8kg 기준 단백질 우선 목표는 약 105g/일이다. 에너지·탄수화물·지방·식이섬유는 2025 한국인 영양소 섭취기준의 남성 30~49세 참고치와, 포화지방·유리당·나트륨은 WHO 상한과 비교한다. 2,500kcal는 집단 참고치라 개인 필요량과 다를 수 있다.",
      sources: [
        { label: "식약처 고추장 장어구이 영양정보", href: "https://various.foodsafetykorea.go.kr/nutrient/general/food/detail.do?searchFoodCd=D108-396020000-0001&searchMonthCd=AVG&searchRegionCd=ZZ" },
        { label: "오리온 치킨팝 공식 제품정보", href: "https://www.orionworld.com/goods/view/27?badge=&category=0102&goodsno=18&keyname=&keyword=&page=1" },
        { label: "사용자가 확인한 야채농장 상품", href: "https://www.coupang.com/vp/products/67924173?itemId=226881573&vendorItemId=91639101275" },
        { label: "식약처 K-FIND 식품영양성분 DB", href: "https://various.foodsafetykorea.go.kr/nutrient/" },
        { label: "운동 성인 단백질 근거", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5477153/" }
      ]
    },
    condition: "운동하지 않음 · 체성분 미측정 · 음식 중량 미기록",
    advice: {
      title: "현재 판정: 휴식은 적절하고, 오늘은 단백질보다 나트륨·지방 조절이 우선이다",
      points: [
        { label: "운동", text: "16일과 17일에 연속으로 상체 운동을 했고 오늘은 운동하지 않았다. 특히 17일 어깨 통증 기록이 있으므로 휴식일 자체는 회복에 적절하다." },
        { label: "영양", text: "약 2,040~2,790kcal와 단백질 78~109g으로 추정한다. 단백질은 목표 105g의 74~104%라 장어와 돼지고기 양이 충분했다면 거의 충족하지만, 양이 적었다면 최대 약 27g 부족할 수 있다." },
        { label: "영양 균형", text: "식이섬유는 30g 목표의 40~87%로 부족 추정이고, 나트륨은 WHO 상한 2,000mg의 150~280%로 초과 추정이다. 지방도 권고 상한 83g의 92~143%라 장어·두루치기·땅콩·치킨팝 양에 따라 높을 가능성이 있다." },
        { label: "유리당", text: "약 60~97g으로 추정돼 참고 상한 약 63g의 95~154%다. 야채농장 12g, 치킨팝 닭강정맛 가정 약 18g, 레몬 사탕과 건포도샐러드·양념의 당이 겹쳤다. 정확한 치킨팝 맛에 따라 달라지지만 추가 단 간식은 피하는 편이 좋다." },
        { label: "추정 오차", text: "김치두루치기와 장어구이의 실제 중량, 건포도샐러드의 드레싱, `오뚜부추된장`의 정확한 음식명이 가장 큰 불확실성이다." }
      ]
    },
    actions: [
      "오늘 남은 시간에는 과자·사탕·국물·짠 야식을 더하지 않는다.",
      "내일 첫 두 끼 중 한 끼는 닭가슴살·두부·달걀 같은 비교적 담백한 단백질과 채소·통과일을 함께 먹는다.",
      "수분은 갈증과 소변 색을 보며 평소대로 충분히 마시고, 오늘 나트륨 섭취를 이유로 과도하게 물을 억지로 마시지는 않는다.",
      "다음 운동 전에 중간 높이 레터럴 레이즈에서 생겼던 어깨 통증이 남아 있는지 확인하고, 남아 있으면 해당 동작은 계속 제외한다."
    ]
  },
  {
    date: "2026-08-17",
    body: {
      weight: 65.8,
      skeletalMuscle: 28.5,
      bodyFat: 12.8,
      bodyWater: 38.3
    },
    workouts: [
      { exerciseId: "cable-one-arm-lateral-raise", sets: 5, reps: 10, detail: "한 팔당 5kg · 양쪽 각 5세트 × 10회" },
      { exerciseId: "seated-row", sets: 5, reps: 10, detail: "30kg · 5세트 × 10회" },
      { exerciseId: "cable-overhead-triceps-extension", sets: 5, reps: 10, detail: "25kg · 5세트 × 10회" },
      { exerciseId: "assisted-pull-up-machine", sets: 4, repsBySet: [10, 7, 6, 4], detail: "표시 중량 35kg · 세트별 10·7·6·4회 후 중단 · 보조 중량 여부 미확인", formStatus: "반복 수가 감소해 4세트 후 중단" },
      { exerciseId: "mid-cable-one-arm-lateral-raise", sets: 1, reps: 10, detail: "중간 높이 · 5kg · 1세트 × 10회 후 중단", formStatus: "어깨 통증으로 1세트 후 중단" },
      { exerciseId: "machine-shoulder-press", sets: 5, reps: 10, detail: "15kg · 5세트 × 10회" },
      { exerciseId: "machine-chest-press", sets: 5, reps: 10, detail: "20kg · 5세트 × 10회" }
    ],
    meals: [
      { label: "식사", items: ["김치볶음밥 (양 미확인)", "계란 프라이 1개를 올려 먹음"] },
      { label: "저녁", items: ["흰밥 (양 미확인)", "소고기 볶음 (부위·양 미확인)", "연두부와 간장 소스 (양 미확인)"] },
      { label: "음료", items: ["아이스 아메리카노 (사이즈·첨가물 미확인)", "파스퇴르 100% 유기농 야채농장 과일&야채 190ml 2팩 (팩당 당류 12g)", "빙그레 더단백 드링크 초코 250ml 1팩 (단백질 20g)"] },
      { label: "간식·보충제", items: ["로투스 비스코프 2조각", "미니 꿀꽈배기 과자 1조각", "미니 약과 1조각", "레몬 사탕 2개", "다이아몬드푸드 망고 크림크래커 1개", "오쏘몰 비타민 1회분 (제품 종류 미확인)", "오리온 치킨팝 65g 1봉지 (맛 미확인)"] }
    ],
    nutritionEstimate: {
      calories: "약 2,000~2,810 kcal",
      protein: "약 83~114g",
      freeSugar: "약 65~95g",
      nutrients: {
        energy: { min: 2000, max: 2810, unit: "kcal" },
        protein: { min: 83, max: 114, unit: "g" },
        carbohydrate: { min: 280, max: 405, unit: "g" },
        totalFat: { min: 61, max: 105, unit: "g" },
        saturatedFat: { min: 16, max: 35, unit: "g" },
        freeSugar: { min: 65, max: 95, unit: "g" },
        fiber: { min: 6, max: 15, unit: "g" },
        sodium: { min: 2700, max: 5300, unit: "mg" }
      },
      assumptions: "기존 기록에 저녁과 추가 간식을 합산했다. 흰밥은 보통 한 공기, 소고기 볶음은 약 120~180g, 연두부는 간장 소스를 포함한 보통 1회분으로 가정했다. 더단백 초코는 250ml 105kcal·단백질 20g, 야채농장은 총 2팩으로 170kcal·단백질 4g·당류 24g(사용자 확인: 팩당 12g)을 반영했다. 로투스는 총 2조각, 레몬 사탕은 총 2개, 망고 크림크래커는 1개 약 40~45kcal·단백질 1g 미만으로 추정했다. 실제 섭취가 확인된 치킨팝은 65g 한 봉지와 공식 열량 333~338kcal를 합산했다. 맛과 상세 영양표가 확인되지 않아 단백질은 약 2g, 유리당은 닭강정맛 가정 약 18g, 탄수화물·지방·포화지방·나트륨은 유사 제품 범위로 추정했다. 오쏘몰은 제품 종류에 따라 열량과 당류 차이가 있어 넓은 범위로 반영했다.",
      target: "오늘 체중 65.8kg 기준 우선 단백질 목표는 약 105g/일이다. 에너지·탄수화물·지방·식이섬유는 2025 한국인 영양소 섭취기준의 남성 30~49세 참고치와, 포화지방·유리당·나트륨은 WHO 상한과 비교한다. 2,500kcal는 집단 참고치라 실제 활동량에 따른 개인 필요량과 다를 수 있다.",
      sources: [
        { label: "식품안전나라 김치볶음밥 1인분 참고", href: "https://www.foodsafetykorea.go.kr/upload/20150824/20150824011539_1440389739434.pdf" },
        { label: "로투스 비스코프 공식 영양정보", href: "https://www.lotusbiscoff.com/en-us/products/lotus-biscoff" },
        { label: "사용자가 확인한 야채농장 상품", href: "https://www.coupang.com/vp/products/67924173?itemId=226881573&vendorItemId=91639101275" },
        { label: "야채농장 과일&야채 190ml 영양정보", href: "https://prod.danawa.com/info/?pcode=10001697" },
        { label: "빙그레 더단백 초코 250ml 영양정보", href: "https://prod.danawa.com/info/?cate=16255382&pcode=68164955" },
        { label: "다이아몬드푸드 망고 크림크래커 영양정보", href: "https://www.inout.team/search/food/detail/81599" },
        { label: "망고 크림크래커 포장당 개수 참고", href: "https://johndoe-list.tistory.com/109" },
        { label: "오리온 치킨팝 공식 제품정보", href: "https://www.orionworld.com/goods/view/25?badge=&category=&goodsno=18&keyname=&keyword=&page=1" },
        { label: "미니 꿀꽈배기 100g 참고", href: "https://www.inout.team/search/food/detail/D9O4F5wBTGIgnWnfXusb" },
        { label: "오쏘몰 이뮨 공식 제품 형태 참고", href: "https://orthomolusa.com/products/orthomol-immun" },
        { label: "운동 성인 단백질 근거", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5477153/" }
      ]
    },
    condition: "상체 운동 실시 · 중간 높이 케이블 레터럴 레이즈에서 어깨 통증으로 중단 · 음식 중량은 미기록 · 치킨팝 섭취 완료",
    advice: {
      title: "현재 판정: 증량보다 풀업 실패 구간과 어깨 통증을 먼저 정리한다",
      points: [
        { label: "운동량", text: "7종목에서 총 30세트를 수행했다. 어시스트 풀업은 35kg 표시 중량에서 10·7·6·4회로 감소했고, 중간 높이 케이블 레터럴 레이즈는 1세트 후 어깨 통증으로 중단했다." },
        { label: "풀업 강도", text: "목표 10회를 첫 세트만 채우고 이후 반복 수가 크게 떨어졌으므로 난도를 올릴 단계가 아니다. 다음에는 표시 숫자가 보조 중량인지 먼저 확인하고, 보조 중량이면 도움을 늘리고 실제 저항이면 중량을 낮춰 세트별 반복 수가 급락하지 않게 조정한다." },
        { label: "어깨", text: "통증이 생긴 중간 높이 변형은 다음 운동에서 제외한다. 기존 로우 케이블 레터럴 레이즈도 통증 없는 범위에서만 하고, 통증이 일상이나 다음 운동까지 남거나 반복되면 운동을 멈추고 의료 전문가 또는 물리치료사의 평가를 받는다." },
        { label: "프레스 비교", text: "머신 체스트프레스는 16일 30kg에서 오늘 20kg으로 기록됐지만 같은 기구·설정인지 확인되지 않아 수행 저하로 단정하지 않는다. 다음부터 기구가 같았는지와 마지막 세트 여유 반복 수를 함께 남긴다." },
        { label: "체성분", text: "16일보다 체중은 0.1kg 낮고 골격근량은 0.4kg 낮으며 체지방량은 0.5kg 높게 측정됐다. 동시에 체수분이 1.0L 낮아졌으므로 하루 만의 근손실·지방 증가로 보지 않고 수분 상태와 생체전기저항 측정 변동을 우선 고려한다." },
        { label: "영양", text: "치킨팝 한 봉지를 포함해 약 2,000~2,810kcal와 단백질 83~114g으로 추정한다. 단백질은 목표 105g의 79~109%라 소고기와 연두부 양에 따라 충족 여부가 갈린다." },
        { label: "유리당", text: "치킨팝을 포함해 약 65~95g으로 추정돼 참고 상한 약 63g의 103~151%다. 야채농장 2팩의 당류 24g과 치킨팝·사탕·비스킷·약과가 겹쳐 상한을 넘은 것으로 추정한다." },
        { label: "영양 균형", text: "단백질은 목표 105g의 79~109%로 충족 가능하지만, 식이섬유는 30g 목표의 20~50%로 부족하다. 나트륨은 WHO 상한 2,000mg의 135~265%로 초과 추정이며, 지방도 권고 상한 83g의 73~127%로 추정 범위 상단에서는 높다." },
        { label: "추정 오차", text: "김치볶음밥·흰밥·소고기 볶음·연두부의 실제 양과 오쏘몰 제품 종류가 범위를 가장 크게 만든다." }
      ],
      sources: [
        { label: "NHS 어깨 통증 시 활동 조절 안내", href: "https://www.nhs.uk/symptoms/shoulder-pain/" }
      ]
    },
    actions: [
      "다음 운동에서는 통증이 생긴 중간 높이 케이블 레터럴 레이즈를 제외하고, 어깨가 편한 기존 동작만 통증 없는 범위에서 한다.",
      "어시스트 풀업 머신의 35kg가 보조 중량인지 확인하고, 다음에는 2세트째부터 반복 수가 급락하지 않는 더 쉬운 설정을 사용한다.",
      "머신 숄더프레스와 체스트프레스는 같은 기구인지, 마지막 세트에 몇 회 더 가능했는지를 기록해 다음 증량을 판단한다.",
      "내일부터는 야채농장을 하루 1팩으로 두고, 사탕·비스킷·약과 중 한 종류만 선택해 유리당을 먼저 줄인다.",
      "다음 식사에는 채소·콩·통곡물·통과일 중 두 가지를 더하고, 국물과 간장 소스·가공 과자는 줄여 식이섬유와 나트륨을 함께 보완한다.",
      "다음날은 치킨팝 같은 가공 과자 대신 통과일이나 무가당 간식으로 바꿔 유리당과 나트륨을 함께 낮춘다.",
      "어깨 통증이 일상이나 다음 운동까지 이어지거나 같은 동작에서 재현되면 해당 상체 운동을 중단하고 전문가의 평가를 받는다."
    ]
  },
  {
    date: "2026-08-16",
    body: {
      weight: 65.9,
      skeletalMuscle: 28.9,
      bodyFat: 12.3,
      bodyWater: 39.3
    },
    workouts: [
      { exerciseId: "cable-one-arm-lateral-raise", sets: 5, reps: 10, detail: "한 팔당 5kg · 양쪽 각 5세트 × 10회" },
      { exerciseId: "seated-row", sets: 5, reps: 10, detail: "30kg · 5세트 × 10회" },
      { exerciseId: "cable-overhead-triceps-extension", sets: 5, reps: 10, detail: "25kg · 5세트 × 10회" },
      { exerciseId: "assisted-pull-up-machine", sets: 5, reps: 10, detail: "표시 중량 35kg · 5세트 × 10회 · 보조 중량 여부 미확인" },
      { exerciseId: "reverse-pec-deck-fly", sets: 5, reps: 10, detail: "10kg 3세트 × 10회 + 15kg 2세트 × 10회 · 사진 기준 후면 어깨 동작" },
      { exerciseId: "dumbbell-shoulder-press", sets: 5, reps: 10, detail: "덤벨 각 4kg · 5세트 × 10회" },
      { exerciseId: "machine-chest-press", sets: 5, reps: 10, detail: "30kg · 5세트 × 10회" }
    ],
    meals: [
      { label: "음료·간식", items: ["스타벅스 아이스 카페 라떼 (사이즈·우유 종류 미확인)", "치킨팝 과자", "파스퇴르 100% 유기농 야채농장 과일&야채 190ml 1팩 (당류 12g)", "빙그레 더단백 드링크 1팩 (단백질 20g, 맛 미확인)"] },
      { label: "점심", items: ["쌀국수", "모닝글로리 볶음"] },
      { label: "저녁", items: ["부침개", "된장국", "밥"] }
    ],
    nutritionEstimate: {
      calories: "약 1,620~2,180 kcal",
      protein: "약 68~103g",
      assumptions: "스타벅스 아이스 카페 라떼를 일반 우유 Tall 355ml 1잔(약 110kcal·단백질 6g)으로 가정하고, 치킨팝 65g 한 봉지, 파스퇴르 100% 유기농 야채농장 과일&야채 190ml 1팩(85kcal·단백질 2g·당류 12g), 빙그레 더단백 드링크 1팩(약 105~115kcal·단백질 20g), 쌀국수·모닝글로리 볶음·부침개·된장국·밥을 각각 보통 1인분으로 가정한 범위 추정치. 라떼 사이즈나 우유 변경 시 달라질 수 있음",
      target: "건강한 운동 성인 기준 현재 체중 65.9kg의 단백질 참고 범위는 약 92~132g/일이며, 우선 목표는 약 105g/일(1.6g/kg)로 잡는다.",
      sources: [
        { label: "스타벅스 코리아 음료 영양정보", href: "https://www.starbucks.co.kr/menu/drink_list.do?CATE_CD=product_espresso" },
        { label: "오리온 치킨팝 제품정보", href: "https://www.orionworld.com/goods/view/25?badge=&category=&goodsno=18&keyname=&keyword=&page=1" },
        { label: "사용자가 확인한 야채농장 상품", href: "https://www.coupang.com/vp/products/67924173?itemId=226881573&vendorItemId=91639101275" },
        { label: "야채농장 과일&야채 190ml 영양정보", href: "https://prod.danawa.com/info/?pcode=10001697" },
        { label: "빙그레 더단백 제품 영양", href: "https://prod.danawa.com/info/?pcode=110119173" },
        { label: "쌀국수·모닝글로리 영양표", href: "https://content.phocafe.co.uk/wp-content/uploads/2025/01/Pho-Nutritional-Guidelines-2024_web.pdf" },
        { label: "식품안전나라 식품교환표", href: "https://www.foodsafetykorea.go.kr/portal/board/boardDetail.do?bbs_no=bbs039&menu_grp=MENU_NEW03&menu_no=4847&ntctxt_no=22498" },
        { label: "운동 성인 단백질 근거", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5477153/" }
      ]
    },
    condition: "주관적 운동 강도와 식사량은 미기록",
    advice: {
      title: "현재 판정: 7종목은 유지하고, 추가보다 수행 품질과 증량 시점을 관리한다",
      points: [
        { label: "종목 구성", text: "수평·수직 당기기와 가슴·어깨 밀기, 측면·후면 어깨, 삼두가 모두 있어 새 종목을 바로 추가할 필요는 없다." },
        { label: "관찰 대상", text: "상부 가슴은 체스트프레스 각도에 따라, 이두는 직접 운동이 없다는 점에서 향후 부족 여부를 확인한다." },
        { label: "훈련량 주의", text: "세트당 10회로 총 35세트다. 주 몇 회 반복하는지와 마지막 세트 여유를 알아야 과하거나 적은지 판단할 수 있다." },
        { label: "현재 체성분 위치", text: "BMI 21.3과 체지방량지수(FMI) 4.0은 각각 한국 정상 체중·NHANES 남성 정상 지방량 구간이다. 큰 폭의 감량보다 체지방 급증 없이 골격근과 제지방을 늘리는 방향이 현재 목표에 더 맞다." },
        { label: "영양", text: "아이스 카페 라떼, 야채농장과 더단백을 포함해 약 1,620~2,180kcal와 단백질 68~103g으로 추정한다. 우선 목표 105g보다 약 2~37g 부족했을 가능성이 있다." },
        { label: "증량 판단", text: "이번 한 번의 5세트×10회 기록만으로는 증량하지 않는다. 자세와 남은 반복 여유가 2회 연속 확인되면 올린다." }
      ]
    },
    actions: [
      "다음 상체 운동도 같은 7종목으로 진행하고, 새 운동은 아직 추가하지 않는다.",
      "각 종목 마지막 세트가 쉬움(3회 이상 가능)·적당(1~2회 가능)·한계(0회) 중 어디였는지 기록한다.",
      "모든 세트 10회와 2회 이상의 여유가 2번 연속 확인된 종목만 다음 최소 단위로 증량한다.",
      "주당 이 상체 루틴을 몇 회 할 계획인지 기록해 35세트의 적정성을 판단한다.",
      "아이스 카페 라떼와 더단백을 포함해도 단백질이 약 2~37g 부족할 수 있으므로 다음 끼니에서 단백질 식품을 보완한다."
    ]
  }
];
