async function apiRyM() {
    let url="https://rickandmortyapi.com/api/character";
    const api = await fetch(url);
    const data = await api.json(); //convertir a json para leer datos y await para que resuelva
    console.log(data.results);
    
    main = document.querySelector('#main');
    data.results.forEach(item => {
        cardItem = document.createElement('div')
        cardItem.innerHTML = ` 
        <div class="card text-dark bg-light mb-3" style="border-radius: 0.5em; cursor:pointer;" onmouseover="transform(this)" onmouseout="normal(this)">
            <div class="card-header text-center"><strong>${item.name}</strong></div>
            <div class="card-body">
                <img src="${item.image}" class="img-fluid" alt="Avatar" style="width: 100%; border-radius: 0.5em;">
            </div>
        </div>
        `
        main.appendChild(cardItem);
    })
}

apiRyM();

function transform(card) {
    card.style.transform = `scale(1.009)`;
}
  
function normal(card) {
    card.style.transform = "";
}