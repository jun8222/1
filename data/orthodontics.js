window.quizDatabase = window.quizDatabase || {};

window.quizDatabase['orthodontics'] = {
  subject: "교정기공학 (2교시 97~110)",
  questions: [
    // ==========================================
    // 1. 모의고사 1차 교정기공학 (1 ~ 14)
    // ==========================================
    {
      id: 1,
      question: "차단 교정학에 속하지 않는 것은?\n\n가. Expansion screw space regainer\n나. Serial extraction\n다. Oral screen\n라. Crown distal shoe",
      options: [
        "가, 나, 다",
        "가, 다",
        "나, 라",
        "라",
        "가, 나, 다, 라"
      ],
      answer: 4,
      optionExplanations: {
        1: "가, 나, 다는 모두 이미 발생한 부정교합을 조기에 차단하는 차단교정에 해당합니다.",
        2: "가와 다는 차단교정학 항목입니다.",
        3: "나는 차단교정학에 속합니다.",
        4: "Crown distal shoe는 제1대구치가 미맹출된 상태에서 제2유구치가 조기 상실되었을 때 공간 소실을 미리 막는 예방교정학(Preventive Orthodontics) 범주에 속하므로 정답입니다.",
        5: "라 항목은 예방교정학에 속하므로 오답입니다."
      },
      commonExplanations: [
        "교정학의 범주 구분:",
        "- 예방교정학(Preventive): 공간유지장치(Space maintainer - Band & loop, Crown distal shoe, Nance appliance 등).",
        "- 차단교정학(Interceptive): 공간확보장치(Space regainer), 연속발치술(Serial extraction), 악습관 차단장치(Oral screen, Tongue guard).",
        "암기 팁: '유지(Maintainer/Distal shoe)'는 예방교정, '확보(Regainer/자르기)'는 차단교정!"
      ]
    },
    {
      id: 2,
      question: "Leeway space(리웨이 스페이스)에 대해 옳은 것은?\n\n가. 영구전치의 배열에 일부가 소비된다.\n나. 하악의 Leeway space 양은 상악보다 크다.\n다. 제1대구치 교합관계를 조정하는데 이용된다.\n라. 유구치 조기상실 시에도 Leeway space는 변함이 없다.",
      options: [
        "가, 나, 다",
        "가, 다",
        "나, 라",
        "라",
        "가, 나, 다, 라"
      ],
      answer: 1,
      optionExplanations: {
        1: "유견치 및 유구치 폭경 합이 후속 소구치보다 커서 생기는 여유 공간으로 전치 배열에 일부 쓰이며(가), 하악이 상악보다 약 2배 크고(나), 하악 대구치의 추가 근심 이동을 유도해 Class I 정상 교합을 완성합니다(다).",
        2: "나 항목도 명백히 올바른 설명입니다.",
        3: "라 항목은 틀린 진술입니다.",
        4: "유구치가 조기 상실되면 후방 대구치가 근심 경사되어 리웨이 스페이스는 소실(감소)됩니다.",
        5: "라 항목이 틀렸으므로 오답입니다."
      },
      commonExplanations: [
        "Leeway space 수치 및 특징:",
        "- 상악: 편측 약 0.9mm (양측 약 1.8mm).",
        "- 하악: 편측 약 1.7mm (양측 약 3.4mm).",
        "- 하악의 여유 공간이 상악보다 크기 때문에 하악 제1대구치가 상악보다 더 많이 근심 이동(Late mesial shift)하여 정상 Class I 중심교합을 형성합니다.",
        "암기 팁: 리웨이는 하악(1.7)이 상악(0.9)보다 크다!"
      ]
    },
    {
      id: 3,
      question: "영 플라이어(Young plier)에 대한 설명으로 옳은 것은?\n\n가. 각형 와이어 밴딩 시 사용\n나. 비교적 가는 와이어 밴딩 시 사용\n다. 0.9mm 이상의 와이어를 구부려서는 안 됨\n라. 겸자 선단의 한쪽이 3단계의 원추형",
      options: [
        "가, 나, 다",
        "가, 다",
        "나, 라",
        "라",
        "가, 나, 다, 라"
      ],
      answer: 3,
      optionExplanations: {
        1: "가 항목의 각형 와이어 굴곡에는 Tweed plier 등을 사용해야 하므로 틀립니다.",
        2: "가 항목은 틀린 진술입니다.",
        3: "비교적 가는 와이어(0.6~0.7mm) 굴곡에 사용되며(나), 부리(beak) 한쪽이 3단계의 원추형으로 되어 있어 다양한 직경의 루프를 구부릴 수 있습니다(라). [0.9mm 이상 와이어는 플라이어 손상 방지를 위해 사용 금지(다)]",
        4: "나 항목도 올바른 설명입니다.",
        5: "가 항목이 틀렸으므로 오답입니다."
      },
      commonExplanations: [
        "Young Plier 구조 및 사용 원칙:",
        "- 부리 한쪽: 3단계 계단식 원추형 / 반대쪽: 홈이 파인 피라미드형.",
        "- 가는 원형 와이어의 루프 굴곡 전용 (각형 와이어는 Tweed plier).",
        "- 플라이어는 와이어를 잡고만 있고, 구부리는 주체는 엄지손가락!",
        "암기 팁: 영 플라이어 = 3단계 원추 부리!"
      ]
    },
    {
      id: 4,
      question: "진단모형 제작과정에 대한 설명 중 옳지 않은 것은?\n\n가. 치은협 이행부 및 후방 후구치 융기까지 충분히 인상되어야 한다.\n나. 상하악 기저부 형성 시 전치부에 한해 곡선이 되도록 형성한다.\n다. 상악 모형 제작 시 정중선과 직각이 되도록 후면을 삭제한다.\n라. 인상재료는 주로 탄력성인 rubber 인상재를 사용한다.",
      options: [
        "가, 나, 다",
        "가, 다",
        "나, 라",
        "라",
        "가, 나, 다, 라"
      ],
      answer: 3,
      optionExplanations: {
        1: "가와 다는 올바른 설명입니다.",
        2: "옳지 않은 지문을 골라야 합니다.",
        3: "상악 전치부는 뾰족한 각(25°)으로 다듬고 하악만 곡선으로 다듬으므로 (나)가 틀렸으며, 교정 진단 인상재는 러버가 아닌 알지네이트(Alginate)를 주로 사용하므로 (라)가 틀렸습니다.",
        4: "나 항목도 옳지 않은 설명입니다.",
        5: "가와 다는 올바른 진술이므로 오답입니다."
      },
      commonExplanations: [
        "연구모형 다듬기 및 인상 기준:",
        "- 상악 전면: 정중선 기준 양측 25°의 뾰족한 형태.",
        "- 하악 전면: 견치 간 부드러운 둥근 곡선 형태.",
        "- 교정 인상재: 수용성 탄성재료인 알지네이트(Alginate) 보편 사용.",
        "암기 팁: 상악은 뾰족, 하악은 둥글! 인상은 알지네이트!"
      ]
    },
    {
      id: 5,
      question: "악태모형에 의해 얻게 되는 정보는?\n\n가. 하악 견치의 전후 위치 관계\n나. 치열궁과 안면두개의 관계\n다. 상하악 치열의 교합 관계\n라. 교합관계 및 악골관계 파악",
      options: [
        "가, 나, 다",
        "가, 다",
        "나, 라",
        "라",
        "가, 나, 다, 라"
      ],
      answer: 5,
      optionExplanations: {
        1: "라 항목도 악태모형을 통해 얻는 핵심 정보입니다.",
        2: "나, 라 항목도 포함되어야 합니다.",
        3: "가, 다 항목도 포함되어야 합니다.",
        4: "모든 보기가 올바릅니다.",
        5: "안와평면을 통한 견치 전후 위치(가), 두개골에 대한 치열궁 위치(나), 상하악 치아 교합(다), 두개골에 대한 악골 자체의 3차원적 관계(라)를 모두 파악할 수 있습니다."
      },
      commonExplanations: [
        "Simon 악태모형의 3대 진단 지표:",
        "- 안이평면(FH plane): 수직 관계 (단소 attraction / 장대 abstraction).",
        "- 정중시상면: 내외측 관계 (협착 contraction / 개대 distraction).",
        "- 안와평면(Orbital plane): 전후방 관계 (전돌 protraction / 후퇴 retraction, 안와견치법칙).",
        "암기 팁: 악태모형 = 두개골-악골 3차원 통합 진단!"
      ]
    },
    {
      id: 6,
      question: "다음 중 상교정장치(Active Plate)의 장점으로 옳지 않은 것은?\n\n가. 부작용이 적다.\n나. Chair time이 짧다.\n다. 제작이 간편하다.\n라. 개개치아의 정교한 이동 가능",
      options: [
        "가, 나, 다",
        "가, 다",
        "나, 라",
        "라",
        "가, 나, 다, 라"
      ],
      answer: 4,
      optionExplanations: {
        1: "가, 나, 다는 상교정장치의 대표적인 장점입니다.",
        2: "가와 다는 장점에 해당합니다.",
        3: "나는 장점에 해당합니다.",
        4: "개개 치아의 정교한 3차원 이동(치체이동, 토크 조절 등)은 가철성 상교정장치로는 불가능하며, 브라켓과 와이어를 사용하는 고정성 교정장치(Fixed Appliance)의 고유 장점입니다.",
        5: "가, 나, 다는 올바른 장점 진술입니다."
      },
      commonExplanations: [
        "상교정장치(Active Plate / 가철성)의 한계:",
        "- 주로 단순 경사이동(Tipping)에 국한되며 정교한 치체이동 불가.",
        "- 환자의 협조도(착용 시간)에 치료 성패가 절대적으로 의존됨.",
        "암기 팁: 정교한 이동은 고정성 브라켓의 몫!"
      ]
    },
    {
      id: 7,
      question: "가철식 expansion screw 장치의 제작과정 중 옳은 것은?\n\n가. Resin이 screw를 완전히 피개하므로 baseplate의 두께가 두껍다.\n나. 강한 유지를 위해 Adams, arrowhead clasp를 제작한다.\n다. 구개부위를 fissure bur 등을 이용하여 groove를 형성한다.\n라. 정중선부위는 최후방 대구치에 따라 교합평면과 직각되게 위치시킨다.",
      options: [
        "가, 나, 다",
        "가, 다",
        "나, 라",
        "라",
        "가, 나, 다, 라"
      ],
      answer: 3,
      optionExplanations: {
        1: "가 항목의 키 구멍과 작동 부위는 노출되어야 하므로 틀립니다.",
        2: "가 항목은 틀린 진술입니다.",
        3: "스크루의 확장력에 대항하기 위해 Adams, Arrowhead 등 강력한 클래스프를 장착하며(나), 일률적 평행 확장을 위해 스크루는 기준선에 정밀하게 평행/직각 매립합니다(라).",
        4: "나 항목도 올바른 설명입니다.",
        5: "가 항목이 틀렸으므로 오답입니다."
      },
      commonExplanations: [
        "Active Plate 스크루 장치 제작 요건:",
        "- 스크루 확장력에 장치가 튕겨나가지 않도록 강력한 Adams clasp 필수.",
        "- 스크루 키 구멍(Key hole) 및 분할선 부위는 왁스로 블록아웃하여 레진 유입 방지.",
        "암기 팁: 스크루 장치엔 강력한 Adams Clasp!"
      ]
    },
    {
      id: 8,
      question: "Anterior bite plate(전방교합판) 사용 시 옳지 않은 것은?\n\n가. 구치의 정출로 안모고경이 증가되며 하악 이점이 후방으로 이동될 수 있다.\n나. 혼합치열기의 과개교합을 치료할 수 있다.\n다. 전치부의 수직피개 양을 줄일 수 있다.\n라. 골격성 부조화 치료가 가능하다.",
      options: [
        "가, 나, 다",
        "가, 다",
        "나, 라",
        "라",
        "가, 나, 다, 라"
      ],
      answer: 4,
      optionExplanations: {
        1: "가, 나, 다는 전방교합판의 정당한 임상적 효과입니다.",
        2: "가와 다는 올바른 설명입니다.",
        3: "나는 올바른 설명입니다.",
        4: "전방교합판은 단순 교합 이개 및 치성 과개교합 개선용 장치이므로, 심한 골격성 부조화(Skeletal dysplasia)를 치료하는 악정형 기능은 없습니다.",
        5: "가, 나, 다는 모두 올바른 진술입니다."
      },
      commonExplanations: [
        "Anterior Bite Plate 기전:",
        "- 하악 전치가 교합판에 먼저 접촉 → 구치부 이개(뜨게 됨) → 구치 정출 유도 → 과개교합 해소.",
        "- 골격성 악골 부조화는 Activator, FR, 헤드기어 등으로 치료해야 함.",
        "암기 팁: 전방교합판 = 과개교합치료용 구치 정출 장치!"
      ]
    },
    {
      id: 9,
      question: "다음 중 협측치아 군에 이용되는 clasp는?\n\n가. arrowhead clasp\n나. roach clasp\n다. eyelet clasp\n라. crozat clasp",
      options: [
        "가, 나, 다",
        "가, 다",
        "나, 라",
        "라",
        "가, 나, 다, 라"
      ],
      answer: 5,
      optionExplanations: {
        1: "라의 크로젯 클래스프도 구치 협측에 적용됩니다.",
        2: "나와 라도 포함되어야 합니다.",
        3: "가와 다도 포함되어야 합니다.",
        4: "모든 보기가 정답에 해당합니다.",
        5: "Arrowhead, Roach(바 클래스프 형태), Eyelet(인접치 삼각공극), Crozat(대구치 협측 주선) 모두 소구치 및 대구치 협측 치아군에 유지를 위해 적용되는 클래스프입니다."
      },
      commonExplanations: [
        "구치부(협측 치아군) 유지 Clasp 종류:",
        "- Adams clasp, Arrowhead clasp, Jackson clasp, Crozat clasp, Eyelet clasp, Circumferential clasp, Roach clasp.",
        "암기 팁: Arrowhead, Roach, Eyelet, Crozat 모두 구치 협측용!"
      ]
    },
    {
      id: 10,
      question: "상악 협착치열궁을 확대시키는 장치이다. 옳은 것은?\n\n가. Porter lingual arch\n나. Quad helix\n다. RPE\n라. W-arch",
      options: [
        "가, 나, 다",
        "가, 다",
        "나, 라",
        "라",
        "가, 나, 다, 라"
      ],
      answer: 5,
      optionExplanations: {
        1: "라의 W-arch도 상악 확대 장치입니다.",
        2: "나와 라도 상악 확대 장치입니다.",
        3: "가와 다도 상악 확대 장치입니다.",
        4: "모든 보기가 상악 확대 장치에 해당합니다.",
        5: "Porter lingual arch(=W-arch), 4개의 나선이 있는 Quad helix, 정중구개봉합을 이개하는 RPE, W-arch 모두 좁아진 상악 치열궁을 확장하는 대표 장치들입니다."
      },
      commonExplanations: [
        "상악 치열궁/악골 확장 장치 구분:",
        "- 완만한 치아 경사 확장: W-arch (Porter arch), Quad-helix.",
        "- 골격성 급속 구개 확장: RPE (Rapid Palatal Expander / Hyrax).",
        "암기 팁: 상악 확대 4대장 = W-arch, Quad helix, RPE, Porter!"
      ]
    },
    {
      id: 11,
      question: "Lip bumper 구성부분 중 순측호선 'U' loop의 역할은?",
      options: [
        "구강청결을 쉽게 한다.",
        "타액흐름이 쉽게 한다.",
        "호선조정을 하게 한다.",
        "치은조직을 자극한다.",
        "이물감을 감소시킨다."
      ],
      answer: 3,
      optionExplanations: {
        1: "청결 목적이 아닙니다.",
        2: "타액 흐름과 무관합니다.",
        3: "대구치 튜브 전방의 U자형 루프(U-loop)는 플라이어로 루프를 벌리거나 좁혀서 순측호선의 전후방 길이 및 수직 위치(호선 조정 / activation)를 조절하는 역할을 합니다.",
        4: "조직 자극 목적이 아닙니다.",
        5: "이물감 감소와 무관합니다."
      },
      commonExplanations: [
        "교정용 와이어 Loop의 기본 역할:",
        "- U-loop, Omega-loop 등은 호선의 유연성을 높이고 전후방 위치와 길이를 조절하는 조정부(Adjustment unit)입니다.",
        "암기 팁: 와이어 U 루프 = 위치 및 호선 조절용!"
      ]
    },
    {
      id: 12,
      question: "Activator 장치의 적응증이 아닌 것은?\n\n가. 비질환 환자, 구호흡 환자, 불면증 환자\n나. 구성교합의 채득이 어려운 환자\n다. 골격성 부정교합 환자 (심한 경우)\n라. Crowding이나 spacing이 심한 환자",
      options: [
        "가, 나, 다",
        "가, 다",
        "나, 라",
        "라",
        "가, 나, 다, 라"
      ],
      answer: 5,
      optionExplanations: {
        1: "라 항목도 액티베이터의 대표적 금기증입니다.",
        2: "모든 항목이 비적응증에 해당합니다.",
        3: "모든 항목이 비적응증에 해당합니다.",
        4: "모든 항목이 비적응증에 해당합니다.",
        5: "구호흡/비질환 환자(호흡곤란 유발), 구성교합 채득 불가자, 성인 및 심한 골격성 부조화, 개별 치아 총생/공극이 심한 환자 모두 액티베이터를 쓸 수 없는 금기증입니다."
      },
      commonExplanations: [
        "Activator 금기증 (비적응증):",
        "- 코로 숨을 못 쉬는 구호흡/비질환 환자 (질식 위험).",
        "- 심한 치아 총생 (개별 치아 배열 불가).",
        "- 성장이 끝난 성인 및 심한 골격성 기형.",
        "암기 팁: 구호흡자 + 심한 총생 = 액티베이터 금기!"
      ]
    },
    {
      id: 13,
      question: "Balters bionator의 치료 목적은?\n\n가. Lip trap과 비정상적 관계 제거\n나. 외상성 deep bite에 의한 점막의 상처 제거\n다. 하악의 후퇴 및 혀와 관련된 이상위치 수정\n라. 혀와 뺨의 근육 차단",
      options: [
        "가, 나, 다",
        "가, 다",
        "나, 라",
        "라",
        "가, 나, 다, 라"
      ],
      answer: 5,
      optionExplanations: {
        1: "라 항목도 치료 목적에 포함됩니다.",
        2: "모든 항목이 올바릅니다.",
        3: "모든 항목이 올바릅니다.",
        4: "모든 항목이 올바릅니다.",
        5: "Bionator는 액티베이터를 슬림화한 악기능 장치로, 아랫입술 물림(Lip trap) 제거, 과개교합 상처 방지, 하악 후퇴 및 혀의 비정상 위치 교정, 혀/뺨의 외력 차단을 모두 목적으로 합니다."
      },
      commonExplanations: [
        "Bionator의 핵심 치료 개념:",
        "- 구강 내 혀가 차지하는 공간을 확보하고, 협근과 구순근의 이상 압력을 차단하여 치열궁 정상 발육 유도.",
        "암기 팁: Bionator = 혀 공간 확보 + 이상 근육 차단!"
      ]
    },
    {
      id: 14,
      question: "FR II 제작과정 중 상악모형에 seating groove (interproximal notch)를 형성하는 이유는?",
      options: [
        "모형의 준비작업 시에 구치부와 접촉이 일어나지 않게 하기 위함이다.",
        "혀의 기능을 돕고 치열을 보호하기 위함이다.",
        "모형의 준비작업 시 장치물의 유지를 돕기 위함이다.",
        "치근의 흡수와 치조골의 흡수를 방지하기 위함이다.",
        "구치의 정출을 유도하기 위함이다."
      ],
      answer: 3,
      optionExplanations: {
        1: "구치 접촉 방지 목적이 아닙니다.",
        2: "혀 기능 보호와 무관합니다.",
        3: "소구치/유구치 치간부에 얕은 안착 홈(seating groove / notch)을 형성해야 교합면을 통과하는 와이어가 깊숙이 안착되어 장치의 고정과 유지를 돕습니다.",
        4: "골흡수 방지와 무관합니다.",
        5: "구치 정출 목적이 아닙니다."
      },
      commonExplanations: [
        "FR II Seating Groove(Notch) 형성 목적:",
        "- 모형 치간 부위에 와이어가 교합 간섭 없이 안정되게 안착할 수 있는 홈을 파주어 장치물 정착 및 유지력 향상.",
        "암기 팁: Seating groove = 장치물 정착 및 유지 지원!"
      ]
    },

    // ==========================================
    // 2. 모의고사 2차 교정기공학 (15 ~ 28)
    // ==========================================
    {
      id: 15,
      question: "교정력에 대하여 맞는 조합은?\n\n가) 교정력이 클수록 치아의 이동속도가 빠르다.\n나) 치아의 이동에 최적인 교정력은 치근표면적의 크기에 따라 다르다.\n다) 치아의 이동에 최적인 교정력은 치체이동보다도 경사이동쪽이 더 크다.\n라) 치아의 교정력이 과도하면 치근흡수가 일어나기 쉽다.",
      options: [
        "가, 다, 라",
        "가, 나",
        "나, 라",
        "가, 라",
        "가, 나, 다, 라"
      ],
      answer: 3,
      optionExplanations: {
        1: "가와 다는 틀린 진술입니다.",
        2: "가는 틀리고 라는 맞습니다.",
        3: "치아이동 최적 힘은 치근 표면적에 비례하며(나), 과도한 교정력은 무균성 괴사와 치근 흡수(Root resorption)를 유발하므로(라) '나, 라'가 정답입니다.",
        4: "가 항목은 틀렸습니다.",
        5: "가와 다 항목이 틀렸습니다."
      },
      commonExplanations: [
        "교정력의 크기와 생리적 반응:",
        "- 교정력이 과도하면 모세혈관 폐쇄로 초자화(Hyalinization)가 일어나 이동이 오히려 정지되고 치근 흡수가 발생합니다.",
        "- 치체이동(면적 분산)이 경사이동(응력 집중)보다 더 큰 힘을 필요로 합니다.",
        "암기 팁: 최적 힘 = 약한 지속력! 치근 표면적 비례!"
      ]
    },
    {
      id: 16,
      question: "치아를 이동시켰을 경우에 압박측(Pressure side)에서 볼 수 있는 조직의 변화는?\n\n가) 치근막 조직의 압축\n나) 유골의 형성\n다) 섬유아 세포의 증식\n라) 치조골의 흡수\n마) 치근막의 빈혈",
      options: [
        "가, 나, 다",
        "가, 나, 마",
        "가, 라, 마",
        "나, 다, 라",
        "다, 라, 마"
      ],
      answer: 3,
      optionExplanations: {
        1: "나와 다는 견인측 반응입니다.",
        2: "나는 견인측 반응입니다.",
        3: "치아가 밀려가는 압박측에서는 치근막이 눌려 압축되고(가), 혈관이 압박되어 빈혈이 생기며(마), 파골세포에 의한 치조골 흡수(라)가 일어납니다.",
        4: "나와 다는 견인측 반응입니다.",
        5: "다는 견인측 반응입니다."
      },
      commonExplanations: [
        "압박측 vs 견인측 조직 변화:",
        "- 압박측(Pressure side): 치근막 압축, 혈관 빈혈, 파골세포 활성화 → 치조골 흡수.",
        "- 견인측(Tension side): 치근막 신장, 섬유아세포 증식, 조골세포 활성화 → 유골 및 신생골 형성.",
        "암기 팁: 압박측 = 압축·빈혈·골흡수!"
      ]
    },
    {
      id: 17,
      question: "Angle 1급 부정교합에 포함되는 것은?\n\n가) 상악 high canine\n나) 정상교합\n다) 상악전돌\n라) 상하악 전돌(양악전돌)\n마) 총생",
      options: [
        "가, 나, 다",
        "가, 나, 마",
        "가, 라, 마",
        "나, 다, 라",
        "다, 라, 마"
      ],
      answer: 3,
      optionExplanations: {
        1: "나(정상교합)와 다(2급 1류)는 포함되지 않습니다.",
        2: "나(정상교합)는 부정교합이 아닙니다.",
        3: "Angle 1급(대구치 관계 정상) 상태에서 나타나는 대표적인 증례는 상악 덧니(High canine, 가), 양악전돌(라), 전치부 총생(마)입니다.",
        4: "나와 다는 포함되지 않습니다.",
        5: "다는 2급 부정교합입니다."
      },
      commonExplanations: [
        "Angle Class I 부정교합의 특징:",
        "- 제1대구치 근원심 관계는 정상 중심교합(Neutroclusion).",
        "- 전치부 총생(Crowding), 덧니(High canine), 양악전돌(Bimaxillary protrusion) 동반.",
        "암기 팁: High canine + 양악전돌 + 총생 = 1급 부정교합!"
      ]
    },
    {
      id: 18,
      question: "교정용 Plier와 기능이 바르게 연결된 것은?\n\n가) 밴드에 굴곡을 주면서 변연부를 조인다 - Howe 플라이어\n나) 에로우 헤드 클래스프의 굴곡 - Adams 플라이어\n다) 선의 세부조절이나 클래스프의 조절, 둥근선의 부분적인 굴곡 - Jarabak 플라이어\n라) 와이어의 급각도 또는 부드러운 굴곡 및 다양한 크기의 루프를 구부림 - Young 플라이어",
      options: [
        "가, 나, 다",
        "가, 다",
        "나, 라",
        "라",
        "가, 나, 다, 라"
      ],
      answer: 3,
      optionExplanations: {
        1: "가는 Johnson plier 설명이므로 틀립니다.",
        2: "가는 틀린 설명입니다.",
        3: "Jarabak 플라이어는 세선 와이어 세부 조절 및 클래스프 조절(다), Young 플라이어는 3단계 원추 부리를 이용한 다양한 크기의 루프 굴곡(라)에 올바르게 매칭됩니다.",
        4: "다 항목도 올바른 연결입니다.",
        5: "가와 나 항목이 잘못 연결되었습니다."
      },
      commonExplanations: [
        "교정용 플라이어 주요 용도:",
        "- 밴드 변연부 팽륭 및 곡면 형성 = Johnson contouring plier.",
        "- 에로우헤드 굴곡 = Arrowhead forming plier.",
        "- 세선 미세 조절 = Jarabak plier.",
        "- 3단계 루프 굴곡 = Young plier.",
        "암기 팁: Jarabak = 세부 조절! Young = 3단계 루프!"
      ]
    },
    {
      id: 19,
      question: "악태모형의 설명으로 옳은 것은?\n\n가) 안면두개골의 특정 계측점을 이용하여 기준을 설정한다.\n나) 시간적 경과에 따른 비교가 용이하다.\n다) 기준점을 측정 재현하는 전용의 기구가 필요하다.\n라) 제작과정이 간편하다.",
      options: [
        "가, 나, 다",
        "가, 다",
        "나, 라",
        "라",
        "가, 나, 다, 라"
      ],
      answer: 1,
      optionExplanations: {
        1: "안면두개골 정지 계측점을 기준 삼아(가), 성장기 악골 변화 비교가 용이하며(나), 페이스보와 Gnathostat 등 전용 기구가 필수적입니다(다).",
        2: "나 항목도 명백히 올바른 설명입니다.",
        3: "라 항목은 틀린 진술입니다.",
        4: "제작 과정은 수평모형에 비해 매우 복잡하고 까다롭습니다.",
        5: "라 항목이 틀렸으므로 오답입니다."
      },
      commonExplanations: [
        "악태모형(Gnathostatic Model) 핵심 요약:",
        "- 두개골 계측점(FH plane 등) 기준.",
        "- 전용 기구 필수, 제작 복잡.",
        "- 시간 경과에 따른 악골 성장 비교 관찰에 최적.",
        "암기 팁: 악태모형 = 계측점 사용 + 전용기구 + 성장 비교!"
      ]
    },
    {
      id: 20,
      question: "Simon의 악태진단법에서 기준이 되는 평면은?\n\n가) 정중구개봉합선상의 2점을 지나서 Frankfort 평면과 직각인 면\n나) 좌우 안점을 지나서 Frankfort 평면과 직각인 면\n다) 좌우 이점과 좌안점에 의해 구성되는 면\n라) 좌우 이점을 지나서 Frankfort 평면과 직각인 면",
      options: [
        "가, 나, 다",
        "가, 다",
        "나, 라",
        "라",
        "가, 나, 다, 라"
      ],
      answer: 1,
      optionExplanations: {
        1: "가는 정중시상평면, 나는 안와평면, 다는 안이평면(FH plane)으로 Simon 악태진단의 3대 기준 평면에 해당합니다.",
        2: "나 항목(안와평면)도 3평면의 핵심입니다.",
        3: "라 항목은 Simon 3평면에 속하지 않습니다.",
        4: "라는 기준 평면이 아닙니다.",
        5: "라 항목이 포함되어 오답입니다."
      },
      commonExplanations: [
        "Simon의 악태진단 3평면 정의:",
        "- 정중시상면: 정중구개봉합선 통과, FH면에 수직 → 내외측 관계.",
        "- 안와평면: 양측 안점(Orbitale) 통과, FH면에 수직 → 전후방 관계.",
        "- 안이평면(FH): 좌우 이점(Porion)과 좌안점(Orbitale) 연결 → 수직 관계.",
        "암기 팁: 정중시상(내외) + 안와(전후) + 안이(수직)!"
      ]
    },
    {
      id: 21,
      question: "상교정장치의 공통점으로만 옳게 묶인 것은?\n\n가) 하악성 이동을 기대한다.\n나) 고정장치는 움직임이 없는 것으로 본다.\n다) Light force를 사용한다.\n라) 정교한 이동이 가능하다.",
      options: [
        "가, 나, 다",
        "가, 다",
        "나, 라",
        "라",
        "가, 나, 다, 라"
      ],
      answer: 1,
      optionExplanations: {
        1: "레진상과 고정원은 움직임이 없는 버팀목으로 간주하며(나), 내장된 스프링/스크루로 가벼운 생리적 힘(Light force)을 부여하고(다), 하악 위치 변화를 유도하기도 합니다(가).",
        2: "나 항목도 올바른 설명입니다.",
        3: "라 항목의 정교한 3차원 치체이동은 고정성 브라켓 장치의 특징이므로 틀립니다.",
        4: "라는 틀린 설명입니다.",
        5: "라 항목이 틀렸으므로 오답입니다."
      },
      commonExplanations: [
        "상교정장치 Biomechanics 특징:",
        "- 레진 기초상 = Anchorage(움직이지 않는 고정원).",
        "- Light force를 이용한 치아 경사이동(Tipping).",
        "암기 팁: 상교정장치 = 레진상 고정원 + Light force!"
      ]
    },
    {
      id: 22,
      question: "Spring의 분류 중에서 Protected spring에 대한 설명으로 조합된 것은?\n\n가) Spring 자체가 유연하다.\n나) 0.6-0.7mm 정도의 굵은 wire로 제작한다.\n다) Guided spring이라고도 한다.\n라) Heavy orthodontic force 발휘한다.",
      options: [
        "가, 나, 다",
        "가, 다",
        "나, 라",
        "라",
        "가, 나, 다, 라"
      ],
      answer: 1,
      optionExplanations: {
        1: "작동 스프링 자체는 0.5mm 이하로 매우 유연하여(가), 변형 방지를 위해 0.6~0.7mm 굵은 가이드 와이어를 덮어 제작하며(나), Guided spring이라 부릅니다(다).",
        2: "나 항목도 올바른 설명입니다.",
        3: "라 항목의 Heavy force는 틀린 설명입니다 (가벼운 힘 발휘).",
        4: "라는 틀렸습니다.",
        5: "라 항목이 틀렸으므로 오답입니다."
      },
      commonExplanations: [
        "Protected Spring (Guided Spring):",
        "- 작동 와이어: 0.5mm 이하 세선 (매우 유연하여 가벼운 힘 지속).",
        "- 가이드 와이어: 0.6~0.7mm 굵은 와이어로 덮어 외력에 의한 변형 방지.",
        "암기 팁: Protected spring = 유연한 세선 + 굵은 가이드 와이어!"
      ]
    },
    {
      id: 23,
      question: "다음 장치에 관련성이 없는 것으로 연결된 것은?",
      options: [
        "설측호선장치 - S.T lock - 연속탄성",
        "횡구개호선장치 - 유지 sheath - 순차적활성",
        "포터 설측호선장치 - W-arch - 상악 협착 치열궁 확대",
        "횡구개호선장치 - 구개호선 - 구치의 고정원",
        "설측호선장치 주선 - Clasp"
      ],
      answer: 5,
      optionExplanations: {
        1: "S.T lock을 이용한 고정성 연결은 올바른 조합입니다.",
        2: "Lingual sheath를 통한 탈착식 횡구개호선 연결은 올바른 조합입니다.",
        3: "포터 장치(Porter arch = W-arch)의 상악 치열궁 확대는 올바른 조합입니다.",
        4: "구개호선을 이용한 대구치 고정원 확보는 올바른 조합입니다.",
        5: "설측호선장치(Lingual arch)의 주선은 대구치 밴드의 시스(Sheath)에 결찰되거나 직접 납착(Soldering)되므로, 가철성 장치의 클래스프(Clasp)를 부착하지 않습니다."
      },
      commonExplanations: [
        "고정성 설측호선 결합 방식:",
        "- 밴드 튜브/시스(Sheath) 삽입 고정 또는 직접 은납착.",
        "- 클래스프(Clasp)는 가철성 상교정장치에만 사용됨.",
        "암기 팁: 설측호선 주선에는 Clasp가 없다!"
      ]
    },
    {
      id: 24,
      question: "TPA의 loop를 구개부에서 보다 멀리 떨어지게 하고 전방으로 넓게 제작하여 장착하면, 치아에 어떠한 변화가 일어나는가?",
      options: [
        "구치의 설측이동",
        "구치의 협측이동",
        "구치의 압하",
        "구치의 협측토크이동",
        "구치의 설측토크이동"
      ],
      answer: 2,
      optionExplanations: {
        1: "루프를 좁혀야 설측 이동이 일어납니다.",
        2: "횡구개호선(TPA)의 중앙 오메가 루프를 전방으로 넓게 벌려 활성화(expansion)하면 양측 대구치 밴드를 바깥쪽으로 밀어내어 구치의 협측이동(Buccal expansion)이 일어납니다.",
        3: "압하와 무관합니다.",
        4: "치관 협측 경사 이동이 주된 반응입니다.",
        5: "설측 토크와 무관합니다."
      },
      commonExplanations: [
        "TPA (Transpalatal Arch) 루프 조절 기전:",
        "- Loop 벌림(넓힘) → 대구치 협측 이동 (측방 확장).",
        "- Loop 오므림(좁힘) → 대구치 설측 이동 (협착 수축).",
        "암기 팁: TPA 루프 넓히면 = 구치 협측 이동!"
      ]
    },
    {
      id: 25,
      question: "Anti-Finger sucking appliance 제작으로 옳은 것은?",
      options: [
        "Band나 crown 내면 납착부에 공간을 주어 납착에 용이하게 한다.",
        "주선은 구개점막의 굴곡에 따라 제작한다.",
        "Fence부는 측절치 중간에 연결하는 폭으로 'U'자형으로 굴곡한다.",
        "Fence부는 교합평면에 45°로 제작한다.",
        "Spur부의 끝은 둥글게 연마한다."
      ],
      answer: 5,
      optionExplanations: {
        1: "내면 납착부는 밀착시켜야 결합력이 높아집니다.",
        2: "구개 점막에 닿으면 압박 괴사가 생기므로 1~2mm 릴리프해야 합니다.",
        3: "손가락 진입을 막기 위해 울타리 형태로 전치 설면에 수직 배열합니다.",
        4: "교합평면에 거의 수직으로 위치합니다.",
        5: "손가락 빠기 방지 장치의 돌기(Spur) 끝이 날카로우면 혀나 구강 점막을 손상시키므로 반드시 둥글고 매끄럽게 연마해야 합니다."
      },
      commonExplanations: [
        "Anti-Finger Sucking Appliance 기공 원칙:",
        "- 구개 와이어 점막 릴리프(Relief) 1~2mm.",
        "- Spur 및 Fence 끝부분은 조직 손상 방지를 위해 둥글게 광택 연마.",
        "암기 팁: 스퍼(Spur) 끝은 매끄럽고 둥글게!"
      ]
    },
    {
      id: 26,
      question: "Angle 2급 1류에 사용하는 activator의 치료효과는?\n\n가) 하악골의 성장촉진\n나) 교합거상\n다) 상악전치의 설측이동\n라) 하악전치부의 총생의 개선",
      options: [
        "가, 나, 다",
        "가, 다",
        "나, 라",
        "라",
        "가, 나, 다, 라"
      ],
      answer: 1,
      optionExplanations: {
        1: "하악을 전방 유도하여 하악골 성장을 자극하고(가), 구치 정출로 과개교합을 거상하며(나), 순측호선으로 뻐드러진 상악 전치를 설측으로 이동시킵니다(다).",
        2: "나 항목도 액티베이터의 대표 효과입니다.",
        3: "라 항목은 액티베이터로 불가능합니다.",
        4: "개별 치아 총생은 액티베이터로 치료할 수 없습니다.",
        5: "라 항목이 틀렸으므로 오답입니다."
      },
      commonExplanations: [
        "Class II div 1 Activator의 3대 치료 효과:",
        "1. 하악골 기능적 전방 성장 자극.",
        "2. 구치 정출에 의한 교합 거상 (과개교합 해소).",
        "3. 상악 전치 설측 경사 이동.",
        "암기 팁: 2급 1류 액티베이터 = 하악 성장 + 교합 거상 + 상악전치 설측이동!"
      ]
    },
    {
      id: 27,
      question: "상하악 구치가 교합 접촉되지 않은 장치는 어느 것인가?\n\n가) Activator\n나) 교합거상판\n다) Tooth positioner\n라) 설측호선장치",
      options: [
        "가, 나, 다",
        "가, 나",
        "나, 라",
        "라",
        "가, 나, 다, 라"
      ],
      answer: 2,
      optionExplanations: {
        1: "다의 Tooth positioner는 구치를 포함해 모든 치아가 물려있습니다.",
        2: "액티베이터는 구성교합으로 하악을 띄우므로 구치가 이개되며(가), 교합거상판(Anterior bite plate)은 전치만 접촉시켜 구치를 띄웁니다(나).",
        3: "라는 정상 교합 상태를 유지합니다.",
        4: "설측호선은 교합을 띄우지 않습니다.",
        5: "다와 라는 구치가 접촉합니다."
      },
      commonExplanations: [
        "구치부 교합 이개(Bite opening) 유발 장치:",
        "- Activator (구성교합에 의해 구치부 공간 형성).",
        "- Anterior bite plate (전방교합판 - 하악 전치만 닿아 구치가 뜸).",
        "암기 팁: 구치 이개 장치 = 액티베이터 + 전방교합판!"
      ]
    },
    {
      id: 28,
      question: "하악근심이동에 사용할 수 있는 교정장치는?\n\n가) 2급 악간고정장치\n나) Activator\n다) 교합사면판\n라) 이모장치(Chin cap)",
      options: [
        "가, 나, 다",
        "가, 다",
        "나, 라",
        "라",
        "가, 나, 다, 라"
      ],
      answer: 1,
      optionExplanations: {
        1: "2급 악간고무줄은 하악을 전방(근심)으로 당기며(가), 액티베이터는 하악 전방 유도를 자극하고(나), 교합사면판은 경사면을 타고 하악을 전방으로 이동시킵니다(다).",
        2: "나 항목도 하악 전방 유도 장치입니다.",
        3: "라의 이모장치는 하악을 후방(원심)으로 억제하는 장치입니다.",
        4: "이모장치는 하악 후방 억제용입니다.",
        5: "라 항목이 틀렸으므로 오답입니다."
      },
      commonExplanations: [
        "하악골 전후방 제어 장치 비교:",
        "- 하악 전방(근심) 유도: Class II elastic, Activator, Inclined bite plate.",
        "- 하악 후방(원심) 억제: Chin cap (이모장치 - Class III 치료용).",
        "암기 팁: 하악 전방 이동 = 2급 고무줄 + 액티베이터 + 교합사면판!"
      ]
    },

    // ==========================================
    // 3. 모의고사 3차 교정기공학 (29 ~ 42)
    // ==========================================
    {
      id: 29,
      question: "기계적 교정장치(치열궁 확대선)의 최초 사용자는?",
      options: [
        "Celsus",
        "Fauchard",
        "Fox",
        "Angle",
        "Case"
      ],
      answer: 2,
      optionExplanations: {
        1: "Celsus는 고대 로마 시대 손가락 치압법(Finger pressure)을 최초 기록한 학자입니다.",
        2: "Pierre Fauchard(1728년)는 금/은으로 된 금속 확대 띠인 밴도(Bandeau)를 고안하여 치열궁을 기계적으로 확장한 최초의 교정장치 사용자입니다.",
        3: "Fox는 인상재를 이용한 최초의 인상 채득자입니다.",
        4: "Angle은 부정교합 앵글 분류법 및 Edgewise 장치를 고안한 현대 교정학의 아버지입니다.",
        5: "Case는 치체이동을 도입한 학자입니다."
      },
      commonExplanations: [
        "치과교정학 역사상 주요 학자:",
        "- Celsus: 최초의 치압법 기록.",
        "- Fauchard: 최초의 기계적 교정장치 밴도(Bandeau) 고안.",
        "- Angle: 부정교합 분류 및 현대 교정학 정립.",
        "암기 팁: 확대선 Bandeau의 최초 사용자는 Fauchard!"
      ]
    },
    {
      id: 30,
      question: "Leeway space로 인한 이동으로 맞는 것은?",
      options: [
        "상 1번치가 하 1번치보다 더 많이 근심이동한다.",
        "상 6번치가 하 6번치보다 더 많이 근심이동한다.",
        "상 6번치가 하 6번치보다 더 많이 원심이동한다.",
        "상 6번치 보다 하 6번치가 더 많이 근심이동한다.",
        "상 6번치 보다 하 6번치가 더 많이 원심이동한다."
      ],
      answer: 4,
      optionExplanations: {
        1: "전치부 이동 규칙이 아닙니다.",
        2: "하악 공간이 더 크므로 하악 6번이 더 많이 근심 이동합니다.",
        3: "대구치는 근심으로 이동합니다.",
        4: "하악의 Leeway space(편측 약 1.7mm)가 상악(편측 약 0.9mm)보다 약 2배 크므로, 하악 제1대구치(하 6번)가 상악 제1대구치보다 전방(근심)으로 더 많이 이동(Late mesial shift)합니다.",
        5: "원심이 아닌 근심 이동입니다."
      },
      commonExplanations: [
        "Leeway space와 Late Mesial Shift:",
        "- 하악 여유 공간이 상악보다 약 1.6mm(양측) 더 큼.",
        "- 결과: 하악 6번이 상악 6번보다 더 많이 근심으로 이동하여 Class I 정상 대구치 관계 완성.",
        "암기 팁: 리웨이는 하악이 커서 하악 6번이 더 근심 이동!"
      ]
    },
    {
      id: 31,
      question: "교정용 기구와 용도의 연결이 틀린 것은?",
      options: [
        "Young's pliers - wire 굴곡",
        "Adam's pliers - wire 굴곡",
        "Howe's pliers - 결찰",
        "Johnsons pliers - band 팽륭",
        "Band pusher - band 제거"
      ],
      answer: 5,
      optionExplanations: {
        1: "와이어 루프 굴곡용 플라이어 맞습니다.",
        2: "와이어 직각 굴곡용 플라이어 맞습니다.",
        3: "유도선 결찰용 플라이어 맞습니다.",
        4: "밴드 치면 밀착 및 팽륭 플라이어 맞습니다.",
        5: "Band pusher는 밴드를 치아에 눌러 장착시키는 수기구이며, 밴드를 제거하는 전용 기구는 Band remover plier(밴드 리무버)입니다."
      },
      commonExplanations: [
        "밴드(Band) 관련 기구 구별:",
        "- Band pusher / seater: 밴드를 치경부로 밀어 넣어 적합시키는 기구.",
        "- Band remover plier: 밴드를 잡아서 벗겨내는(제거하는) 플라이어.",
        "암기 팁: Band pusher는 장착용, 제거는 Band remover!"
      ]
    },
    {
      id: 32,
      question: "모형에 대해 틀린 것은?",
      options: [
        "모형제작시 model trimmer 이용하여 모형형성",
        "수평모형은 모형저연과 교합평면이 평행인 모형",
        "수평모형은 안면두개에 대해 어떠한 위치에 있는지를 판정할 수 없다.",
        "Simon의 3기준평면은 안이평면, 정중시상면, 안와평면이다.",
        "Set up 모형은 악태모형을 복제한 것이다."
      ],
      answer: 5,
      optionExplanations: {
        1: "트리머로 기저면을 다듬습니다.",
        2: "수평모형은 기저면과 교합평면이 평행합니다.",
        3: "수평모형은 두개골 계측점이 없어 두개골에 대한 위치 파악이 불가합니다.",
        4: "Simon 3평면은 FH, 정중시상, 안와평면 맞습니다.",
        5: "Set-up 모형(셋업 모형)은 악태모형을 복제한 것이 아니라, 작업 모형에서 치아를 톱으로 하나씩 분리하여 이상적인 위치로 재배열한 모형입니다."
      },
      commonExplanations: [
        "Set-up Model의 정의:",
        "- 작업 모형상에서 개별 치아를 분리하여 올바른 교합 위치로 재배열(Setup)한 특수 모형.",
        "- 스프링 보정장치, 투명교정 시트, 포지셔너 제작에 필수.",
        "암기 팁: Set-up 모형 = 치아 잘라 재배열한 모형!"
      ]
    },
    {
      id: 33,
      question: "악태모형에 대해 틀린 것은?",
      options: [
        "안면의 정중과 모형의 정중을 일치",
        "안와평면은 상악 견치의 첨두를 통과",
        "교합평면과 FH plane은 일치한다.",
        "상악기저면은 안이평면에 일치",
        "상악 기저면의 상면에 그어져 있는 선은 안와평면의 통과위치를 나타낸다."
      ],
      answer: 3,
      optionExplanations: {
        1: "정중시상평면 일치 원칙입니다.",
        2: "안와견치법칙에 따라 안와평면은 상악 견치 첨두를 통과합니다.",
        3: "악태모형에서 교합평면과 안이평면(FH plane)은 일치하지 않고 약 10°~15°의 경사 각도를 형성합니다. (교합평면과 바닥면이 일치하는 것은 수평모형).",
        4: "상악 기저면은 안이평면과 일치합니다.",
        5: "상악 기저면에 안와평면 표식선을 각인합니다."
      },
      commonExplanations: [
        "악태모형의 평면 관계:",
        "- 상악 기저면(Base) = 안이평면(FH plane).",
        "- 교합평면(Occlusal plane)은 안이평면과 평행하지 않고 경사져 있음.",
        "암기 팁: 교합평면과 FH 평면은 일치하지 않는다!"
      ]
    },
    {
      id: 34,
      question: "Adams clasp 제작 시 치아장축과 30도의 각을 기울여야 할 곳은?",
      options: [
        "bridge",
        "palatal arm",
        "cross arm",
        "arrowhead",
        "tag"
      ],
      answer: 4,
      optionExplanations: {
        1: "수평 브릿지는 치면과 45° 이개합니다.",
        2: "구개측 연장선입니다.",
        3: "교합면 통과선입니다.",
        4: "아담스 클래스프의 화살촉(Arrowhead) 루프는 치아 장축에 대해서는 30°, 작업모형의 교합평면에 대해서는 60° 각도를 형성하도록 구부립니다.",
        5: "레진 매립부입니다."
      },
      commonExplanations: [
        "Adams Clasp Arrowhead 각도 기준:",
        "- 치아 장축 기준: 30° 경사.",
        "- 교합평면 기준: 60° 경사.",
        "암기 팁: 치아 장축엔 30도, 교합평면엔 60도!"
      ]
    },
    {
      id: 35,
      question: "교합 거상과 하악전치를 전진시키는 목적을 갖는 장치는?",
      options: [
        "anterior bite plate",
        "inclined bite plate",
        "posterior bite plate",
        "tooth positioner",
        "lingual arch"
      ],
      answer: 2,
      optionExplanations: {
        1: "전방교합판은 단순 교합 거상용입니다.",
        2: "경사교합판(Inclined bite plate / 교합사면판)은 상악 전치 설측 경사면을 따라 하악 전치가 미끄러지게 유도하여 교합을 거상시킴과 동시에 하악을 전방으로 전진시킵니다.",
        3: "구치부 바이트 블록입니다.",
        4: "치열 미세 정렬 장치입니다.",
        5: "치열궁 유지 장치입니다."
      },
      commonExplanations: [
        "Inclined Bite Plate (교합사면판) 기능:",
        "- 상악 전치 설측 사면을 통해 하악을 앞으로 미끄러지게 유도 (하악 전진 + 과개교합 거상).",
        "암기 팁: 하악 전진 + 교합 거상 = 사면판(Inclined bite plate)!"
      ]
    },
    {
      id: 36,
      question: "외부 충격으로부터 치아를 보호하는 장치는?",
      options: [
        "tooth positioner",
        "lip bumper",
        "mouth guard",
        "functional regulator",
        "activator"
      ],
      answer: 3,
      optionExplanations: {
        1: "치열 보정 장치입니다.",
        2: "입술 습관 차단 장치입니다.",
        3: "마우스 가드(Mouth guard)는 연성 EVA 재료로 제작되어 격렬한 운동이나 외부 충격으로부터 치아, 치조골, 턱관절을 보호하는 장치입니다.",
        4: "악기능 교정 장치입니다.",
        5: "악기능 교정 장치입니다."
      },
      commonExplanations: [
        "Mouth Guard (마우스 가드):",
        "- 스포츠 및 충격으로부터 치아 파절 및 악관절 외상 방지.",
        "암기 팁: 외부 충격 보호 = 마우스 가드!"
      ]
    },
    {
      id: 37,
      question: "유치의 조기 탈락시 제1대구치의 근심이동을 저지하고 올바른 위치로 맹출하도록 유도하는 장치는?",
      options: [
        "crown and bar",
        "crown distal shoe",
        "broken stress type appliance",
        "band and bar",
        "crown and spring"
      ],
      answer: 2,
      optionExplanations: {
        1: "단순 바 유지 장치입니다.",
        2: "제1대구치가 아직 잇몸 속에 미맹출된 상태에서 제2유구치가 조기 상실되었을 때, 잇몸 속 치조골 내로 슈(Shoe)를 연장하여 제1대구치 맹출을 올바르게 유도하는 장치는 Crown distal shoe입니다.",
        3: "완충형 장치입니다.",
        4: "단순 밴드 바 장치입니다.",
        5: "스프링 장치입니다."
      },
      commonExplanations: [
        "Crown Distal Shoe 핵심 요소:",
        "- 제1대구치 미맹출 시 제2유구치 상실.",
        "- 치조골 내로 블레이드(Shoe)를 연장해 대구치 근심 이동 방지 및 맹출 가이드.",
        "암기 팁: 대구치 나오기 전 맹출 유도 = 크라운 디스탈 슈!"
      ]
    },
    {
      id: 38,
      question: "다음 중 공간확보장치(Space Regainer)는?",
      options: [
        "crown and bar",
        "crown distal shoe",
        "broken stress type appliance",
        "band and bar",
        "expansion screw"
      ],
      answer: 5,
      optionExplanations: {
        1: "공간유지장치입니다.",
        2: "공간유지장치입니다.",
        3: "완충형 장치입니다.",
        4: "공간유지장치입니다.",
        5: "인접 치아가 기울어져 이미 좁아진 공간을 다시 밀어내어 확보(Regain)하는 가철성 공간확보장치에 활용되는 부품은 확장 나사(Expansion screw)입니다."
      },
      commonExplanations: [
        "Space Maintainer vs Space Regainer:",
        "- 유지장치(Maintainer): Band & loop, Crown distal shoe, Lingual arch.",
        "- 확보장치(Regainer): Expansion screw, Slingshot, Halterman, Split saddle.",
        "암기 팁: 공간을 넓혀 확보 = Expansion screw!"
      ]
    },
    {
      id: 39,
      question: "하순 깨물기나 빨기 습관을 제거하는 장치는?",
      options: [
        "anti-finger sucking appliance",
        "tongue guard",
        "lip bumper",
        "oral screen",
        "inclined plane"
      ],
      answer: 3,
      optionExplanations: {
        1: "손가락 빨기 방지 장치입니다.",
        2: "혀 내밀기 차단 장치입니다.",
        3: "립 범퍼(Lip bumper)는 하순(아랫입술)을 깨물거나 빠는 습관을 차단하여 하악 전치의 설측 경사를 막고 전방 공간을 확보하는 장치입니다.",
        4: "구호흡 차단 및 구순 폐쇄력 강화 장치입니다.",
        5: "전치 반대교합 교정용입니다."
      },
      commonExplanations: [
        "구강 악습관 제거 장치 매칭:",
        "- 아랫입술 깨물기/빨기 → 립 범퍼 (Lip bumper).",
        "- 손가락 빨기 → 손가락빨기방지장치 (Anti-finger sucking).",
        "- 혀 내밀기/이상연하 → 텅 가드 (Tongue guard).",
        "암기 팁: 아랫입술 빠기 차단 = 립 범퍼!"
      ]
    },
    {
      id: 40,
      question: "Anti-finger sucking appliance 제작 시 fence의 후면은 제 2유구치의 근심 1/3부위까지 하여 제 2유구치의 원심면을 넘지 않도록 한다. 그 이유는?",
      options: [
        "이물감이 없도록 하기 위해",
        "손가락이 구개부 자극을 쉽도록 하기 위해",
        "계승치의 맹출 시 방해가 되지 않게 하기 위해",
        "치은부의 염증을 방지하기 위해",
        "대합치의 방해가 되지 않게 하기 위해"
      ],
      answer: 3,
      optionExplanations: {
        1: "이물감보다 맹출 보호가 최우선입니다.",
        2: "손가락 자극 차단이 목적입니다.",
        3: "울타리(Fence) 와이어가 너무 후방으로 연장되면 하방에서 올라오는 후속 영구치(소구치 및 대구치)의 생리적 맹출 경로를 물리적으로 방해하므로 제2유구치 원심면을 넘지 않게 제한합니다.",
        4: "치은염 방지 목적이 아닙니다.",
        5: "대합치 방해보다 계승치 맹출 보호가 핵심 이유입니다."
      },
      commonExplanations: [
        "Anti-Finger Sucking Appliance 펜스 설계 규칙:",
        "- Fence 후방 연장 한계: 제2유구치 원심면 이전.",
        "- 이유: 후속 계승 영구치의 맹출 장애 예방.",
        "암기 팁: Fence 원심 제한 = 계승 영구치 맹출 방해 금지!"
      ]
    },
    {
      id: 41,
      question: "Activator에 관한 것 중 옳은 것은?",
      options: [
        "구성교합은 교합기 상에서 채득한다.",
        "유도선은 상하 전치의 설면에 위치한다.",
        "유도선은 0.7mm의 wire를 사용한다.",
        "비질환 환자에도 적용할 수 있다.",
        "유도선의 loop는 조절을 하기 위한 것이다."
      ],
      answer: 5,
      optionExplanations: {
        1: "구성교합은 환자의 구강 내에서 직접 채득합니다.",
        2: "유도선(Labial bow)은 전치 순면에 위치합니다.",
        3: "액티베이터 유도선은 0.8~0.9mm의 굵은 와이어를 사용합니다.",
        4: "비질환 및 구호흡 환자에게는 절대 사용할 수 없습니다 (금기증).",
        5: "액티베이터 순측 유도선의 U-루프(U-loop)는 플라이어로 루프를 조절하여 호선의 전후방 위치와 활성도를 조절하기 위해 설치합니다."
      },
      commonExplanations: [
        "Activator 제작 핵심 규격:",
        "- 구성교합: 구강 내 직접 채득.",
        "- 유도선: 0.8~0.9mm SS wire (U-loop로 활성도 조절).",
        "- 금기증: 코로 숨 못 쉬는 구호흡자.",
        "암기 팁: 액티베이터 유도선 루프 = 장치 조절 목적!"
      ]
    },
    {
      id: 42,
      question: "Functional regulator의 buccal shields와 같이 구강 내 협측의 연조직이 치아에 접촉하는 것을 막도록 labial bow에 연장된 buccinator loop를 가지고 있는 bionator는?",
      options: [
        "bionator 1",
        "california bionator 1",
        "california bionator 2",
        "bionator 2",
        "balter's bionator"
      ],
      answer: 2,
      optionExplanations: {
        1: "기본형 Bionator 1입니다.",
        2: "California Bionator 1은 순측호선 측면에 뺨(협근) 접촉을 차단하는 볼근육 차단 루프(Buccinator loop)가 연장되어 있어 FR의 Buccal shield와 유사한 기능을 수행합니다.",
        3: "California Bionator 2는 개방교합용 변형입니다.",
        4: "기본형 Bionator 2입니다.",
        5: "원형 바이오나토르입니다."
      },
      commonExplanations: [
        "California Bionator 1 특징:",
        "- Labial bow에 Buccinator loop가 연장되어 뺨(협근) 압력을 차단.",
        "암기 팁: Buccinator loop 가진 바이오나토르 = California bionator!"
      ]
    }
  ]
};
