function handleSignup() {
  const id = document.getElementById("signup-id").value.trim();
  const name = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-pw").value.trim();

  if (!id || !name || !email || !password) {
    alert("모든 항목을 입력해주세요.");
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("이메일 형식이 올바르지 않습니다.");
    return;
  }

  const users = getUsers();
  const isDuplicate = users.some(function (u) {
    return u.id === id;
  });
  if (isDuplicate) {
    alert("이미 사용 중인 아이디입니다.");
    return;
  }

  users.push({ id: id, name: name, email: email, password: password });
  saveUsers(users);

  alert("회원가입이 완료되었습니다. 로그인해주세요.");
  location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("signup-btn").addEventListener("click", handleSignup);
});
