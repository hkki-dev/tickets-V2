// 영화 기본 데이터
// script 태그로 불러오므로 fetch()를 쓰지 않습니다 (로컬에서 열어도 CORS 문제 없음)

const MOVIES = [
  {
    id: 1,
    title: "스페이스 미션",
    genre: "SF",
    posterColor: "red",
    emoji: "🚀",
    duration: 128,
    rating: "12세 관람가",
    popularity: 32,
    director: "김시네",
    cast: "이우주, 박하늘, 최별",
    releaseDate: "2026.07.10",
    story: "우주 정거장에서 발생한 알 수 없는 사고를 해결하기 위해 탐사대가 미션을 수행하는 이야기입니다."
  },
  {
    id: 2,
    title: "숲속 친구들",
    genre: "애니",
    posterColor: "green",
    emoji: "🐾",
    duration: 96,
    rating: "전체 관람가",
    popularity: 24,
    director: "이애니",
    cast: "다람이, 토실이, 부엉이",
    releaseDate: "2026.06.20",
    story: "숲속에 사는 작은 동물 친구들이 힘을 합쳐 마을을 위협하는 가뭄을 해결해 나가는 이야기입니다."
  },
  {
    id: 3,
    title: "미스터리 룸",
    genre: "스릴러",
    posterColor: "purple",
    emoji: "🕵️",
    duration: 112,
    rating: "15세 관람가",
    popularity: 18,
    director: "박추리",
    cast: "정탐정, 한용의",
    releaseDate: "2026.06.05",
    story: "밀실에 갇힌 다섯 사람이 서로를 의심하며 사라진 진실을 쫓는 심리 스릴러입니다."
  },
  {
    id: 4,
    title: "라스트 콘서트",
    genre: "음악",
    posterColor: "yellow",
    emoji: "🎵",
    duration: 105,
    rating: "12세 관람가",
    popularity: 15,
    director: "최선율",
    cast: "노래연, 강피아노",
    releaseDate: "2026.05.28",
    story: "은퇴를 앞둔 노장 지휘자가 마지막 무대를 준비하며 겪는 감동적인 이야기입니다."
  },
  {
    id: 5,
    title: "바다의 기억",
    genre: "드라마",
    posterColor: "blue",
    emoji: "🌊",
    duration: 118,
    rating: "12세 관람가",
    popularity: 21,
    director: "윤바다",
    cast: "서파도, 강모래",
    releaseDate: "2026.07.01",
    story: "고향 바다로 돌아온 한 여성이 잊고 지낸 가족의 기억을 되찾아가는 잔잔한 드라마입니다."
  },
  {
    id: 6,
    title: "시티 러너",
    genre: "액션",
    posterColor: "gray",
    emoji: "🏃",
    duration: 121,
    rating: "15세 관람가",
    popularity: 27,
    director: "오액션",
    cast: "강질주, 문추격",
    releaseDate: "2026.07.15",
    story: "도심 한복판에서 벌어지는 추격전 속, 누명을 쓴 주인공이 진범을 쫓는 액션 영화입니다."
  }
];

const THEATERS = ["강남점", "수지점", "분당점"];
const SHOW_TIMES = ["10:30", "13:20", "16:10", "19:40", "22:00"];
const SEAT_ROWS = ["A", "B", "C", "D"];
const SEATS_PER_ROW = 6;
const PRICE_PER_SEAT = 14000;
const DEFAULT_RESERVED_SEATS = ["A5", "B4", "B5", "D1", "D6"];
