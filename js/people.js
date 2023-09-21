// URL de la API a consumir
const API_PEOPLE = "https://jsonplaceholder.typicode.com/users";

// funciones
function getUsers() {
  fetch(API_PEOPLE)
    .then((response) => response.json())
    .then((json) => {
      fillUsers(json);
    })
    .catch((error) => {
      console.log("Error consumiendo API");
    });
}

function fillUsers(users) {
  let cards = "";
  users.forEach((e) => {
    cards += `
                <div class="card col col-6 col-sm-4 col-md-2 g-2">  
                  <div class="card-body">
                    <h5 class="card-title">${e.name}</h5>
                    <p class="card-text">${e.email}</p>
                  </div>
                </div>
              `;
  });
  document.getElementById("dataPeople").innerHTML = cards;
  console.log(cards);
}

// Eventos
document.getElementById("btnSearch").addEventListener("click", () => {
  getUsers();
});
