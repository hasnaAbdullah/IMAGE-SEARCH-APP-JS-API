const accessKey = "UjrLhMZpaXMvndCZsEMHUGzORyz61q4n_A0bI0LBMDY";
const formEl = document.querySelector("form");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputValue = "";
let pageNo = 1;
async function fetchImages() {
  const apiUrl = `https://api.unsplash.com/search/photos?page=${pageNo}&query=cat&client_id=${accessKey}`;

  const response = await fetch(apiUrl);
  const data = await response.json();
  displayImages(data.results);
}
function displayImages(results) {
  searchResults.innerHTML = "";
  results.forEach((result) => {
    const div = document.createElement("div");
    const img = document.createElement("img");
    const a = document.createElement("a");
    const i = document.createElement("i");
    i.classList.add("fa-regular", "fa-bookmark");

    div.classList.add("search-result");
    img.src = result.urls.regular;
    img.alt = result.alt_description;
    a.href = result.urls.regular;
    a.textContent = result.description
      ? result.description.slice(0, 30)
      : "without description";
    div.appendChild(img);
    div.appendChild(a);
    div.appendChild(i);
    searchResults.appendChild(div);
  });
}
function showMoreImages(results) {
  results.forEach((result) => {
    const div = document.createElement("div");
    const img = document.createElement("img");
    const a = document.createElement("a");
    const i = document.createElement("i");
    i.classList.add("fa-regular fa-bookmark");
    div.classList.add("search-result");
    img.src = result.urls.regular;
    img.alt = result.alt_description;
    a.href = result.urls.regular;
    a.textContent = result.description
      ? result.description.slice(0, 30)
      : "without description";
    div.appendChild(img);
    div.appendChild(a);
    div.appendChild(i);
    searchResults.appendChild(div);
  });
}
formEl.addEventListener("submit", async (event) => {
  event.preventDefault();
  inputValue = searchInput.value;
  const apiUrl = `https://api.unsplash.com/search/photos?page=${pageNo}&query=${inputValue}&client_id=${accessKey}`;

  const response = await fetch(apiUrl);
  const data = await response.json();
  displayImages(data.results);
});

showMore.addEventListener("click", async () => {
  if (inputValue !== "") {
    pageNo++;
    console.log(pageNo);
    const apiUrl = `https://api.unsplash.com/search/photos?page=${pageNo}&query=${inputValue}&client_id=${accessKey}`;

    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    showMoreImages(data.results);
  } else {
    alert(
      "You can't remain blank input field. Please, at first, search your favorite images then press show more button"
    );
  }
});
window.onload = fetchImages();
