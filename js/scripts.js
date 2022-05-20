let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    // Something in this code messed up, using repl's version until I have figured it out
    // function add(pokemon) {
    //    if ((typeof pokemon === 'object') && (object.keys(pokemon).every((element, i) => element === pokemonKeys[i]))) {
    //     pokemonList.push(pokemon);
    //    } else {
    //        console.log('pokemon is not correct')
    //    }
    // };
    // let pokemonKeys = ['name'];

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

    function showDetails(pokemon) {
       console.log(pokemon.name)
    }
    
// Create seperate function for addEventListner outside of addListItem later
    function addListItem(pokemon) {
       let pokemonList = document.querySelector('.pokemon-list');
       let listItem = document.createElement('li');
       let button = document.createElement('button');
       button.addEventListener('click', function(event) {
           showDetails(pokemon);
       });
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
            // we add details to the item here
            item.imageUrl = details.sprites.front_default;
            item.height = details. height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    // details won't show without this
    function showDetails(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function () {
            console.log(pokemon);
        })
    };

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