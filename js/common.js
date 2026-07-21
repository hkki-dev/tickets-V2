// 모든 페이지에서 공통으로 쓰는 함수 모음
// data.js보다 뒤에, 각 페이지 전용 js보다 앞에 불러옵니다.

function initStorage() {
  if (!localStorage.getItem("movies")) {
    localStorage.setItem("movies", JSON.stringify(MOVIES));
  }
  if (!localStorage.getItem("users")) {
    const demoUsers = [
      { id: "user1", password: "1234", name: "홍길동", email: "user1@example.com" }
    ];
    localStorage.setItem("users", JSON.stringify(demoUsers));
  }
  if (!localStorage.getItem("bookings")) {
    localStorage.setItem("bookings", JSON.stringify([]));
  }
}

function getMovies() {
  return JSON.parse(localStorage.getItem("movies")) || [];
}

function saveMovies(movies) {
  localStorage.setItem("movies", JSON.stringify(movies));
}

function getMovieById(id) {
  return getMovies().find(function (m) {
    return m.id === Number(id);
  });
}

function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

function setCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

function logout() {
  localStorage.removeItem("currentUser");
  location.href = "index.html";
}

function getBookings() {
  return JSON.parse(localStorage.getItem("bookings")) || [];
}

function saveBookings(bookings) {
  localStorage.setItem("bookings", JSON.stringify(bookings));
}

function formatPrice(num) {
  return num.toLocaleString() + "원";
}

// 헤더 메뉴에서 로그인 상태에 따라 "로그인" <-> "로그아웃" 표시를 바꿔줍니다.
function updateNavAuthState() {
  const loginLink = document.querySelector('.menu a[href="login.html"]');
  if (!loginLink) return;

  const user = getCurrentUser();
  if (user) {
    loginLink.textContent = "로그아웃 (" + user.name + ")";
    loginLink.setAttribute("href", "#");
    loginLink.addEventListener("click", function (e) {
      e.preventDefault();
      logout();
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  initStorage();
  updateNavAuthState();
});
