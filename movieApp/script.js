// TMDB

const API_KEY = 'api_key=2d4bf3405eba804509429f187e836594';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const main = document.getElementById('main');
const button = document.getElementById('button');



form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm) {
    const searchURL = BASE_URL + '/search/movie?' + API_KEY + '&query=' + searchTerm;
    getMovies(searchURL);
  }
});


const genres = [
  { name: 'Action', id: 28 },
  { name: 'Adventure', id: 12 },
  { name: 'Animation', id: 16 },
  { name: 'Comedy', id: 35 },
  { name: 'Crime', id: 80 },
  { name: 'Documentary', id: 99 },
  { name: 'Drama', id: 18 },
  { name: 'Family', id: 10751 },
  { name: 'Fantasy', id: 14 },
  { name: 'History', id: 36 },
  { name: 'Horror', id: 27 },
  { name: 'Music', id: 10402 },
  { name: 'Mystery', id: 9648 },
  { name: 'Romance', id: 10749 },
  { name: 'Sci-Fi', id: 878 },
  { name: 'TV Movie', id: 10770 },
  { name: 'Thriller', id: 53 },
  { name: 'War', id: 10752 }
];

  function fetchGenres() {
  const genreContainer = document.getElementById('genreContainer');

  genres.forEach((genre) => {
    const genreLink = document.createElement('a');
    genreLink.href = `${BASE_URL}/discover/movie?sort_by=popularity.desc&with_genres=${genre.id}&${API_KEY}`;
    genreLink.textContent = genre.name;
    genreLink.classList.add('genre1');
    genreLink.target = '_blank';
    genreContainer.appendChild(genreLink);
  });
}

fetchGenres();


getMovies(API_URL);

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      showMovies(data.results);
    });
}

function showMovies(data) {
  main.innerHTML = '';

  data.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieE1 = document.createElement('div');
    movieE1.classList.add('movie');
    movieE1.innerHTML = `
      <img src="${IMG_URL + poster_path}" alt="${title}">
      <div class="movie-info">
        <div class="change">
          <h3>${title}</h3>
          <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>overview</h3>
          ${overview}
        </div>
      </div>
    `;

    main.appendChild(movieE1);
      
  });
}

function getColor(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}


const prevPage = document.getElementById('prev');
const nextPage = document.getElementById('next');
const currentPage = document.getElementById('current');

let page = 1;

prevPage.addEventListener('click', () => {
  if (page > 1) {
    page--;
    updatePage();
  }
});

nextPage.addEventListener('click', () => {
  page++;
  updatePage();
});

function updatePage() {
  currentPage.textContent = page;
  const searchURL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY + '&page=' + page;
  getMovies(searchURL);
}