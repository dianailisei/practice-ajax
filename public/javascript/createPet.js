let form = document.getElementById("createForm");
form.addEventListener("submit", e => {
  e.preventDefault();
  let payload = {};

  payload.name = document.getElementById("name").value;
  payload.type = document.getElementById("pet-type").value;
  payload.created = Date.now();
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/pets");

  xhr.setRequestHeader('content-type', 'application/json');
  
  xhr.addEventListener("load", function onLoad() {
    switch (xhr.status) {
      case 200:
        let container = document.getElementById("petsContainer");
        container.appendChild(createPetCard(payload));
        break;
    }
  });

  xhr.addEventListener("error", function onError() {});

  xhr.send(JSON.stringify(payload));
});
