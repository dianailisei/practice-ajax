let form = document.getElementById('createForm');
form.addEventListener('submit', e => {
    e.preventDefault();
    let payload = {};

    payload.name = document.getElementById('name').value;
    payload.type = document.getElementById('pet-type').value;

    PetsService.createPet(
        payload,
        pet => {
            let container = document.getElementById('petsContainer');
            container.appendChild(createPetCard(pet));
        },
        err => {
            swal({
                title: 'You are not logged in',
                text: 'Log in',
                type: 'warning'
            });
        }
    );

    form.reset();
});
