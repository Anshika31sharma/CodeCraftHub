const perPageOptions = [10, 30, 50, 100];
let currentPage = 1;
let repositoriesData = [];

function getRepositories() {
  const username = document.getElementById("username").value;
  const repositoriesContainer = document.getElementById("repositories");
  const loader = document.getElementById("loader");
  const paginationContainer = document.getElementById("pagination");

  repositoriesContainer.innerHTML = "";
  loader.style.display = "block";
  paginationContainer.innerHTML = "";

  fetch(
    `https://api.github.com/users/${username}/repos?per_page=${perPageOptions[0]}&page=${currentPage}`
  )
    .then((response) => response.json())
    .then((data) => {
      repositoriesData = data;
      renderRepositories();
      renderPagination();
      loader.style.display = "none";
    })
    .catch((error) => {
      console.error("Error fetching repositories:", error);
      loader.style.display = "none";
    });
}

function renderRepositories() {
  const repositoriesContainer = document.getElementById("repositories");

  repositoriesData.forEach((repo) => {
    const repositoryDiv = document.createElement("div");
    repositoryDiv.classList.add("repository");

    repositoryDiv.innerHTML = `
                    <h2>${repo.name}</h2>
                    <p>${repo.description || "No description available"}</p>
                    <p>Language: ${repo.language || "Not specified"}</p>
                    <p>Topics: ${repo.topics.join(", ") || "No topics"}</p>
                    <p>Stars: ${repo.stargazers_count}</p>
                    <p>Forks: ${repo.forks}</p>
                    <img src="${repo.owner.avatar_url}" alt="${
      repo.owner.login
    }'s avatar">
                `;

    repositoriesContainer.appendChild(repositoryDiv);
  });
}

function renderPagination() {
  const paginationContainer = document.getElementById("pagination");

  perPageOptions.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", () => {
      currentPage = 1;
      fetchRepositoriesWithPerPage(option);
    });
    paginationContainer.appendChild(button);
  });
}

function fetchRepositoriesWithPerPage(perPage) {
  const username = document.getElementById("username").value;
  const repositoriesContainer = document.getElementById("repositories");
  const loader = document.getElementById("loader");

  repositoriesContainer.innerHTML = "";
  loader.style.display = "block";

  fetch(
    `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${currentPage}`
  )
    .then((response) => response.json())
    .then((data) => {
      repositoriesData = data;
      renderRepositories();
      loader.style.display = "none";
    })
    .catch((error) => {
      console.error("Error fetching repositories:", error);
      loader.style.display = "none";
      repositoriesContainer.innerHTML =
        "Error fetching repositories. Please try again.";
    });
}

getRepositories();
