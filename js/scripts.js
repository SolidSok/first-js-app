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
       let pokemonKeys = ['name', 'height', 'type', 'weaknesses'];
       if ((typeof pokemon === 'object') && (object.keys(pokemon).every((element, i) => element === pokemonKeys[i]))) {
        pokemonList.push(pokemon);
       }
   }

   function getALL() {
       return pokemonList;
   }

   return {
       add: add,
       getALL: getALL
   };
})();

pokemonRepository.getALL().forEach(function (pokemon) {
    if (pokemon.height > 2) {
        document.write('<p>' + pokemon.name + '(height: ' + pokemon.height + ', That\'s pretty big.)</p>'); 
    }else if (pokemon.height < 2) {
        document.write('<p>' + pokemon.name + '(height: ' + pokemon.height + ', That\'s kind of small.)</p>');
    }else{
        document.write('<p>' + pokemon.name + '(height: ' + pokemon.height + ')</p>');
    }
  })()