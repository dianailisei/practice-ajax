class PetsService {
    static getPets(successCb, errorCb, name) {
        let xhr = new XMLHttpRequest();
        let url = '/pets/';
        if (name !== undefined) {
            url = `/pets/?name=${name}`;
        }
        xhr.open('GET', url);

        xhr.addEventListener('load', function onLoad() {
            switch (xhr.status) {
                case 200:
                    successCb(JSON.parse(xhr.response));
                    break;
                case 401:
                    errorCb(401);
                    break;
                default:
                    break;
            }
        });

        xhr.addEventListener('error', function onError() {
            alert(
                'Oups, it seems something went wrong with the API. Try again!'
            );
        });

        xhr.send();
    }

    static getPet(id, successCb, errorCb)
    {
        let xhr = new XMLHttpRequest();
        let url = `/pets/${id}`;
        
        xhr.open('GET', url);

        xhr.addEventListener('load', function onLoad() {
            switch (xhr.status) {
                case 200:
                    successCb(JSON.parse(xhr.response));
                    break;
                case 401:
                    errorCb(401);
                    break;
                default:
                    break;
            }
        });

        xhr.addEventListener('error', function onError() {
            alert(
                'Oups, it seems something went wrong with the API. Try again!'
            );
        });

        xhr.send(JSON.stringify(id));
    }

    static createPet(pet, successCb, errorCb) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/pets');

        xhr.setRequestHeader('content-type', 'application/json');

        xhr.addEventListener('load', function onLoad() {
            // console.log(xhr);
            switch (xhr.status) {
                case 200:
                    successCb(JSON.parse(xhr.response));
                    break;
                case 401:
                    errorCb(401);
                    break;
                default:
                    break;
            }
        });

        xhr.addEventListener('error', function onError() {});

        xhr.send(JSON.stringify(pet));
    }

    static deletePet(id, successCb, errorCb) {
        let url = `/pets/${id}`;
        let xhr = new XMLHttpRequest();

        xhr.open('DELETE', url);
        xhr.addEventListener('load', function onLoad() {
            switch (xhr.status) {
                case 200:
                    successCb();
                    break;
                case 401:
                    errorCb();
                    break;
                default:
                    break;
            }
        });

        xhr.addEventListener('error', function onError() {});

        xhr.send(JSON.stringify(id));
    }

    static updatePet(pet, id, successCb, errorCb) {
        let url = `/pets/${id}`;
        let xhr = new XMLHttpRequest();

        xhr.open('PUT', url);

        xhr.setRequestHeader('content-type', 'application/json');

        xhr.addEventListener('load', function onLoad() {
            switch (xhr.status) {
                case 200:
                    successCb(JSON.parse(xhr.response));
                    break;
                case 401:
                    errorCb();
                    break;
                default:
                    break;
            }
        });

        xhr.addEventListener('error', function onError() {});

        xhr.send(JSON.stringify(pet));
    }
}
