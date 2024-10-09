const api_key = "cde69b8ab4588148413d2dbdc4565071";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500/";

document.addEventListener("DOMContentLoaded", () => {
  getTrendMovies();
  renderMovies();
});

function setHero(data) {
  const hero_img = document.getElementById("hero-img");
  const hero_title = document.getElementById("hero-title");
  const hero_desc = document.getElementById("hero-description");
  const user = document.getElementById("user");

  const randomIndex = Math.floor(Math.random() * data.results.length);

  const imgUrl = `${IMAGE_URL}${data.results[randomIndex].poster_path}`;

  hero_img.src = imgUrl;
  hero_title.textContent = data.results[randomIndex].title;
  hero_desc.textContent = data.results[randomIndex].overview;

  const onlineUser = JSON.parse(localStorage.getItem("onlineUser"));
  user.textContent = onlineUser.username;
}

async function getTrendMovies() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${api_key}`
    );

    const data = await response.json();
    setHero(data);
  } catch (error) {
    console.log("error from trending ", error);
  }
}
const renderMovies = async () => {
  const nowPlaying = await FetchMovies("now_playing");
  const upcoming = await FetchMovies("upcoming");
  const topRated = await FetchMovies("top_rated");
  const popular = await FetchMovies("popular");

  displayMovies("now-playing", nowPlaying);
  displayMovies("popular", popular);
  displayMovies("upcoming", upcoming);
  displayMovies("top-rated", topRated);
};
async function FetchMovies(endPoint) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${endPoint}?api_key=${api_key}`
    );
    const data = await response.json();

    return data.results;
  } catch (error) {
    console.log("err from fetchMoves ", error);
  }
}

async function displayMovies(movieId, movies) {
  //   const playingNow = await FetchMovies("now_playing");
  const movieGrid = document.getElementById(movieId);

  movies.map((movie) => {
    movieGrid.innerHTML += `
         <div class="movie-card">
      <img src="${IMAGE_URL}${movie.poster_path}" alt="${movie.title}">
      <div class="movie-card-overlay">
        <div class="overlay-buttons">
          <button class="button" onclick="handlePlay(${movie.id})">▶</button>
          <button class="button">
          +
          </button>
        </div>
      </div>
    </div>
         `;
  });
}

function scrollRightSection(sectionId) {
  const movieGrid = document.getElementById(sectionId);

  movieGrid.scrollBy({ left: 300, behavior: "smooth" });
}
function scrollLeftSection(sectionId) {
  const movieGrid = document.getElementById(sectionId);

  movieGrid.scrollBy({ left: -300, behavior: "smooth" });
}
