const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const selectedMovie = document.getElementById('movie');

let ticketPrice = +selectedMovie.value;

restoreLocalStorageData();

function restoreLocalStorageData() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }


  const selectedMovieIndex = +localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex !== null) {
    selectedMovie.selectedIndex = selectedMovieIndex;
  }
}

function saveSelectedMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;

  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
}

document.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  saveSelectedMovieData(e.target.selectedIndex, ticketPrice);

  updateSelectedCount();
});

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

// on page load 
updateSelectedCount();
