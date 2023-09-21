// URL de la API a consumir
const API_ALBUM = "https://jsonplaceholder.typicode.com/photos";

// funciones
function getAlbum() {
  fetch(API_ALBUM)
    .then((response) => response.json())
    .then((json) => {
      fillData(json);
    })
    .catch((error) => {
      console.log("Error consumiendo API");
    });
}

function fillData(photos) {
  let cards = "";
  for (let i = 0; i < 24; i++) {
    cards += `
                
                  <div class="col col-6 col-sm-4 col-md-2 card">
                    <div class="card-body">
                      <img class="card-img-top" src="${photos[i].url}" alt="Card image cap">
                        <p class="card-title fs-6 fw-normal">${photos[i].title}</p>  
                    </div>
                  </div>
                `;
  };
  document.getElementById("dataAlbum").innerHTML = cards;
  console.log(cards);
}

getAlbum()