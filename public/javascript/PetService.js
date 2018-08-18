class PetsService {
    static getPets(successCb, errorCb, name) {
        let url = '/pets/';
        if (name !== undefined) {
            url = `/pets/?name=${name}`;
        }
        HTTP.request('GET', url, {}, successCb, errorCb);
    }

    static getPet(id, successCb, errorCb) {
        HTTP.request('GET', `/pets/${id}`, null, successCb, errorCb);
    }

    static createPet(pet, successCb, errorCb) {
        HTTP.request(
            'POST',
            '/pets',
            {
                'content-type': 'application/json',
                token: localStorage.getItem('token')
            },
            successCb,
            errorCb,
            pet
        );
    }

    static deletePet(id, successCb, errorCb) {
        HTTP.request(
            'DELETE',
            `/pets/${id}`,
            { token: localStorage.getItem('token') },
            successCb,
            errorCb
        );
    }

    static updatePet(pet, id, successCb, errorCb) {
        HTTP.request(
            'PUT',
            `/pets/${id}`,
            {
                'content-type': 'application/json',
                token: localStorage.getItem('token')
            },
            successCb,
            errorCb,
            pet
        );
    }
}
