function handleLogin() {
  const idInput = document.getElementById("login-id");
  const pwInput = document.getElementById("login-pw");
  const id = idInput.value.trim();
  const pw = pwInput.value.trim();

  if (!id || !pw) {
    alert("아이디와 비밀번호를 모두 입력해주세요.");
    return;
  }

  const user = getUsers().find(function (u) {
    return u.id === id && u.password === pw;
  });

  if (!user) {
    alert("아이디 또는 비밀번호가 일치하지 않습니다.");
    return;
  }

  setCurrentUser(user);
  alert(user.name + "님, 환영합니다!");
  location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("login-btn").addEventListener("click", handleLogin);
});
