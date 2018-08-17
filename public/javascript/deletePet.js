// let container = document.getElementById("petsContainer");

// container.addEventListener("click", e => {
//   let btn = e.target;
//   if (e.target.type === "submit") {
function deletePet(id) {
    let url = `/pets/${id}`;
    let xhr = new XMLHttpRequest();

    xhr.open('DELETE', url);
    xhr.addEventListener('load', function onLoad() {
        switch (xhr.status) {
            case 200:
                break;
            default:
                break;
        }
    });

    xhr.addEventListener('error', function onError() {});

    xhr.send(JSON.stringify(id));
}
