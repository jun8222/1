window.quizDatabase = window.quizDatabase || {};

window.quizDatabase.partial_denture = {
  title: "국소의치기공학 (1번 ~ 72번)",
  questions: [
    /* =========================================================
       모의고사 1회 (59번 ~ 82번 -> 1번 ~ 24번)
       ========================================================= */
    {
      id: 1,
      question: "다음 중 치아 결손시 발생할 수 있는 문제점이 아닌 것은?",
      options: [
        "치아간 지지 역할 감소",
        "발음의 이상",
        "대합치의 정출",
        "교합고경의 상실",
        "음식물 끼임 현상 증가"
      ],
      answer: 1,
      optionExplanations: {
        1: "치아가 결손되면 치아 상호 간의 지지 작용이 단순 감소하는 수준이 아니라 지지점이 완전 상실되어 인접치가 결손부로 경사 및 이동하게 됩니다.",
        2: "전치부 결손 시 기류 누출로 인해 마찰음이나 치찰음 발음 이상이 발생합니다.",
        3: "맞닿는 교합 저항이 없어지므로 대합치가 결손 공간으로 정출(Extrusion)됩니다.",
        4: "다수 구치 상실 시 수직 교합 고경(VDO)이 붕괴되어 안모 높이가 낮아집니다.",
        5: "인접치 경사로 정상적인 치간 접촉 관계가 깨져 음식물 끼임(식체)이 심화됩니다."
      },
      commonExplanations: [
        "치아 결손 방치 시 5대 병변: 인접치 경사·이동, 대합치 정출, 교합고경 상실, 발음·저작 장애, 음식물 저류"
      ]
    },
    {
      id: 2,
      question: "주연결장치(Major connector)의 요구조건이 아닌 것은?",
      options: [
        "돌출된 조직은 relief를 해준다.",
        "가능한 두껍게 하여 견고성을 주어야 한다.",
        "언어나 혀운동에 지장이 없어야 한다.",
        "상악은 변연부로부터 6mm, 하악은 4mm이상 떨어져야 한다.",
        "모양은 타원형 등으로 예각을 주어서는 안된다."
      ],
      answer: 2,
      optionExplanations: {
        1: "골돌기(Torus)나 정중구개봉합선 등 얇은 점막 하 골융기 부위는 압박 괴사를 막기 위해 릴리프해야 합니다.",
        2: "주연결장치는 무조건 두껍게 만드는 것이 아니라 반배형(Half-pear) 단면 등 적절한 형태 설계를 통해 얇으면서도 견고성(Rigidity)을 부여해야 이물감을 줄입니다.",
        3: "혀의 운동 공간과 발성 기능을 방해하지 않는 위치와 형태여야 합니다.",
        4: "치은연 혈류 장애를 막기 위해 유리 치은연으로부터 상악 6mm 이상, 하악 4mm 이상 이격시킵니다.",
        5: "예각은 연조직 자극과 응력 집중을 초래하므로 모든 모서리는 둥근 형태(Rounded)로 이행해야 합니다."
      },
      commonExplanations: [
        "주연결장치 치은연 이격 거리 공식: 상6하4 (상악 6mm 이상, 하악 4mm 이상)"
      ]
    },
    {
      id: 3,
      question: "국소의치 금속구조물에서 External finish line(외경계선)이 형성되는 시기는?",
      options: [
        "relief 시",
        "surveying 시",
        "wax-up 시",
        "연마 시",
        "설계 시"
      ],
      answer: 3,
      optionExplanations: {
        1: "주모형 릴리프(Relief) 단계의 왁스 단차는 내경계선(Internal finish line)을 형성합니다.",
        2: "서베잉은 삽입로와 언더컷을 분석하는 단계입니다.",
        3: "외경계선(External finish line)은 내화성 모형 상에서 금속구조물 납형을 형성할 때(Wax-up 시) 왁스를 조각하여 맞물림 단차(Butt joint)를 부여함으로써 형성됩니다.",
        4: "연마 단계에서는 이미 형성된 경계선을 다듬는 과정입니다.",
        5: "설계는 모형 표면에 계획선을 긋는 단계입니다."
      },
      commonExplanations: [
        "내경계선(Internal finish line) = 주모형 릴리프 시 / 외경계선(External finish line) = 납형 형성(Wax-up) 시"
      ]
    },
    {
      id: 4,
      question: "Backaction clasp에 필요한 적정 언더컷 깊이 양은?",
      options: ["20G", "30G", "0.25mm", "2.5mm", "25mm"],
      answer: 3,
      optionExplanations: {
        1: "20G(0.020 inch / 0.50mm)는 가공선(Wrought wire) 클래스프에 적용되는 깊이입니다.",
        2: "30G(0.030 inch / 0.75mm)는 탄성이 매우 큰 긴 가공선에 쓰입니다.",
        3: "Backaction clasp는 주조 원주형 클래스프의 일종이므로 표준 언더컷 깊이인 0.010 inch = 0.25mm(10 gauge)를 필요로 합니다.",
        4: "2.5mm는 치아 파절을 부르는 과도한 치수입니다.",
        5: "비현실적인 수치입니다."
      },
      commonExplanations: [
        "표준 언더컷: 주조 클래스프 = 0.010\" (0.25mm, 10G) / 가공선 클래스프 = 0.020\" (0.50mm, 20G)"
      ]
    },
    {
      id: 5,
      question: "부연결장치(Minor connector)의 설명으로 옳지 않은 것은?",
      options: [
        "충분히 견고해야 한다.",
        "예각이 져서는 안된다.",
        "치간 부연결장치는 치아와 치아사이에 위치한다.",
        "의치상유지부 부연결장치는 수평부연결장치로 saddle부위를 말한다.",
        "수평부연결장치의 사이는 최소한 5mm의 간격을 두어야 한다."
      ],
      answer: 5,
      optionExplanations: {
        1: "교합력을 주연결장치와 치조제로 분산 전달하기 위해 충분한 견고성(Rigidity)이 요구됩니다.",
        2: "응력 집중과 음식물 잔사 침착을 막기 위해 모든 접합부는 둥글게 이행해야 합니다.",
        3: "치간 부연결장치는 지대치 사이의 인접치간 공극에 수직으로 위치합니다.",
        4: "의치상 유지부(안부, Saddle)는 인공치와 레진을 지지하는 수평 부연결장치입니다.",
        5: "의치상 유지망(Mesh/Lattice) 스트럿 사이 간격은 레진이 충분히 흘러들어가 결합하도록 최소 2.5~3mm 이상이면 족하며, 5mm 규격은 잘못되었습니다."
      },
      commonExplanations: []
    },
    {
      id: 6,
      question: "RPI clasp에서 I-bar가 연조직을 통과하는 부위의 relief 양은?",
      options: ["10G", "20G", "30G", "24G", "32G"],
      answer: 5,
      optionExplanations: {
        1: "10G는 너무 두꺼워 I-bar가 입술 쪽으로 크게 돌출됩니다.",
        2: "20G는 과도한 두께입니다.",
        3: "30G는 RPI의 인접판(Proximal plate) 하방 연조직 릴리프 규격입니다.",
        4: "24G는 주연결장치 시트 왁스 규격입니다.",
        5: "I-bar의 접근 암(Approach arm)이 치은 점막을 통과할 때 연조직 자극을 방지하고 유연성을 주기 위해 32 Gauge(약 0.2mm)의 아주 얇은 시트 왁스로 릴리프합니다."
      },
      commonExplanations: [
        "RPI 릴리프 규격: I-bar 접근 암 하방 = 32G / 인접판(Proximal plate) 하방 = 30G"
      ]
    },
    {
      id: 7,
      question: "지대치 유도면(Guiding plane)과 접촉하여 의치의 삽입과 철거 경로를 안내하는 구성요소는?",
      options: [
        "직접유지장치",
        "주연결장치",
        "교합면 rest",
        "부연결장치",
        "간접유지장치"
      ],
      answer: 4,
      optionExplanations: {
        1: "직접유지장치는 치아 언더컷에 걸려 탈락에 저항하는 장치입니다.",
        2: "주연결장치는 좌우 악궁 요소를 연결하는 주 골격입니다.",
        3: "교합면 레스트는 치아 장축으로 수직 교합력을 전달하고 침하를 막습니다.",
        4: "지대치 인접면에 형성된 유도면(Guiding plane)과 직접 접촉하여 착탈로를 조절하고 수평 안정을 돕는 구조물은 '유도면 부연결장치(Proximal plate / Minor connector)'입니다.",
        5: "간접유지장치는 지점선 회전을 막아줍니다."
      },
      commonExplanations: [
        "유도면(Guiding plane)과 접촉 ➔ 부연결장치(인접판, Proximal plate)"
      ]
    },
    {
      id: 8,
      question: "국소의치에서 의치의 수직회전 탈락운동을 막아주는 기능을 담당하는 부위는?",
      options: [
        "간접유지장치",
        "주연결장치",
        "부연결장치",
        "직접유지장치",
        "의치상"
      ],
      answer: 1,
      optionExplanations: {
        1: "간접유지장치(Indirect retainer)는 유리단 의치상이 지점선(Fulcrum line)을 축으로 연조직에서 들떠 뒤집어지려는 수직 회전 운동을 억제합니다.",
        2: "주연결장치는 악궁 간 지지와 결합을 담당합니다.",
        3: "부연결장치는 주연결장치와 개별 구성요소를 잇습니다.",
        4: "직접유지장치는 의치의 단순 상방 수직 탈락에 저항합니다.",
        5: "의치상은 인공치를 배열하고 점막을 피개합니다."
      },
      commonExplanations: [
        "지점선 중심 수직 회전 운동 방지 = 간접유지장치(Indirect retainer)"
      ]
    },
    {
      id: 9,
      question: "Roach clasp(Bar clasp)에 대한 설명으로 옳은 것만의 조합은?",
      contextBox: "가. double T clasp\n나. 구치부 언더컷 양은 0.25mm\n다. 전치부 언더컷 양은 10G\n라. 유리단 국소의치에 적용되며 중간결손시에도 좋다",
      options: ["가, 나, 다", "가, 다", "나, 라", "라", "가, 나, 다, 라"],
      answer: 5,
      optionExplanations: {
        1: "라 항목도 Roach clasp의 대표적 임상 적응증입니다.",
        2: "나, 라 항목이 누락되었습니다.",
        3: "가, 다 항목이 누락되었습니다.",
        4: "단일 항목 선택으로 부족합니다.",
        5: "Roach clasp는 T, Y, I, L, Double T 등 다양한 변형이 있고(가), 표준 주조 언더컷은 0.25mm = 10G(0.01\")를 적용하며(나, 다), 치은측 접근 암 구조로 심미성이 좋아 유리단 및 중간결손치 모두에 적합합니다(라)."
      },
      commonExplanations: [
        "Roach clasp: 치은측 치조제에서 접근(Infrabulge) / 언더컷 0.25mm(10G) / 심미성 우수"
      ]
    },
    {
      id: 10,
      question: "클래스프(Clasp) 설계의 기본원칙 중 옳지 않은 것은?",
      options: [
        "유지부와 같은쪽에 보상부를 둔다.",
        "탈락되지 않는 한도의 최소한의 유지량이 가장 좋다.",
        "clasp와 지대치가 접촉하는 면적은 가급적 적게 하고, 설계는 단순한 것이 좋다.",
        "후방연장국소의치에서 최후방 지대치에는 탄력성이 많은 clasp가 좋다.",
        "유지부는 협면에 보상부는 설면에 형성한다."
      ],
      answer: 1,
      optionExplanations: {
        1: "보상부(Reciprocal arm)는 유지암이 최대풍융부를 넘을 때 발생하는 측방압에 저항하기 위해 유지부의 '반대쪽 표면(대향면)'에 위치해야 합니다. 같은 쪽에 두면 치아를 보호할 수 없습니다.",
        2: "치아 치주 보호를 위해 의치가 빠지지 않는 한 최소의 유지력을 사용하는 것이 이상적입니다.",
        3: "치태 축적과 치아 마모를 줄이기 위해 접촉 면적을 줄이고 단순하게 설계합니다.",
        4: "유리단 의치상의 침하 시 지대치를 비틀지 않도록 탄력성이 풍부한 클래스프(RPI, 가공선 등)를 사용합니다.",
        5: "통상적으로 심미성과 착탈을 고려해 협면에 유지암, 설면에 보상암을 둡니다."
      },
      commonExplanations: [
        "보상 작용(Reciprocation) 원칙 = 유지암 반대편 표면에 보상암이 위치하여 측방압 상쇄"
      ]
    },
    {
      id: 11,
      question: "RPA clasp에 대한 설명으로 틀린 것은?",
      options: [
        "mesial rest를 형성",
        "0.01inch 언더컷 양 필요",
        "유지부는 Akers 유지부로 형성",
        "조직부의 언더컷이 심하여 I bar 설계가 어려울 때 사용",
        "proximal plate를 형성"
      ],
      answer: 3,
      optionExplanations: {
        1: "근심 레스트(Mesial rest)를 적용하여 응력 해방을 도모합니다.",
        2: "0.010 inch(0.25mm) 주조 언더컷을 활용합니다.",
        3: "RPA의 원주형 유지암은 단순 Akers 암이 아니라, 저작 시 지대치에 비틀림 토크를 주지 않도록 어깨 부위는 서베이라인 상방에 뜨고 암의 '끝 1/3만 언더컷'에 들어가는 특수 굴곡 암을 사용해야 합니다.",
        4: "지대치 협측 하방 연조직에 심한 언더컷이 있어 I-bar 접근 암을 쓸 수 없을 때 대체 설계합니다.",
        5: "원심 유도면에 접촉하는 인접판(Proximal plate)을 형성합니다."
      },
      commonExplanations: [
        "RPA = Rest (Mesial) + Proximal plate + Akers-type arm (협측 조직 언더컷 심할 때 I-bar 대체)"
      ]
    },
    {
      id: 12,
      question: "간접유지장치(Indirect retainer)에 대한 설명 중 맞는 것은?",
      options: [
        "조직부 운동의 허용",
        "모든 치아에 적용 가능",
        "수직회전 탈락운동 방지",
        "지점선에 가깝게 설정",
        "하악 주연결장치 중 lingual bar의 좌우 끝에 rest를 만들어 간접유지장치 역할"
      ],
      answer: 3,
      optionExplanations: {
        1: "조직부의 유해한 들림 운동을 억제합니다.",
        2: "지점선에서 전방으로 멀리 떨어진 지지력이 좋은 특정 치아(주로 견치, 제1소구치)에 선별 적용합니다.",
        3: "간접유지장치의 본질적인 목적은 지점선(Fulcrum line)을 축으로 의치상이 점막에서 들떠 떨어지는 수직 회전 탈락을 방지하는 것입니다.",
        4: "지렛대 원리에 의해 지점선에서 '가장 멀리 떨어진 곳'에 위치시켜야 회전 저항 효율이 극대화됩니다.",
        5: "하악 설측바 자체가 아니라 전방 치아에 얹히는 레스트가 간접유지를 제공합니다."
      },
      commonExplanations: [
        "간접유지장치 원리 = 지점선에서 직각 방향으로 가장 멀리 전방에 위치 (견치 설면 레스트 선호)"
      ]
    },
    {
      id: 13,
      question: "후방연장(유리단) 국소의치에 주로 사용하는 응력 완압형 클래스프는?",
      options: [
        "Akers Clasp",
        "backaction Clasp",
        "ring Clasp",
        "R.P.I Clasp",
        "hair pin Clasp"
      ],
      answer: 4,
      optionExplanations: {
        1: "Akers clasp는 지대치에 지렛대 작용을 가하므로 치아 지지형(Class III)에 주로 쓰입니다.",
        2: "단독 소구치 등에 제한 적용되는 원주형 클래스프입니다.",
        3: "단독 고립 대구치용 클래스프입니다.",
        4: "R.P.I Clasp는 근심 레스트, 원심 인접판, I-bar의 결합으로 유리단(Class I, II) 의치상 침하 시 지대치에 비틀림 측방압을 주지 않고 해방되는 대표적 응력 분산 클래스프입니다.",
        5: "언더컷이 교합면 레스트 직하방에 있을 때 쓰는 역치형 클래스프입니다."
      },
      commonExplanations: [
        "유리단(후방연장) 국소의치 최우선 선택 클래스프 = R.P.I Clasp"
      ]
    },
    {
      id: 14,
      question: "국소의치에서 인공치아의 기능으로 옳지 않은 것은?",
      options: [
        "저작기능을 회복",
        "심미적인 기능 회복",
        "대합치아의 함몰을 유도",
        "정확한 발음을 유도",
        "정신적 안정 도모"
      ],
      answer: 3,
      optionExplanations: {
        1: "상실된 저작 분쇄 효율을 복원합니다.",
        2: "안모 지지 및 자연스러운 미소를 회복합니다.",
        3: "인공치아는 대합치의 정출을 막고 올바른 교합 접촉을 유지하는 것이며, 대합치아를 뼈 속으로 억지로 밀어 넣는 '함몰 유도'는 치주 병변을 일으키는 오답 지문입니다.",
        4: "치간 누기를 차단하여 명확한 발음을 회복합니다.",
        5: "치아 상실로 인한 환자의 대인기피 및 심리적 위축을 해소합니다."
      },
      commonExplanations: []
    },
    {
      id: 15,
      question: "레진치아(Resin teeth)의 대합치로 마모 관점에서 가장 좋지 않은 치아는?",
      options: ["도재치아", "gold foil", "자연치", "레진치", "gold inlay"],
      answer: 1,
      optionExplanations: {
        1: "도재치아(Porcelain teeth)는 표면 경도가 매우 높고 거칠어, 맞닿는 상대방 레진치아를 급속도로 마모시키므로 대합치 조합으로 가장 나쁩니다.",
        2: "금박 충전재는 연전성이 좋아 적합합니다.",
        3: "자연치와 레진치는 무난한 마모 양상을 보입니다.",
        4: "레진치끼리는 마모율이 균일합니다.",
        5: "금 인레이는 레진치를 과도하게 마모시키지 않습니다."
      },
      commonExplanations: [
        "레진 인공치아의 최악 대합치 = 도재치아(Porcelain teeth) ➔ 급격한 마모 유발"
      ]
    },
    {
      id: 16,
      question: "국소의치의 이상적인 착탈로(삽입로)를 결정하는 4대 요인이 아닌 것은?",
      options: ["심미성", "파지", "유지", "장애", "유도면"],
      answer: 2,
      optionExplanations: {
        1: "심미성(Aesthetics)은 금속 노출을 최소화하기 위한 4대 결정 요인입니다.",
        2: "파지(Bracing)는 수평력에 저항하는 보철물의 역학적 기능이며, 삽입로를 결정하는 직접적인 4대 요인에 속하지 않습니다.",
        3: "유지(Retention)는 각 지대치의 균형 잡힌 언더컷을 확보하는 4대 요인입니다.",
        4: "장애(Interference)는 뼈 돌기나 치아 간섭을 회피하는 4대 요인입니다.",
        5: "유도면(Guiding plane)은 지대치 인접면의 평행성을 확보하는 4대 요인입니다."
      },
      commonExplanations: [
        "삽입로 결정 4대 요인 암기 공식: '유·유·장·심' (유도면, 유지, 장애, 심미성)"
      ]
    },
    {
      id: 17,
      question: "지대치 금관(Abutment crown) 제작 시 고려해야 할 사항이 아닌 것은?",
      options: [
        "주연결장치 진입로 형성",
        "필요한 언더컷 형성",
        "삽입로와 평행한 유도면 형성",
        "rest를 위한 rest seat 형성",
        "지대치 협설 교합면은 조금 작게 형성"
      ],
      answer: 1,
      optionExplanations: {
        1: "주연결장치는 구강 연조직 상에 위치하므로 지대치 금관에 진입로를 형성하지 않습니다. (금관에는 부연결장치 진입로를 형성함).",
        2: "클래스프 유지암 팁이 안착할 0.25mm 언더컷을 금관 표면에 형성합니다.",
        3: "착탈로와 평행한 인접면 유도면(Guiding plane)을 형성합니다.",
        4: "수직 교합력을 지지할 숟가락 모양의 레스트 시트를 형성합니다.",
        5: "지대치에 가해지는 교합 하중을 경감하기 위해 교합면 협설 폭경을 자연치보다 약간 좁게 축소 형성합니다."
      },
      commonExplanations: []
    },
    {
      id: 18,
      question: "내화성 매몰재 모형의 표면처리에 관한 설명으로 옳지 않은 것은?",
      options: [
        "매몰재 모형의 강도 증가",
        "주모형의 표면활택 증가",
        "hardener 처리법이 있다.",
        "bees wax 처리법이 있다.",
        "model spray 처리법이 있다."
      ],
      answer: 2,
      optionExplanations: {
        1: "표면처리는 부서지기 쉬운 내화성 모형 표면을 단단하게 만듭니다.",
        2: "표면처리는 복제된 '내화성 매몰재 모형'에 시행하는 공정이며, 원본 석고 모형인 '주모형(Master cast)'의 활택도와는 아무런 관련이 없습니다.",
        3: "경화제(Hardener) 침전법이 활용됩니다.",
        4: "150℃ 용융 비즈왁스에 침전시키는 방법이 널리 쓰입니다.",
        5: "간편한 스프레이 분사 코팅법이 있습니다."
      },
      commonExplanations: [
        "표면처리 대상 = 복제된 내화성 매몰재 모형 (주모형이 아님!) / 목적: 강도 증가, 표면 활택, 납형 접착성 향상"
      ]
    },
    {
      id: 19,
      question: "Lingual bar wax 패턴 형성 시 사용하는 규격으로 틀린 것은?",
      options: [
        "주연결장치는 6G HP form 사용",
        "유도면 부연결장치는 8G HR 사용",
        "finish line는 14G R 사용",
        "수평 부연결장치는 12G HR와 18G R 사용",
        "대구치 보상부에는 8G HR 사용"
      ],
      answer: 5,
      optionExplanations: {
        1: "하악 설측바 주연결장치는 6G Half-pear(반배형)를 사용합니다.",
        2: "유도면 부연결장치는 견고성을 위해 8G Half-round를 씁니다.",
        3: "외경계선 턱 형성에는 14G Round 왁스를 씁니다.",
        4: "의치상 유지망(Saddle)에는 12G HR 및 18G R 왁스를 씁니다.",
        5: "대구치 보상암(Reciprocal arm) 형성에는 10 Gauge 또는 12 Gauge Half-round 왁스를 사용해야 하며, 8G HR은 너무 두꺼워 클래스프 암으로 부적절합니다."
      },
      commonExplanations: [
        "왁스 규격: 설측바 = 6G HP / 부연결장치 = 8G HR / 클래스프 암 = 10~12G HR"
      ]
    },
    {
      id: 20,
      question: "국소의치 주입선(Sprue) 설치 시 유의사항으로 틀린 것은?",
      options: [
        "주주입선은 가능한 짧아야 한다.",
        "주주입선은 가능한 충분히 굵어야 한다.",
        "납구조물의 가장 두꺼운 곳에 단단하게 부착한다.",
        "매끄럽고 평탄해야 한다.",
        "T자나 V자 형태의 접합으로 형성한다."
      ],
      answer: 5,
      optionExplanations: {
        1: "금속 용탕의 조기 응고를 막기 위해 주입선 길이는 가능한 짧아야 합니다.",
        2: "용탕의 공급로 역할을 위해 직경 8~10 Gauge로 충분히 굵어야 합니다.",
        3: "마지막 응고 부위가 되도록 프레임워크의 가장 두꺼운 부위에 부착합니다.",
        4: "용융 금속의 마찰을 줄이기 위해 표면이 매끄러워야 합니다.",
        5: "주입선과 납구조물 접합부에 직각(T자)이나 예각(V자)이 있으면 금속 주입 시 와류가 생기고 매몰재 모서리가 깨지므로, 부드러운 나팔꽃 모양(둔각 곡선)으로 이행시켜야 합니다."
      },
      commonExplanations: []
    },
    {
      id: 21,
      question: "복제모형(Duplicating model) 제작과정에 관한 설명이 아닌 것은?",
      options: [
        "agar를 사용한다.",
        "주모형을 약 30℃의 미온수에 10분정도 담가둔다.",
        "내화성 모형을 만들기 위함이다.",
        "agar 20cm 높이에서 약 1/4mm 줄기의 지름으로 붓는다.",
        "주입온도는 약 51℃이다."
      ],
      answer: 4,
      optionExplanations: {
        1: "가역성 수성교질인 한천(Agar)을 복제 인상재로 사용합니다.",
        2: "주모형이 한천의 수분을 흡수하거나 기포가 생기는 것을 막기 위해 미온수에 10분간 침전시킵니다.",
        3: "금속 주조를 위해 열팽창하는 내화성 매몰재 모형을 얻기 위함입니다.",
        4: "한천 주입 시 약 20cm 높이에서 붓는 것은 맞으나, 줄기 굵기는 약 3mm(1/8 inch) 정도로 일정하게 부어야 조기 응고와 기포를 막을 수 있으며, 1/4mm는 지나치게 가늘어 잘못되었습니다.",
        5: "한천이 주형을 녹이지 않고 안전하게 주입되는 온도는 약 50~55℃(51℃)입니다."
      },
      commonExplanations: [
        "한천 주입 규격: 높이 약 20cm / 줄기 지름 약 3mm (1/8인치) / 주입 온도 50~55℃"
      ]
    },
    {
      id: 22,
      question: "의치상 레진의 '단시간 온성법(Short curing cycle)'으로 옳은 것은?",
      options: [
        "65-70℃의 중합기에서 8시간 이상 물속에 넣어 가열하는 방법",
        "65-70°F의 중합기에서 8시간 이상 물속에 넣어 가열하는 방법",
        "65-70℃의 중합기에서 90분 두었다가 100℃에서 1시간 끓이는 방법",
        "65-70°F의 중합기에서 90분 두었다가 100℃에서 1시간 끓이는 방법",
        "65-70℃의 중합기에서 8시간 두었다가 100℃에서 1시간 끓이는 방법"
      ],
      answer: 3,
      optionExplanations: {
        1: "65~70℃ 수조에서 8시간 이상 계류시키는 것은 '장시간 온성법'입니다.",
        2: "화씨(°F) 단위가 잘못되었습니다.",
        3: "단시간 온성법은 65~75℃ 온수조에서 90분(1시간 30분)간 1차 유지하여 발열을 완충한 후, 100℃ 끓는 물에서 1시간 동안 끓여 중합을 완료하는 사이클입니다.",
        4: "단위 오류입니다.",
        5: "시간 조합 오류입니다."
      },
      commonExplanations: [
        "단시간 온성: 65~75℃ (90분) ➔ 100℃ (60분) / 장시간 온성: 65~70℃ (8~9시간)"
      ]
    },
    {
      id: 23,
      question: "소환(Burnout) 공정에 대한 설명으로 틀린 것은?",
      options: [
        "인산염결합매몰재가 300℃ 정도에서 가장 많은 열팽창을 일으킨다.",
        "경석고 결합매몰재의 경우 약 1350°F에서 mold 수축 초래",
        "경석고 결합매몰재의 경우 약 1450°F에서 결합재 파괴로 인한 균열 발생",
        "경석고 결합매몰재의 경우 약 1450°F에서 유황가스 발생",
        "상방주입선으로 매몰된 링을 소환로에 넣을 때 주입로가 위로 가게 해서 집어 넣는다."
      ],
      answer: 5,
      optionExplanations: {
        1: "인산염계 매몰재는 300℃ 부근에서 급격한 크리스토발라이트 열팽창을 보입니다.",
        2: "석고계 매몰재는 1,350°F(약 730℃) 부근에서 수축이 일어납니다.",
        3: "석고계 매몰재는 1,450°F(약 790℃)를 초과하면 결합재 황산칼슘이 파괴됩니다.",
        4: "석고 열분해 시 아황산가스(SO₂)가 발생하여 주조체를 취약하게 만듭니다.",
        5: "링을 소환로에 넣을 때는 용융된 왁스가 중력에 의해 아래로 원활하게 배출(Wax elimination)되도록 주입구(Sprue hole)를 '아래쪽(Downward)'으로 향하게 넣어야 합니다."
      },
      commonExplanations: [
        "소환 링 배치 = 주입구가 아래로 향하도록 투입 (왁스 배출 유도)"
      ]
    },
    {
      id: 24,
      question: "수정기능모형(Altered cast)을 이용한 기능인상 채득과 관련이 없는 분류는?",
      options: ["Class I", "Class II", "Class II mod. 1", "Class IV", "Class III로 치아결손 부위가 넓은 경우"],
      answer: 4,
      optionExplanations: {
        1: "양측 유리단(Class I)은 치아와 점막의 변위량 차이 보상을 위해 기능인상이 필수입니다.",
        2: "편측 유리단(Class II)은 기능인상이 필수입니다.",
        3: "유리단 결손을 포함하므로 기능인상이 필요합니다.",
        4: "Kennedy Class IV는 양측 끝에 지대치가 단단히 지지하는 치아 지지형(Tooth-borne) 보철물이므로 해부학적 인상만으로 충분하며, 수정기능모형(Altered cast) 기술이 필요 없습니다.",
        5: "Class III라도 무치악 범위가 넓어 치조제 점막 지지를 함께 받아야 할 때는 기능인상을 적용합니다."
      },
      commonExplanations: [
        "기능인상(Altered cast technique) = 유리단 무치악(Class I, II) 필수 적용 / Class IV는 불필요"
      ]
    },

    /* =========================================================
       모의고사 2회 (59번 ~ 82번 -> 25번 ~ 48번)
       ========================================================= */
    {
      id: 25,
      question: "Ring clasp에 대한 설명 중 틀린 것은?",
      options: [
        "상악대구치에서는 근심협측, 하악대구치에서는 근심설측 경사시 많이 사용한다.",
        "사용되는 undercut 량은 20gauge 이다.",
        "파지력, 유지력, 지지력이 강하다.",
        "조직부로 지나가는 2차 파지암은 1차 파지암보다 두껍게 형성한다.",
        "치아와 조직부를 덮는 면적이 크다."
      ],
      answer: 1,
      optionExplanations: {
        1: "대구치는 해부학적으로 상악은 '근심설측', 하악은 '근심협측'으로 경사되므로, 링 클래스프는 상악 대구치 근심설측 언더컷, 하악 대구치 근심협측 언더컷에 사용합니다. 선지의 방향 기술이 정반대로 바뀌었습니다.",
        2: "원주형 가공선이나 주조 암 규격 언더컷을 활용합니다.",
        3: "치관을 360° 둘러싸므로 파지력과 지지력이 우수합니다.",
        4: "변형을 막기 위해 횡단하는 보조 스트럿 암(2차 암)을 주 암보다 두껍게 형성합니다.",
        5: "치아 대부분을 피개하므로 치면 피개 면적이 큽니다."
      },
      commonExplanations: [
        "Ring clasp 지대치 경사 방향 공식: 상악 대구치 = 근심설측 경사 / 하악 대구치 = 근심협측 경사"
      ]
    },
    {
      id: 26,
      question: "RPI clasp의 설명 중 틀린 것은?",
      options: [
        "\"I\"bar 유지부는 직경이 1mm 지대치와 2mm정도로 접촉한다.",
        "No. 3 survey line 이용한다.",
        "인접판이 조직과 닿는면은 30G로 relief 한다.",
        "근심부연결장치는 파지와 보상작용을 한다.",
        "구조가 복잡하여 미관상 좋지 않다."
      ],
      answer: 5,
      optionExplanations: {
        1: "I-bar 끝단은 치면과 약 2mm 높이로 점상/선상 미세 접촉합니다.",
        2: "하방 언더컷을 활용하므로 서베이라인 규격에 부합합니다.",
        3: "원심 인접판 하방 치은 점막부는 30G 시트 왁스로 릴리프합니다.",
        4: "근심 레스트 부연결장치는 유지암 진입 시 지대치를 받쳐주는 보상 작용을 겸합니다.",
        5: "RPI clasp는 치은측에서 접근하는 얇은 I-bar를 적용하여 금속 노출이 거의 없으므로 '심미성(미관)이 매우 우수'한 것이 최대 장점입니다."
      },
      commonExplanations: [
        "RPI Clasp의 2대 핵심 가치 = 지대치 응력 해방(완압) + 뛰어난 심미성(금속 비노출)"
      ]
    },
    {
      id: 27,
      question: "치아 표면에 위치하여 의치의 수직지지를 담당하는 금속구조물의 돌출부는?",
      options: [
        "정지돌기(rest)",
        "정지돌기좌(rest seat)",
        "조직정지부(tissue stopper)",
        "인접판(proximal plate)",
        "보상부"
      ],
      answer: 1,
      optionExplanations: {
        1: "레스트(Rest, 정지돌기)는 지대치 레스트 시트에 얹혀 수직 교합력을 치아 장축으로 전달하고 의치의 수직 침하를 방지하는 지지 부위입니다.",
        2: "Rest seat는 레스트가 얹히도록 치면에 형성한 오목한 자리입니다.",
        3: "Tissue stopper는 릴리프 왁스 상에 형성하는 금속 다리입니다.",
        4: "인접판은 유도면에 접촉하는 부연결장치입니다.",
        5: "보상부는 수평 측방압에 저항합니다."
      },
      commonExplanations: [
        "수직 지지 및 침하 방지 = Rest(정지돌기)"
      ]
    },
    {
      id: 28,
      question: "하악주연결장치에서 Lingual bar로 사용되는 기성 왁스 패턴의 단면 형태는?",
      options: ["6G H,R", "6G H,P", "6G H,O", "8G H,P", "6G R"],
      answer: 2,
      optionExplanations: {
        1: "Half-round(반원형)는 부연결장치나 클래스프 암 단면입니다.",
        2: "하악 설측바(Lingual bar)는 혀의 이물감을 줄이고 강도를 극대화하기 위해 상단은 얇고 하단은 두꺼운 '6G Half-pear (H,P / 반배형)' 왁스 패턴을 사용합니다.",
        3: "Half-oval은 상악 후구개바용입니다.",
        4: "8G는 굵기 규격이 다릅니다.",
        5: "Round는 단면 형태가 둥글어 혀를 자극합니다."
      },
      commonExplanations: [
        "하악 설측바 왁스 단면 = 6G Half-pear (반배형)"
      ]
    },
    {
      id: 29,
      question: "Lingual bar가 조직부와 접촉하는 부위의 Relief 량으로 가장 적절한 규격은?",
      options: ["20G", "24G", "32G", "40G", "10G"],
      answer: 3,
      optionExplanations: {
        1: "20G는 너무 두꺼워 음식물이 심하게 낍니다.",
        2: "24G는 과도한 두께입니다.",
        3: "하악 설측바 하방의 연조직 자극을 방지하기 위한 릴리프 왁스 두께는 보통 28~32 Gauge 시트 왁스(약 0.2~0.3mm)를 사용하므로 선택지 중 32G가 가장 적합합니다.",
        4: "40G는 너무 얇아 완충 역할을 하지 못합니다.",
        5: "10G는 너무 두껍습니다."
      },
      commonExplanations: [
        "설측바 조직부 릴리프 = 28~32G 시트 왁스"
      ]
    },
    {
      id: 30,
      question: "국소의치 설계 시 상대적인 평형측정, 삽입로 및 언더컷을 평가하기 위해 이용되는 정밀 기구는?",
      options: ["Verticulator", "Duplicator", "Articulator", "Surveyor", "Solder machine"],
      answer: 4,
      optionExplanations: {
        1: "Verticulator는 전치부 수복물 등의 정밀 합착 조절기구입니다.",
        2: "Duplicator는 모형 복제용 기구입니다.",
        3: "Articulator는 악관절 교합 운동을 재현하는 교합기입니다.",
        4: "서베이어(Surveyor)는 모형의 평행 관계 측정, 삽입로 결정, 최대풍융선 묘기, 언더컷 깊이 계측을 전담하는 필수 설계 기구입니다.",
        5: "Solder machine은 금속 납착기입니다."
      },
      commonExplanations: [
        "모형 분석, 삽입로 및 언더컷 측정 기구 = 서베이어(Surveyor)"
      ]
    },
    {
      id: 31,
      question: "주모형을 서베잉(Surveying)할 때 서베이어 수직축에 가장 먼저 장착하여 사용하는 부속품은?",
      options: [
        "Carbon marker",
        "Undercut gauge",
        "Analyzing rod",
        "Blockout tool",
        "Wax carver"
      ],
      answer: 3,
      optionExplanations: {
        1: "Carbon marker는 분석 완료 후 서베이라인을 그릴 때 씁니다.",
        2: "Undercut gauge는 언더컷 깊이를 잴 때 씁니다.",
        3: "모형을 서베이어에 올린 후 착탈로 가능성과 평행성을 가장 먼저 탐색하는 도구는 금속 막대 형태의 '분석봉(Analyzing rod)'입니다.",
        4: "블록아웃 왁스를 다듬는 도구입니다.",
        5: "왁스 조각칼입니다."
      },
      commonExplanations: [
        "서베이어 부속품 사용 순서: 분석봉(Analyzing rod) ➔ 카본 마커 ➔ 언더컷 게이지 ➔ 왁스 트리머"
      ]
    },
    {
      id: 32,
      question: "내부에 생기는 금속과 레진의 경계선인 Internal finish line에 관한 설명 중 맞는 것은?",
      options: [
        "주모형을 Block-out 할 때 형성된다.",
        "국소의치의 연마면에 존재한다.",
        "Wax pattern 조각시에 형성된다.",
        "주연결장치 조직부언더컷을 제거하는 것과 관련이 있다.",
        "국소의치의 삽입로와 관련이 있다."
      ],
      answer: 1,
      optionExplanations: {
        1: "내경계선(Internal finish line)은 주모형 준비 단계에서 치조제 릴리프 왁스(Relief wax/Block-out)의 모서리 단차에 의해 복제 모형에 음각으로 전사되어 형성됩니다.",
        2: "연마면이 아니라 의치 조직면에 존재합니다.",
        3: "왁스업 시 형성되는 것은 외경계선(External finish line)입니다.",
        4: "조직부 언더컷 제거와 무관합니다.",
        5: "삽입로와 직접적 관련이 없습니다."
      },
      commonExplanations: [
        "Internal finish line = 주모형 릴리프 단차에 의해 조직면에 형성"
      ]
    },
    {
      id: 33,
      question: "국소의치 주모형에서 Tripoding(삼점 표시법)을 하는 최종 목적은?",
      options: [
        "교합관계를 수정하기 위해서",
        "원래 경사도를 재현하기 위해서",
        "삽입로 결정을 수정하기 위해서",
        "언더컷 부위를 표시하기 위해서",
        "유도면을 형성할 부위를 표시하기 위해서"
      ],
      answer: 2,
      optionExplanations: {
        1: "교합 관계 수정과 무관합니다.",
        2: "Tripoding의 목적은 서베이어 테이블에서 모형을 분리한 후에도, 결정했던 원래의 3차원 공간 경사도(착탈로)를 언제든지 동일하게 다시 재현(Re-orient)하기 위함입니다.",
        3: "결정된 삽입로를 보존하는 것입니다.",
        4: "언더컷 표시 목적이 아닙니다.",
        5: "유도면 표시 목적이 아닙니다."
      },
      commonExplanations: [
        "Tripoding = 서베이어 상에서 결정된 모형의 경사도를 언제든 정확히 재현하기 위함"
      ]
    },
    {
      id: 34,
      question: "치조정에 릴리프한 왁스에 사각형 구멍을 뚫어 레진 전입 시 금속구조물의 변형을 방지하는 요소는?",
      options: [
        "Rest seat",
        "Internal Occlusal rest",
        "의치상",
        "Tissue stop",
        "Tang"
      ],
      answer: 4,
      optionExplanations: {
        1: "레스트가 얹히는 치아 삭제와입니다.",
        2: "교합면 레스트의 일종입니다.",
        3: "인공치를 지지하는 부위입니다.",
        4: "조직정지부(Tissue stop)는 릴리프 왁스 치조정 정상부에 2×2mm 사각형 구멍을 파서, 주조 금속이 모형 골면에 직접 닿게 함으로써 레진 전입 가압 시 금속망의 침하와 변형을 막아줍니다.",
        5: "부연결장치 돌출 부위입니다."
      },
      commonExplanations: [
        "Tissue stop(조직정지부) = 릴리프 왁스 사각 창 ➔ 레진 전입 시 금속망 침하·변형 방지"
      ]
    },
    {
      id: 35,
      question: "복제용 한천(Agar)의 겔화(Gelation) 온도와 함에 주입하는 온도를 화씨(°F)로 바르게 짝지은 것은?",
      options: [
        "99°F, 125°F",
        "210°F, 140°F",
        "85°F, 140°F",
        "125°F, 140°F",
        "99°F, 212°F"
      ],
      answer: 1,
      optionExplanations: {
        1: "한천의 겔화(응고) 온도는 체온 수준인 약 37℃ = 99°F이며, 복제함 주입 온도는 약 50~52℃ = 125~130°F입니다.",
        2: "210°F는 끓는점에 가깝습니다.",
        3: "주입 온도가 너무 높습니다.",
        4: "수치가 맞지 않습니다.",
        5: "212°F는 물의 끓는점(Sol화 온도)입니다."
      },
      commonExplanations: [
        "Agar 온도: 겔화 온도 = 37℃ (99°F) / 주입 온도 = 50~52℃ (125~130°F) / 졸화 용융 = 100℃ (212°F)"
      ]
    },
    {
      id: 36,
      question: "내화성 모형을 Beeswax 처리할 때 모형의 건조 온도, 침전 시간, 왁스 온도가 올바르게 조합된 것은?",
      options: [
        "100°F, 10초, 300°F",
        "200°F, 20초, 300°F",
        "250°F, 10초, 100°F",
        "200℃, 20초, 300℃",
        "300°F, 30초, 200°F"
      ],
      answer: 1,
      optionExplanations: {
        1: "내화성 모형 건조 온도는 38℃ = 100°F, 용융 비즈왁스 온도는 150℃ = 300°F, 침전 시간은 약 10~15초가 표준입니다.",
        2: "모형 건조 온도가 너무 높습니다.",
        3: "왁스 온도가 너무 낮아 굳어버립니다.",
        4: "섭씨(℃) 단위가 잘못되었습니다.",
        5: "온도가 뒤바뀌었습니다."
      },
      commonExplanations: [
        "Beeswax 표면처리: 모형 예열 100°F ➔ 300°F 비즈왁스에 10~15초간 침전 (강도 및 평활도 증가)"
      ]
    },
    {
      id: 37,
      question: "소환 중 석고결합매몰재를 1,450°F(약 790℃) 이상으로 올렸을 때 열분해되어 파괴되는 성분은?",
      options: ["Gypsum", "Sodium chloride", "Silica", "Quartz", "Boric acid"],
      answer: 1,
      optionExplanations: {
        1: "석고계 매몰재의 결합재인 석고(Gypsum, CaSO₄)는 1,450°F 이상 과열되면 화학적 분해가 일어나 유황가스(SO₂)를 방출하며 균열 파괴됩니다.",
        2: "경화 촉진제 성분입니다.",
        3: "실리카는 고온 내화재입니다.",
        4: "석영은 1,000℃ 이상 견디는 내화재입니다.",
        5: "수축 제어제입니다."
      },
      commonExplanations: [
        "석고계 매몰재는 1,450°F(788℃) 초과 시 결합재 석고(Gypsum)가 파괴되므로 최고 700℃ 이하 소환 필수"
      ]
    },
    {
      id: 38,
      question: "다음 부위 중 언더컷 하방에 턱(Ledge)을 형성해 주는 Shaped blockout을 시행하는 부위는?",
      options: [
        "유도면으로 사용되는 인접치아면",
        "부연결장치가 지나가는 하부",
        "frame 과 관계없는 조직부",
        "clasp wax pattern이 들어갈 바로 아래 부위 지대치 협설면",
        "Bar clasp 가 교차되는 조직부 undercut"
      ],
      answer: 4,
      optionExplanations: {
        1: "유도면은 평행 블록아웃(Paralleled blockout) 부위입니다.",
        2: "부연결장치 하부는 평행 블록아웃 부위입니다.",
        3: "프레임과 무관한 부위는 임의 블록아웃(Arbitrary blockout) 부위입니다.",
        4: "형상 블록아웃(Shaped blockout)은 클래스프 유지암 팁이 정확한 언더컷 위치에 선명하게 안착되도록 왁스를 메운 뒤 상단에 턱(Ledge)을 깎아 형성합니다.",
        5: "Bar clasp 통과부는 평행 릴리프 부위입니다."
      },
      commonExplanations: [
        "Shaped blockout = 클래스프 유지암 바로 하방에 Ledge(턱)를 깎아 패턴 위치 안내"
      ]
    },
    {
      id: 39,
      question: "주연결장치가 변연 치은연에서 떨어져 설계되어야 하는 최소 간격은? (하악, 상악 순서)",
      options: [
        "6mm, 4mm",
        "6mm, 6mm",
        "4mm, 6mm",
        "4mm, 4mm",
        "가능한 간격은 넓게"
      ],
      answer: 3,
      optionExplanations: {
        1: "하악과 상악의 순서가 뒤바뀌었습니다.",
        2: "하악은 4mm입니다.",
        3: "치은연 혈류 장애와 염증을 막기 위해 주연결장치는 치은연으로부터 '하악은 4mm 이상', '상악은 6mm 이상' 떨어뜨려 설계해야 합니다.",
        4: "상악은 6mm입니다.",
        5: "정확한 법정 최소 규격이 존재합니다."
      },
      commonExplanations: [
        "치은연 이격 거리: 하악 4mm / 상악 6mm"
      ]
    },
    {
      id: 40,
      question: "주모형의 서베잉(Surveying) 작업 과정을 순서대로 올바르게 나열한 것은?",
      contextBox: "1. Design  2. Tripoding  3. table에 주모형고정  4. Survey line 표시  5. 분석",
      options: [
        "3 - 5 - 4 - 2 - 1",
        "1 - 2 - 3 - 4 - 5",
        "2 - 3 - 4 - 5 - 1",
        "4 - 3 - 2 - 1 - 5",
        "5 - 4 - 3 - 2 - 1"
      ],
      answer: 1,
      optionExplanations: {
        1: "[3. Table에 주모형 고정 ➔ 5. 분석봉으로 착탈로 분석 ➔ 4. 카본 마커로 최대풍융선(Survey line) 표시 ➔ 2. Tripoding 삼점 표시 ➔ 1. 금속구조물 최종 Design] 순서로 진행됩니다.",
        2: "디자인이 가장 마지막이어야 합니다.",
        3: "순서가 뒤섞였습니다.",
        4: "라인 표시 전에 고정과 분석이 선행되어야 합니다.",
        5: "모형 고정이 1단계입니다."
      },
      commonExplanations: [
        "서베잉 5단계 순서 암기: 모형 고정 ➔ 분석 ➔ 서베이라인 표시 ➔ 삼점 표시(Tripoding) ➔ 디자인"
      ]
    },
    {
      id: 41,
      question: "보상 암(Reciprocal arm)을 위해 지대치 금관에 Ledge(턱)를 형성하는 올바른 위치는?",
      options: [
        "교합 1/3",
        "교합 1/3과 중앙 1/3 경계",
        "중간 1/3",
        "중앙 1/3과 치은 1/3 경계",
        "교합 1/3과 치은 1/3의 중간"
      ],
      answer: 4,
      optionExplanations: {
        1: "너무 높으면 교합 간섭을 유발합니다.",
        2: "위치가 너무 높습니다.",
        3: "최대풍융부보다 위쪽입니다.",
        4: "보상 암이 정밀 접촉하도록 Ledge를 형성하는 최적 위치는 언더컷이 없는 비언더컷 영역인 치관의 '중앙 1/3과 치은 1/3 경계선(최대풍융선 바로 위)'입니다.",
        5: "위치 기준이 모호합니다."
      },
      commonExplanations: [
        "보상부 Ledge 형성 위치 = 중앙 1/3과 치은 1/3의 경계부 (최대풍융선 상방)"
      ]
    },
    {
      id: 42,
      question: "국소의치에서 끈적한 음식물 등에 의해 의치상이 들리는 상방 수직회전운동을 막는 요소는?",
      options: [
        "Direct retainer",
        "Minor connector",
        "Rest",
        "Indirect retainer",
        "Major connector"
      ],
      answer: 4,
      optionExplanations: {
        1: "직접유지장치는 지대치로부터의 단순 수직 탈락에 저항합니다.",
        2: "부연결장치는 요소를 연결합니다.",
        3: "레스트는 하방으로 가라앉는 수직 침하에 저항합니다.",
        4: "간접유지장치(Indirect retainer)는 지점선을 축으로 유리단 의치상이 점막에서 들떠 올라오는 '상방 수직 회전 운동'을 억제합니다.",
        5: "주연결장치는 악궁을 잇는 주 골격입니다."
      },
      commonExplanations: [
        "상방 수직 회전 운동 방지 = 간접유지장치(Indirect retainer)"
      ]
    },
    {
      id: 43,
      question: "간접유지장치(Indirect retainer)가 필수적으로 요구되는 증례는?",
      options: [
        "Class 1, 2",
        "Class 1, 3",
        "Class 3, 4",
        "Class 1, 4",
        "Class 2, 4"
      ],
      answer: 1,
      optionExplanations: {
        1: "양측 유리단 결손(Class I)과 편측 유리단 결손(Class II)은 후방 지대치가 없어 지점선 중심의 시소 회전 운동이 발생하므로 간접유지장치가 필수적입니다.",
        2: "Class III는 치아 지지형으로 불필요합니다.",
        3: "Class III가 포함되어 오답입니다.",
        4: "Class IV는 후방 레스트가 지지합니다.",
        5: "Class IV가 포함되어 오답입니다."
      },
      commonExplanations: [
        "간접유지장치 필수 적용 증례 = Kennedy Class I, Class II (유리단 무치악 증례)"
      ]
    },
    {
      id: 44,
      question: "국소의치 지대치 금관 조각 시 고려해야 할 사항이 아닌 것은?",
      options: [
        "언더컷의 위치는 낮게 필요한 언더컷을 부여한다.",
        "Spoon 모양으로 레스트 시트를 형성한다.",
        "삽입로와 평행하도록 유도면을 형성한다.",
        "보상부의 ledge는 언더컷 아래 0.7mm로 치아의 외형에 준하여 턱을 만들어 준다.",
        "부연결장치의 진입로는 반드시 형성해야 한다."
      ],
      answer: 4,
      optionExplanations: {
        1: "심미성과 안정성을 위해 치은 1/3 부근 낮은 곳에 언더컷을 줍니다.",
        2: "교합력을 장축으로 분산하기 위해 오목한 숟가락 모양으로 깎습니다.",
        3: "착탈로와 평행한 유도면을 형성합니다.",
        4: "보상 암은 언더컷에 들어가면 안 되므로, Ledge는 언더컷 아래가 아니라 '언더컷이 없는 치관 상부(최대풍융선 상방)'에 만들어야 합니다.",
        5: "부연결장치 기둥이 안착할 진입로를 형성합니다."
      },
      commonExplanations: [
        "보상부 Ledge는 언더컷 아래가 아니라 최대풍융선 상방(비언더컷 부위)에 형성해야 함"
      ]
    },
    {
      id: 45,
      question: "Kennedy Class II 편측 유리단 결손부의 반대쪽 건전 치아군에 주로 설계하는 클래스프는?",
      options: [
        "Akers (simple circlet)",
        "Embrasure (double akers)",
        "Back action",
        "Half and half",
        "Reverse action (hair pin)"
      ],
      answer: 2,
      optionExplanations: {
        1: "단일 치아용 기본 클래스프입니다.",
        2: "Class II 결손 반대쪽 건전 치열부(소구치-대구치 치간 공극)에는 2개의 Akers 클래스프를 맞붙인 'Embrasure clasp(엠브레저/더블 에이커스)'를 설계하여 강력한 유지와 파지력을 확보합니다.",
        3: "단독 소구치용입니다.",
        4: "고립치용 양방향 클래스프입니다.",
        5: "언더컷이 교합면 레스트 하방에 있을 때 씁니다."
      },
      commonExplanations: [
        "Class II 결손 반대쪽 건전 부위 = Embrasure clasp (Double Akers)"
      ]
    },
    {
      id: 46,
      question: "R.P.I clasp에서 원심 인접판(Proximal plate)이 연조직과 닿는 부분의 relief 양은?",
      options: ["10G", "20G", "24G", "30G", "32G"],
      answer: 4,
      optionExplanations: {
        1: "너무 두꺼운 게이지입니다.",
        2: "과도한 두께입니다.",
        3: "주연결장치 시트 규격입니다.",
        4: "RPI의 원심 인접판(Proximal plate) 하단이 치은 조직과 닿는 부위는 잇몸 압박을 피하기 위해 30 Gauge 시트 왁스로 릴리프합니다.",
        5: "32G는 I-bar 접근 암 하방 릴리프 규격입니다."
      },
      commonExplanations: [
        "RPI 인접판 조직 릴리프 = 30G (I-bar 접근 암 = 32G)"
      ]
    },
    {
      id: 47,
      question: "상악 주연결장치 중 기성 Bar 패턴이 아닌 얇은 Sheet wax를 직접 압접하여 제작하는 것은?",
      options: [
        "Single Broad Palatal Plate",
        "U shaped palatal connector",
        "Full palatal plate",
        "Single palatal strap",
        "Single palatal bar"
      ],
      answer: 1,
      optionExplanations: {
        1: "단일 광구개판(Single Broad Palatal Plate)은 구개면의 넓은 면적을 피개하므로 일반 기성 바 패턴 대신 질감이 부여된 22~24G 'Sheet wax(박판 시트 왁스)'를 모형에 직접 압접하여 조각합니다.",
        2: "기성 스트랩/바 패턴을 씁니다.",
        3: "완전 구개판입니다.",
        4: "기성 스트랩 왁스를 씁니다.",
        5: "기성 바 왁스를 씁니다."
      },
      commonExplanations: []
    },
    {
      id: 48,
      question: "전·후 구개바(A-P palatal bar)의 후구개바(Posterior bar)에 사용하는 왁스 패턴 형태는?",
      options: [
        "16G, round",
        "6G, half round",
        "6G, half pear",
        "6G, half oval",
        "22G, sheet wax"
      ],
      answer: 4,
      optionExplanations: {
        1: "너무 가는 원형 왁스입니다.",
        2: "반원형은 설측바나 부연결장치에 쓰입니다.",
        3: "Half-pear는 하악 설측바 규격입니다.",
        4: "전·후 구개바 중 후구개바(Posterior bar)는 혀의 움직임을 방해하지 않고 횡단 강도를 주기 위해 '6G Half-oval (반타원형)' 왁스 패턴을 사용합니다.",
        5: "전구개바(Anterior strap)에 시트 왁스를 씁니다."
      },
      commonExplanations: [
        "A-P 구개바 왁스: 전구개 스트랩 = Sheet wax / 후구개바 = 6G Half-oval (반타원형)"
      ]
    },

    /* =========================================================
       모의고사 3회 (59번 ~ 82번 -> 49번 ~ 72번)
       ========================================================= */
    {
      id: 49,
      question: "Fulcrum line(지점선)을 중심으로 의치상이 뒤집어지거나 들리는 운동을 방지하는 요소는?",
      options: [
        "occlusal rest",
        "retentive arm",
        "linguoplate",
        "indirect retainer",
        "reciprocal arm"
      ],
      answer: 4,
      optionExplanations: {
        1: "교합면 레스트는 수직 침하를 막아줍니다.",
        2: "유지암은 단순 수직 탈락에 저항합니다.",
        3: "설측판은 하악 주연결장치입니다.",
        4: "지점선(Fulcrum line)을 중심으로 의치상이 시소처럼 들떠 뒤집어지려는 수직 회전 운동을 억제하는 것은 '간접유지장치(Indirect retainer)'입니다.",
        5: "보상암은 측방 수평력에 저항합니다."
      },
      commonExplanations: [
        "Fulcrum line 회전 들림 방지 = 간접유지장치(Indirect retainer)"
      ]
    },
    {
      id: 50,
      question: "국소의치 설계의 기본 원칙에 관한 설명 중 틀린 것은?",
      options: [
        "기능시 탈락되지 않는 최소의 유지가 가장 좋다.",
        "각 지대치에 균등히 분배되는 유지가 좋다.",
        "Cr-Co합금 사용시 백금가금합금보다 유지부의 undercut은 1/2이 좋다.",
        "간단하고 단순한 design이 가장 좋다.",
        "고립치는 가철성 국소의치에 포함시키는 것으로 좋다."
      ],
      answer: 5,
      optionExplanations: {
        1: "치주 조직 보호를 위해 최소 유지량을 적용합니다.",
        2: "한쪽 치아에 하중이 쏠리지 않도록 균등 분배합니다.",
        3: "Co-Cr 합금은 탄성률이 금합금의 2배로 뻣뻣하므로 언더컷 깊이를 절반(0.25mm)으로 얕게 주어야 치아가 보호됩니다.",
        4: "단순한 설계가 이물감과 치태 침착을 줄입니다.",
        5: "단독 고립치(Isolated tooth)는 국소의치 지대치로 그대로 단독 사용하면 지렛대 횡압을 받아 조기 발치되므로, 인접치와 브릿지로 고정(Splinting)해야 합니다."
      },
      commonExplanations: [
        "고립치는 단독으로 국소의치에 포함시키지 말고 인접치와 고정(Splinting) 후 사용"
      ]
    },
    {
      id: 51,
      question: "간접유지장치의 위치 설정에 가장 이상적이고 많이 사용하는 잔존 지대치는?",
      options: ["제1소구치", "견치", "측절치", "제2소구치", "제1대구치"],
      answer: 2,
      optionExplanations: {
        1: "제1소구치도 쓰이지만 견치보다 우선순위가 낮습니다.",
        2: "견치(Canine)는 지점선에서 멀리 떨어져 있고 치근이 길며 골 지지력이 가장 뛰어나 설면 레스트(Cingulum rest)를 이용한 간접유지장치로 가장 이상적입니다.",
        3: "측절치는 치근이 약합니다.",
        4: "제2소구치는 지점선과 너무 가깝습니다.",
        5: "대구치는 회전축 상에 위치하여 간접유지가 불가능합니다."
      },
      commonExplanations: [
        "간접유지장치 최우선 이상적 치아 = 견치(Canine)"
      ]
    },
    {
      id: 52,
      question: "Kennedy Class III 가철성 국소의치에 관한 설명 중 틀린 것은?",
      options: ["해부학적인상", "간접유지장치 불필요", "주조 clasp", "금속상", "조직지지"],
      answer: 5,
      optionExplanations: {
        1: "치아 지지형이므로 알지네이트 해부학적 인상만으로 충분합니다.",
        2: "양단에 지대치가 있어 회전축이 생기지 않으므로 간접유지장치가 불필요합니다.",
        3: "비완압형 Akers 주조 클래스프를 주로 씁니다.",
        4: "견고한 금속 구조물을 제작합니다.",
        5: "Kennedy Class III 국소의치는 양쪽 결손부 끝에 지대치가 단단히 지지하는 '치아 지지형(Tooth-borne)' 보철물이므로 '조직지지'를 받는다는 설명은 틀렸습니다."
      },
      commonExplanations: [
        "Kennedy Class III = 순수 치아 지지형 (조직지지 X, 간접유지장치 X, 해부학적인상 O)"
      ]
    },
    {
      id: 53,
      question: "Kennedy Class II mod. 0(편측 유리단) 국소의치 설계 시 불합리한 것은?",
      options: [
        "반드시 양측성으로 설계",
        "주연결장치는 편측유리단 반대쪽의 7번치까지 연장",
        "유리단 지대치는 bar type clasp 사용",
        "유리단 반대쪽엔 embrasure clasp 사용",
        "금속상 설계가 필요"
      ],
      answer: 2,
      optionExplanations: {
        1: "악궁 반대편 교차 안정을 위해 양측성 설계가 필수입니다.",
        2: "무치악이 없는 반대쪽 건전 악궁에 주연결장치를 연장할 때, 최후방 제2대구치(7번치)까지 무리하게 연장하면 지렛대 횡압과 이물감만 커지므로 소구치~제1대구치 부위까지만 연결해야 합니다.",
        3: "유리단 지대치에는 응력 완압을 위해 RPI(Bar type)를 씁니다.",
        4: "반대쪽 소구치-대구치 엠브레저에 이중 에이커스를 씁니다.",
        5: "견고성을 위한 금속상 설계가 타당합니다."
      },
      commonExplanations: []
    },
    {
      id: 54,
      question: "국소의치 착탈로(삽입로)의 결정 요인이 아닌 것은?",
      options: ["유도면", "유지", "파지", "장애", "심미성"],
      answer: 3,
      optionExplanations: {
        1: "유도면(Guiding plane)은 평행성을 좌우하는 요인입니다.",
        2: "유지(Retention)는 언더컷 깊이를 맞추는 요인입니다.",
        3: "파지(Bracing)는 수평력에 저항하는 역학적 기능이며, 삽입로를 결정하는 4대 기본 요인에 포함되지 않습니다.",
        4: "장애(Interference)는 조직 돌기 간섭을 피하는 요인입니다.",
        5: "심미성(Aesthetics)은 전치부 금속 노출을 조절하는 요인입니다."
      },
      commonExplanations: [
        "삽입로 결정 4대 요인 = 유도면, 유지, 장애, 심미성 (파지는 미포함)"
      ]
    },
    {
      id: 55,
      question: "국소의치의 수평력 저항 기능인 Bracing(파지)은 주로 어디에서 얻는가?",
      options: [
        "occlusal rest",
        "minor connector",
        "major connector",
        "clasp 유지부",
        "denture base"
      ],
      answer: 2,
      optionExplanations: {
        1: "교합면 레스트는 수직 지지(Support)를 담당합니다.",
        2: "Bracing(파지/수평 측방력 저항)은 지대치 수직 유도면과 견고하게 접촉하는 '부연결장치(Minor connector / Proximal plate)' 및 보상암(Reciprocal arm)을 통해 얻습니다.",
        3: "주연결장치는 악궁 간 결합을 이룹니다.",
        4: "클래스프 유지부는 수직 탈락에 저항하는 유지(Retention)를 줍니다.",
        5: "의치상은 점막을 덮습니다."
      },
      commonExplanations: [
        "Support(지지) = Rest / Retention(유지) = Retentive arm tip / Bracing(파지) = Minor connector & Reciprocal arm"
      ]
    },
    {
      id: 56,
      question: "서베이어(Surveyor) 본체 자체의 부품 명칭이 아닌 것은?",
      options: [
        "platform",
        "table",
        "horizontal arm",
        "vertical spindle",
        "undercut gauge"
      ],
      answer: 5,
      optionExplanations: {
        1: "Platform은 서베이어 바닥 대좌입니다.",
        2: "Table은 모형을 올리고 경사를 조절하는 모형 고정대입니다.",
        3: "Horizontal arm은 기둥 상부 수평암입니다.",
        4: "Vertical spindle은 수직으로 오르내리는 수직축입니다.",
        5: "Undercut gauge(언더컷 게이지)는 수직축 끝에 끼워 쓰는 '부속 도구(Tool/Accessory)'이지 본체 부품이 아닙니다."
      },
      commonExplanations: [
        "서베이어 본체 부품 = Base, Vertical column, Horizontal arm, Spindle, Table / 부속품 = Analyzing rod, Gauge, Marker"
      ]
    },
    {
      id: 57,
      question: "Surveyor 부속품 중 모형을 고정하고 0도 기본 경사 시 제일 먼저 장착하여 사용하는 것은?",
      options: [
        "tapered tool",
        "carbon marker",
        "analyzing rod",
        "blade",
        "undercut gauge"
      ],
      answer: 3,
      optionExplanations: {
        1: "블록아웃용 도구입니다.",
        2: "최대풍융선을 그리는 도구입니다.",
        3: "모형을 서베이어에 고정한 후 치아와 조직의 평행도 및 착탈로 가능성을 가장 먼저 탐색 진단하는 도구는 '분석봉(Analyzing rod)'입니다.",
        4: "왁스 트리머 칼날입니다.",
        5: "언더컷 측정 도구입니다."
      },
      commonExplanations: [
        "서베잉 1순위 부속 도구 = 분석봉(Analyzing rod)"
      ]
    },
    {
      id: 58,
      question: "정밀 어태치먼트(Attachment) 부품 용어 중 성격이 혼자 다른 하나는?",
      options: ["male", "flange", "patrix", "secondary part", "slot"],
      answer: 5,
      optionExplanations: {
        1: "Male은 돌기 부위(양각)입니다.",
        2: "Flange는 돌기 날개 부위입니다.",
        3: "Patrix는 돌기 형태의 양각 파트입니다.",
        4: "Secondary part는 가철측에 붙는 양각 구조물입니다.",
        5: "Slot(Keyway / Matrix / Female)은 돌기를 수용하기 위해 파여 있는 '음각 홈(수용부)'이므로 양각 부품들과 성격이 다릅니다."
      },
      commonExplanations: [
        "양각(돌기) = Male / Patrix / Key / Flange ⇹ 음각(홈) = Female / Matrix / Slot / Keyway"
      ]
    },
    {
      id: 59,
      question: "국소의치의 다른 모든 구성요소가 직·간접적으로 연결되는 중심 골격 부위는?",
      options: [
        "occlusal rest",
        "body",
        "minor connector",
        "saddle",
        "major connector"
      ],
      answer: 5,
      optionExplanations: {
        1: "레스트는 지지 요소입니다.",
        2: "클래스프 체부입니다.",
        3: "부연결장치는 개별 요소를 주연결장치에 잇는 기둥입니다.",
        4: "안부는 치조제를 덮는 부위입니다.",
        5: "주연결장치(Major connector)는 악궁 반대편 구성요소들을 결합하고 악궁 교차 안정성을 제공하는 국소의치의 가장 기본적이고 중추적인 주 골격입니다."
      },
      commonExplanations: [
        "모든 구성요소의 중심 지지체 = 주연결장치(Major connector)"
      ]
    },
    {
      id: 60,
      question: "국소의치 지대치 금관 조각 시 인위적으로 Undercut을 형성해 주는 주된 이유는?",
      options: ["지지력", "분산력", "보상력", "유지력", "파지력"],
      answer: 4,
      optionExplanations: {
        1: "지지력은 레스트(Rest)가 제공합니다.",
        2: "분산력은 주연결장치와 안부가 담당합니다.",
        3: "보상력은 보상암(Reciprocal arm)이 담당합니다.",
        4: "언더컷(Undercut)을 형성하는 유일한 목적은 클래스프 유지암 팁이 진입하여 의치가 빠지지 않도록 저항하는 '유지력(Retention)'을 얻기 위함입니다.",
        5: "파지력은 부연결장치와 보상암이 담당합니다."
      },
      commonExplanations: [
        "지대치 언더컷 형성 = 클래스프 암의 '유지력(Retention)' 확보"
      ]
    },
    {
      id: 61,
      question: "상악 주연결장치 중 조직 피개 면적이 가장 넓어 수직 교합력 지지도와 견고성이 가장 강한 것은?",
      options: [
        "single palatal bar",
        "single palatal strap",
        "lingual bar",
        "U-shaped palatal connector",
        "broad palatal connector"
      ],
      answer: 5,
      optionExplanations: {
        1: "피개 면적이 좁아 지지도가 약합니다.",
        2: "중간 결손용 띠 형태입니다.",
        3: "하악 주연결장치입니다.",
        4: "구개 중앙이 뚫려 있어 견고성이 떨어집니다.",
        5: "광구개판(Broad palatal connector / Full palatal plate)은 경구개부의 넓은 면적을 피개하므로 단위 면적당 가해지는 저작압을 분산시키는 지지도와 견고성이 가장 뛰어납니다."
      },
      commonExplanations: [
        "가장 강력한 지지도와 견고성 = 광구개판(Broad palatal connector)"
      ]
    },
    {
      id: 62,
      question: "상악 구개판 주연결장치 변연부에 음식물 유입을 막기 위해 파주는 Beading(비딩) 홈의 적정 깊이와 폭은?",
      options: ["0.5mm", "1mm", "2mm", "3mm", "4mm"],
      answer: 1,
      optionExplanations: {
        1: "비딩 홈(Beading groove)은 주모형 상에 약 '0.5mm' 깊이와 폭으로 둥글게 파주어 금속 모서리가 구개 점막에 살짝 파묻혀 밀착되도록 형성합니다.",
        2: "1mm는 너무 깊어 점막 압박 궤양을 유발합니다.",
        3: "과도하게 깊습니다.",
        4: "과도하게 깊습니다.",
        5: "과도하게 깊습니다."
      },
      commonExplanations: [
        "구개판 Beading 홈 규격 = 깊이 및 폭 약 0.5mm (점막 밀착 및 음식물 차단)"
      ]
    },
    {
      id: 63,
      question: "상악 유리단부에서 의치상 resin과 metal의 경계선(Finish line)은 상실 구치부 설측면 가상선으로부터 어느 위치에 형성하는가?",
      options: ["0.5mm", "1mm", "2mm", "4mm", "6mm"],
      answer: 2,
      optionExplanations: {
        1: "치수에 미달합니다.",
        2: "상악 유리단 결손부의 경계선(Finish line)은 인공치 배열과 매끄러운 레진 연마 마감을 위해 상실 구치 설측면 가상선보다 '약 1mm 설측 내방'에 위치하도록 형성합니다.",
        3: "너무 안쪽입니다.",
        4: "주연결장치 이격 거리와 혼동된 수치입니다.",
        5: "치은연 이격 거리 수치입니다."
      },
      commonExplanations: [
        "상악 유리단 Finish line = 상실 구치 설측선에서 1mm 설측 쪽에 위치"
      ]
    },
    {
      id: 64,
      question: "치은측에서 접근하는 Roach clasp(Bar clasp)가 적용되기에 가장 적당한 치아군은?",
      options: [
        "소구치, 대구치",
        "대구치 단독",
        "소구치 단독",
        "견치 단독",
        "모든 치아"
      ],
      answer: 1,
      optionExplanations: {
        1: "Roach clasp는 치관 길이가 충분하고 심미성이 요구되는 구치부인 '소구치 및 대구치' 지대치에 가장 널리 유용하게 적용됩니다.",
        2: "소구치에도 매우 많이 쓰입니다.",
        3: "대구치에도 쓰입니다.",
        4: "견치에도 쓰일 수 있으나 주 적용 대상은 구치부입니다.",
        5: "전치부 절치류에는 거의 쓰이지 않습니다."
      },
      commonExplanations: [
        "Roach clasp 적용 = 구치부 (소구치, 대구치)"
      ]
    },
    {
      id: 65,
      question: "주모형의 Tripoding(삼점 표시법)에 관한 설명 중 틀린 것은?",
      options: [
        "carbon marker의 높이를 일정한 높이로 고정 후 실시",
        "design과 관계 없는 모형측면에 선으로 표시",
        "가장 이상적인 삽입로 결정 후 표시",
        "모형의 경사 시 이용",
        "survey line 표시 후 실시"
      ],
      answer: 5,
      optionExplanations: {
        1: "수직 스핀들을 일정 높이에 고정하고 점을 찍습니다.",
        2: "모형 측면에 수직선 3개를 그어 표시하기도 합니다.",
        3: "삽입로 경사가 확정된 직후 기록합니다.",
        4: "테이블에서 모형을 뗐을 때 경사도를 재현하는 데 이용합니다.",
        5: "Tripoding은 모형의 착탈로 경사를 결정한 직후이자 'Survey line을 긋기 전'에 먼저 실시하여 경사를 확정해야 하므로, 라인 표시 후에 한다는 지문은 공정 순서가 틀렸습니다."
      },
      commonExplanations: [
        "서베잉 순서: 착탈로 결정 ➔ Tripoding(경사 확정 기록) ➔ 서베이라인 묘기 ➔ 언더컷 측정"
      ]
    },
    {
      id: 66,
      question: "주모형 Block out 시 일반 유성 점토(Clay)를 사용하면 안 되는 주된 이유는?",
      options: [
        "열에 의해 변형",
        "인상재의 오염",
        "물에 녹아 변형",
        "석고 모형에 접착 분리",
        "blade로 형태 형성 불가능"
      ],
      answer: 2,
      optionExplanations: {
        1: "열 변형이 핵심 원인이 아닙니다.",
        2: "일반 점토(Clay) 속의 기름 성분과 유기물이 한천(Agar)이나 실리콘 등 복제용 인상재를 오염시키고 경화를 방해하여 복제 정밀도를 떨어뜨리기 때문에 사용이 금지됩니다.",
        3: "물 용해성 문제가 아닙니다.",
        4: "접착성 문제가 아닙니다.",
        5: "조각은 가능하나 오염이 문제입니다."
      },
      commonExplanations: [
        "일반 점토 사용 금지 이유 = 복제 인상재(Agar 등)의 화학적 오염 및 경화 저해"
      ]
    },
    {
      id: 67,
      question: "치관의 가장 불룩한 둘레선인 '최대풍융선'과 의미가 다른 것은?",
      options: [
        "최대풍융부",
        "apical angle",
        "guide line",
        "height of contour",
        "survey line"
      ],
      answer: 2,
      optionExplanations: {
        1: "최대풍융선이 지나는 부위입니다.",
        2: "Apical angle(치근단각)은 치아 뿌리 끝(근첨) 각도와 관련된 해부학 용어이며, 치관의 최대풍융선과 전혀 관련이 없습니다.",
        3: "서베이라인의 다른 명칭(Guide line)입니다.",
        4: "최대풍융선의 영문 정식 명칭(Height of contour)입니다.",
        5: "서베이어로 그은 최대풍융선(Survey line)입니다."
      },
      commonExplanations: [
        "최대풍융선 동의어 = Height of contour = Survey line = Guide line"
      ]
    },
    {
      id: 68,
      question: "지대치 레스트 시트(Rest seat)를 형성하기에 가장 이상적인 치아 표면은?",
      options: [
        "sound enamel",
        "amalgam",
        "metal crown",
        "gold foil",
        "resin jacket crown"
      ],
      answer: 1,
      optionExplanations: {
        1: "손상되지 않은 천연 건전 법랑질(Sound enamel)은 생체적합성과 경도가 가장 우수하여 레스트 시트를 형성하기에 가장 이상적입니다. (보철물 중에는 Metal crown 선호).",
        2: "아말감은 전단 하중에 취약하여 변연 파절이 일어납니다.",
        3: "금속관도 훌륭하나 자연치 표면 중에서는 건전 법랑질이 최우선입니다.",
        4: "금박은 레스트 하중 지지가 어렵습니다.",
        5: "레진 자켓관은 마모와 파절 위험이 큽니다."
      },
      commonExplanations: [
        "Rest seat 형성 최적 표면 = 건전 법랑질(Sound enamel) 또는 주조 금관(Metal crown)"
      ]
    },
    {
      id: 69,
      question: "다음 원주형 클래스프 중에서 완압장치(Stress breaker)의 완압 기능을 갖는 것은?",
      options: [
        "Akers clasp",
        "Backaction clasp",
        "Embrasure clasp",
        "Multiple clasp",
        "Ring clasp"
      ],
      answer: 2,
      optionExplanations: {
        1: "Akers clasp는 대표적인 비완압형 견고한 클래스프입니다.",
        2: "Backaction clasp는 지대치 설면에서 협면까지 길게 둘러싸는 특유의 유연성(Flexibility)을 바탕으로, 유리단 의치상 침하 시 지대치에 가해지는 횡압을 완충해 주는 완압 작용(Stress-breaking)을 발휘합니다.",
        3: "Embrasure clasp는 견고한 비완압형입니다.",
        4: "다중 클래스프는 견고형입니다.",
        5: "Ring clasp는 지지력이 매우 강한 비완압형입니다."
      },
      commonExplanations: [
        "원주형 클래스프 중 완압 작용 = Backaction clasp (긴 암의 유연성 활용)"
      ]
    },
    {
      id: 70,
      question: "내화성 매몰재 모형(Investment cast) 제작 시 W/P ratio(혼수비)를 엄격히 준수해야 하는 가장 큰 이유는?",
      options: [
        "충분한 강도를 얻으려고",
        "미세한 부분의 인기",
        "소환시 파손방지",
        "적절한 팽창",
        "가스발생감소"
      ],
      answer: 4,
      optionExplanations: {
        1: "강도도 중요하지만 팽창 제어가 최우선입니다.",
        2: "미세 인기성도 관여하나 팽창률이 핵심입니다.",
        3: "파손 방지보다 치수 정밀도가 핵심입니다.",
        4: "내화성 모형의 혼수비(W/P ratio)는 경화팽창 및 소환 열팽창률을 직접 결정하므로, 비귀금속 합금의 주조 수축(약 2.3%)을 정밀하게 보상하는 '적절한 팽창'을 얻기 위해 엄격히 준수해야 합니다.",
        5: "가스 발생 제어 목적이 아닙니다."
      },
      commonExplanations: [
        "매몰재 혼수비(W/P ratio) 제어 = 주조 수축을 상쇄하기 위한 '정밀 팽창률' 확보"
      ]
    },
    {
      id: 71,
      question: "소환 시 하루 지나 완전히 건조된 매몰링을 소환로 투입 전 10분간 물에 침적하는 주된 이유는?",
      options: [
        "습기에 의해 열전도가 고르게 된다.",
        "습기에 의해 gas가 잘 빠진다.",
        "습기에 의해 팽창이 잘 된다.",
        "습기에 의해 매몰재가 단단해 진다.",
        "습기로 인해 용융금속이 잘 유입된다."
      ],
      answer: 1,
      optionExplanations: {
        1: "바짝 마른 매몰재를 급가열하면 국소적인 열응력으로 링에 균열(Crack)이 발생하므로, 물에 10분간 적셔 공급된 수분이 소환 초기 '열을 매몰재 전체로 균일하게 전도'시켜 주형 파손을 막아줍니다.",
        2: "가스 배출과는 무관합니다.",
        3: "이미 경화가 끝난 후라 수화팽창은 일어나지 않습니다.",
        4: "매몰재 경도 증가와 무관합니다.",
        5: "금속 유입 조작 전 단계입니다."
      },
      commonExplanations: [
        "건조 매몰링의 소환 전 물 침적 = 균일한 열전도 유도 (급격한 국소 가열로 인한 균열 방지)"
      ]
    },
    {
      id: 72,
      question: "국소의치 복제모형(Duplicating model) 제작 공정 시 사용하지 않는 기구는?",
      options: [
        "vibrator",
        "온도계",
        "furnace",
        "double boiler",
        "rubber bowl"
      ],
      answer: 3,
      optionExplanations: {
        1: "진동기(Vibrator)는 한천 및 매몰재 주입 시 기포 제거에 필수입니다.",
        2: "온도계는 한천 주입 적정 온도(50~55℃) 측정에 필수입니다.",
        3: "Furnace(소환로/전기로)는 매몰 완료 후 왁스를 태우고 주형을 가열하는 소환 단계 기구이므로 모형 복제 공정에서는 사용하지 않습니다.",
        4: "Double boiler(중탕기)는 한천을 균일하게 가열 용융시킬 때 씁니다.",
        5: "Rubber bowl은 매몰재 혼합 시 씁니다."
      },
      commonExplanations: [
        "Furnace = 소환/주조 단계 기구 (모형 복제 공정에서는 불필요)"
      ]
    }
  ]
};
