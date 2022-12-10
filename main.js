const urlCharacter="https://rickandmortyapi.com/api/character";

async function apiCharacters() {
    
    let api = await fetch(urlCharacter);
    let character = await api.json(); //convertir a json para leer datos y await para que resuelva
    let informationCharacter = character.results;

    return informationCharacter; 
}

async function apiShowDetailCharacter(itemId) {

    let id = itemId;
    let api = await fetch(`${urlCharacter}/${id}`);
    let character = await api.json();
   
    console.log('Episodios del personaje', character.episode); 
    console.log('Personaje', character); 
    
    return character;
}

async function showCard() {

    let infoCharacter = await apiCharacters();
    main = document.querySelector('#main');

    infoCharacter.forEach(item => {
        cardItem = document.createElement('div')
        cardItem.innerHTML = ` 
        <div class="card text-dark bg-light mb-3" style="border-radius: 0.5em; cursor:pointer;" 
            onmouseover="transform(this)" onmouseout="normal(this)"
            data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" onclick="showDetailCharacter(${item.id})">
            <div class="card-header text-center"><strong>${item.name}</strong></div>
            <div class="card-body">
                <img src="${item.image}" class="img-fluid" alt="Avatar" style="width: 100%; border-radius: 0.5em;">
            </div>
        </div>
        `
    main.appendChild(cardItem);
    })
}

async function showDetailCharacter(itemId) {

    let infoCharacter = await apiShowDetailCharacter(itemId);
    let totalEpisodes = infoCharacter.episode;
    let totalNameEpisode = [];

    title = document.querySelector('h5');
    title.innerHTML = infoCharacter.name;
    document.getElementById("avatar").src = infoCharacter.image;

    species = document.querySelector('#infoGeneral');
    species.innerHTML = `
        <p>${infoCharacter.status} - ${infoCharacter.species}</p>
        <p><strong> Género:</strong> ${infoCharacter.gender}</p>
        `
    totalEpisodes.forEach(async (item) => {    
        let apiEpisodes = await fetch(`${item}`);
        let data = await apiEpisodes.json();
       
        ol = document.querySelector('ol') 
        totalNameEpisode.push( `<li>
            <a onclick="localStorageId(${data.id})"
                style="text-decoration: underline; color: blue; cursor:pointer;">${data.name}
            </a></li>`
        )
        ol.innerHTML = totalNameEpisode.join('');
    });
    //console.log('Nombre de los episodios', totalNameEpisode)
}

function transform(card) {
    card.style.transform = `scale(1.009)`;
}
  
function normal(card) {
    card.style.transform = "";
}

function localStorageId(item) {
    localStorage.setItem("idUrl",item);
    window.location.href = 'infoEpisode.html';
}


showCard();
