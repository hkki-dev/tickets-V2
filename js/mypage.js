function renderBookings() {
  const tbody = document.getElementById("booking-list");
  const bookings = getBookings();

  if (bookings.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="color:#6b7280;">예매 내역이 없습니다.</td></tr>';
    return;
  }

  tbody.innerHTML = bookings
    .map(function (b) {
      return (
        "<tr>" +
        "<td>" + b.id + "</td>" +
        "<td>" + b.movie + "</td>" +
        "<td>" + b.theater + "</td>" +
        "<td>" + b.datetime + "</td>" +
        "<td>" + b.seats + "</td>" +
        "<td>" + b.status + "</td>" +
        '<td><button class="btn cancel-btn" data-id="' + b.id + '">취소</button></td>' +
        "</tr>"
      );
    })
    .join("");

  tbody.querySelectorAll(".cancel-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      cancelBooking(btn.dataset.id);
    });
  });
}

function cancelBooking(id) {
  if (!confirm("이 예매를 취소하시겠습니까?")) return;

  const bookings = getBookings().filter(function (b) {
    return b.id !== id;
  });
  saveBookings(bookings);
  renderBookings();
}

document.addEventListener("DOMContentLoaded", renderBookings);
