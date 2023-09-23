// URL de la API a consumir
const API_POKEMON = "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0";

// funciones

function pokeSortFunction(a, b) {
  // utilizada para en un sort para ordenar Pokémones en orden de id.
  return a.id - b.id;
  // if( a.name.toLowerCase() < b.name.toLowerCase()) {
  //   return - 1
  // } else if( a.name.toLowerCase() == b.name.toLowerCase()) {
  //   return 0
  // } else {
  //   return 1
  // }
}

function getPokemon(api) {
  document.getElementById("dataAlbum").innerHTML = "";
  fetch(api)
    .then((response) => response.json()) // .json() convierte la respuesta en un array de JS objects
    .then((json) => {
      // console.log("PokemonData:", json.results) // Console
      getPokemonData(json.results);
      pagination(json);
    })
    .catch((error) => {
      console.log("Error consumiendo API: ", error);
    });
}

function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1)
}

function fillCards(pokes) {
  // Takes an array of pokemon and populates html
  pokes.sort(pokeSortFunction)
  let html =""

  for (let i = 0; i < pokes.length; i++) {
    html += `<div class="col col-8 col-sm-5 col-md-3 card ">
              <div class="card-body p-0 bg-secondary-subtle">
                <img class="card-img-top" src="${pokes[i].sprites.other["official-artwork"].front_default}" alt="A picture of ${pokes[i].name}.">
                <p class="card-title fs-6 fw-normal bg-body">Number: ${pokes[i].id}</p>  
                <p class="card-title fs-6 fw-normal bg-body">Name: ${capitalizeFirstLetter(pokes[i].name)}</p>
              </div>
            </div>`;
}

  
  document.getElementById("dataAlbum").innerHTML = html;
}

function getPokemonData(poke) {
  let pokePromises = [];
  
  for (let i = 0; i < poke.length; i++) {
    let pokePromise = fetch(poke[i].url).then(response => response.json());  // Cuidado! .json() devuelve una PROMESA. 
    pokePromises.push(pokePromise);
      }
  Promise.all(pokePromises)
    .then((response) => fillCards(response))
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