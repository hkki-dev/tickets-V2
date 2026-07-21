let selectedSeats = [];
let selectedTime = SHOW_TIMES[0];

function renderMovieSelect() {
  const select = document.getElementById("movie-select");
  const movies = getMovies();
  const preselectId = Number(new URLSearchParams(location.search).get("id"));

  select.innerHTML = movies
    .map(function (movie) {
      return '<option value="' + movie.id + '">' + movie.title + "</option>";
    })
    .join("");

  if (preselectId) {
    select.value = preselectId;
  }
}

function renderTheaterSelect() {
  const select = document.getElementById("theater-select");
  select.innerHTML = THEATERS.map(function (theater) {
    return "<option>" + theater + "</option>";
  }).join("");
}

function renderTimeList() {
  const wrap = document.getElementById("time-list");
  wrap.innerHTML = SHOW_TIMES.map(function (time, index) {
    const activeClass = index === 0 ? " active" : "";
    return '<div class="time-item' + activeClass + '" data-time="' + time + '">' + time + "</div>";
  }).join("");

  wrap.querySelectorAll(".time-item").forEach(function (item) {
    item.addEventListener("click", function () {
      wrap.querySelectorAll(".time-item").forEach(function (el) {
        el.classList.remove("active");
      });
      item.classList.add("active");
      selectedTime = item.dataset.time;
      updateSummary();
    });
  });
}

function renderSeatArea() {
  const wrap = document.getElementById("seat-area");
  wrap.innerHTML = SEAT_ROWS.map(function (row) {
    let rowHtml = '<div class="seat-row"><span class="row-label">' + row + "</span>";
    for (let n = 1; n <= SEATS_PER_ROW; n++) {
      const seatId = row + n;
      const reservedClass = DEFAULT_RESERVED_SEATS.includes(seatId) ? " reserved" : "";
      rowHtml += '<span class="seat' + reservedClass + '" data-seat="' + seatId + '">' + n + "</span>";
    }
    return rowHtml + "</div>";
  }).join("");

  wrap.querySelectorAll(".seat").forEach(function (seat) {
    seat.addEventListener("click", function () {
      if (seat.classList.contains("reserved")) return;

      const seatId = seat.dataset.seat;
      if (seat.classList.contains("selected")) {
        seat.classList.remove("selected");
        selectedSeats = selectedSeats.filter(function (s) {
          return s !== seatId;
        });
      } else {
        seat.classList.add("selected");
        selectedSeats.push(seatId);
      }
      updateSummary();
    });
  });
}

function updateSummary() {
  const movie = getMovieById(document.getElementById("movie-select").value);
  const theater = document.getElementById("theater-select").value;
  const count = selectedSeats.length;
  const price = count * PRICE_PER_SEAT;

  document.getElementById("summary-movie").textContent = movie ? movie.title : "-";
  document.getElementById("summary-theater").textContent = theater;
  document.getElementById("summary-time").textContent = selectedTime;
  document.getElementById("summary-seats").textContent = selectedSeats.length ? selectedSeats.join(", ") : "-";
  document.getElementById("summary-count").textContent = count + "명";
  document.getElementById("summary-price").textContent = formatPrice(price);
}

function submitBooking() {
  if (selectedSeats.length === 0) {
    alert("좌석을 1개 이상 선택해주세요.");
    return;
  }

  const movie = getMovieById(document.getElementById("movie-select").value);
  const theater = document.getElementById("theater-select").value;
  const today = new Date();
  const dateStr =
    today.getFullYear() + "." + String(today.getMonth() + 1).padStart(2, "0") + "." + String(today.getDate()).padStart(2, "0");

  const bookings = getBookings();
  const newBooking = {
    id: "T" + Date.now(),
    movie: movie.title,
    theater: theater,
    datetime: dateStr + " " + selectedTime,
    seats: selectedSeats.join(", "),
    count: selectedSeats.length,
    price: selectedSeats.length * PRICE_PER_SEAT,
    status: "예매완료"
  };
  bookings.push(newBooking);
  saveBookings(bookings);

  alert("예매가 완료되었습니다!");
  location.href = "mypage.html";
}

document.addEventListener("DOMContentLoaded", function () {
  renderMovieSelect();
  renderTheaterSelect();
  renderTimeList();
  renderSeatArea();
  updateSummary();

  document.getElementById("movie-select").addEventListener("change", updateSummary);
  document.getElementById("theater-select").addEventListener("change", updateSummary);
  document.getElementById("submit-booking").addEventListener("click", submitBooking);
});
