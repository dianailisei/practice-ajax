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
