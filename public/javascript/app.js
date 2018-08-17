(function initIIFE() {
    let petsContainer = document.getElementById('petsContainer');

    petsContainer.addEventListener('click', function onClick(e) {
        if (e.target.tagName === 'BUTTON') {
            switch (e.target.dataset.type) {
                case 'edit':
                    swal({
                        title: 'Edit pet',
                        html: createPetCard(
                            {
                                name: 'Bob',
                                type: 'cat',
                                created: Date.now(),
                            },
                            true
                        ),
                        confirmButtonText: 'Save',
                        showCancelButton: true,
                        cancelButtonText: 'Cancel',
                        width: '50%'
                    }, updatePet(e.target.dataset.id));
                    break;
                case 'delete':
                    swal({
                        title: "Are you sure?",
                        text: "Your will not be able to recover this pet!",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonClass: "btn-danger",
                        confirmButtonText: "Yes, delete it!"
                    },
                    
                    deletePet(e.target.dataset.id)
                    );
                    break;
                default:
                    break;
            }
        }
    });

    petsContainer.appendChild(
        createPetCard({
            name: 'Dummy 1',
            type: 'cat',
            created: Date.now()
        })
    );
    petsContainer.appendChild(
        createPetCard({
            name: 'Dummy 2',
            type: 'dog',
            created: Date.now()
        })
    );
})();
