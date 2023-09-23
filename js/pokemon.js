// URL de la API a consumir
const API_POKEMON = "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0";

// funciones

// function comparePokeId(a, b) {
//   // utilizada para en un sort para ordenar Pokémones en orden de id.
//   return a.id - b.id;
// } 

function getPokemon(api) {
  document.getElementById("dataAlbum").innerHTML = "";
  fetch(api)
    .then((response) => response.json()) // .json() convierte la respuesta en un array de JS objects
    .then((json) => {
      getPokemonData(json.results);
      pagination(json);
    })
    .catch((error) => {
      console.log("Error consumiendo API: ", error);
    });
}

function fillCards(json) {
    
    html = `<div class="col col-6 col-sm-4 col-md-2 card ">
              <div class="card-body p-0 bg-secondary-subtle">
                <img class="card-img-top" src="${json.sprites.other["official-artwork"].front_default}" alt="A picture of ${json.name}.">
                <p class="card-title fs-6 fw-normal bg-body">Number: ${json.id}</p>  
                <p class="card-title fs-6 fw-normal bg-body">Name: ${json.name}</p>
              </div>
            </div>`;    
   
  document.getElementById("dataAlbum").innerHTML += html;
}

function getPokemonData(poke) {  
  let pokemons = [];
  for (let i = 0; i < poke.length; i++) {
    fetch(poke[i].url)
      .then((response) => response.json())
      .then((json) => fillCards(json))
      .catch((error) => {
        console.log("Error obteniendo imagen:", error);
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
