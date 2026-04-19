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
    date: "2026-05-01",
    time: "14:00"
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
    title: "RFSS 홈커밍데이에 선배님을 초대합니다",
    message:
      "2026년이 밝았던 1월의 겨울이 유난히도 매서웠던 만큼,\n 올해의 봄은 그 어느 때보다 맑고 따뜻하게 느껴집니다.\n" +
      "봄을 지나 신록이 짙어지는 계절의 문턱에서,\n 올해도 교수님과 졸업생 선배님들을 모시고 또 하나의 추억을 쌓고자 합니다.\n\n" +
      "RFSS 연구실이 오늘에 이르기까지 꾸준히 성장할 수 있었던 것은\n 교수님의 아낌없는 지도와 더불어, 각자의 자리에서 연구실의 이름을 빛내 주신\n " +
      "선배님들께서 남겨 주신 값진 경험과 조언 덕분이었습니다.\n 항상 연구실과 후배들에게 보내주시는 애정과 성원에 깊이 감사드립니다.\n\n "+
      "올해 홈커밍데이에서는 오랜만의 반가운 만남과 더불어, 모두가 함께 웃으며\n 즐기실 수 있도록 가벼운 운동회도 조심스럽게 마련해 보았습니다.\n" + 
      "바쁘신 가운데서도 함께해 주신다면 더욱 따뜻하고\n 즐거운 시간이 될 것이라 생각합니다.\n\n" + 
      "항상 연구실과 후배들에게 보내 주시는 애정과 성원에 깊이 감사드리며,\n " +
      "이번 홈커밍데이가 교수님과 선배님들, 그리고 모든 RFSS 구성원 여러분께\n 따뜻한 재회와 기쁨의 시간으로 남기를 진심으로 바랍니다.\n\n" + 
      "감사합니다"
  },

  // ── 프로그램 안내 ──
  story: {
    title: "프로그램 안내",
    schedule: [
      { time: "14:00 ~ 14:20", program: "연구실 근황 소개", place: "E3-2 1220호" },
      { time: "14:20 ~ 14:40", program: "재학생 인사 / 졸업생 소개", place: "" },
      { time: "14:40 ~ 15:00", program: "교수님 인사 말씀, 기념 촬영", place: "" },
      { time: "15:20 ~ 17:00", program: "RFSS배 운동회", place: "대운동장" }
    ],

    teamGames: [
      "판뒤집기",
      "계주",
      "줄다리기",
      "2인 3각",
      "단체 줄넘기"
    ],

    individualGames: [
      "다트던지기",
      "블랙잭",
      "보물찾기 "
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
