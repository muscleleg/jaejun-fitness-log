// 새 기록은 날짜별 객체로 이 배열에 추가한다. 같은 날짜의 후속 정보는 기존 객체에 병합한다.
window.healthRecordData = [
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
      { label: "음료", items: ["아이스 아메리카노 (사이즈·첨가물 미확인)", "파스퇴르 100% 유기농 야채농장 과일&야채 190ml 2팩", "빙그레 더단백 드링크 초코 250ml 1팩 (단백질 20g)"] },
      { label: "간식·보충제", items: ["로투스 비스코프 2조각", "미니 꿀꽈배기 과자 1조각", "미니 약과 1조각", "레몬 사탕 1개", "다이아몬드푸드 망고 크림크래커 1개", "오쏘몰 비타민 1회분 (제품 종류 미확인)"] },
      { label: "섭취 예정 · 현재 합계 제외", items: ["오리온 치킨팝 65g 1봉지 (맛 미확인·먹은 뒤 확인 필요)"] }
    ],
    nutritionEstimate: {
      calories: "현재까지 약 1,650~2,450 kcal · 치킨팝 섭취 시 약 1,990~2,790 kcal",
      protein: "현재까지 약 81~112g · 치킨팝 섭취 시 약 83~114g",
      assumptions: "기존 기록에 저녁과 추가 간식을 합산했다. 흰밥은 보통 한 공기, 소고기 볶음은 약 120~180g, 연두부는 간장 소스를 포함한 보통 1회분으로 가정했다. 더단백 초코는 250ml 105kcal·단백질 20g, 야채농장은 오늘 총 2팩으로 170kcal·단백질 4g을 반영했다. 로투스는 오늘 총 2조각, 망고 크림크래커는 1개 약 40~45kcal·단백질 1g 미만으로 추정했다. 치킨팝은 아직 먹지 않은 65g 한 봉지로 보고 현재 합계에서 제외했으며, 맛이 확인되지 않아 예상 합계에 공식 제품별 약 333~338kcal와 단백질 약 2g을 더했다. 오쏘몰은 제품 종류에 따라 열량 차이가 있어 0~약 55kcal 범위만 반영했다.",
      target: "오늘 체중 65.8kg 기준 우선 단백질 목표는 약 105g/일이다. 현재 추정 범위가 목표를 걸치지만 소고기·연두부 양이 적었다면 최대 약 24g 부족할 수 있다. 치킨팝은 한 봉지에 단백질이 약 2g이라 단백질 부족을 해결하는 식품으로 보기는 어렵다.",
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
    condition: "상체 운동 실시 · 중간 높이 케이블 레터럴 레이즈에서 어깨 통증으로 중단 · 음식 중량은 미기록 · 치킨팝은 섭취 예정",
    advice: {
      title: "현재 판정: 증량보다 풀업 실패 구간과 어깨 통증을 먼저 정리한다",
      points: [
        { label: "운동량", text: "7종목에서 총 30세트를 수행했다. 어시스트 풀업은 35kg 표시 중량에서 10·7·6·4회로 감소했고, 중간 높이 케이블 레터럴 레이즈는 1세트 후 어깨 통증으로 중단했다." },
        { label: "풀업 강도", text: "목표 10회를 첫 세트만 채우고 이후 반복 수가 크게 떨어졌으므로 난도를 올릴 단계가 아니다. 다음에는 표시 숫자가 보조 중량인지 먼저 확인하고, 보조 중량이면 도움을 늘리고 실제 저항이면 중량을 낮춰 세트별 반복 수가 급락하지 않게 조정한다." },
        { label: "어깨", text: "통증이 생긴 중간 높이 변형은 다음 운동에서 제외한다. 기존 로우 케이블 레터럴 레이즈도 통증 없는 범위에서만 하고, 통증이 일상이나 다음 운동까지 남거나 반복되면 운동을 멈추고 의료 전문가 또는 물리치료사의 평가를 받는다." },
        { label: "프레스 비교", text: "머신 체스트프레스는 16일 30kg에서 오늘 20kg으로 기록됐지만 같은 기구·설정인지 확인되지 않아 수행 저하로 단정하지 않는다. 다음부터 기구가 같았는지와 마지막 세트 여유 반복 수를 함께 남긴다." },
        { label: "체성분", text: "16일보다 체중은 0.1kg 낮고 골격근량은 0.4kg 낮으며 체지방량은 0.5kg 높게 측정됐다. 동시에 체수분이 1.0L 낮아졌으므로 하루 만의 근손실·지방 증가로 보지 않고 수분 상태와 생체전기저항 측정 변동을 우선 고려한다." },
        { label: "영양", text: "치킨팝을 제외한 현재까지 약 1,650~2,450kcal와 단백질 81~112g으로 추정한다. 치킨팝 한 봉지를 먹으면 약 1,990~2,790kcal와 단백질 83~114g이 된다. 단백질 목표 105g 충족 여부는 소고기와 연두부 양에 크게 좌우된다." },
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
      "치킨팝을 실제로 먹으면 알려 현재 예정 기록을 섭취 완료로 바꾸고 일일 합계를 확정한다.",
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
      { label: "음료·간식", items: ["스타벅스 아이스 카페 라떼 (사이즈·우유 종류 미확인)", "치킨팝 과자", "파스퇴르 100% 유기농 야채농장 과일&야채 190ml 1팩", "빙그레 더단백 드링크 1팩 (단백질 20g, 맛 미확인)"] },
      { label: "점심", items: ["쌀국수", "모닝글로리 볶음"] },
      { label: "저녁", items: ["부침개", "된장국", "밥"] }
    ],
    nutritionEstimate: {
      calories: "약 1,620~2,180 kcal",
      protein: "약 68~103g",
      assumptions: "스타벅스 아이스 카페 라떼를 일반 우유 Tall 355ml 1잔(약 110kcal·단백질 6g)으로 가정하고, 치킨팝 65g 한 봉지, 파스퇴르 100% 유기농 야채농장 과일&야채 190ml 1팩(85kcal·단백질 2g), 빙그레 더단백 드링크 1팩(약 105~115kcal·단백질 20g), 쌀국수·모닝글로리 볶음·부침개·된장국·밥을 각각 보통 1인분으로 가정한 범위 추정치. 라떼 사이즈나 우유 변경 시 달라질 수 있음",
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
