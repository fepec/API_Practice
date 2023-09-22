// URL de la API a consumir
const API_POKEMON = "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0";

// funciones
function getPokemon(api) {
  fetch(api)
    .then((response) => response.json())
    .then((json) => {
      fillData(json.results), pagination(json);
    })
    .catch((error) => {
      console.log("Error consumiendo API");
    });
}

function fillData(poke) {
  let cards = "";
  for (let i = 0; i < poke.length; i++) {
    console.log(poke[i].url);
    let sprite = "";
    // tempJson.sprites.other["official-artwork"].front_default
    fetch(poke[i].url)
      .then((response) => response.json())
      .then((json) => json.sprites.other["official-artwork"].front_default)
      .then((sprite) => {
        cards += `<div class="col col-6 col-sm-4 col-md-2 card">
                    <div class="card-body">
                      <img class="card-img-top" src="${sprite}" alt="A picture of ${poke[i].name}.">
                        <p class="card-title fs-6 fw-normal ">${poke[i].name}</p>                          
                    </div>
                  </div>`;
        return cards;
      })
      .then((cards) => {
        document.getElementById("dataAlbum").innerHTML = cards;
      })

      .catch((error) => {
        console.log("Error obteniendo imagen.");
      });
  }
}

function pagination(info) {
  // Si no hay prev o next en info (aparece null), el botón debe aparecer desactivado.
  let prevDisabled = info.previous ? "" : "disabled";
  let nextDisabled = info.next ? "" : "disabled";

  let html = `<li class="page-item ${prevDisabled}">
                    <a class="page-link" onclick="getPokemon('${info.previous}')" >Prev</a>
                </li>
                <li class="page-item ${nextDisabled}">
                    <a class="page-link" onclick="getPokemon('${info.next}')" >Next</a>
                </li>`;

  document.getElementById("pagination").innerHTML = html;
}

getPokemon(API_POKEMON);
