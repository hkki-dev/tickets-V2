function renderMovieList(movies) {
  const list = document.getElementById("movie-list");
  if (!list) return;

  if (movies.length === 0) {
    list.innerHTML = '<p style="padding:30px;color:#6b7280;">검색 결과가 없습니다.</p>';
    return;
  }

  list.innerHTML = movies
    .map(function (movie) {
      return (
        '<article class="movie-card">' +
        '<div class="poster ' + movie.posterColor + '">' + movie.emoji + "</div>" +
        '<div class="movie-info">' +
        '<span class="badge">' + movie.genre + "</span>" +
        "<h3>" + movie.title + "</h3>" +
        "<p>상영시간 " + movie.duration + "분</p>" +
        "<p>" + movie.rating + "</p>" +
        '<div class="movie-actions">' +
        '<a class="btn" href="detail.html?id=' + movie.id + '">상세</a>' +
        '<a class="btn primary" href="booking.html?id=' + movie.id + '">예매</a>' +
        "</div></div></article>"
      );
    })
    .join("");
}

function applyMovieFilter() {
  const keyword = document.getElementById("search-input").value.trim().toLowerCase();
  const genre = document.getElementById("genre-select").value;

  const filtered = getMovies().filter(function (movie) {
    const matchesKeyword = movie.title.toLowerCase().includes(keyword);
    const matchesGenre = genre === "전체 장르" || movie.genre === genre;
    return matchesKeyword && matchesGenre;
  });

  renderMovieList(filtered);
}

document.addEventListener("DOMContentLoaded", function () {
  renderMovieList(getMovies());

  document.getElementById("search-btn").addEventListener("click", applyMovieFilter);
  document.getElementById("genre-select").addEventListener("change", applyMovieFilter);
  document.getElementById("search-input").addEventListener("keydown", function (e) {
    if (e.key === "Enter") applyMovieFilter();
  });
});
