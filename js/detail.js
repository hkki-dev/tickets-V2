function getMovieIdFromUrl() {
  const params = new URLSearchParams(location.search);
  return params.get("id") || 1;
}

function renderMovieDetail() {
  const box = document.getElementById("detail-box");
  if (!box) return;

  const movie = getMovieById(getMovieIdFromUrl());

  if (!movie) {
    box.innerHTML = '<p style="padding:30px;">영화 정보를 찾을 수 없습니다.</p>';
    return;
  }

  document.title = movie.title + " - 영화 상세";

  box.innerHTML =
    '<div class="detail-poster">' + movie.emoji + "</div>" +
    '<div class="detail-info">' +
    '<span class="badge">' + movie.genre + "</span>" +
    "<h2>" + movie.title + "</h2>" +
    '<ul class="info-list">' +
    "<li><strong>감독</strong> " + movie.director + "</li>" +
    "<li><strong>출연</strong> " + movie.cast + "</li>" +
    "<li><strong>상영시간</strong> " + movie.duration + "분</li>" +
    "<li><strong>관람등급</strong> " + movie.rating + "</li>" +
    "<li><strong>개봉일</strong> " + movie.releaseDate + "</li>" +
    "</ul>" +
    '<div class="story"><h3>줄거리</h3><p>' + movie.story + "</p></div>" +
    '<a href="booking.html?id=' + movie.id + '" class="btn primary">예매하기</a>' +
    '<a href="movies.html" class="btn">목록으로</a>' +
    "</div>";
}

document.addEventListener("DOMContentLoaded", renderMovieDetail);
