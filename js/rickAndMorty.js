// URL de la API a consumir
const API_ALBUM = "https://rickandmortyapi.com/api/character";

// funciones
function getAlbum() {
  fetch(API_ALBUM)
    .then((response) => response.json())
    .then((json) => {
      fillData(json.results), pagination(json.info);
    })
    .catch((error) => {
      console.log("Error consumiendo API");
    });
}

function fillData(photos) {
  let cards = "";
  for (let i = 0; i < 20; i++) {
    cards += `<div class="col col-6 col-sm-4 col-md-2 card">
                    <div class="card-body">
                      <img class="card-img-top" src="${photos[i].image}" alt="Card image cap">
                        <p class="card-title fs-6 fw-normal ">${photos[i].name}</p>  
                        <p class="card-title fs-6 fw-normal">Species: ${photos[i].species}</p>
                    </div>
                  </div>`;
  };
  document.getElementById("dataAlbum").innerHTML = cards;
//   console.log(cards);
}

function pagination(info) {
    // Si no hay prev o next en info (aparece null), el botón debe aparecer desactivado.
    let prevDisabled = info.prev ? "" : "disabled"
    let nextDisabled = info.next ? "" : "disabled"

    let html = `<li class="page-item">
                    <a href="${info.prev}" class="page-link ${prevDisabled}">Prev</a>
                </li>
                <li class="page-item">
                    <a href="${info.next}" class="page-link ${nextDisabled}">Next</a>
                </li>`
    
    document.getElementById("pagination").innerHTML = html;



}

getAlbum()