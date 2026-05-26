const API_BASE_URL = "http://localhost:4000"; 

document.addEventListener("DOMContentLoaded", () => {
  const title = document.getElementById("title");
  const artistContainer = document.getElementById("artist-list");

  if (title) {
    title.addEventListener("click", () => {
      alert("Frontend connected to Backend ");
    });
  }

  fetch(`${API_BASE_URL}/api/test`) 
    .then((res) => {
      if (!res.ok) throw new Error("Network response error status code");
      return res.json();
    })
    .then((payload) => {
      console.log("Backend Raw Array Data Received:", payload);

      if (artistContainer) {
        artistContainer.innerHTML = ""; 
        
        payload.data.forEach((artist) => {
          const card = document.createElement("div");
          card.className = "artist-card";
          card.innerHTML = `
            <h3>${artist.name}</h3>
            <p><strong>Genre:</strong> ${artist.genre}</p>
            <p><strong>Origin:</strong> ${artist.country}</p>
            <p><strong>Total Albums:</strong> ${artist.albums}</p>
            <p><strong>Top Hit:</strong> "${artist.popularSong}"</p>
          `;
          artistContainer.appendChild(card);
        });
      }
    })
    .catch((err) => {
   
      if (artistContainer) {
        // FIXED: String converted entirely to double quotes to satisfy ESLint
        artistContainer.innerHTML = "<p class=\"error\">Unable to display system profiles right now</p>";
      }
    });
});