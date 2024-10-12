const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const user = document.getElementById("user");
const myList = loadMylist();

const logOut = document.getElementById("logOut");

logOut.addEventListener("click", () => {
  localStorage.removeItem("onlineUser");
  window.location.href = "../html/auth.html";
});

function loadMylist() {
  let myList = {
    user: null,
    lists: [],
  };

  const onlineUser = JSON.parse(localStorage.getItem("onlineUser")) || null;
  if (!onlineUser) return (window.location.href = "../html/auth.html");

  const allLists = JSON.parse(localStorage.getItem("my-list")) || [];
  const userLists = allLists.find((list) => list.user === onlineUser.email);

  user.textContent = onlineUser.username;

  if (userLists) {
    myList.lists = userLists.lists;
  } else {
    myList.lists = [];
  }
  return myList;
}
renderMoviesList(myList.lists);

function renderMoviesList(movies) {
  console.log("waaa", movies);

  const movieGrid = document.getElementById("myList");
  movieGrid.innerHTML = "";
  movies.forEach((movie) => {
    movieGrid.innerHTML += `
         <div class="movie-card">
      <img src="${IMAGE_BASE_URL}${movie.poster_path}" alt="${movie.title}">
      <div class="movie-card-overlay">
        <div class="overlay-buttons">
          <button class="button" onclick="handlePlay(${
            movie.movieId
          })">▶</button>
          <button class="button" movieId="${movie.movieId}" poster_path="${
      movie.poster_path
    }" onclick="toggleEvent(this)">
          ${
            myList.lists.find((mov) => mov.movieId == movie.movieId)
              ? "✔️"
              : "➕"
          }
          </button>
        </div>
      </div>
    </div>
         `;
  });
}

function toggleEvent(button) {
  const onlineUser = JSON.parse(localStorage.getItem("onlineUser")) || null;
  let allLists = JSON.parse(localStorage.getItem("my-list")) || [];

  const movieId = button.getAttribute("movieId");
  const poster_path = button.getAttribute("poster_path");

  let userIndex = allLists.findIndex((list) => (list.user = onlineUser.email));

  if (userIndex === -1) {
    allLists.push({ user: onlineUser.email, lists: [] });
    userIndex = allLists.length - 1;
  }

  const userLists = allLists[userIndex].lists;

  const movieIndex = userLists.findIndex((mov) => mov.movieId === movieId);

  if (movieIndex === -1) {
    userLists.push({ movieId, poster_path });
    button.textContent = "✔️";
  } else {
    userLists.splice(movieIndex, 1);
    button.textContent = "➕";
  }

  localStorage.setItem("my-list", JSON.stringify(allLists));
  renderMoviesList(userLists);
}

function handlePlay(id) {
  window.location.href = `../html/movie-detail.html?id=${id}`;
}
