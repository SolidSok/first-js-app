let pokemonlist = [
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

for (let i=0; i < pokemonlist.length; i++) {
    if (pokemonlist[i].height > 2) {
        document.write(`<b><u>${pokemonlist[i].name}</b></u> height: ${pokemonlist[i].height} -That's larger than normal. <br>`) ;
    } else if (pokemonlist[i].height < 2) {
        document.write(`<b><u>${pokemonlist[i].name}</b></u> height: ${pokemonlist[i].height} -That's pretty small. <br> `);
    } else {
        document.write(`<b><u>${pokemonlist[i].name}</b></u> <br>`)
    }
}