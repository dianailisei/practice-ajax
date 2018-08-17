function getPets() {
    let xhr = new XMLHttpRequest();

    xhr.open("GET", "/pets/");
    
    xhr.addEventListener("load", function onLoad() {
        switch (xhr.status) {
            case 200:
                let jsonResponse = JSON.parse(xhr.response);
                jsonResponse.forEach(element => {
                    let container = document.getElementById("petsContainer");
                    container.innerHTML = null;
                    container.appendChild(createPetCard(element));
                });            
                break;
            case 404:
                
                break;
            default:
    
                break;
        }
    });
    
    xhr.addEventListener("error", function onError() {
        alert("Oups, it seems something went wrong with the API. Try again!");
    });
    
    xhr.send();    
}
getPets();

function updatePet(id)
{
    let url = `/pets/${id}`;
    let xhr = new XMLHttpRequest();
    let pet = getPetById(id);
    console.log(pet);
    let payload = {};

    payload.name = pet.name;
    payload.type = pet.type;
    payload.created = pet.created;

    xhr.open("PUT", url);

    xhr.setRequestHeader('content-type', 'application/json');

    xhr.addEventListener("load", function onLoad() {
        switch (xhr.status) {
            case 200:
            getPets();
            break;
            default:
            break;
        }
      });
  
      xhr.addEventListener("error", function onError() {});
  
      xhr.send(JSON.stringify(payload));
}

function getPetById(id)
{
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/pets/");
    
    xhr.addEventListener("load", function onLoad() {
        switch (xhr.status) {
            case 200:
                let jsonResponse = JSON.parse(xhr.response);
                jsonResponse.forEach(element => {
                    if(element.id == id)
                    return element;
                });            
                break;
            case 404:
                
                break;
            default:
    
                break;
        }
    });
    
    xhr.addEventListener("error", function onError() {
        alert("Oups, it seems something went wrong with the API. Try again!");
    });
    
    xhr.send();
}