const GENRE_STYLE = {
  SF: { emoji: "🚀", color: "red" },
  애니: { emoji: "🐾", color: "green" },
  스릴러: { emoji: "🕵️", color: "purple" },
  음악: { emoji: "🎵", color: "yellow" },
  드라마: { emoji: "🌊", color: "blue" },
  액션: { emoji: "🏃", color: "gray" }
};

function renderAdminTable() {
  const tbody = document.getElementById("admin-list");
  const movies = getMovies();

  tbody.innerHTML = movies
    .map(function (movie) {
      return (
        "<tr>" +
        "<td>" + movie.id + "</td>" +
        "<td>" + movie.title + "</td>" +
        "<td>" + movie.genre + "</td>" +
        "<td>" + movie.duration + "분</td>" +
        "<td>" + movie.rating + "</td>" +
        "<td>" +
        '<button class="btn edit-btn" data-id="' + movie.id + '">수정</button> ' +
        '<button class="btn delete-btn" data-id="' + movie.id + '">삭제</button>' +
        "</td></tr>"
      );
    })
    .join("");

  tbody.querySelectorAll(".edit-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      editMovie(Number(btn.dataset.id));
    });
  });
  tbody.querySelectorAll(".delete-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      deleteMovie(Number(btn.dataset.id));
    });
  });
}

function addMovie() {
  const title = document.getElementById("admin-title").value.trim();
  const genre = document.getElementById("admin-genre").value;
  const durationText = document.getElementById("admin-duration").value.trim();
  const rating = document.getElementById("admin-rating").value.trim();
  const story = document.getElementById("admin-story").value.trim();

  if (!title || !durationText || !rating) {
    alert("영화 제목, 상영시간, 관람등급을 입력해주세요.");
    return;
  }

  const duration = parseInt(durationText, 10) || 0;
  const style = GENRE_STYLE[genre] || { emoji: "🎬", color: "gray" };
  const movies = getMovies();
  const nextId = movies.length ? Math.max.apply(null, movies.map(function (m) { return m.id; })) + 1 : 1;

  movies.push({
    id: nextId,
    title: title,
    genre: genre,
    posterColor: style.color,
    emoji: style.emoji,
    duration: duration,
    rating: rating,
    popularity: 0,
    director: "-",
    cast: "-",
    releaseDate: new Date().toISOString().slice(0, 10).replace(/-/g, "."),
    story: story || "등록된 줄거리가 없습니다."
  });

  saveMovies(movies);
  renderAdminTable();
  document.getElementById("admin-form").reset();
}

function editMovie(id) {
  const movies = getMovies();
  const movie = movies.find(function (m) {
    return m.id === id;
  });
  if (!movie) return;

  const newTitle = prompt("영화 제목", movie.title);
  if (newTitle === null) return;
  const newDuration = prompt("상영시간(분)", movie.duration);
  if (newDuration === null) return;
  const newRating = prompt("관람등급", movie.rating);
  if (newRating === null) return;

  movie.title = newTitle.trim() || movie.title;
  movie.duration = parseInt(newDuration, 10) || movie.duration;
  movie.rating = newRating.trim() || movie.rating;

  saveMovies(movies);
  renderAdminTable();
}

function deleteMovie(id) {
  if (!confirm("이 영화를 삭제하시겠습니까?")) return;

  const movies = getMovies().filter(function (m) {
    return m.id !== id;
  });
  saveMovies(movies);
  renderAdminTable();
}

document.addEventListener("DOMContentLoaded", function () {
  renderAdminTable();
  document.getElementById("admin-submit").addEventListener("click", addMovie);
});
