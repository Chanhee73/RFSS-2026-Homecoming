/**
 * Modern Minimal Wedding Invitation Configuration
 *
 * Edit the values below to customize your wedding invitation.
 * Image files should be placed in the corresponding images/ subfolders
 * using sequential filenames (1.jpg, 2.jpg, ...).
 * The code auto-detects images by trying sequential filenames.
 *
 * Image folder conventions:
 *   images/hero/1.jpg       - Main wedding photo (single file)
 *   images/story/1.jpg, ... - Story section photos (auto-detected)
 *   images/gallery/1.jpg, . - Gallery photos (auto-detected)
 *   images/location/1.jpg   - Venue/map image (single file)
 *   images/og/1.jpg         - Kakao share thumbnail (single file)
 */

const CONFIG = {
  // ── 초대장 열기 ──
  useCurtain: false,  // 초대장 열기 화면 사용 여부 (true: 사용, false: 바로 본문 표시)

  // RFSS Homecomming Day
  curtain: {
    title: "2026 RFSS Homecoming Day"
  },

  // ── 메인 (히어로) ──
  groom: {
    name: "신랑",
    nameEn: "RFSS",
    father: "아버지",
    mother: "어머니",
    fatherDeceased: false,
    motherDeceased: false
  },

  bride: {
    name: "신부",
    nameEn: "2026",
    father: "아버지",
    mother: "어머니",
    fatherDeceased: false,
    motherDeceased: false
  },

  wedding: {
    date: "2026-05-16",
    time: "14:00",
    venue: "KAIST 정보전자공학동 (E3-2) 및 대운동장 (E17)"
  },

  locations: [
    {
      venue: "KAIST 정보전자공학동 (E3-2) 및 대운동장 (E17)",
      hall: "1층 제2공동강의실 (1220호)",
      address: "대전광역시 유성구 대학로 291",
      tel: "",
      mapImage: "images/location/1.jpg",
      mapLinks: {
        kakao: "첫 번째 장소 카카오맵 링크",
        naver: "첫 번째 장소 네이버지도 링크"
      }
    },
    {
      venue: "저녁 식사 장소",
      hall: "하늘천숯불갈비 대전유성점 (태평소국밥 본점 옆)",
      address: "대전광역시 온천동로65번길 54 1층\n ",
      tel: "",
      mapImage: "images/location/2.jpg",
      mapLinks: {
        kakao: "https://place.map.kakao.com/1884429679",
        naver: "https://naver.me/5S9QX3SN"
      }
    }
  ],

  // ── 인사말 ──
  invitation: {
    title: "초대의 글",
    message:
      "2026년이 밝았던 1월의 겨울이 유난히도 매서웠던 만큼, 올해의 봄은 그 어느 때보다 맑고 따뜻하게 느껴집니다. " +
      "봄을 지나 신록이 짙어지는 계절의 문턱에서, 올해도 교수님과 졸업생 선배님들을 모시고 또 하나의 추억을 쌓고자 합니다.\n\n" +
      "RFSS 연구실이 오늘에 이르기까지 꾸준히 성장할 수 있었던 것은 교수님의 아낌없는 지도와 더불어, 각자의 자리에서 연구실의 이름을 빛내 주신 " +
      "선배님들께서 남겨 주신 값진 경험과 조언 덕분이었습니다. 항상 연구실과 후배들에게 보내주시는 애정과 성원에 깊이 감사드립니다.\n\n "+
      "올해 홈커밍데이에서는 오랜만의 반가운 만남과 더불어, 모두가 함께 웃으며 즐기실 수 있도록 가벼운 운동회도 조심스럽게 마련해 보았습니다. " + 
      "바쁘신 가운데서도 함께해 주신다면 더욱 따뜻하고 즐거운 시간이 될 것이라 생각합니다.\n\n" + 
      "항상 연구실과 후배들에게 보내 주시는 애정과 성원에 깊이 감사드리며, " +
      "이번 홈커밍데이가 교수님과 선배님들, 그리고 모든 RFSS 구성원 여러분께 따뜻한 재회와 기쁨의 시간으로 남기를 진심으로 바랍니다.\n\n" + 
      "감사합니다."
  },

  // ── 프로그램 안내 ──
  story: {
    title: "프로그램 안내",
    schedule: [
      { time: "14:00 ~ 14:20", program: "연구실 근황 소개", place: "E3-2 1220호" },
      { time: "14:20 ~ 14:40", program: "재학생 인사 / 졸업생 소개", place: "" },
      { time: "14:40 ~ 15:00", program: "스승의날 기념 행사", place: "" },
      { time: "15:20 ~ 17:00", program: "RFSS배 운동회", place: "대운동장" }
    ],

    teamGames: [
      {
        slug: "jump-rope",
        title: "단체 줄넘기",
        image: "images/sports/jump-rope.jpg",
        description: "참가자 전원이 하나의 긴 줄을 함께 넘으며 팀워크와 호흡을 겨루는 종목입니다.",
        rules: [
          "팀원 전원이 지정된 위치에 섭니다.",
          "정해진 시간 또는 횟수 기준으로 기록을 측정합니다.",
          "세 번 도전하여, 줄을 넘은 횟수를 합산합니다."
        ]
      },
      {
        slug: "mission-relay",
        title: "미션 계주",
        image: "images/sports/mission-relay.jpg",
        description: "팀별로 한 명씩 출발하여 중앙에 놓인 미션 종이를 뽑고, 해당 미션을 수행한 뒤 출발선으로 복귀하는 경기입니다. 미션은 무작위로 제공되며, 성인과 아동에 따라 난이도가 구분됩니다. 모든 팀원이 순서대로 미션을 완료하고 먼저 완주하는 팀이 승리합니다.",
        rules: [
          "각 팀은 정해진 순서에 따라 한 명씩 출발합니다.",
          "출발한 참가자는 중앙에 있는 미션 종이를 뽑습니다.",
          "뽑은 미션을 완료한 뒤 출발 지점으로 복귀합니다.",
          "성인과 아동은 각각 난이도가 다른 미션을 수행합니다.",
          "모든 팀원이 미션을 완료하고 먼저 완주한 팀이 승리합니다."
        ]
      },
      {
        slug: "flip-board",
        title: "판뒤집기",
        image: "images/sports/flip-board.jpg",
        description: "제한 시간 동안 바닥에 놓인 판을 자신의 팀 색으로 뒤집는 경기입니다. 각 팀은 정해진 수의 판을 두고 경쟁하며, 두 차례의 경기 결과를 합산하여 더 많은 판을 확보한 팀이 승리합니다.",
        rules: [
          "각 팀은 파란색 또는 빨간색으로 구분된 판을 뒤집습니다.",
          "팀당 40개의 판을 기준으로 경기를 진행합니다.",
          "한 경기는 2분 동안 진행됩니다.",
          "총 두 번의 경기를 진행한 뒤, 뒤집은 판의 합계로 승리 팀을 결정합니다.",
          "각 팀은 8~10명이 참여합니다."
        ]
      },
      {
        slug: "tug-of-war",
        title: "줄다리기",
        image: "images/sports/tug-of-war.jpg",
        description: "하나로 긴 밧줄을 가운데 놓고 양쪽 편에 사람들이 서서 정해진 시간동안 줄을 잡아당겨 줄을 많이 끌어온 팀이 승리합니다.",
        rules: [
          "각 팀 전원이 참여합니다.",
          "3판 2선승 방식으로 승리 팀을 결정합니다.",
          "심판의 신호에 맞추어 동시에 줄을 당깁니다.",
          "예상 소요 시간은 약 10분입니다."
        ]
      },
      {
        slug: "relay",
        title: "계주",
        image: "images/sports/relay.jpg",
        description: "각 팀의 주자들이 릴레이 방식으로 운동장 트랙을 달리는 경기입니다. 정해진 순서에 따라 바통을 이어받으며 달리고, 먼저 결승선을 통과한 팀이 승리합니다.",
        rules: [
          "경기는 운동장 트랙에서 진행합니다.",
          "주자 12명이 차례대로 달립니다.",
          "주자 11명은 100 m, 마지막 주자는 150 m를 달립니다."
        ]
      }
    ],

    individualGames: [
      {
        slug: "one-leg-stand",
        title: "한 발 들고 오래 서있기",
        image: "images/sports/one-leg-stand.jpg",
        description: "한쪽 발을 들고 균형을 유지하며 가장 오래 버티는 참가자를 가리는 개인전입니다. 우승자에게는 별도의 상품을 드립니다.",
        rules: [
          "참가자는 심판의 신호에 맞추어 한쪽 발을 듭니다.",
          "들고 있는 발이 바닥에 닿으면 탈락합니다.",
          "15초마다 심판의 지시사항을 이행합니다. (예: 눈 감기, 팔 뒷짐 등)",
          "가장 오래 버틴 참가자가 승리합니다."
        ]
      },
      {
        slug: "limbo",
        title: "림보",
        image: "images/sports/limbo.jpg",
        description: "몸을 뒤로 젖혀 낮아지는 줄을 통과하는 개인전이며, 나이가 어릴 수록 유리합니다. 우승자에게는 별도의 상품을 드립니다.",
        rules: [
          "참가자는 몸을 뒤로 젖힌 상태로 바 아래를 통과합니다.",
          "줄을 건드리거나, 손바닥이 땅에 닿거나, 통과하지 못하면 탈락입니다.",
          "라운드가 진행될수록 줄의 높이를 낮춥니다.",
          "가장 낮은 높이까지 통과한 참가자가 승리합니다."
        ]
      }
    ]
  },

  // ── 오시는 길 ──
  // (mapLinks는 wedding 객체 내에 포함)

  contacts: {
    phd: [
      { name: "이지훈", phone: "010-4417-4615" },
      { name: "이효원", phone: "010-4927-7556" },
      { name: "이찬희", phone: "010-9023-2714" },
      { name: "조성준", phone: "010-3863-3610" },
      { name: "조현정", phone: "010-3231-9105" },
      { name: "김지영", phone: "010-5029-0864" },
      { name: "서영주", phone: "010-9949-7332" },
      { name: "임영준", phone: "010-2248-7198" }
    ],
    master: [
      { name: "김윤성", phone: "010-9876-0616" },
      { name: "김준현", phone: "010-2628-9778" },
      { name: "강해찬", phone: "010-9554-3773" },
      { name: "이병주", phone: "010-3763-5794" }
    ]
  },

  // ── 마음 전하실 곳 ──
  accounts: {
    groom: [
      { role: "", name: "임영준", bank: "카카오뱅크", number: "7942-13-40078" }
    ],
  },

  // ── 링크 공유 시 나타나는 문구 ──
  kakaoShare: {
    jsKey: "",
    title: "RFSS 홈커밍데이에 초대합니다",
    description: ""
  }

};
