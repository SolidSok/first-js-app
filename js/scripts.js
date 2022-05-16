let pokemonRepository = (function () {
    let pokemonList = [
            {
                name: 'Charmander',
                height: 2,
                type: 'fire',
                weaknesses: ['water', 'ground', 'rock']
            },
            {
                name: 'Butterfree',
                height: 3,
                type: ['bug', 'flying'],
                weaknesses: ['fire', 'flying', 'electric', 'ice', 'rock']
            },
            {
                name: 'Vulpix',
                height: 2,
                type: 'fire',
                weaknesses: ['water', 'ground', 'rock']
            },
            {
                name: 'Meowth',
                height: 1, 
                type: 'normal',
                weaknesses: 'fighting'
            },
            {
                name: 'Ditto',
                height: 1,
                type: 'normal',
                weaknesses: 'fighting'
            },
            {
                name: 'Jolteon',
                height: 2,
                type: 'electric',
                weaknesses: 'ground'
            }
        ];
   function add(pokemon) {
   
       if ((typeof pokemon === 'object') && (object.keys(pokemon).every((element, i) => element === pokemonKeys[i]))) {
        pokemonList.push(pokemon);
       }
   };
   let pokemonKeys = ['name', 'height', 'type', 'weaknesses'];

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
       button.addEventListener('click', function() {
           showDetails(pokemon);
       });
       button.innerText = pokemon.name;
       button.classList.add('button-class');
       listItem.appendChild(button);
       pokemonList.appendChild(listItem);
   }

   return {
       add: add,
       getALL: getALL,
       addListItem: addListItem
   };
})();

pokemonRepository.getALL().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  })()