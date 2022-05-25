let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        if (
          typeof pokemon === "object" &&
          "name" in pokemon
        ) {
          pokemonList.push(pokemon);
        } else {
          console.log("pokemon is not correct");
        }
      }

    function getALL() {
       return pokemonList;
    };

// Create seperate function for addEventListner outside of addListItem later
    function addListItem(pokemon) {
       let pokemonList = document.querySelector('.pokemon-list');
       let listItem = document.createElement('li');
       let button = document.createElement('button');
       button.addEventListener('click', (event) => showDetails(pokemon));
       button.innerText = pokemon.name;
       button.classList.add('button-class');
       listItem.appendChild(button);
       pokemonList.appendChild(listItem);
    }

    // add loading message bonus task later
    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    // details won't show without this
    function showDetails(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function () {
            showModal(pokemon);
        })
    };




    function showModal(pokemon) {
        let modalContainer = document.querySelector('#modal-container');

        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');

        
        //Close button to exit modal
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'close';
        closeButtonElement.addEventListener('click', hideModal);

        //Escape key to exit modal
        window.addEventListener('keydown', (e) => {
            let modalContainer = document.querySelector('#modal-container');
            if (e.key === 'Escape' && modalContainer.classList.containers('is-visible')) {
                hideModal();
            }
        });

        //Click outside modal to close
        modalContainer.addEventListener('click', (e) => {
            let target = e.target;
            if (target === modalContainer) {
                hideModal();
            }
        });

        //name
        let titleElement = document.createElement('h1');
        titleElement.innerText = pokemon.name;

        //picture
        let imgElement = document.createElement('img');
        imgElement.src = pokemon.imageUrl;
        imgElement.classList.add('modal-image');
        
        //details
        let contentElement = document.createElement('p');
        contentElement.innerText = `Height: ${pokemon.height}`;



        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(imgElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
    }

    function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    }

    // document.querySelector('#show-modal').addEventListener('click', () => {
    //     showModal('This is my title', 'You can escape now!');
    // });



    return {
        add: add,
        getALL: getALL,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getALL().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});