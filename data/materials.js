window.quizDatabase = window.quizDatabase || {};

window.quizDatabase.materials = {
  title: "치과재료학 (1번 ~ 105번)",
  questions: [
    {
      id: 1, question: "브리넬(Brinell hardness)경도 수는 그 재료의 무엇에 대한 것을 뜻하는가?",
      options: ["강도", "연신율", "표면의 굳은 정도(표면저항능력)", "부식성", "탄성률"],
      answer: 3,
      optionExplanations: { 3: "경도는 표면의 영구 변형(압입)에 대한 저항 능력입니다." },
      commonExplanations: []
    },
    {
      id: 2, question: "주조용 링 내면에 석면대(asbestos)를 내장하는 가장 주된 이유는?",
      options: ["매몰재 가열속도 증가", "경화시간 단축", "수화팽창 증가", "매몰재의 팽창을 도모하기 위해", "매몰재 사용량 감소"],
      answer: 4,
      optionExplanations: { 4: "금속 링의 구속력을 완충하여 매몰재가 자유롭게 팽창하도록 돕습니다." },
      commonExplanations: []
    },
    {
      id: 3, question: "가역성 수성교질 인상재의 기본성분은?",
      options: ["아가-아가(agar-agar)", "알지네이트(alginate)", "붕사(borax)", "황산칼륨", "산화아연"],
      answer: 1,
      optionExplanations: { 1: "한천(Agar-agar)은 온도에 따라 졸과 겔로 가역 변화합니다." },
      commonExplanations: []
    },
    {
      id: 4, question: "도재소부 주조금속관(PFM)을 제작할 때 사용할 수 없는 원소는?",
      options: ["금(Au)", "동(Cu)", "백금(Pt)", "팔라듐(Pd)", "코발트(Co)"],
      answer: 2,
      optionExplanations: { 2: "동(Cu)이나 은(Ag)은 도재 소성 시 표면을 녹색 등으로 변색시킵니다." },
      commonExplanations: []
    },
    {
      id: 5, question: "석고제품 사용 시 경화시간을 연장(지연)시키고자 한다. 맞는 내용으로 짝지어진 것은?",
      contextBox: "가. 20℃ 이하의 물로 연화        나. 연화시간을 감소시킨다\n다. 연화횟수를 증가시킨다        라. Borax(붕사)를 첨가한다\n마. K₂SO₄ 첨가",
      options: ["가, 다", "나, 라", "다, 마", "가, 라", "나, 마"],
      answer: 2,
      optionExplanations: { 2: "혼합 시간을 줄이면 결정 핵이 덜 생기고(나), 붕사는 지연제입니다(라)." },
      commonExplanations: []
    },
    {
      id: 6, question: "치과석고산물(Dental gypsum product)의 경화반응식은 어느 것인가?",
      options: [
        "CaSO₄·2H₂O + heat → (CaSO₄)₂·H₂O + 3H₂O",
        "(CaSO₄)₂·H₂O + H₂O → CaSO₄·2H₂O",
        "(CaSO₄)₂·H₂O + 3H₂O → 2CaSO₄·2H₂O + heat ↑",
        "CaSO₄ + 2H₂O → CaSO₄·2H₂O",
        "CaSO₄·½H₂O + H₂O → CaSO₄·2H₂O + heat ↓"
      ],
      answer: 3,
      optionExplanations: { 3: "반수석고가 물과 결합하여 이수석고로 결정화되면서 열을 방출합니다." },
      commonExplanations: []
    },
    {
      id: 7, question: "다음 중 인산아연시멘트(Zinc phosphate cement)의 경화시간을 지연시키는데 가장 알맞은 방법은?",
      options: ["혼합시 찬 유리판(Cool slab)을 사용한다", "더운 유리판을 사용한다", "분말에 물을 첨가한다", "액에 알코올을 첨가한다", "한 번에 많은 양의 분말을 혼합한다"],
      answer: 1,
      optionExplanations: { 1: "발열 반응열을 차가운 유리판으로 흡수시켜 경화를 지연시킵니다." },
      commonExplanations: []
    },
    {
      id: 8, question: "다음 중 치과용 석고 및 매몰재 관련 설명으로 옳지 않은 것은?",
      options: ["경석고의 혼수비는 보통석고보다 낮다", "치과용 석고분말은 CaSO₄·2H₂O 로 이뤄져 있다", "한천 인상재에는 겔 강도를 위해 붕사가 첨가된다", "석고 경화를 돕는 성분이 한천 인상재에 포함된다", "납형(Wax pattern)은 제작 후 즉시 매몰해야 한다"],
      answer: 2,
      optionExplanations: { 2: "치과용 석고 분말은 반수석고(CaSO₄·½H₂O)입니다." },
      commonExplanations: []
    },
    {
      id: 9, question: "치과용 경석고가 보통석고에 비해 다른 것은 다음 중 어느 것인가?",
      contextBox: "가. 더 단단하다               나. 혼수 때 더 많은 물이 요구된다\n다. 더 강하고 마모저항이 높다   라. 경화팽창이 크다",
      options: ["가, 다", "나, 라", "가, 라", "나, 다", "가, 나, 다"],
      answer: 1,
      optionExplanations: { 1: "경석고는 입자가 치밀하여 더 단단하고(가), 마모저항성이 높습니다(다)." },
      commonExplanations: []
    },
    {
      id: 10, question: "Monomer 100g에 넣을 수 있는 polymer의 표준 양은?",
      options: ["100g", "300g", "500g", "50g", "700g"],
      answer: 2,
      optionExplanations: { 2: "표준 무게비가 약 3:1(Polymer:Monomer)이므로 약 300g입니다." },
      commonExplanations: []
    },
    {
      id: 11, question: "금 합금의 조성 중 강도를 증가시키며, 붉은 색조를 띄게 하며 열처리를 가능하게 하는 성분은?",
      options: ["금(Au)", "은(Ag)", "동(Cu)", "백금(Pt)", "팔라듐(Pd)"],
      answer: 3,
      optionExplanations: { 3: "동(Cu)은 강도를 높이고 붉은색을 띠게 하며 경화열처리를 가능하게 합니다." },
      commonExplanations: []
    },
    {
      id: 12, question: "크리스토발라이트 매몰재에서 Silica(SiO₂)의 역할만으로 짝지어진 것은?",
      contextBox: "가. 강도 부여             나. 열팽창 도모\n다. 파괴 방지             라. 내열성 부여",
      options: ["가, 다", "가, 나", "나, 라", "다, 라", "나, 다"],
      answer: 3,
      optionExplanations: { 3: "실리카는 내화재로서 열팽창 도모(나)와 내열성 부여(라)를 담당합니다." },
      commonExplanations: []
    },
    {
      id: 13, question: "모형의 표면강도를 가장 효과적으로 증가시킬 수 있는 용액은 다음 중 어느 것인가?",
      options: ["2%의 zinc sulfate 용액", "2% 식염수", "붕사 용액", "묽은 염산", "알코올 수용액"],
      answer: 1,
      optionExplanations: { 1: "2% Zinc sulfate 용액 침적 시 표면 경도와 마모 저항성이 향상됩니다." },
      commonExplanations: []
    },
    {
      id: 14, question: "인레이 왁스(Inlay wax)의 구성성분 중 강도와 표면의 활택에 영향을 미치는 성분은?",
      options: ["밀납(Bee's wax)", "카나우바왁스(carnauba wax)", "담마라 고무(Gum dammar)", "파라핀 왁스(Paraffin wax)", "합성 왁스"],
      answer: 2,
      optionExplanations: { 2: "카나우바 왁스는 왁스의 경도를 높이고 표면 광택 및 매끄러움을 줍니다." },
      commonExplanations: []
    },
    {
      id: 15, question: "형성된 wax pattern을 변형시키는 요인과 관계 없는 사항은?",
      options: ["보관온도", "보관방법", "열팽창계수", "주조온도", "내부응력"],
      answer: 4,
      optionExplanations: { 4: "주조온도는 금속을 부을 때의 온도로 매몰 전 납형 변형 요인이 아닙니다." },
      commonExplanations: []
    },
    {
      id: 16, question: "합금의 전성과 내식성을 증가시키고 강도를 감소시키는 열처리는?",
      options: ["소둔(annealing / 연화열처리)", "냉간가공", "시효경화", "경화열처리", "가공경화"],
      answer: 1,
      optionExplanations: { 1: "소둔(연화열처리)은 내부 응력을 풀어 전성과 연성을 높이고 강도를 낮춥니다." },
      commonExplanations: []
    },
    {
      id: 17, question: "금합금 주조체의 변연부가 불완전하게 형성되고 변연부가 유난히 반짝반짝 빛날 경우 주된 이유는?",
      options: ["소환 부족", "통기성 부족 (Gases trapped)", "Under-주조온도", "주조압력 과다", "이물질 혼입"],
      answer: 2,
      optionExplanations: { 2: "통기성이 부족하여 몰드 내 가스가 금속 유입을 막았기 때문입니다." },
      commonExplanations: []
    },
    {
      id: 18, question: "기공물의 표면을 연마(polishing)하는 이유로 가장 불합리한 것은?",
      options: ["음식물 잔사 침착 방지", "변색 및 부식 방지", "화학적 저항성 및 착용감 향상", "심미성 제고", "기공물의 강도를 높임"],
      answer: 5,
      optionExplanations: { 5: "연마는 표면 조도를 없앨 뿐 재료 고유의 기계적 강도를 높이지 못합니다." },
      commonExplanations: []
    },
    {
      id: 19, question: "레진 온성(resin curing) 후 급냉시키지 않고 방냉(bench cooling)을 하는 이유는?",
      options: ["중합 시간을 줄이기 위함이다", "의치가 꼬이거나 뒤틀림을 방지하기 위함이다", "의치의 색상을 선명하게 하기 위함이다", "기포 발생을 촉진하기 위함이다", "석고 매몰재를 단단하게 하기 위함이다"],
      answer: 2,
      optionExplanations: { 2: "급냉 시 열응력으로 의치가 뒤틀리거나 변형되는 것을 방지합니다." },
      commonExplanations: []
    },
    {
      id: 20, question: "주조 후 얻어진 주조체에 물고기 가시형태의 fin 또는 spine이 생긴 주된 이유는?",
      options: ["주조압력 부족", "매몰재의 혼수비가 낮을 경우", "주입선이 너무 두꺼울 경우", "금속 용융 부족", "매몰재의 소환속도가 높을 경우 (급가열)"],
      answer: 5,
      optionExplanations: { 5: "급가열로 매몰재에 미세 균열이 발생하여 금속이 그 틈으로 유입되었습니다." },
      commonExplanations: []
    },
    {
      id: 21, question: "치과용 도재의 성분 중 함유량이 가장 많은 것은?",
      options: ["석영(Quartz)", "고령토(Kaolin)", "장석(Feldspar)", "알루미나(Alumina)", "붕산"],
      answer: 3,
      optionExplanations: { 3: "장석(Feldspar)이 약 60~80%로 가장 많이 함유되어 있습니다." },
      commonExplanations: []
    },
    {
      id: 22, question: "매몰재의 혼수비가 크면 소환시 어떻게 되나?",
      options: ["팽창률이 커진다", "팽창률이 작아진다", "강도가 증가한다", "소환 시간이 단축된다", "변화가 없다"],
      answer: 2,
      optionExplanations: { 2: "혼수비가 커지면 입자 밀도가 낮아져 열팽창률이 작아집니다." },
      commonExplanations: []
    },
    {
      id: 23, question: "Acrylic resin 중합 시 납의치가 매몰된 플라스크를 바로 끓는 물속에 집어넣었을 때 기포가 생기는 부분은?",
      options: ["의치의 인공치 주변", "Denture의 가장 두꺼운 부위에", "Denture의 가장 얇은 변연부", "의치상의 표면 전체", "플라스크 벽면 근처"],
      answer: 2,
      optionExplanations: { 2: "발열 중합열이 합쳐져 가장 두꺼운 부위 내부 단량체가 비등하기 때문입니다." },
      commonExplanations: []
    },
    {
      id: 24, question: "20 karat의 금합금 12gm이 있다. 금 이외의 성분은 얼마인가?",
      options: ["10 gm", "8 gm", "6 gm", "4 gm", "2 gm"],
      answer: 5,
      optionExplanations: { 5: "순금 = 12 × (20/24) = 10g이므로, 기타 성분은 2g입니다." },
      commonExplanations: []
    },
    {
      id: 25, question: "불화수소산(HF)에 가장 침해를 적게 받는 금속은?",
      options: ["Gold alloy", "Ni-Cr 합금", "Co-Cr 합금", "Titanium", "Stainless steel"],
      answer: 1,
      optionExplanations: { 1: "귀금속인 금 합금(Gold alloy)은 불화수소산에 부식되지 않습니다." },
      commonExplanations: []
    },
    {
      id: 26, question: "가역수성콜로이드인상재(아가)로 채워진 flask를 냉각시킬 때 밑 부분부터 서서히 냉각 시키는 이유?",
      options: ["경화 시간을 촉진시키기 위해서", "인상재 표면 경도를 높이기 위해서", "아가의 농도를 균일하게 하기 위해서", "온도의 급격한 변화에서 초래되는 변형을 방지하기 위해서", "겔 강도를 최대로 높이기 위해서"],
      answer: 4,
      optionExplanations: { 4: "방향성 냉각을 통해 냉각 수축에 따른 치수 변형을 방지합니다." },
      commonExplanations: []
    },
    {
      id: 27, question: "금합금을 annealing(소둔: 연화열처리)할 때 적절한 재결정 온도는?",
      options: ["200°F", "400°F", "600°F", "840°F", "1200°F"],
      answer: 4,
      optionExplanations: { 4: "약 700℃(1292°F)~840°F 부근에서 재결정 유도 후 급냉합니다." },
      commonExplanations: []
    },
    {
      id: 28, question: "의치 제작 시에 acrylic resin을 전입할 가장 적당한 시기는?",
      options: ["Wet stage (젖은 단계)", "String stage (실모양 단계)", "Dough stage (떡상)", "Rubber stage (고무상 단계)", "Hard stage (경화 단계)"],
      answer: 3,
      optionExplanations: { 3: "손에 묻지 않고 가소성이 우수한 Dough stage(병상/떡상)에 전입합니다." },
      commonExplanations: []
    },
    {
      id: 29, question: "금합금의 밀도는 크롬 코발트 합금보다 약 몇 배나 되는가?",
      options: ["0.5배", "1배", "1.5배", "2배", "3배"],
      answer: 4,
      optionExplanations: { 4: "금합금 밀도(15~19 g/cm³)는 Co-Cr(8~9 g/cm³)의 약 2배입니다." },
      commonExplanations: []
    },
    {
      id: 30, question: "고무인상재를 이용하여 인상채득 시 이상적인 인상재 두께는?",
      options: ["2~4mm", "5~7mm", "8~10mm", "1mm 이하", "두께 무관"],
      answer: 1,
      optionExplanations: { 1: "중합 수축 제어를 위해 개인트레이를 써서 2~4mm 균일 두께를 유지합니다." },
      commonExplanations: []
    },
    {
      id: 31, question: "Gold inlay용 석고계 매몰재 성분 중 석고의 주된 역할은?",
      options: ["내화재 역할", "열팽창 증대", "결합제 역할을 한다", "통기성 부여", "환원제 역할"],
      answer: 3,
      optionExplanations: { 3: "알파-반수석고는 내화재 입자들을 뭉쳐주는 결합제(Binder) 역할을 합니다." },
      commonExplanations: []
    },
    {
      id: 32, question: "납착금(Gold solder)은 대개 주조체의 Karat보다 얼마인 것을 쓰는가?",
      options: ["동일한 Karat", "2Karat 낮은 것을 쓴다", "4Karat 높은 것을 쓴다", "2Karat 높은 것을 쓴다", "6Karat 낮은 것을 쓴다"],
      answer: 2,
      optionExplanations: { 2: "모금속을 녹이지 않도록 용융점을 낮추기 위해 2 Karat 낮은 것을 씁니다." },
      commonExplanations: []
    },
    {
      id: 33, question: "18Karat 금합금의 순도(fineness)는 얼마인가?",
      options: ["500", "600", "700", "750", "850"],
      answer: 4,
      optionExplanations: { 4: "18/24 × 1000 = 750 Fine 입니다." },
      commonExplanations: []
    },
    {
      id: 34, question: "금합금 주조체에서 국부수축다공성 (Porosity)이 가장 많이 나타나는 부위는?",
      options: ["주조체와 주입선의 연결부위", "주조체의 얇은 변연부", "주입선의 상단부", "탕구 기저부", "주조체 최상단 표면"],
      answer: 1,
      optionExplanations: { 1: "연결 부위가 조기 응고되면 금속 공급이 끊겨 수축 기포가 생깁니다." },
      commonExplanations: []
    },
    {
      id: 35, question: "석고(Gypsum)계 매몰재를 700℃이상 가열하면 어떤 유해가스가 발생하는가?",
      options: ["일산화탄소(CO)", "아황산가스(SO₂)", "이산화탄소(CO₂)", "염소가스(Cl₂)", "산소(O₂)"],
      answer: 2,
      optionExplanations: { 2: "황산칼슘이 고온 분해되면서 유해한 아황산가스(SO₂)를 방출합니다." },
      commonExplanations: []
    },
    {
      id: 36, question: "다음 중 물질의 1차 결합에 속하는 것은?",
      options: ["반데르발스 결합", "수소결합", "이온결합", "분자간 인력", "영구 쌍극자 결합"],
      answer: 3,
      optionExplanations: { 3: "1차 결합은 이온결합, 공유결합, 금속결합입니다." },
      commonExplanations: []
    },
    {
      id: 37, question: "다음 중 비결정질(Amorphous) 고체가 아닌 것은?",
      options: ["유리(Glass)", "인레이 왁스", "Plaster (석고)", "아가 인상재", "소성용 도재"],
      answer: 3,
      optionExplanations: { 3: "석고는 일정한 결정 격자를 갖는 결정질 고체입니다." },
      commonExplanations: []
    },
    {
      id: 38, question: "가역성 겔(gel)이 아닌 것은?",
      options: ["젤라틴", "규산(silica)겔", "한천(Agar) 겔", "전분 겔", "펙틴 겔"],
      answer: 2,
      optionExplanations: { 2: "규산 겔은 화학 반응으로 형성되는 비가역성 겔입니다." },
      commonExplanations: []
    },
    {
      id: 39, question: "재료특성 중 비례한계를 넘어선 응력-변형률 곡선부분은?",
      options: ["탄성지역", "소성지역", "원점 영역", "영구 복원 지역", "훅의 법칙 적용 구간"],
      answer: 2,
      optionExplanations: { 2: "비례한계를 넘어서면 영구 변형이 남는 소성지역(Plastic region)입니다." },
      commonExplanations: []
    },
    {
      id: 40, question: "인장 시험기는 주로 재료의 어떤 특성을 알아보기 위한 것인가?",
      options: ["강도특성 (인장강도, 연성 등)", "경도특성", "광학적 특성", "열전도율", "용융점"],
      answer: 1,
      optionExplanations: { 1: "인장강도, 항복강도, 연성 등 기계적 강도 특성을 측정합니다." },
      commonExplanations: []
    },
    {
      id: 41, question: "경석고와 초경석고의 일반적인 용도 중 가장 거리가 먼 것은?",
      options: ["작업 모형 제작", "악안면인상채득재", "치형(Die) 제작", "정밀 주조 모형", "교합기 부착 모형"],
      answer: 2,
      optionExplanations: { 2: "경석고는 모형/치형 제작재료이며 직접 인상을 채득하는 재료가 아닙니다." },
      commonExplanations: []
    },
    {
      id: 42, question: "다음 중 석고의 경화시간을 단축시키지 않는 요인은? (지연 요인)",
      options: ["경화된 석고 분말 첨가", "연화 속도 증가", "혼수비의 증가", "미량의 식염 첨가", "입자의 미세화"],
      answer: 3,
      optionExplanations: { 3: "혼수비(물 양)를 늘리면 입자 농도가 묽어져 경화가 지연됩니다." },
      commonExplanations: []
    },
    {
      id: 43, question: "ADA spec. No.25에 의거한 석고제품의 표준정조도를 나타내는 cone의 침투깊이는?",
      options: ["30±2mm", "15±2mm", "45±2mm", "10±2mm", "50±2mm"],
      answer: 1,
      optionExplanations: { 1: "원뿔 관통 깊이 표준 기준값은 30±2mm 입니다." },
      commonExplanations: []
    },
    {
      id: 44, question: "석고의 표면경도에 관한 설명으로 틀린 것은?",
      options: ["혼수비가 낮을수록 표면경도가 높다", "최종경화 후 여분의 물 증발량이 많으면 표면경도도 높다", "건조 강도는 습윤 강도보다 높다", "연화 시간이 적절해야 경도가 유지된다", "표면 경화제 도포 시 경도가 향상된다"],
      answer: 2,
      optionExplanations: { 2: "잉여 자유수 증발량이 많으면 다공성 기공이 남아 표면 경도가 떨어집니다." },
      commonExplanations: []
    },
    {
      id: 45, question: "무치악 총의치 제작에 사용되는 인상재로 가장 적합한 것은?",
      options: ["알지네이트 인상재", "한천 인상재", "폴리설파이드", "Impression compound", "부가형 실리콘 퍼티"],
      answer: 4,
      optionExplanations: { 4: "인상용 컴파운드는 무치악 예비 인상 및 변연 형성에 적합합니다." },
      commonExplanations: []
    },
    {
      id: 46, question: "알지네이트의 성분 중 혼합시 작업시간을 제공해 주는 지연제 역할을 하는 것은?",
      options: ["황산칼슘", "규조토", "알지네이트 칼륨", "sodium phosphate (인산나트륨)", "불화티타늄칼륨"],
      answer: 4,
      optionExplanations: { 4: "인산나트륨은 칼슘 이온과 먼저 반응하여 초기 겔화를 지연시킵니다." },
      commonExplanations: []
    },
    {
      id: 47, question: "Agar(한천) 성분 중 석고의 경화시간을 촉진하고 표면경도를 증가시키는 것은?",
      options: ["붕사(Borax)", "물", "글리세린", "potassium sulfate (K₂SO₄)", "방부제"],
      answer: 4,
      optionExplanations: { 4: "황산칼륨(K₂SO₄)은 석고의 경화를 촉진하고 표면을 매끄럽게 합니다." },
      commonExplanations: []
    },
    {
      id: 48, question: "Polysulfide 고무인상재의 촉진제(이산화납, 황)와 함께 첨가하는 가소제 성분으로 맞는 것은?",
      options: ["물", "dibutyl phthalate", "에탄올", "아세톤", "벤젠"],
      answer: 2,
      optionExplanations: { 2: "Dibutyl phthalate는 촉진제 파스타의 점도를 유지하는 가소제입니다." },
      commonExplanations: []
    },
    {
      id: 49, question: "다음 중 가지형(branched polymer) 고분자 구조를 갖는 것은?",
      options: ["선형 폴리에틸렌", "가교형 아크릴 수지", "망상형 실리콘", "나일론 선재", "천연수지 (가지형 고분자체)"],
      answer: 5,
      optionExplanations: { 5: "주 사슬에 곁가지가 붙은 구조체는 천연수지 등에서 관찰됩니다." },
      commonExplanations: []
    },
    {
      id: 50, question: "중합체의 강도가 증가되는 경우가 아닌 것은?",
      options: ["분자량이 증가할 때", "가교결합이 형성될 때", "결정화도가 증가할 때", "사슬 간 인력이 증가할 때", "중합체가 Tg(유리전이온도) 이상의 온도에 있다"],
      answer: 5,
      optionExplanations: { 5: "Tg 이상에서는 사슬의 유동성 증가로 연화되어 강도가 떨어집니다." },
      commonExplanations: []
    },
    {
      id: 51, question: "다음 중 분자 사슬 간 반데르발스 결합으로 연결된 고분자 결합 형태는?",
      options: ["Linear polymer (선형 고분자)", "Cross-linked polymer", "Network polymer", "이온 결합체", "공유 결합 망상체"],
      answer: 1,
      optionExplanations: { 1: "선형 고분자는 사슬 간에 약한 반데르발스 결합으로 묶여 열에 취약합니다." },
      commonExplanations: []
    },
    {
      id: 52, question: "광중합형 의치상 레진의 일반적인 특성으로 잘못된 것은?",
      options: ["작업 시간이 길고 조작이 편리하다", "가시광선(약 470nm) 영역을 이용한다", "인공치와의 화학적 접착성이 저절로 완벽하다", "혼합 기포 발생이 적다", "전입 과정이 간소하다"],
      answer: 3,
      optionExplanations: { 3: "인공치와의 결합을 위해서는 별도의 본딩 표면처리가 필요합니다." },
      commonExplanations: []
    },
    {
      id: 53, question: "금박(Gold foil) 충전을 위한 소둔(Annealing)의 적절한 열원으로 맞게 연결된 것은?",
      options: ["전기로", "마이크로웨이브", "Bunsen gas flame (분젠 가스 불꽃)", "알코올 램프 심지 내부", "적외선 램프"],
      answer: 3,
      optionExplanations: { 3: "불순물 제거 및 응착성 회복을 위해 분젠 가스 불꽃을 사용합니다." },
      commonExplanations: []
    },
    {
      id: 54, question: "보통관, 3/4관 및 높은 하중을 받는 전·후방 교의치에 가장 적절한 금합금 분류는?",
      options: ["제1형 (Type I - Soft)", "제2형 (Type II - Medium)", "제3형 (Type III - Hard)", "제4형 (Type IV - Extra Hard)", "순금"],
      answer: 3,
      optionExplanations: { 3: "전장관 및 브릿지 제작에는 Type III (Hard) 금합금이 적합합니다." },
      commonExplanations: []
    },
    {
      id: 55, question: "주조용 금합금의 특성을 설명한 것이다. 틀린 것은?",
      options: ["1형에서 4형으로 갈수록 경도가 증가한다", "1형에서 4형으로 갈수록 항복강도가 증가한다", "1형에서 4형으로 갈수록 귀금속 함량이 낮아진다", "신장률(연신율)은 1형-4형으로 갈수록 증가한다", "4형 금합금은 열처리가 가능하다"],
      answer: 4,
      optionExplanations: { 4: "강도가 높아질수록 신장률(연성)은 감소합니다." },
      commonExplanations: []
    },
    {
      id: 56, question: "보통 납착금에 18K라고 표시되었을 때 납착금 내부의 실제 금 함량은?",
      options: ["75%", "85%", "약 65% (16K 수준)", "50%", "100%"],
      answer: 3,
      optionExplanations: { 3: "18K 주조체용 납착금은 융점을 낮추기 위해 실제 금 함량이 약 65%입니다." },
      commonExplanations: []
    },
    {
      id: 57, question: "치과용 금합금의 경화열처리(Hardening heat treatment) 방법으로 적절치 않은 것은?",
      options: ["425℃로 가열 후 250℃까지 서냉한다", "원자 규칙격자 배열을 유도한다", "425℃에서 1분간 유지 후 물에 급냉한다", "강도와 경도를 최대화한다", "Au-Cu 화합물을 형성시킨다"],
      answer: 3,
      optionExplanations: { 3: "가열 후 급냉하는 것은 금합금을 무르게 만드는 연화열처리입니다." },
      commonExplanations: []
    },
    {
      id: 58, question: "ADA 규격 No.7 치과용 가공금선재에 관한 설명 중 옳지 않은 것은?",
      options: ["귀금속 함량 규정이 있다", "클래스프 및 교정용 와이어로 사용된다", "열처리 및 가공 경화 특성을 보인다", "융점이 납착용 금합금보다 높아야 한다", "연화열처리 상태에서 연신율은 최하 30%를 유지해야 한다"],
      answer: 5,
      optionExplanations: { 5: "연신율 요구 수치 조건이 잘못 제시되었습니다." },
      commonExplanations: []
    },
    {
      id: 59, question: "치과용 크롬 합금이 충분한 내식성을 갖기 위해 포함해야 하는 최소 크롬(Cr) 함량은?",
      options: ["5%", "12~15% 이상", "25%", "35%", "50%"],
      answer: 2,
      optionExplanations: { 2: "치밀한 산화크롬 수동태 피막을 위해 최소 12~15% 이상 함유되어야 합니다." },
      commonExplanations: []
    },
    {
      id: 60, question: "고융점 Cr형 주조용 합금(Co-Cr 등)에 가장 적합한 매몰재는?",
      options: ["석고계 매몰재", "보통석고", "알지네이트", "규산염결합 매몰재 (Ethyl silicate bonded)", "인산아연 매몰재"],
      answer: 4,
      optionExplanations: { 4: "1000℃ 이상 고온 주조에는 규산염계 또는 인산염계 매몰재를 씁니다." },
      commonExplanations: []
    },
    {
      id: 61, question: "스테인리스강 교정용 선재에 형성된 가공 잔류응력을 제거하는 적절한 열처리 조건은?",
      options: ["450~500℃에서 1~2분간 가열", "800℃에서 10분간 가열", "100℃ 끓는 물에 침적", "1200℃ 소성로 가열", "서서히 냉각만 시행"],
      answer: 1,
      optionExplanations: { 1: "450~500℃에서 단시간 가열하여 가공 잔류응력을 제거합니다." },
      commonExplanations: []
    },
    {
      id: 62, question: "파라핀 왁스(Paraffin wax)에 대한 설명 중 옳지 않은 것은?",
      options: ["석유 정제 과정에서 얻어진다", "인레이 왁스의 주성분이다", "열팽창계수가 큰 편이다", "광물성 왁스에 속한다", "식물성왁스의 대표적이라고 할 수 있으며 보통 판상의 결정을 가진다"],
      answer: 5,
      optionExplanations: { 5: "파라핀 왁스는 석유에서 추출되는 광물성 왁스입니다." },
      commonExplanations: []
    },
    {
      id: 63, question: "파라핀 왁스의 융점과 경도를 상승시키는 식물성 왁스끼리 바르게 짝지어진 것은?",
      options: ["카나우바 왁스 - 칸데릴라 왁스", "밀납 - 파라핀", "담마라 고무 - 바셀린", "오조케라이트 - 밀납", "합성 왁스 - 고래기름"],
      answer: 1,
      optionExplanations: { 1: "카나우바 왁스와 칸데릴라 왁스는 융점을 높이고 단단하게 만듭니다." },
      commonExplanations: []
    },
    {
      id: 64, question: "복잡한 형태의 납원형에 잔류응력이 존재할 때 가열하거나 방치하면 나타나는 현상은?",
      options: ["강도 증가", "투명도 증가", "납원형에 변형/균열이 생긴다", "수축량 감소", "화학적 안정화"],
      answer: 3,
      optionExplanations: { 3: "잔류응력이 풀리면서 치수 변형 및 균열이 발생합니다." },
      commonExplanations: []
    },
    {
      id: 65, question: "주조용 매몰재의 요구조건으로 잘못된 것은?",
      options: ["금속의 주조 수축을 보상할 만큼 팽창해야 한다", "주조 압력을 견딜 충분한 강도를 가져야 한다", "몰드 내 가스를 배출할 통기성이 있어야 한다", "매몰재의 강도는 약할수록 좋다", "주조 금속과 화학 반응을 일으키지 않아야 한다"],
      answer: 4,
      optionExplanations: { 4: "주조 압력을 견딜 수 있는 충분한 강도가 필수적입니다." },
      commonExplanations: []
    },
    {
      id: 66, question: "석고결합 매몰재의 안전한 최대 소환 한계 온도는?",
      options: ["400℃", "500℃", "700℃", "900℃", "1100℃"],
      answer: 3,
      optionExplanations: { 3: "700℃ 초과 시 결합재 석고가 분해되므로 한계 온도는 700℃입니다." },
      commonExplanations: []
    },
    {
      id: 67, question: "ADA 규격 제2호 석고계 매몰재의 알파-반수석고(결합재) 표준 함량은?",
      options: ["5~10%", "15~20%", "25~35%", "50~60%", "70~80%"],
      answer: 3,
      optionExplanations: { 3: "결합재 알파-반수석고는 25~35% 비율로 배합됩니다." },
      commonExplanations: []
    },
    {
      id: 68, question: "ADA 규격 No.2 치과주조용 매몰재 분류 설명으로 잘못된 것은?",
      options: ["Type I은 인레이 주조용 열팽창형이다", "Type II는 인레이 주조용 수화팽창형이다", "Type III 매몰재는 partial denture주조용으로 수화팽창용이다", "각 유형별로 요구되는 압축강도 기준이 있다", "매몰재의 주성분은 실리카와 결합재이다"],
      answer: 3,
      optionExplanations: { 3: "Type III 매몰재의 규격 분류 설명이 잘못되었습니다." },
      commonExplanations: []
    },
    {
      id: 69, question: "주조용 매몰재의 팽창에 관한 설명 중 틀린 것은?",
      options: ["납형매몰 후 초기경화 후에 물속에 담그는 것이 초기 경화시간에 담그는 것보다 팽창량이 더 크다", "수화팽창은 초기 경화 반응 중에 물을 공급해야 극대화된다", "혼수비가 낮을수록 팽창량이 증가한다", "실리카 함량이 많을수록 열팽창이 증가한다", "링 라이너를 사용하면 팽창이 원활해진다"],
      answer: 1,
      optionExplanations: { 1: "경화 반응 중에 물에 담가야 수화팽창이 극대화됩니다." },
      commonExplanations: []
    },
    {
      id: 70, question: "주조과정에서 보상이 요구되는 주된 수축 요인이 아닌 것은?",
      options: ["용융 금속의 액간 응고 수축", "응고 후 실온까지 냉각 시 금속 열수축", "간접법은 실내온도와는 관계없이 납형제작 시 왁스의 연화온도에 영향을 받는다", "납형의 냉각 수축", "금속 고유의 체적 수축"],
      answer: 3,
      optionExplanations: { 3: "주조 수축 보상의 핵심은 왁스 수축과 금속의 응고 및 냉각 수축입니다." },
      commonExplanations: []
    },
    {
      id: 71, question: "경도를 측정하는 방법 중 원리가 다른 하나는?",
      options: ["록크웰 경도", "비커스 경도", "쇼어경도 (Shore hardness)", "누프 경도", "브리넬 경도"],
      answer: 3,
      optionExplanations: { 3: "쇼어 경도는 반동 높이를 측정하는 반동 경도 시험법입니다." },
      commonExplanations: []
    },
    {
      id: 72, question: "다음의 기계적 성질 용어 설명 중 틀린 내용은?",
      options: ["탄성은 외력 제거 시 원래로 돌아가는 성질이다", "전성(malleability)은 인장응력에 파절되지 않는 능력이다", "연성은 인장 하중을 받아 가늘고 길게 늘어나는 성질이다", "인성은 파절에 이르기까지 에너지를 흡수하는 능력이다", "취성은 영구 변형 없이 파절되는 부서짐성이다"],
      answer: 2,
      optionExplanations: { 2: "전성(Malleability)은 압축 응력에 얇게 펴지는 성질입니다." },
      commonExplanations: []
    },
    {
      id: 73, question: "응력과 변형에 대한 설명 중 틀린 내용은?",
      options: ["내부 저항력을 응력이라 한다", "변형률은 외력에 의한 단위 길이당 변화량이다", "탄성한계 이내에서는 훅의 법칙이 성립한다", "비례한계까지 응력과 변형률은 정비례한다", "물체에 1종의 하중을 가하면 1종의 응력만 생긴다"],
      answer: 5,
      optionExplanations: { 5: "외력이 가해지면 내부에는 복합 응력이 동시에 발생합니다." },
      commonExplanations: []
    },
    {
      id: 74, question: "석고에 대한 설명으로 옳은 것만의 조합은?",
      contextBox: "가. 보통·경·초경석고의 화학식은 반수석고로 동일하다\n나. 석고 분말은 혼수비가 수복재 중 비교적 높다\n다. 경화 시 발열 반응을 나타낸다\n라. 혼수비가 증가하면 강도는 감소한다",
      options: ["가, 나", "다, 라", "가, 다, 라", "나, 다, 라", "가, 나, 다, 라"],
      answer: 5,
      optionExplanations: { 5: "가, 나, 다, 라 모두 치과용 석고의 올바른 특성입니다." },
      commonExplanations: []
    },
    {
      id: 75, question: "석고의 경화시간 조절방법으로 바른 것만의 조합은?",
      contextBox: "가. 연화속도가 빠를수록 촉진된다\n나. 혼수비가 커지면 지연된다\n다. 슬러리 워터를 사용하면 지연된다\n라. 식염을 대량 첨가하면 촉진된다",
      options: ["가, 나", "다, 라", "가, 다", "나, 라", "가, 라"],
      answer: 1,
      optionExplanations: { 1: "연화 속도 증가는 촉진(가), 혼수비 증가는 지연(나)시킵니다." },
      commonExplanations: []
    },
    {
      id: 76, question: "석고의 경화시간에 영향을 미치는 요인 중 바른 것만의 조합은?",
      contextBox: "가. 분말 입자가 미세할수록 경화시간이 짧다\n나. 수온이 낮을수록 경화시간이 길어진다\n다. 심하게 혼합할수록 경화시간이 짧아진다\n라. 혼수비가 작을수록 경화시간이 짧아진다",
      options: ["가, 나", "다, 라", "가, 다, 라", "나, 다, 라", "가, 나, 다, 라"],
      answer: 5,
      optionExplanations: { 5: "가, 나, 다, 라 모두 정확한 설명입니다." },
      commonExplanations: []
    },
    {
      id: 77, question: "경화한 석고의 강도에 대한 설명 중 틀린 것만의 조합은?",
      contextBox: "가. 경화 후 완전히 건조되면 약해진다\n나. 초기경화 후 반응이 지속되며 점차 강화된다\n다. 혼수비가 낮을수록 최종 강도가 높다\n라. 화학적 촉진제를 과량 추가하면 강도가 대폭 증가한다",
      options: ["가, 라", "나, 다", "가, 나", "다, 라", "가, 다"],
      answer: 1,
      optionExplanations: { 1: "건조되면 2배 이상 강해지고(가-틀림), 화학 촉진제 과량 첨가는 강도를 낮춥니다(라-틀림)." },
      commonExplanations: []
    },
    {
      id: 78, question: "경화한 석고 표면이 거칠어지는 원인으로 바른 것만의 조합은?",
      contextBox: "가. 혼수량 과다\n나. 경화 반응 미완결 상태에서 조기 분리\n다. 세척 시 흐르는 물에 과도하게 담금\n라. 알지네이트 인상체 표면 수분의 영향",
      options: ["가, 나", "다, 라", "가, 다, 라", "나, 다, 라", "가, 나, 다, 라"],
      answer: 5,
      optionExplanations: { 5: "가, 나, 다, 라 모두 석고 표면 조도를 거칠게 만듭니다." },
      commonExplanations: []
    },
    {
      id: 79, question: "치과용 석고의 제조 및 분류에 대해 바른 것만의 조합은?",
      contextBox: "가. 보통석고는 오토클레이브에서 가압 소성한다\n나. 경석고는 증기압 하에서 가압 소성한다\n다. 화학식은 반수석고(CaSO₄·½H₂O)이다\n라. 입자 구조 차이로 요구 혼수비가 서로 다르다",
      options: ["가, 다", "나, 다, 라", "가, 나, 다", "다, 라", "가, 라"],
      answer: 2,
      optionExplanations: { 2: "경석고는 오토클레이브 가압 소성(나), 화학식(다), 혼수비 차이(라)가 맞습니다." },
      commonExplanations: []
    },
    {
      id: 80, question: "다음 인상재 분류 조합 중 틀린 것은 어느 것인가?",
      options: ["알지네이트 - 탄성이 있으며 비가역성이다", "인상용 컴파운드 - 탄성이 없으며 가역성이다", "폴리설파이드 - 탄성이 있으며 비가역성이다", "한천인상재 - 탄성이 없으며 물리적 변화를 이용한다", "산화아연유지놀 - 탄성이 없으며 비가역성이다"],
      answer: 4,
      optionExplanations: { 4: "한천(Agar) 인상재는 탄성을 가지는 수성교질 탄성 인상재입니다." },
      commonExplanations: []
    },
    {
      id: 81, question: "경화 후 공기 중이나 시간 경과에 따른 치수 안정성이 뛰어난 인상재끼리 짝지어진 것은?",
      contextBox: "가. 알지네이트 인상재       나. 산화아연유지놀(ZOE) 인상재\n다. 부가형 실리콘 인상재     라. 한천(Agar) 인상재",
      options: ["가, 라", "나, 다", "가, 다", "나, 라", "가, 나, 다"],
      answer: 2,
      optionExplanations: { 2: "ZOE(나)와 부가형 실리콘(다)은 치수 안정성이 뛰어납니다." },
      commonExplanations: []
    },
    {
      id: 82, question: "산화아연유지놀(ZOE) 인상재에 대한 설명으로 옳은 것만의 조합은?",
      contextBox: "가. 실내 온도가 높을수록 경화가 지연된다\n나. 경화 후 치수 변화가 매우 작다\n다. 무치악 정밀 인상에 주로 사용된다\n라. 가역성 탄성 인상재에 속한다",
      options: ["가, 라", "나, 다", "가, 나, 다", "나, 라", "다, 라"],
      answer: 2,
      optionExplanations: { 2: "치수 변화가 작고(나), 무치악 정밀 인상에 유용합니다(다)." },
      commonExplanations: []
    },
    {
      id: 83, question: "한천(Agar) 인상재에 대해 바른 것만의 조합은?",
      contextBox: "가. 친수성이 낮아 미세 부위 재현이 힘들다\n나. 공기 중에 방치하면 이수(Syneresis) 현상으로 수축한다\n다. 붕사를 첨가하여 겔 강도를 높인다\n라. 황산칼륨은 석고의 경화를 지연시킨다",
      options: ["가, 다", "나, 다", "가, 라", "나, 라", "가, 나, 다"],
      answer: 2,
      optionExplanations: { 2: "이수 현상으로 수축하고(나), 붕사로 강도를 높입니다(다)." },
      commonExplanations: []
    },
    {
      id: 84, question: "고무질 인상재에 대한 설명 중 옳은 것만의 조합은?",
      contextBox: "가. Polysulfide는 고무질 인상재 중 경화시간이 긴 편이다\n나. 부가형 실리콘은 반응 부산물이 없어 치수안정성이 우수하다\n다. 축합형 실리콘은 반응 부산물이 전혀 없다\n라. 주입용 모형재로 초경석고 사용이 가능하다",
      options: ["가, 다", "나, 다", "가, 나, 라", "나, 라", "가, 나, 다, 라"],
      answer: 3,
      optionExplanations: { 3: "축합형 실리콘은 알코올 부산물이 발생하므로(다-틀림), 가, 나, 라가 맞습니다." },
      commonExplanations: []
    },
    {
      id: 85, question: "치과용 아크릴 레진에 대해 바른 것만의 조합은?",
      contextBox: "가. 구강 내에서 화학적으로 매우 불안정하다\n나. 병상(Dough) 단계에서 성형성이 우수하다\n다. 비중이 금속보다 작아 가볍다\n라. 열전도율이 금속보다 크다",
      options: ["가, 라", "나, 다", "가, 나", "다, 라", "가, 나, 다"],
      answer: 2,
      optionExplanations: { 2: "병상 단계에서 성형성이 좋고(나), 금속보다 가볍습니다(다)." },
      commonExplanations: []
    },
    {
      id: 86, question: "치과용 레진의 특성에 대해 바른 것만의 조합은?",
      contextBox: "가. 가압중합을 하면 무조건 투명해진다\n나. 상온중합레진은 열수축이 없어 전체 중합수축량이 다소 적다\n다. 아크릴 레진치는 도치에 비해 충격에 쉽게 깨진다\n라. 치관용 레진은 상온중합 레진보다 중합도가 높아 내마모성이 우수하다",
      options: ["나, 라", "가, 다", "가, 나", "다, 라", "가, 나, 라"],
      answer: 1,
      optionExplanations: { 1: "상온중합은 열수축이 적고(나), 치관용 레진은 내마모성이 높습니다(라)." },
      commonExplanations: []
    },
    {
      id: 87, question: "가열중합 레진의 기포 발생에 대한 설명 중 틀린 것은?",
      options: ["급격한 가열 시 단량체 비등으로 발생한다", "떡상(Dough) 이전 단계에서 전입 시 수축 기포가 발생한다", "기포는 내부에서만 생기며 레진 표면에는 절대로 생기지 않는다", "중합체 분말이 지나치게 많아도 기포가 발생한다", "플라스크 압력이 부족해도 기포가 발생한다"],
      answer: 3,
      optionExplanations: { 3: "가압 부족이나 급가열 시 표면 부위에도 기포가 발생할 수 있습니다." },
      commonExplanations: []
    },
    {
      id: 88, question: "가열중합 레진상의 변형 방지책으로 옳은 것만의 조합은?",
      contextBox: "가. 떡상 단계 이전에 조기 전입한다\n나. 연마 시 마찰열을 막기 위해 물을 보충한다\n다. 완성된 의치는 건조를 막기 위해 수중에 보관한다\n라. 중합 완료 직후 플라스크를 냉수에 급냉한다",
      options: ["가, 라", "나, 다", "가, 나", "다, 라", "가, 나, 다"],
      answer: 2,
      optionExplanations: { 2: "연마 시 물을 보충하고(나), 건조 수축 방지를 위해 수중 보관합니다(다)." },
      commonExplanations: []
    },
    {
      id: 89, question: "아크릴 수지(acrylic resin) 의치상의 장점이 아닌 것만의 조합은?",
      contextBox: "가. 심미성이 우수하다\n나. 금속보다 기계적 강도가 우수하다\n다. 수리 및 가공이 용이하다\n라. 구강 내 음식의 온도 전달이 우수하다",
      options: ["가, 다", "나, 라", "가, 나", "다, 라", "나, 다"],
      answer: 2,
      optionExplanations: { 2: "기계적 강도가 낮고(나), 열전도율이 떨어집니다(라)." },
      commonExplanations: []
    },
    {
      id: 90, question: "치과용 도재(Porcelain)의 기계적 성질에 대해 바른 것만의 조합은?",
      contextBox: "가. 인장응력에 매우 강하다\n나. 압축응력에 매우 강하다\n다. 표면 경도가 높아 내마모성이 크다\n라. 충격력에 강해 잘 깨지지 않는다",
      options: ["가, 라", "나, 다", "가, 나", "다, 라", "나, 라"],
      answer: 2,
      optionExplanations: { 2: "압축 강도가 높고(나), 내마모성이 우수합니다(다)." },
      commonExplanations: []
    },
    {
      id: 91, question: "치과용 도재(Porcelain)의 주요 구성 성분이 아닌 것은?",
      options: ["장석(Feldspar)", "석영(Quartz)", "고령토(Kaolin)", "알루미나(Alumina)", "탄소(Carbon)"],
      answer: 5,
      optionExplanations: { 5: "탄소는 소성 시 가스를 일으켜 기포를 만드므로 배제됩니다." },
      commonExplanations: []
    },
    {
      id: 92, question: "600℃에서 Silica 동소체들의 열팽창이 작은 순서로부터 큰 순서로 바르게 짝지어진 것은?",
      options: [
        "용융석영 - 트리디마이트 - 석영 - 크리스토발라이트",
        "크리스토발라이트 - 석영 - 트리디마이트 - 용융석영",
        "석영 - 용융석영 - 크리스토발라이트 - 트리디마이트",
        "트리디마이트 - 석영 - 용융석영 - 크리스토발라이트",
        "용융석영 - 크리스토발라이트 - 석영 - 트리디마이트"
      ],
      answer: 1,
      optionExplanations: { 1: "용융석영 < 트리디마이트 < 석영 < 크리스토발라이트 순입니다." },
      commonExplanations: []
    },
    {
      id: 93, question: "니켈크롬(Ni-Cr) 합금과 코발트크롬(Co-Cr) 합금의 비교에서 옳은 것만의 조합은?",
      contextBox: "가. Co-Cr 합금이 Ni-Cr 합금보다 융점이 낮다\n나. Co-Cr 합금이 경도가 더 높다\n다. Co-Cr 합금이 인장강도가 더 높다\n라. Co-Cr 합금이 신장률(연성)이 더 높다",
      options: ["가, 라", "나, 다", "가, 나", "다, 라", "나, 라"],
      answer: 2,
      optionExplanations: { 2: "Co-Cr 합금이 경도가 더 높고(나), 인장강도가 더 높습니다(다)." },
      commonExplanations: []
    },
    {
      id: 94, question: "왁스의 강인성을 높이며 표면의 매끄러움과 광택을 증대시키는 첨가제 성분은?",
      options: ["밀납", "carnauba wax", "파라핀 왁스", "바셀린", "스테아린산"],
      answer: 2,
      optionExplanations: { 2: "카나우바 왁스는 왁스를 단단하게 하고 표면 광택을 줍니다." },
      commonExplanations: []
    },
    {
      id: 95, question: "용도에 따른 분류 중 형태용(Pattern) 왁스로만 묶인 것은?",
      options: [
        "Inlay wax, Casting wax, Baseplate wax",
        "Boxing wax, Utility wax, Sticky wax",
        "Corrective wax, Bite registration wax",
        "Sticky wax, Inlay wax, Utility wax",
        "Baseplate wax, Boxing wax, Bite wax"
      ],
      answer: 1,
      optionExplanations: { 1: "인레이, 주조용, 기초상 왁스는 납형 제작용 패턴 왁스입니다." },
      commonExplanations: []
    },
    {
      id: 96, question: "치과용 왁스에 대한 설명 중 옳지 않은 것은?",
      options: ["Inlay wax는 치관 수복물 납형에 쓰인다", "Baseplate wax는 의치상 제작에 쓰인다", "Sticky wax는 기공물 고정 및 수리에 쓰인다", "sheet wax는 구강 내 최종 정밀인상에 이용한다", "Boxing wax는 인상체 주위를 둘러 모형을 부을 때 쓰인다"],
      answer: 4,
      optionExplanations: { 4: "Sheet wax는 국소의치 납형 릴리프용 패턴 왁스입니다." },
      commonExplanations: []
    },
    {
      id: 97, question: "주조용 주입선(Sprue)에 대한 설명 중 옳지 않은 것은?",
      options: ["납형의 가장 두꺼운 부위에 부착한다", "용융 금속의 냉각 수축을 보상하는 저수조 역할을 한다", "주입선의 길이는 너무 길지 않아야 한다", "pattern과 sprue선과의 연결부는 항상 좁게 해준다", "금속 유입 시 와류가 생기지 않도록 완만하게 연결한다"],
      answer: 4,
      optionExplanations: { 4: "연결부가 좁으면 조기 응고되므로 완만하고 넓게 연결합니다." },
      commonExplanations: []
    },
    {
      id: 98, question: "매몰재의 고유 팽창 조절에 관계가 없는 요인은?",
      options: ["실리카(Silica)의 종류", "매몰재의 혼수비", "주조용 ring의 크기", "소환 온도", "실리카 입자 크기"],
      answer: 3,
      optionExplanations: { 3: "링 크기 자체는 매몰재 고유의 물리화학적 팽창률을 바꾸지 않습니다." },
      commonExplanations: []
    },
    {
      id: 99, question: "매몰재의 혼수비(W/P ratio)가 낮을 경우의 설명으로 옳지 않은 것은?",
      options: ["경화팽창이 커진다", "수화팽창이 작아진다", "열팽창이 커진다", "매몰재의 강도가 증가한다", "입자 밀도가 높아진다"],
      answer: 2,
      optionExplanations: { 2: "혼수비가 낮을수록 입자 반발력으로 수화팽창도 커집니다." },
      commonExplanations: []
    },
    {
      id: 100, question: "다음 매몰재 팽창에 대한 설명 중 옳지 않은 것은?",
      options: ["혼수비가 낮을수록 경화팽창이 크다", "혼수비가 높을수록 경화팽창이 크다", "실리카 함량이 많을수록 열팽창이 크다", "수화팽창은 물속에서 경화 시 발생한다", "링 라이너는 팽창을 돕는 역할을 한다"],
      answer: 2,
      optionExplanations: { 2: "혼수비가 높으면 입자 밀도가 떨어져 경화팽창이 작아집니다." },
      commonExplanations: []
    },
    {
      id: 101, question: "치과용 석고계 매몰재의 기본 성분으로 옳게 짝지어진 것은?",
      options: ["plaster, quartz (석고 및 석영/크리스토발라이트)", "alginate, agar", "resin, monomer", "zinc oxide, eugenol", "porcelain, feldspar"],
      answer: 1,
      optionExplanations: { 1: "결합재 반수석고(Plaster)와 내화재 실리카(Quartz)로 구성됩니다." },
      commonExplanations: []
    },
    {
      id: 102, question: "주조용 링에 Ring liner(완충대)를 설치해 주는 이유가 아닌 것은?",
      options: ["매몰재의 경화팽창을 허용하기 위해", "매몰재의 열팽창을 원활하게 돕기 위해", "주조 후 링에서 매몰재 분리를 쉽게 하기 위해", "금속 링의 구속력을 완충하기 위해", "매몰재 가열시 내부 가스를 직접 흡수/제거하기 위해"],
      answer: 5,
      optionExplanations: { 5: "링 라이너는 팽창 완충재일 뿐 가스를 흡수하는 배출 수단이 아닙니다." },
      commonExplanations: []
    },
    {
      id: 103, question: "금합금을 주조한 직후 서냉시키지 않고 물에 quenching(급냉)하는 주된 이유는?",
      options: ["강도 및 경도 극대화", "연성 증가 (연화열처리 효과로 다듬질 용이)", "주조 수축 방지", "산화막 형성 유도", "기포 제거"],
      answer: 2,
      optionExplanations: { 2: "연화열처리 효과를 얻어 금합금이 무르고 연해져 연마 가공이 쉬워집니다." },
      commonExplanations: []
    },
    {
      id: 104, question: "납착 시 사용하는 융제(Flux)의 설명으로 옳지 않은 것은?",
      options: ["금속 표면의 산화물을 용해 제거한다", "용융 납착재의 흐름성과 젖음성을 향상시킨다", "융제가 용융시 완전히 소각되어 증발해야 한다", "금속 표면을 덮어 추가 산화를 방지한다", "붕사와 붕산 등이 주성분이다"],
      answer: 3,
      optionExplanations: { 3: "융제는 녹아서 피막을 유지하여 공기를 차단해야 합니다." },
      commonExplanations: []
    },
    {
      id: 105, question: "금합금 주조체에서 국부수축다공성(Localized shrinkage porosity)을 발생시키는 가장 큰 원인은?",
      options: ["매몰재 소환 온도가 너무 높을 때", "합금을 과도하게 가열했을 때", "원심 주조기 회전력이 너무 강할 때", "주입선 길이가 너무 짧을 때", "주입선이 가늘어 용융금속 공급이 불완전할 때"],
      answer: 5,
      optionExplanations: { 5: "주입선이 얇으면 먼저 응고되어 수축 금속 보충이 끊기기 때문입니다." },
      commonExplanations: []
    }
  ]
};
