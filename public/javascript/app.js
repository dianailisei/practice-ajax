(function initIIFE() {
    let petsContainer = document.getElementById('petsContainer');

    PetsService.getPets(
        resp => {
            resp.forEach(element => {
                petsContainer.appendChild(createPetCard(element));
            });
        },
        err => {
            swal({
                title: 'You are not logged in',
                text: 'Log in',
                type: 'warning'
            });
        }
    );

    petsContainer.addEventListener('click', function onClick(e) {
        if (e.target.tagName === 'BUTTON') {
            switch (e.target.dataset.type) {
                case 'edit':
                    // console.log(e.target);
                    let id = e.target.dataset.id;

                    PetsService.getPet(
                        id,
                        pet => {
                            swal({
                                title: 'Edit pet',
                                html: createPetCard(
                                    {
                                        name: pet.name,
                                        type: pet.type,
                                        created: pet.created
                                    },
                                    true
                                ),
                                confirmButtonText: 'Save',
                                showCancelButton: true,
                                cancelButtonText: 'Cancel',
                                width: '50%'
                            }).then(function(e) {
                                if (e.value === true) {
                                    let newPet = {};
                                    newPet.name = document.querySelector(
                                        ".swal2-modal *[data-type='name']"
                                    ).innerText;
                                    let age = document.querySelector(
                                        ".swal2-modal *[data-type='age']"
                                    ).innerText;
                                    newPet.created = Date.now() - age * 8.64e7;
                                    newPet.type = pet.type;
                                    PetsService.updatePet(
                                        newPet,
                                        id,
                                        resp => {
                                            let card = document.getElementById(
                                                pet.id
                                            );
                                            card.querySelector(
                                                "h1[data-type='name']"
                                            ).innerText = newPet.name;
                                            card.querySelector(
                                                "span[data-type='age']"
                                            ).innerText = getAge(
                                                newPet.created
                                            );
                                        },
                                        err => {
                                            swal({
                                                title: 'You are not logged in',
                                                text: 'Log in',
                                                type: 'warning'
                                            });
                                        }
                                    );
                                }
                            });
                        },
                        err => {
                            swal({
                                title: 'You are not logged in',
                                text: 'Log in',
                                type: 'warning'
                            });
                        }
                    );

                    break;
                case 'delete':
                    PetsService.deletePet(
                        e.target.dataset.id,
                        () => {
                            e.target.parentElement.remove();
                            swal({
                                title: 'Success',
                                text: 'Pet deleted',
                                type: 'success'
                            });
                        },
                        err => {
                            swal({
                                title: 'You are not logged in',
                                text: 'Log in',
                                type: 'warning'
                            });
                        }
                    );
                    break;
                default:
                    break;
            }
        }
    });

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

    let searchForm = document.getElementById('searchForm');
    let timeoutID;

    searchForm.addEventListener('input', e => {
        e.preventDefault();
        clearTimeout(timeoutID);
        timeoutID = setTimeout(function() {
            let searchName = document.getElementById('nameInput').value;
            PetsService.getPets(
                resp => {
                    petsContainer.innerHTML = null;
                    resp.forEach(element => {
                        petsContainer.appendChild(createPetCard(element));
                    });
                },
                err => {
                    swal({
                        title: 'You are not logged in',
                        text: 'Log in',
                        type: 'warning'
                    });
                },
                searchName
            );
        }, 500);
    });

    let loginBtn = document.getElementById('loginBtn');
    loginBtn.addEventListener('click', e => {
        e.preventDefault();
        AuthService.login(
           () => {
                swal({
                    title: 'Success',
                    type: 'success',
                    text: 'You are logged in!'
                });
            },
            () => {
                swal({
                    title: 'Alert',
                    type: 'warning',
                    text: 'There was an error. Please try again!'
                });
            }
        );
    });

    let logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', e => {
        e.preventDefault();
        AuthService.logout(
            () => {
                swal({
                    title: 'Success',
                    type: 'success',
                    text: 'You are logged out!'
                });
            },
            () => {
                swal({
                    title: 'Alert',
                    type: 'warning',
                    text: 'You are already logged out!'
                });
            }
        );
    });
})();
