document.addEventListener('DOMContentLoaded', function() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  const raw = JSON.stringify({
    "query": "query { movies { id title director releaseYear genre rating discussions { id content } createdAt updatedAt } }"
  });
  
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  
  fetch("http://localhost:3000/graphql", requestOptions)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const moviesContainer = document.getElementById('movies-container');
      data.data.movies.forEach(movie => {
        const movieCard = `
          <div class="col movie">
            <div class="card">
              <img src="https://via.placeholder.com/300" class="card-img-top" alt="${movie.title}">
              <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">${movie.director}</p>
                <p class="card-text">${movie.releaseYear}</p>
                <p class="card-text">${movie.genre}</p>
                <p class="card-text">${movie.rating}</p>
              </div>
            </div>
          </div>
        `;
        moviesContainer.innerHTML += movieCard;
      });
    })
    .catch(error => console.error('Error fetching movies:', error));
  })
