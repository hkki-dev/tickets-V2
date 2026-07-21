function renderPopularMovies() {
  const list = document.getElementById("popular-list");
  if (!list) return;

  const movies = getMovies()
    .slice()
    .sort(function (a, b) {
      return b.popularity - a.popularity;
    })
    .slice(0, 4);

  list.innerHTML = movies
    .map(function (movie) {
      return (
        '<article class="movie-card">' +
        '<div class="poster ' + movie.posterColor + '">' + movie.emoji + "</div>" +
        '<div class="movie-info">' +
        '<span class="badge">' + movie.genre + "</span>" +
        "<h3>" + movie.title + "</h3>" +
        "<p>상영시간 " + movie.duration + "분</p>" +
        "<p>예매율 " + movie.popularity + "%</p>" +
        '<div class="movie-actions">' +
        '<a class="btn" href="detail.html?id=' + movie.id + '">상세</a>' +
        '<a class="btn primary" href="booking.html?id=' + movie.id + '">예매</a>' +
        "</div></div></article>"
      );
    })
    .join("");
}

document.addEventListener("DOMContentLoaded", renderPopularMovies);
