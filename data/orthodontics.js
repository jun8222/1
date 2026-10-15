window.quizDatabase = window.quizDatabase || {};

window.quizDatabase.orthodontics = {
  title: "교정기공학 (1번 ~ 42번)",
  questions: [
    /* =========================================================
       모의고사 1차 (97번 ~ 110번 -> 1번 ~ 14번)
       ========================================================= */
    {
      id: 1,
      question: "차단 교정학(Interceptive Orthodontics)에 속하지 않는 교정 장치는?",
      contextBox: "가. Expansion screw space regainer\n나. Serial extraction\n다. Oral screen\n라. Crown distal shoe",
      options: ["가, 나, 다", "가, 다", "나, 라", "라", "가, 나, 다, 라"],
      answer: 4,
      optionExplanations: {
        1: "가, 나, 다는 모두 발병하기 시작한 부정교합의 악화를 막는 차단 교정학 영역에 속합니다.",
        2: "가(공간확보장치), 다(구강전정판)는 차단교정 치료법입니다.",
        3: "나(순차발치술)는 차단교정이나 라(Crown distal shoe)는 예방교정 장치입니다.",
        4: "Crown distal shoe는 제2유구치 조기 탈락 시 미맹출된 영구 제1대구치의 맹출을 유도하고 공간을 유지하는 '공간유지장치'로 예방 교정학(Preventive Orthodontics)에 속합니다.",
        5: "라를 제외한 가, 나, 다는 차단교정에 포함됩니다."
      },
      commonExplanations: [
        "예방교정: 공간유지장치(Crown distal shoe, Band and loop 등) / 차단교정: 공간확보장치(Space regainer), 순차발치술(Serial extraction), 구강전정판(Oral screen)"
      ]
    },
    {
      id: 2,
      question: "Leeway space(이도공간)에 대해 옳은 것만의 조합은?",
      contextBox: "가. 영구전치의 배열에 일부가 소비된다.\n나. 하악의 Leeway space 양은 상악보다 크다.\n다. 제 1대구치 교합관계를 조정하는데 이용된다.\n라. 유구치 조기상실 시에도 Leeway space는 변함이 없다.",
      options: ["가, 나, 다", "가, 다", "나, 라", "라", "가, 나, 다, 라"],
      answer: 1,
      optionExplanations: {
        1: "영구전치 배열 시 일부 소비되고(가), 하악의 양이 상악보다 크며(나), 제1대구치 근심 이동으로 1급 교합관계를 형성하는 데 이용됩니다(다).",
        2: "나 항목(하악의 Leeway space가 상악보다 큼)이 누락되었습니다.",
        3: "라 지문은 틀린 설명입니다. 유구치가 조기상실되면 인접 대구치의 근심 이동으로 공간이 소실됩니다.",
        4: "라 지문은 잘못되었습니다.",
        5: "라 지문이 오답입니다."
      },
      commonExplanations: [
        "Leeway space: 유견치·유구치(C+D+E) 폭경 합과 계승 영구치(3+4+5) 폭경 합의 차이 (하악이 상악보다 크며, 제1대구치 근심이동으로 1급 교합 형성)"
      ]
    },
    {
      id: 3,
      question: "영 플라이어(Young pliers)에 대한 설명으로 옳은 것만의 조합은?",
      contextBox: "가. 각형 와이어 밴딩시 사용\n나. 비교적 가는 와이어 밴딩시 사용\n다. 0.9mm 이상의 와이어를 구부려서는 안됨\n라. 겸자 선단의 한쪽이 3단계의 원추형",
      options: ["가, 나, 다", "가, 다", "나, 라", "라", "가, 나, 다, 라"],
      answer: 3,
      optionExplanations: {
        1: "가(각형 와이어 밴딩)는 틀렸습니다. 각형 와이어 굴곡에는 Tweed나 Jarabak 플라이어를 사용하며 Young 플라이어는 원형 와이어용입니다.",
        2: "가 지문이 틀렸습니다.",
        3: "비교적 가는 원형 와이어 굴곡에 쓰이며(나), Beak 한쪽이 3단계 직경의 원추형 구조를 취하고 있습니다(라). (0.9mm 이상 와이어 사용 금지).",
        4: "라 단독보다는 나, 라 조합이 올바릅니다.",
        5: "가 지문이 명백한 오답입니다."
      },
      commonExplanations: [
        "Young pliers: 겸자 선단 한쪽이 3단계 원추형(Step-cone) + 부드러운 와이어 루프 형성용 (0.9mm 이상 굵은 와이어 굴곡 금지)"
      ]
    },
    {
      id: 4,
      question: "진단모형(Study Model) 제작과정에 대한 설명 중 옳지 않은 것만의 조합은?",
      contextBox: "가. 치은협 이행부 및 후방 후구치 융기까지 충분히 인상되어야 한다\n나. 상하악 기저부 형성시 전치부에 한해 곡선이 되도록 형성한다\n다. 상악 모형 제작 시 정중선과 직각이 되도록 후면을 삭제한다\n라. 인상재료는 주로 탄력성인 rubber 인상재를 사용한다.",
      options: ["가, 나, 다", "가, 다", "나, 라", "라", "가, 나, 다, 라"],
      answer: 3,
      optionExplanations: {
        1: "가(후구치 융기 포함)와 다(후면 정중선 직각 삭제)는 올바른 표준 가공법입니다.",
        2: "올바른 설명들만의 조합입니다.",
        3: "나(기저부 전치부를 곡선으로 깎는 것은 하악에 한하며, 상악 전치부는 2개의 직선으로 각지게 깎음)와 라(일반 연구모형 인상에는 주로 알지네이트 등 수성교질을 사용함)는 옳지 않은 지문들입니다.",
        4: "라 외에 나 지문도 틀렸습니다.",
        5: "가, 다는 올바른 설명입니다."
      },
      commonExplanations: [
        "진단모형 기저부 트리밍: 상악 전치부 = 2개의 직선(각진 형태) / 하악 전치부 = 부드러운 단일 곡선 / 모형 후면 = 정중선에 직각(90°)"
      ]
    },
    {
      id: 5,
      question: "악태모형(Gnathostatic Model)에 의해 얻게 되는 정보로 옳은 것만의 조합은?",
      contextBox: "가. 하악 견치의 전후 위치 관계\n나. 치열궁과 안면두개의 관계\n다. 상하악 치열의 교합 관계\n라. 교합관계 및 악골관계 파악",
      options: ["가, 나, 다", "가, 다", "나, 라", "라", "가, 나, 다, 라"],
      answer: 5,
      optionExplanations: {
        1: "라 항목도 악태모형을 통해 얻는 핵심 정보입니다.",
        2: "나, 라 항목이 누락되었습니다.",
        3: "가, 다 항목이 누락되었습니다.",
        4: "단일 항목으로 부족합니다.",
        5: "악태모형은 Simon의 기준 평면을 기반으로 안면두개와 치열궁의 해부학적 관계(나), 상하악 교합 관계(다), 악골 관계 및 견치 전후 위치(가, 라)를 입체적으로 분석할 수 있습니다."
      },
      commonExplanations: [
        "악태모형(Gnathostatic model) = 안면두개골 기준 평면을 설정하여 치열궁 및 악골의 3차원적 위치 관계를 평가하는 특수 진단모형"
      ]
    },
    {
      id: 6,
      question: "가철성 상교정장치(Plate Appliance)의 장점으로 옳지 않은 것은?",
      contextBox: "가. 부작용이 적다.\n나. Chair time이 짧다.\n다. 제작이 간편하다.\n라. 개개치아의 정교한 이동 가능",
      options: ["가, 나, 다", "가, 다", "나, 라", "라", "가, 나, 다, 라"],
      answer: 4,
      optionExplanations: {
        1: "가, 나, 다는 모두 가철성 상교정장치의 올바른 장점입니다.",
        2: "체어타임 단축(나) 역시 장점입니다.",
        3: "나는 장점이나 라가 단점입니다.",
        4: "가철성 상교정장치는 단순 경사이동 위주로 작용하므로 '개개 치아의 정교한 3차원적 이동(치체이동, 토크 등)'은 불가능하거나 매우 어렵습니다.",
        5: "라 항목만 옳지 않은 설명입니다."
      },
      commonExplanations: [
        "상교정장치(Plate): 장치 제작 간편, 체어타임 단축, 위생 관리 우수 / 단점: 환자 협조도 의존, 개별 치아 정교한 삼차원 이동 불가"
      ]
    },
    {
      id: 7,
      question: "가철식 expansion screw 장치의 제작과정 중 옳은 것만의 조합은?",
      contextBox: "가. Resin은 screw를 완전히 피개하므로 baseplate의 두께가 두껍다.\n나. 강한 유지를 위해 Adams, arrowhead clasp를 제작한다.\n다. 구개부위를 fissure bur 등을 이용하여 groove를 형성한다.\n라. 정중선부위는 최후방 대구치에 따라 교합평면과 직각되게 위치시킨다.",
      options: ["가, 나, 다", "가, 다", "나, 라", "라", "가, 나, 다, 라"],
      answer: 1,
      optionExplanations: {
        1: "스크루 매설로 레진상 두께가 두꺼워지고(가), 장치 탈락을 막기 위해 Adams나 Arrowhead clasp를 부착하며(나), 중합 후 상 분할을 위해 Fissure bur로 중앙 분할선(Groove)을 형성합니다(다).",
        2: "나 지문이 누락되었습니다.",
        3: "라 지문은 스크루 위치 매설 조건 오류입니다.",
        4: "라 지문은 틀렸습니다.",
        5: "라 지문이 오답입니다."
      },
      commonExplanations: [
        "확장 스크루 장치 제작 = Adams/Arrowhead 클래스프 유지력 확보 + 중합 후 Fissure bur로 구개 레진상 중앙 분할 절단(Groove)"
      ]
    },
    {
      id: 8,
      question: "Anterior bite plate(전방교합판) 사용 시 옳지 않은 것은?",
      contextBox: "가. 구치의 정출로 안모고경이 증가되며 하악 이점이 후방으로 이동될 수 있다.\n나. 혼합치열기의 과개교합을 치료할 수 있다.\n다. 전치부의 수직피개 양을 줄일 수 있다.\n라. 골격성 부조화 치료가 가능하다.",
      options: ["가, 나, 다", "가, 다", "나, 라", "라", "가, 나, 다, 라"],
      answer: 4,
      optionExplanations: {
        1: "가, 나, 다는 모두 전방교합판의 올바른 생역학적 치료 효과입니다.",
        2: "나 항목도 정당한 효과입니다.",
        3: "나는 맞으나 라가 틀렸습니다.",
        4: "Anterior bite plate는 치치조성 과개교합 개선용 장치로, 심한 '골격성 부조화(Skeletal disproportion)'는 이 장치만으로 치료할 수 없습니다.",
        5: "라 지문이 오답입니다."
      },
      commonExplanations: [
        "Anterior bite plate: 하악 전치만 접촉시켜 구치부를 띄움 → 구치 정출 유도 → 안모고경 증가 및 전치부 수직피개(Overbite) 감소"
      ]
    },
    {
      id: 9,
      question: "협측 치아군(소구치 및 대구치)에 이용되는 Clasp로 옳은 것만의 조합은?",
      contextBox: "가. arrowhead clasp\n나. roach clasp\n다. eyelet clasp\n라. crozat clasp",
      options: ["가, 나, 다", "가, 다", "나, 라", "라", "가, 나, 다, 라"],
      answer: 5,
      optionExplanations: {
        1: "라(Crozat clasp) 항목도 협측 치아군에 쓰입니다.",
        2: "나, 라 항목이 누락되었습니다.",
        3: "가, 다 항목이 누락되었습니다.",
        4: "전체 항목이 모두 해당합니다.",
        5: "Arrowhead, Roach, Eyelet, Crozat clasp는 모두 소구치 및 대구치를 포함하는 협측 치아군의 언더컷을 활용하여 유지를 얻는 대표적인 클래스프입니다."
      },
      commonExplanations: [
        "협측 치아군 Clasp: Arrowhead clasp, Roach clasp, Eyelet clasp, Crozat clasp"
      ]
    },
    {
      id: 10,
      question: "상악 협착치열궁을 측방으로 확대시키는 장치로 옳은 것만의 조합은?",
      contextBox: "가. Porter lingual arch\n나. Quad helix\n다. RPE\n라. W-arch",
      options: ["가, 나, 다", "가, 다", "나, 라", "라", "가, 나, 다, 라"],
      answer: 5,
      optionExplanations: {
        1: "라(W-arch) 항목도 상악 확대 장치입니다.",
        2: "나, 라 항목이 누락되었습니다.",
        3: "가, 다 항목이 누락되었습니다.",
        4: "제시된 4가지 모두 상악 치열궁 확대 장치입니다.",
        5: "Porter lingual arch, Quad helix, RPE(급속구개확대장치), W-arch는 모두 폭경이 좁아진 상악 치열궁을 측방으로 확대시키는 대표적 교정장치입니다."
      },
      commonExplanations: [
        "완속 확대 장치: W-arch, Quad helix, Porter lingual arch / 급속 확대 장치: RPE (중앙구개봉합 분리)"
      ]
    },
    {
      id: 11,
      question: "Lip bumper 구성부분 중 순측호선 'U' loop의 주된 역할은?",
      options: [
        "구강청결을 쉽게 한다.",
        "타액흐름이 쉽게 한다.",
        "호선조정을 하게 한다.",
        "치은조직을 자극한다.",
        "이물감을 감소시킨다."
      ],
      answer: 3,
      optionExplanations: {
        1: "구강 위생과의 직접적 관련 기능이 아닙니다.",
        2: "타액 분비/흐름과 무관합니다.",
        3: "Lip bumper의 대구치 튜브 전방에 위치한 'U' loop는 플라이어로 조절하여 순측 호선의 전후방 길이 및 미세 위치를 조정(Wire adjustment)하는 역할을 합니다.",
        4: "치은 자극은 장치의 부작용입니다.",
        5: "이물감 감소 목적이 아닙니다."
      },
      commonExplanations: [
        "Lip bumper U-loop = 호선(Wire)의 전후방 길이 및 위치 조절(Adjustment)"
      ]
    },
    {
      id: 12,
      question: "기능적 악정형 장치인 Activator(액티베이터)의 적응증이 아닌 것만의 조합은?",
      contextBox: "가. 비질환 환자, 구호흡 환자, 불면증 환자\n나. 구성교합의 채득이 어려운 환자\n다. 골격성 부정교합 환자\n라. Crowding이나 spacing이 심한 환자",
      options: ["가, 나, 다", "가, 다", "나, 라", "라", "가, 나, 다, 라"],
      answer: 5,
      optionExplanations: {
        1: "라 항목(심한 총생/공극 환자) 역시 Activator의 금기증입니다.",
        2: "나, 라 항목도 적응증이 아닙니다.",
        3: "가, 다 항목 역시 금기증입니다.",
        4: "단일 선택으로 부족합니다.",
        5: "구호흡 환자(구강 폐쇄로 호흡 불가), 구성교합 채득 불능자, 심한 골격성 부조화, 심한 총생(Crowding) 환자는 Activator를 사용할 수 없는 대표적 금기증(비적응증)에 해당합니다."
      },
      commonExplanations: [
        "Activator 금기증: 구호흡 환자, 구성교합 채득 불가자, 심한 골격성 부정교합, 심한 총생(Crowding)"
      ]
    },
    {
      id: 13,
      question: "Balters bionator의 치료 목적으로 옳은 것만의 조합은?",
      contextBox: "가. Lip trap과 비정상적 관계 제거\n나. 외상성 deep bite에 의한 점막의 상처 제거\n다. 하악의 후퇴 및 혀와 관련된 이상위치 수정\n라. 혀와 뺨의 근육 차단",
      options: ["가, 나, 다", "가, 다", "나, 라", "라", "가, 나, 다, 라"],
      answer: 5,
      optionExplanations: {
        1: "라 항목(혀와 뺨 근육 차단) 역시 치료 목적입니다.",
        2: "나, 라 항목이 누락되었습니다.",
        3: "가, 다 항목이 누락되었습니다.",
        4: "전체 항목이 치료 목적에 부합합니다.",
        5: "Balters Bionator는 Lip trap 및 비정상적 근육 기능 차단(가, 라), 외상성 과개교합의 점막 손상 방지(나), 하악 후퇴 및 혀 위치 이상 수정을 주요 치료 목적으로 합니다."
      },
      commonExplanations: [
        "Bionator: Activator 부피를 축소시켜 입술, 뺨, 혀 등 구강 주위 연조직의 비정상적 기능 차단 및 위치 수정 도모"
      ]
    },
    {
      id: 14,
      question: "FR II(Function Regulator II) 제작과정 중 상악모형에 seating groove(interproximal notch)를 형성하는 이유는?",
      options: [
        "모형의 준비작업 시에 구치부와 접촉이 일어나지 않게 하기 위함이다",
        "혀의 기능을 돕고 치열을 보호하기 위함이다.",
        "모형의 준비작업 시 장치물의 유지를 돕기 위함이다.",
        "치근의 흡수와 치조골의 흡수를 방지하기 위함이다.",
        "구치의 정출을 유도하기 위함이다."
      ],
      answer: 3,
      optionExplanations: {
        1: "구치 접촉 차단 목적이 아닙니다.",
        2: "혀의 기능 조절 목적이 아닙니다.",
        3: "FR II 제작 시 상악 구치 인접면에 형성하는 Seating groove는 와이어가 정확한 위치에 안착하여 장치물의 유지(Retention)를 확보하도록 돕습니다.",
        4: "치근 흡수 방지와 무관합니다.",
        5: "구치 정출 유도와 무관합니다."
      },
      commonExplanations: [
        "FR II Seating groove = 와이어 굴곡부 정확한 안착 및 장치물 유지(Retention) 확보"
      ]
    },

    /* =========================================================
       모의고사 2차 (97번 ~ 110번 -> 15번 ~ 28번)
       ========================================================= */
    {
      id: 15,
      question: "교정력(Orthodontic force)에 대하여 맞는 조합은?",
      contextBox: "가) 교정력이 클수록 치아의 이동속도가 빠르다\n나) 치아의 이동에 최적인 교정력은 치근표면적의 크기에 따라 다르다\n다) 치아의 이동에 최적인 교정력은 치체이동보다도 경사이동쪽이 더 크다\n라) 치아의 교정력이 과도하면 치근흡수가 일어나기 쉽다",
      options: ["가, 다, 라", "가, 나", "나, 라", "가, 라", "가, 나, 다, 라"],
      answer: 3,
      optionExplanations: {
        1: "가(힘이 클수록 속도 증가-조직 괴사로 지연됨)와 다(경사이동 힘이 더 큼-치체이동이 더 큼)는 틀린 지문입니다.",
        2: "가 지문이 틀렸습니다.",
        3: "최적 교정력은 치근 표면적에 비례하여 달라지며(나), 과도한 교정력은 치근 흡수를 일으키기 쉽습니다(라).",
        4: "가 지문이 틀렸습니다.",
        5: "가, 다 지문이 오답입니다."
      },
      commonExplanations: [
        "교정력 원리: 과도한 힘 = 치근막 유리질화(괴사)로 이동 지연 + 치근 흡수 / 최적 교정력: 치체이동 > 경사이동"
      ]
    },
    {
      id: 16,
      question: "치아이동 시 압박측(Pressure side)에서 볼 수 있는 조직의 변화로 옳은 것만의 조합은?",
      contextBox: "가) 치근막 조직의 압축\n나) 유골의 형성\n다) 섬유아 세포의 증식\n라) 치조골의 흡수\n마) 치근막의 빈혈",
      options: ["가, 나, 다", "가, 나, 마", "가, 라, 마", "나, 다, 라", "다, 라, 마"],
      answer: 3,
      optionExplanations: {
        1: "나(유골 형성), 다(섬유아세포 증식)는 견인측(Tension side) 변화입니다.",
        2: "나 지문은 견인측 변화입니다.",
        3: "치아가 이동하는 압박측(Pressure side)에서는 치근막 압축(가), 파골세포에 의한 치조골 흡수(라), 혈관 압박에 의한 치근막 빈혈(마)이 일어납니다.",
        4: "나, 다 지문은 견인측 변화입니다.",
        5: "다 지문은 견인측 변화입니다."
      },
      commonExplanations: [
        "압박측: 치근막 압축, 빈혈, 파골세포 활성화 → 치조골 흡수 / 견인측: 치근막 신장, 충혈, 골아세포 증식 → 뼈 형성"
      ]
    },
    {
      id: 17,
      question: "Angle 1급 부정교합에 포함되는 구체적 증상으로 옳은 것만의 조합은?",
      contextBox: "가) 상악 high canine\n나) 정상교합\n다) 상악전돌\n라) 양악전돌\n마) 총생",
      options: ["가, 나, 다", "가, 나, 마", "가, 라, 마", "나, 다, 라", "다, 라, 마"],
      answer: 3,
      optionExplanations: {
        1: "나(정상교합)는 부정교합이 아니며 다(상악전돌)는 2급 1류 증상입니다.",
        2: "나 지문이 오답입니다.",
        3: "Angle 1급 부정교합은 제1대구치 관계는 정상이지만 상악 High canine(덧니; 가), 양악전돌(라), 총생(마) 등의 치열 이상이 동반됩니다.",
        4: "나, 다 지문이 오답입니다.",
        5: "다(상악전돌)는 2급 부정교합입니다."
      },
      commonExplanations: [
        "Angle 1급 부정교합 = 대구치 관계 정상 1급 + 개별 치아 위치 이상 (총생, High canine, 양악전돌 등)"
      ]
    },
    {
      id: 18,
      question: "교정용 플라이어의 명칭과 용도가 바르게 연결된 것만의 조합은?",
      contextBox: "가) 밴드에 굴곡을 주면서 변연부를 조인다 - Howe 플라이어\n나) 에로우 헤드 클레스프의 굴곡 - Adams 플라이어\n다) 선의 세부조절이나 클레스프의 조절, 둥근선의 부분적인 굴곡 - Jarabak 플라이어\n라) 와이어의 급각도 또는 부드러운 굴곡 및 다양한 크기의 루프를 구부림 - Young 플라이어",
      options: ["가, 나, 다", "가, 다", "나, 라", "라", "가, 나, 다, 라"],
      answer: 5,
      optionExplanations: {
        1: "라 항목도 올바른 연결입니다.",
        2: "나, 라 항목도 올바릅니다.",
        3: "가, 다 항목도 올바릅니다.",
        4: "전체 항목이 모두 올바른 매칭입니다.",
        5: "Howe(밴드 변연 성형; 가), Adams(Arrowhead clasp 굴곡; 나), Jarabak(와이어 세부 조절; 다), Young(원추 beak 루프 굴곡; 라) 플라이어의 용도가 모두 정확합니다."
      },
      commonExplanations: [
        "Howe = 밴드 변연 조이기 / Adams = Arrowhead 굴곡 / Jarabak = 세부 조절 / Young = 다양한 루프 굴곡"
      ]
    },
    {
      id: 19,
      question: "악태모형(Gnathostatic model)의 설명으로 옳은 것만의 조합은?",
      contextBox: "가) 안면두개골의 특정 계측점을 이용하여 기준을 설정한다\n나) 시간적 경과에 따른 비교가 용이하다\n다) 기준점을 측정 재현하는 전용의 기구가 필요하다\n라) 제작과정이 간편하다",
      options: ["가, 나, 다", "가, 다", "나, 라", "라", "가, 나, 다, 라"],
      answer: 1,
      optionExplanations: {
        1: "안면두개골 계측점 기준 설정(가), 시간 경과 비교 용이(나), 전용 기구인 Gnathostat 필요(다)는 모두 악태모형의 올바른 특징입니다. (라는 제작과정이 복잡하므로 오답).",
        2: "나 지문이 누락되었습니다.",
        3: "라 지문은 오답입니다.",
        4: "라 지문은 오답입니다.",
        5: "라(제작과정이 간편하다) 항목이 틀렸습니다."
      },
      commonExplanations: [
        "악태모형: 안면두개 기준 계측점 활용 + 시간적 경과 비교 우수 + 전용 기구 필요 (제작 과정은 매우 번거롭고 복잡함)"
      ]
    },
    {
      id: 20,
      question: "Simon의 악태진단법에서 기준이 되는 3대 평면으로 옳은 것만의 조합은?",
      contextBox: "가) 정중구개봉합선상의 2점을 지나서 Frankfort 평면과 직각인 면\n나) 좌우 안점을 지나서 Frankfort 평면과 직각인 면\n다) 좌우 이점과 좌안점에 의해 구성되는 면\n라) 좌우 이점을 지나서 Frankfort 평면과 직각인 면",
      options: ["가, 나, 다", "가, 다", "나, 라", "라", "가, 나, 다, 라"],
      answer: 1,
      optionExplanations: {
        1: "정중시상면(가), 안와평면(나), Frankfort(안이) 평면(다)은 Simon 악태진단법의 3대 기준 평면입니다.",
        2: "나 지문(안와평면)이 빠졌습니다.",
        3: "라 지문은 3대 기준 평면에 속하지 않습니다.",
        4: "라 항목은 잘못되었습니다.",
        5: "라 항목으로 인해 오답입니다."
      },
      commonExplanations: [
        "Simon 3대 기준 평면: 1. 정중시상면(좌우 진단), 2. 안와평면(전후 진단, FH 수직), 3. Frankfort 평면(수평 기준, Porion-Orbitale)"
      ]
    },
    {
      id: 21,
      question: "가철성 상교정장치(Plate)의 공통적인 원리로 옳게 묶인 것만의 조합은?",
      contextBox: "가) 하악성 이동을 기대한다\n나) 고정장치는 움직임이 없는 것으로 본다\n다) Light force를 사용한다\n라) 정교한 이동이 가능하다",
      options: ["가, 나, 다", "가, 다", "나, 라", "라", "가, 나, 다, 라"],
      answer: 1,
      optionExplanations: {
        1: "하악성 이동 유도(가), 레진상의 안정적 고정원 활용(나), 생리적 약한 힘 사용(다)은 상교정장치의 공통 원리입니다. (라는 정교한 3차원 이동이 어려우므로 오답).",
        2: "나 지문이 누락되었습니다.",
        3: "라 지문이 오답입니다.",
        4: "라 지문은 틀렸습니다.",
        5: "라(정교한 이동 가능)가 포함되어 오답입니다."
      },
      commonExplanations: []
    },
    {
      id: 22,
      question: "Spring의 분류 중에서 Protected spring(Guided spring)에 대한 설명으로 옳은 것만의 조합은?",
      contextBox: "가) Spring 자체가 유연하다\n나) 0.6-0.7mm 정도의 굵은 wire로 제작한다\n다) Guided spring이라고도 한다\n라) Heavy orthodontic force 발휘한다",
      options: ["가, 나, 다", "가, 다", "나, 라", "라", "가, 나, 다, 라"],
      answer: 1,
      optionExplanations: {
        1: "유연한 스프링 본체(가)를 0.6~0.7mm의 굵은 가이드 와이어로 지지 및 보호하며(나), Guided spring이라고 부릅니다(다).",
        2: "나 지문이 누락되었습니다.",
        3: "라(Heavy force)는 틀렸습니다. 작동 스프링은 Light force를 발휘합니다.",
        4: "라 지문은 오답입니다.",
        5: "라 지문 때문에 오답입니다."
      },
      commonExplanations: [
        "Protected spring = Guided spring (유연한 작동 스프링을 0.6~0.7mm 가이드선으로 보호하여 음식물 변형 방지)"
      ]
    },
    {
      id: 23,
      question: "교정장치와 관련 구성요소의 연결이 옳지 않은 것은?",
      options: [
        "설측호선장치 - S.T lock - 연속탄성",
        "횡구개호선장치 - 유지 sheath - 순차적활성",
        "포터 설측호선장치 - W-arch - 상악 협착 치열궁 확대",
        "횡구개호선장치 - 구개호선 - 구치의 고정원",
        "설측호선장치 - 주선 - Clasp"
      ],
      answer: 2,
      optionExplanations: {
        1: "설측호선(Lingual arch)의 고정 및 탄성 요소 연결입니다.",
        2: "횡구개호선장치(TPA)는 양측 대구치 밴드의 Sheath에 삽입하여 대구치 고정원을 유지하고 토크를 조절하는 장치이며, 치아를 순차 이동시키는 '순차적 활성'과는 관련이 없습니다.",
        3: "Porter 장치는 W-arch 형태로 상악 치열궁을 측방 확대합니다.",
        4: "TPA의 핵심 목적인 대구치 고정원 유지입니다.",
        5: "설측호선 장치의 기본 구성 요소입니다."
      },
      commonExplanations: [
        "Transpalatal Arch (TPA, 횡구개호선) = 구개 Sheath 삽입 + 대구치 고정원 유지 및 토크 조절"
      ]
    },
    {
      id: 24,
      question: "TPA의 loop를 구개부에서 보다 멀리 떨어지게 하고 전방으로 넓게 제작하여 장착하면 나타나는 치아 이동은?",
      options: [
        "구치의 설측이동",
        "구치의 협측이동",
        "구치의 압하",
        "구치의 협측토크이동",
        "구치의 설측토크이동"
      ],
      answer: 4,
      optionExplanations: {
        1: "단순 설측 경사이동이 아닙니다.",
        2: "단순 협측 변위가 아닙니다.",
        3: "수직 압하가 아닙니다.",
        4: "TPA의 중앙 루프를 구개면에서 떨어뜨리고 전방으로 넓게 활성화하면 대구치에 회전 모멘트가 가해져 '구치의 협측 토크 이동(Buccal torque movement)'이 일어납니다.",
        5: "설측 토크가 아닙니다."
      },
      commonExplanations: [
        "TPA Loop 전방 및 구개 이격 활성화 = 대구치 협측 토크(Buccal torque) 발생"
      ]
    },
    {
      id: 25,
      question: "Anti-Finger sucking appliance(손가락 빨기 차단 장치) 제작으로 옳은 것은?",
      options: [
        "Band나 crown 내면 납착부에 공간을 주어 납착에 용이하게 한다.",
        "주선은 구개점막의 굴곡에 따라 제작한다.",
        "Fence부는 측절치 중간에 연결하는 폭으로 \"U\"자형으로 굴곡한다.",
        "Fence부는 교합평면에 45°로 제작한다.",
        "Spur부의 끝은 둥글게 연마한다."
      ],
      answer: 5,
      optionExplanations: {
        1: "밴드 내면에 납이 침투하면 치아 정착이 불가능해집니다.",
        2: "구개 점막 자극을 피하기 위해 적절한 공간(Relief)을 띄워야 합니다.",
        3: "Fence 폭은 견치간 폭경 등으로 손가락 유입을 차단하도록 넓게 제작합니다.",
        4: "Fence부는 교합평면에 거의 직각(수직)으로 위치시킵니다.",
        5: "환자의 혀나 구강 연조직 상처를 방지하기 위해 Spur(돌기)나 와이어 끝은 반드시 둥글게 연마(Polishing)해야 합니다."
      },
      commonExplanations: [
        "Anti-Finger Sucking Appliance: 구강 점막 보호를 위해 돌기(Spur) 끝단은 반드시 부드럽고 둥글게 연마"
      ]
    },
    {
      id: 26,
      question: "Angle 2급 1류 부정교합에 사용하는 Activator의 치료효과로 옳은 것만의 조합은?",
      contextBox: "가) 하악골의 성장촉진\n나) 교합거상\n다) 상악전치의 설측이동\n라) 하악전치부의 총생의 개선",
      options: ["가, 나, 다", "가, 다", "나, 라", "라", "가, 나, 다, 라"],
      answer: 5,
      optionExplanations: {
        1: "라 항목(하악전치 총생 개선)도 포함됩니다.",
        2: "나, 라 항목이 누락되었습니다.",
        3: "가, 다 항목이 누락되었습니다.",
        4: "전체 항목이 치료 효과입니다.",
        5: "Activator는 하악을 전방 유도하여 하악골 성장 촉진(가), 구치 정출에 의한 교합거상(나), 순측호선에 의한 상악전치 설측이동(다), 구강 주위근 기능 개선을 통한 하악전치 총생 개선(라) 효과를 모두 발휘합니다."
      },
      commonExplanations: [
        "2급 1류 Activator 효과: 하악 전방성장 촉진 + 교합 거상 + 상악전치 설측 견인 + 하악전치 총생 개선"
      ]
    },
    {
      id: 27,
      question: "상하악 구치가 교합 접촉되지 않는 장치로 옳은 것만의 조합은?",
      contextBox: "가) Activator\n나) 교합거상판\n다) Tooth positioner\n라) 설측호선장치",
      options: ["가, 나, 다", "가, 다", "나, 라", "라", "가, 나, 다, 라"],
      answer: 1,
      optionExplanations: {
        1: "Activator(구성교합으로 구치부를 띄움; 가), 교합거상판(전치만 닿아 구치를 띄움; 나), Tooth positioner(탄성체 교합면 피개; 다)는 구치가 직접 교합 접촉되지 않는 장치들입니다. (설측호선장치는 구치 비접촉 장치가 아님).",
        2: "나(교합거상판) 항목이 누락되었습니다.",
        3: "설측호선장치(라)는 구치 접촉을 차단하지 않습니다.",
        4: "설측호선장치는 틀렸습니다.",
        5: "라 항목으로 인해 오답입니다."
      },
      commonExplanations: [
        "구치 비접촉 교정장치: Activator, 전방교합거상판(Bite plate), Tooth positioner"
      ]
    },
    {
      id: 28,
      question: "후퇴된 하악을 전방(근심)으로 이동시키는 데 사용할 수 있는 교정장치로 옳은 것만의 조합은?",
      contextBox: "가) 2급 악간고정장치\n나) Activator\n다) 교합사면판\n라) 이모장치(Chin cap)",
      options: ["가, 나, 다", "가, 다", "나, 라", "라", "가, 나, 다, 라"],
      answer: 1,
      optionExplanations: {
        1: "2급 악간고무줄(가), Activator(나), 교합사면판(다)은 모두 하악의 전방(근심) 위치 이동 및 성장을 유도하는 장치입니다. (이모장치는 하악을 후방 억제함).",
        2: "나 지문이 누락되었습니다.",
        3: "라(Chin cap)는 하악 후방 견인 장치입니다.",
        4: "Chin cap은 근심이동 장치가 아닙니다.",
        5: "라 항목 때문에 오답입니다."
      },
      commonExplanations: [
        "하악 근심(전방) 이동 장치: 2급 악간고정, Activator, 교합사면판 / 하악 후방 견인·억제 장치: Chin cap (이모장치)"
      ]
    },

    /* =========================================================
       모의고사 3차 (97번 ~ 110번 -> 29번 ~ 42번)
       ========================================================= */
    {
      id: 29,
      question: "기계적 교정장치(치열궁 확대선, Bandeau)의 최초 사용자는?",
      options: ["Celsus", "Fauchard", "Fox", "Angle", "Case"],
      answer: 2,
      optionExplanations: {
        1: "Celsus는 손가락 압력(Finger pressure)을 이용한 교정을 최초로 기술한 인물입니다.",
        2: "Pierre Fauchard(1728년)는 금속 띠 모양의 치열궁 확대선인 'Bandeau'를 고안하여 기계적 교정장치(Mechanical appliance)를 최초로 사용하였습니다.",
        3: "J. Fox는 치조골 개조 및 부정교합 최초 분류에 기여했습니다.",
        4: "E. H. Angle은 현대 부정교합 분류법을 정립한 현대 교정학의 아버지입니다.",
        5: "C. Case는 발치/비발치 교정 논쟁을 주도한 인물입니다."
      },
      commonExplanations: [
        "최초의 기계적 교정장치(Bandeau) 고안자 = Pierre Fauchard"
      ]
    },
    {
      id: 30,
      question: "Leeway space로 인한 영구 대구치 이동 양상으로 맞는 것은?",
      options: [
        "상 1번치가 하 1번치보다 더 많이 근심이동한다.",
        "상 6번치가 하 6번치보다 더 많이 근심이동한다.",
        "상 6번치가 하 6번치보다 더 많이 원심이동한다.",
        "상 6번치 보다 하 6번치가 더 많이 근심이동한다.",
        "상 6번치 보다 하 6번치가 더 많이 원심이동한다."
      ],
      answer: 4,
      optionExplanations: {
        1: "전치 이동 설명이 아닙니다.",
        2: "이동 주체와 양이 반대로 서술되었습니다.",
        3: "원심이동이 아니라 근심이동입니다.",
        4: "하악의 Leeway space(약 3.4mm)가 상악(약 1.8mm)보다 크기 때문에, 유구치 교대 시 하악 제1대구치(하 6번치)가 상악 제1대구치(상 6번치)보다 더 많이 근심으로 이동하여 정상 1급 대구치 교합을 이룹니다.",
        5: "원심이동이 아닙니다."
      },
      commonExplanations: [
        "하악 Leeway space > 상악 Leeway space → 하악 제1대구치가 상악보다 더 많이 근심이동"
      ]
    },
    {
      id: 31,
      question: "교정용 기구와 사용 목적의 연결이 틀린 것은?",
      options: [
        "Young's pliers - wire 굴곡",
        "Adam's pliers - wire 굴곡",
        "Howe's pliers - 결찰",
        "Johnsons pliers - band 팽륭",
        "Band pusher - band 제거"
      ],
      answer: 5,
      optionExplanations: {
        1: "Young pliers는 원형 와이어 루프 굴곡용입니다.",
        2: "Adams pliers는 와이어 및 클래스프 굴곡용입니다.",
        3: "Howe pliers는 와이어 잡기 및 결찰용입니다.",
        4: "Johnson pliers는 밴드에 곡면 팽륭(Contour)을 주는 기구입니다.",
        5: "Band pusher는 밴드를 치관에 눌러 넣어 장착하는 기구이며, 밴드를 제거하는 기구는 'Band remover'이므로 ⑤가 틀렸습니다."
      },
      commonExplanations: [
        "Band pusher = 밴드 장착/밀어넣기 / Band remover = 밴드 제거 / Johnson pliers = 밴드 팽륭"
      ]
    },
    {
      id: 32,
      question: "교정용 연구모형(Study Model)에 대한 설명 중 틀린 것은?",
      options: [
        "모형제작시 model trimmer 이용하여 모형형성",
        "수평모형은 모형저면과 교합평면이 평행인 모형",
        "수평모형은 안면두개에 대해 어떠한 위치에 있는지를 판정할 수 없다",
        "Simon의 3기준평면은 안이평면, 정중시상면, 안와평면이다",
        "Set up 모형은 악태모형을 복제한 것이다"
      ],
      answer: 5,
      optionExplanations: {
        1: "Model trimmer로 기저부를 각도에 맞추어 깎습니다.",
        2: "수평모형은 기저면이 교합평면과 평행한 일반 연구모형입니다.",
        3: "수평모형은 안면두개골과의 3차원 위치 관계를 판정할 수 없습니다.",
        4: "Simon의 3대 평면 정의에 부합합니다.",
        5: "Set-up 모형은 연구모형의 치아를 톱으로 하나씩 잘라내어 왁스 상에서 이상적인 치료 위치로 재배열한 가상 모형이며, 악태모형을 복제한 것이 아닙니다."
      },
      commonExplanations: [
        "Set-up Model = 진단 모형 상의 치아를 톱으로 분리하여 이상적인 치열 위치로 재배열한 모형"
      ]
    },
    {
      id: 33,
      question: "악태모형(Gnathostatic Model)에 대한 설명 중 틀린 것은?",
      options: [
        "안면의 정중과 모형의 정중을 일치",
        "안와평면은 상악 견치의 첨두를 통과",
        "교합평면과 FH plane은 일치한다",
        "상악기저면은 안이평면에 일치",
        "상악 기저면의 상면에 그어져 있는 선은 안와평면의 통과위치를 나타낸다"
      ],
      answer: 3,
      optionExplanations: {
        1: "정중시상면을 모형 정중선에 일치시킵니다.",
        2: "정상 교합에서 안와평면은 상악 견치 첨두를 통과합니다(Simon의 견치 법칙).",
        3: "Frankfort(안이) 평면(FH plane)과 교합평면은 서로 일치하거나 평행하지 않고 경사각을 이루며 대향하므로 ③번이 틀렸습니다.",
        4: "상악 기저면은 FH 평면과 평행하도록 일치시킵니다.",
        5: "상악 기저면 상면에 안와평면 통과선을 표시합니다."
      },
      commonExplanations: [
        "악태모형: 상악 기저면 = FH 평면에 평행 / 교합평면 = FH 평면과 평행하지 않고 경사짐"
      ]
    },
    {
      id: 34,
      question: "Adams clasp 제작 시 치아장축과 30도의 각을 기울여야 할 부위는?",
      options: ["bridge", "palatal arm", "arrowhead", "stag", "cross arm"],
      answer: 3,
      optionExplanations: {
        1: "치관 협면에 수평 평행하게 띄워 제작합니다.",
        2: "구개 레진상 매설 부위입니다.",
        3: "Adams clasp에서 치간 엠브레저 언더컷에 들어가 유지를 발휘하는 화살촉 모양의 'Arrowhead' 부분은 치아 장축에 대해 30° 각도로 기울여 제작합니다.",
        4: "해당 구성요소가 아닙니다.",
        5: "교합면 인접면을 넘는 통과 부위입니다."
      },
      commonExplanations: [
        "Adams Clasp에서 치아 장축과 30° 각도를 부여하는 부위 = Arrowhead (치간 언더컷 유지부)"
      ]
    },
    {
      id: 35,
      question: "교합 거상과 하악전치를 전진시키는 목적을 갖는 장치는?",
      options: [
        "anterior bite plate",
        "inclined bite plate",
        "inclined plane",
        "posterior bite plate",
        "tooth positioner"
      ],
      answer: 2,
      optionExplanations: {
        1: "평평한 전방교합판으로 구치 정출 및 교합 거상만 유도합니다.",
        2: "Inclined bite plate(교합사면판)는 전방부에 경사면이 형성되어 있어 하악이 물릴 때 교합 거상과 동시에 하악전치를 전방으로 밀어 전진시키는 목적을 갖습니다.",
        3: "단순 사면판 장치입니다.",
        4: "구치부 교합을 띄우는 후방교합판입니다.",
        5: "치열 보정 장치입니다."
      },
      commonExplanations: [
        "Anterior bite plate = 평평한 판(교합 거상) / Inclined bite plate = 경사판(교합 거상 + 하악 전진 유도)"
      ]
    },
    {
      id: 36,
      question: "스포츠 활동 등 외부 충격으로부터 치아 및 악골을 보호하는 장치는?",
      options: [
        "tooth positioner",
        "lip bumper",
        "mouth guard",
        "functional regulator",
        "activator"
      ],
      answer: 3,
      optionExplanations: {
        1: "치열 교정 마무리 보정 장치입니다.",
        2: "입술 압력 차단 및 고정원 장치입니다.",
        3: "마우스 가드(Mouth guard)는 연질 탄성 레진으로 제작되어 외상 및 스포츠 충격으로부터 치아 파절과 악골 손상을 방지하는 보호 장치입니다.",
        4: "프랭켈 기능조절장치입니다.",
        5: "기능적 악정형 장치입니다."
      },
      commonExplanations: []
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
        1: "후방 치아가 이미 맹출해 있을 때 사용하는 공간유지장치입니다.",
        2: "Crown distal shoe는 제2유구치가 조기 탈락하고 후방의 영구 제1대구치가 아직 잇몸 속에 미맹출 상태일 때, 치은 연조직 하방으로 가이드 핑거를 연장해 제1대구치의 근심 이동을 막고 정상 맹출을 유도하는 장치입니다.",
        3: "응력 완화형 보철 장치입니다.",
        4: "일반 밴드형 공간유지장치입니다.",
        5: "공간확보용 장치입니다."
      },
      commonExplanations: [
        "미맹출 영구 제1대구치의 맹출 유도 및 근심이동 차단 공간유지장치 = Crown distal shoe"
      ]
    },
    {
      id: 38,
      question: "다음 중 이미 상실되거나 좁아진 공간을 능동적으로 다시 벌려주는 공간확보장치(Space regainer)는?",
      options: [
        "crown and bar",
        "crown distal shoe",
        "broken stress type appliance",
        "band and bar",
        "expansion screw"
      ],
      answer: 5,
      optionExplanations: {
        1: "공간을 유지하는 공간유지장치(Space maintainer)입니다.",
        2: "공간유지장치입니다.",
        3: "응력 완화 장치입니다.",
        4: "공간유지장치입니다.",
        5: "확대 나사(Expansion screw)는 나사를 회전시켜 좁아진 공간을 능동적으로 다시 확장·복원하는 대표적인 공간확보장치(Space regainer)입니다."
      },
      commonExplanations: [
        "공간유지장치: Band & loop, Crown & bar, Distal shoe / 공간확보장치: Expansion screw, Jack screw, Helical spring"
      ]
    },
    {
      id: 39,
      question: "하순(아랫입술)을 깨물거나 빠는 악습관을 제거하는 장치는?",
      options: [
        "anti-finger sucking appliance",
        "tongue guard",
        "lip bumper",
        "oral screen",
        "inclined plane"
      ],
      answer: 3,
      optionExplanations: {
        1: "손가락 빠는 습관 차단 장치입니다.",
        2: "혀 내밀기 습관 차단 장치입니다.",
        3: "립 범퍼(Lip bumper)는 하순과 하악 전치 사이에 아크릴 패드를 위치시켜 아랫입술을 빨거나 깨무는 비정상적 근육 압력을 차단하는 장치입니다.",
        4: "구호흡 차단 및 입술 폐쇄력 장치입니다.",
        5: "전치 반대교합 교정판입니다."
      },
      commonExplanations: [
        "하순 깨물기/빨기 습관 차단 = 립 범퍼(Lip bumper)"
      ]
    },
    {
      id: 40,
      question: "Anti-finger sucking appliance 제작 시 fence의 후면은 제2유구치의 근심 1/3부위까지 하여 제2유구치의 원심면을 넘지 않도록 하는 이유는?",
      options: [
        "이물감이 없도록 하기 위해",
        "손가락이 구개부 자극을 쉽도록 하기 위해",
        "계승치의 맹출 시 방해가 되지 않게 하기 위해",
        "치은부의 염증을 방지하기 위해",
        "대합치의 방해가 되지 않게 하기 위해"
      ],
      answer: 3,
      optionExplanations: {
        1: "주된 생물학적 목적이 아닙니다.",
        2: "손가락 자극을 차단하는 장치입니다.",
        3: "Fence 부위가 제2유구치 원심면을 넘어 후방까지 길어지면 후방 및 하방에서 올라오는 영구 제1대구치 및 계승 소구치의 정상 맹출 경로를 방해하므로 원심면을 넘지 않도록 제한합니다.",
        4: "점막 염증은 Relief로 조절합니다.",
        5: "대합치 간섭 방지 목적이 아닙니다."
      },
      commonExplanations: [
        "Anti-Finger Sucking Fence 후방 연장 한계 = 후속 영구치(계승치) 맹출 방해 방지"
      ]
    },
    {
      id: 41,
      question: "기능적 교정장치인 Activator(액티베이터)에 관한 설명 중 옳은 것은?",
      options: [
        "구성교합은 교합기 상에서 채득한다.",
        "유도선은 상하 전치의 설면에 위치한다.",
        "유도선은 0.7mm의 wire를 사용한다.",
        "비질환 환자에도 적용할 수 있다.",
        "유도선의 loop는 조절을 하기 위한 것이다."
      ],
      answer: 3,
      optionExplanations: {
        1: "구성교합(Construction bite)은 교합기가 아니라 환자의 구강 내에서 직접 채득해야 합니다.",
        2: "순측호선/유도선(Labial bow)은 상하악 전치의 순면(Labial surface)에 위치합니다.",
        3: "Activator의 순측호선 및 유도선은 적절한 강성과 탄성을 위해 0.7mm 굵기의 교정용 와이어를 사용하는 것이 표준입니다.",
        4: "비질환자(비염/구호흡 환자 등)에게는 기도를 막으므로 적용할 수 없습니다.",
        5: "Loop는 호선 조절 외에도 탄력성 부여 및 입술 자극 방지 기능을 동시에 갖습니다."
      },
      commonExplanations: [
        "Activator 유도선 규격 = 0.7mm 교정용 와이어 / 구성교합 = 환자 구강 내 직접 채득 필수"
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
      answer: 5,
      optionExplanations: {
        1: "기본형 바이오네이터입니다.",
        2: "캘리포니아 변형 1형입니다.",
        3: "캘리포니아 변형 2형입니다.",
        4: "개방교합용 2형 바이오네이터입니다.",
        5: "Balter's Bionator 변형 장치는 뺨 근육(협근)의 압력이 치열궁을 압박하는 것을 차단하기 위해 순측호선에서 연장된 'Buccinator loop(협근 루프)'를 구비하여 치열궁의 자율적 측방 확대를 유도합니다."
      },
      commonExplanations: [
        "Buccinator loop = 뺨 근육 연조직 압력 차단(Shielding) → Balter's Bionator"
      ]
    }
  ]
};
