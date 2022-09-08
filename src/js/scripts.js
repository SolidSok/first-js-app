let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let input = $('input');
  input.on('input', pokeSearch);

  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log('pokemon is not correct');
    }
  }

  function getALL() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    listItem.classList.add('group-list-item', 'col-md-6', 'col-lg-4');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class', 'btn', 'btn-primary');
    button.classList.add('btn-block', 'btn-outline-primary', 'm-1');
    button.classList.add('bg-primary', 'text-capitalize', 'pokemon-search');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '.modal');

    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    clickEvent(button, pokemon);
  }

  function clickEvent(button, pokemon) {
    button.addEventListener('click', event => showDetails(pokemon));
  }

  // add loading message bonus task later
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrlFront = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
        item.height = details.height;
        item.types = details.types;
        item.weight = details.weight;
        item.abilities = details.abilities;

        let types = [];
        details.types.forEach(pokemon => types.push(pokemon.type.name));
        item.types = types;
        let abilities = [];
        details.abilities.forEach(pokemon =>
          abilities.push(pokemon.ability.name)
        );
        item.abilities = abilities;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // details won't show without this
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  function showModal(pokemon) {
    // modal variables
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    // clear existing modal content to avoid overlap
    modalTitle.empty();
    modalBody.empty();

    // creating pokemon elements
    let nameElement = $(`<h1>${pokemon.name}</h1>`);

    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr('src', pokemon.imageUrlFront);

    let imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr('src', pokemon.imageUrlBack);

    let heightElement = $(`<p>Height: ${pokemon.height} dm</p>`);

    let weightElement = $(`<p>Weight: ${pokemon.weight} hg</p>`);

    let typesElement = $(`<p> Types: ${pokemon.types.join(', ')}  </p>`);

    let abilitiesElement = $(
      `<p> Abilities: ${pokemon.abilities.join(', ')}  </p>`
    );

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }

  function pokeSearch() {
    let search = $('input').val();
    let pokelist = $('li');
    pokelist.each(function () {
      let item = $(this);
      let name = item.text();
      if (name.includes(search)) {
        item.show();
      } else {
        item.hide();
      }
    });
  }

  return {
    add: add,
    getALL: getALL,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getALL().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
