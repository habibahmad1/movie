// // menggunakan fetch sebagai ganti dari jQuery / Vanilla Javascript

// // ambil dulu element tombol search nya
// const searchButton = document.querySelector(".search-button");
// // ketika tombol di klik jalankan tombol dibawah
// searchButton.addEventListener("click", function () {
//   const inputKey = document.querySelector(".input-key");
//   fetch("http://www.omdbapi.com/?i=tt3896198&apikey=c42fe6ae&s=" + inputKey.value)
//     .then((response) => response.json())
//     .then((response) => {
//       const movies = response.Search;
//       let cards = "";
//       movies.forEach((mv) => (cards += showCard(mv)));
//       const movieContainer = document.querySelector(".movie-container");
//       movieContainer.innerHTML = cards;

//       // ketika tombol detail di klik
//       // simpan dulu kedalam variabel
//       const modalDetail = document.querySelectorAll(".modal-detail");
//       modalDetail.forEach((btn) => {
//         btn.addEventListener("click", function () {
//           const idMovie = this.dataset.detail;
//           fetch("http://www.omdbapi.com/?apikey=c42fe6ae&i=" + idMovie)
//             .then((response) => response.json())
//             .then((m) => {
//               const movieDetails = showMovieDetails(m);
//               const modalBody = document.querySelector(".modal-body");
//               modalBody.innerHTML = movieDetails;
//             });
//         });
//       });
//     });
// });

// ambil dulu element tombol search nya
const searchButton = document.querySelector(".search-button");
// ketika tombol search di klik
searchButton.addEventListener("click", async function () {
  // ambil di kotak pencarian lalu simpan dulu kedalam variabel
  const inputKey = document.querySelector(".input-key");
  // buat variabel yang di ambil dari functoin untuk tampung value di pencarian
  const movies = await dapatMovie(inputKey.value);
  // fungsi untuk memasukan ke Card
  updateUI(movies);
});

// Keetika tombol detail di klik
// event binding
document.addEventListener("click", async function (element) {
  if (element.target.classList.contains("modal-detail")) {
    const idMovie = element.target.dataset.detail;
    const movieDetail = await dapatIDMovie(idMovie);
    updateUIDetail(movieDetail);
  }
});

// Ketika halaman dimuat, tampilkan film Avengers
document.addEventListener("DOMContentLoaded", async function () {
  const moviesLoad = await dapatMovie("avengers");
  updateUI(moviesLoad);
});

function dapatIDMovie(idMovie) {
  return fetch("http://www.omdbapi.com/?apikey=c42fe6ae&i=" + idMovie)
    .then((response) => response.json())
    .then((m) => m);
}

function updateUIDetail(m) {
  const movieDetails = showMovieDetails(m);
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = movieDetails;
}

function dapatMovie(pencarian) {
  // panggil data dari fetch
  return (
    fetch("http://www.omdbapi.com/?i=tt3896198&apikey=c42fe6ae&s=" + pencarian)
      // ubah ke json
      .then((response) => response.json())
      .then((response) => response.Search)
  );
}

function updateUI(movies) {
  let cards = "";
  movies.forEach((mv) => (cards += showCard(mv)));
  const movieContainer = document.querySelector(".movie-container");
  movieContainer.innerHTML = cards;
}

function showCard(m) {
  return `<div class="col-md-3 my-3">
                <div class="card">
                <img src="${m.Poster}" class="card-img-top" />
                <div class="card-body">
                    <h5 class="card-title">${m.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">${m.Year}</h6>
                    <a href="#" class="btn btn-primary float-end modal-detail" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-detail="${m.imdbID}">Details</a>
                </div>
                </div>
            </div>`;
}

function showMovieDetails(m) {
  return ` <div class="container-fluid">
        <div class="row">
        <div class="col-md-3">
            <img src="${m.Poster}" class="img-fluid" />
        </div>
        <div class="col-md">
            <ul class="list-group">
            <li class="list-group-item"><h4>${m.Title}</h4></li>
            <li class="list-group-item"><strong>Director: </strong> ${m.Director}</li>
            <li class="list-group-item"><strong>Actor: </strong> ${m.Actors}</li>
            <li class="list-group-item"><strong>Genre: </strong> ${m.Genre}</li>
            <li class="list-group-item"><strong>Released: </strong>${m.Released}</li>
            </ul>
        </div>
        </div>
    </div>`;
}
