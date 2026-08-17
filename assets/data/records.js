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
    workouts: [],
    meals: [
      { label: "식사", items: ["김치볶음밥 (양 미확인)", "계란 프라이 1개를 올려 먹음"] },
      { label: "음료", items: ["아이스 아메리카노 (사이즈·첨가물 미확인)", "파스퇴르 100% 유기농 야채농장 과일&야채 190ml 1팩"] },
      { label: "간식·보충제", items: ["로투스 비스코프 1조각", "미니 꿀꽈배기 과자 1조각", "미니 약과 1조각", "레몬 사탕 1개", "오쏘몰 비타민 1회분 (제품 종류 미확인)"] }
    ],
    nutritionEstimate: {
      calories: "현재까지 약 760~1,220 kcal",
      protein: "현재까지 약 22~34g",
      assumptions: "김치볶음밥을 약 300~500g의 한 접시, 계란 프라이를 1개로 가정했다. 무가당 아이스 아메리카노는 열량이 거의 없는 것으로 보고, 파스퇴르 100% 유기농 야채농장 과일&야채 190ml는 1팩 85kcal·단백질 2g을 반영했다. 로투스는 오리지널 비스코프 1개, 미니 꿀꽈배기·미니 약과·레몬 사탕은 작은 낱개 1개로 추정했다. 오쏘몰은 제품 종류에 따라 열량 차이가 있어 0~약 55kcal 범위만 반영했다.",
      target: "오늘 섭취가 아직 끝나지 않은 부분 합계다. 오늘 체중 65.8kg 기준 우선 단백질 목표는 약 105g/일이며, 현재 기록만 보면 약 71~83g이 남아 있다.",
      sources: [
        { label: "식품안전나라 김치볶음밥 1인분 참고", href: "https://www.foodsafetykorea.go.kr/upload/20150824/20150824011539_1440389739434.pdf" },
        { label: "로투스 비스코프 공식 영양정보", href: "https://www.lotusbiscoff.com/en-us/products/lotus-biscoff" },
        { label: "사용자가 확인한 야채농장 상품", href: "https://www.coupang.com/vp/products/67924173?itemId=226881573&vendorItemId=91639101275" },
        { label: "야채농장 과일&야채 190ml 영양정보", href: "https://prod.danawa.com/info/?pcode=10001697" },
        { label: "미니 꿀꽈배기 100g 참고", href: "https://www.inout.team/search/food/detail/D9O4F5wBTGIgnWnfXusb" },
        { label: "오쏘몰 이뮨 공식 제품 형태 참고", href: "https://orthomolusa.com/products/orthomol-immun" },
        { label: "운동 성인 단백질 근거", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5477153/" }
      ]
    },
    condition: "오늘 운동은 아직 하지 않음 · 음식 중량은 미기록 · 오늘 섭취는 진행 중",
    advice: {
      title: "현재 판정: 오늘은 섭취 기록 중이며, 다음 식사에서 단백질을 우선 보완한다",
      points: [
        { label: "운동", text: "오늘은 아직 운동하지 않았으므로 새로운 증량 판정은 없다. 최근 운동 루틴과 강도 판단은 8월 16일 기록을 그대로 기준으로 둔다." },
        { label: "체성분", text: "16일보다 체중은 0.1kg 낮고 골격근량은 0.4kg 낮으며 체지방량은 0.5kg 높게 측정됐다. 동시에 체수분이 1.0L 낮아졌으므로 하루 만의 근손실·지방 증가로 보지 않고 수분 상태와 생체전기저항 측정 변동을 우선 고려한다." },
        { label: "현재까지 섭취", text: "김치볶음밥과 계란, 음료·간식을 합쳐 현재까지 약 760~1,220kcal와 단백질 22~34g으로 추정한다. 하루 전체 합계가 아니라 현재까지의 부분 합계다." },
        { label: "단백질", text: "최근 체중 기준 우선 목표 약 105g에 비해 현재 기록만으로는 약 71~83g이 남아 있다. 다음 식사는 간식보다 뚜렷한 단백질 공급원을 중심으로 잡는 편이 좋다." },
        { label: "추정 오차", text: "김치볶음밥 양과 오쏘몰의 정확한 제품, 미니 간식의 실제 크기가 범위를 가장 크게 만든다." }
      ]
    },
    actions: [
      "다음 식사에서 닭가슴살·생선·살코기 150g 또는 두부 한 모와 계란 2개처럼 단백질 30~40g을 채울 조합을 선택한다.",
      "오늘 더 먹은 음식이 생기면 이어서 알려 일일 합계와 남은 단백질을 다시 계산한다.",
      "오늘 운동하게 되면 종목별 마지막 세트의 남은 반복 여유와 자세 상태를 함께 기록한다.",
      "체성분은 가능하면 같은 기기에서 비슷한 시간대·식사·수분 조건으로 반복 측정해 2~4주 추세를 확인한다."
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
