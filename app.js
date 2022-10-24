const urlBase = 'https://rickandmortyapi.com/api/character/';

const loadData = (url,page = 1) => {
    url += `?page=${page}`
 fetch(url)
.then(respuesta => respuesta.json())
.then(respJson => {
    const info = respJson.info;
    const personajes = respJson.results;
    //console.log(info.next);
    //console.log(info.prev);
    // creaButtons();
    if(!info.prev){
        document.querySelector('#prev').classList.add('disabled')
    }else{
         document.querySelector('#prev').classList.remove('disabled')
         document.querySelector('#prev').setAttribute('data-id' , Number(page) - 1)
    }
    if(!info.next){
        document.querySelector('#next').classList.add('disabled')
    }else{
        document.querySelector('#next').classList.remove('disabled')
        document.querySelector('#next').setAttribute('data-id' , Number(page) + 1)
    }
    console.log(personajes);
    showCharacters(personajes);
})

}

const loadCharacterInfo = (url, id) =>{

    let urlCharacter = `${url}${id}`;
    console.log(urlCharacter)
    const modalContent = document.querySelector('.modal-body');
    modalContent.removeChild(modalContent.firstChild);
    modalContent.innerHTML = spinner();
    setTimeout(() => {

        fetch(urlCharacter)
        .then(respuesta => respuesta.json())
        .then(personaje => {
            //TODO: Implmentar modal con info del personaje
            modalContent.removeChild(modalContent.firstChild);
            document.querySelector('.modal-title').innerText = personaje.name;
            modalContent.appendChild(modalBody(personaje));
        });
    }, 1000 );
}

const modalBody = (personaje) => {
    const div = document.createElement('div');
    const origen = personaje.origin.name;
    const location = personaje.location.name;
    const episodes = personaje.episode.length;
    let html = '';
    html += origen === 'unknown'? `<p>Se desconoce su origen</p>`:
                        `<p> Viene de ${origen}</p>`;
    html += `Se encuentra en ${location}`;
    html += `<img src="${personaje.image}" class="">`;
    html += `<p>Aparece en el ${episodes} episodio </p>`;
    div.innerHTML = html;
    return div;

}

const showModal = (e) => {
    e.preventDefault();
    if(e.target.classList.contains('btn')){
        let id = e.target.getAttribute('data-id');
        loadCharacterInfo(urlBase, id);
    }
}

document.querySelector('#respuesta').addEventListener('click', showModal);


const navegacion = (e) => {
     let page = e.target.getAttribute('data-id');
        e.preventDefault();
    if(e.target.classList.contains('btn')){
        let page = e.target.getAttribute('data-id')
       loadData(urlBase, page);
    }
}


loadData(urlBase);

document.querySelector('.botones').addEventListener('click', navegacion);

const showCharacters = (personajes) => {
    const contenedorRespuesta = document.querySelector('#respuesta');
    while(contenedorRespuesta.firstChild){
        contenedorRespuesta.removeChild(contenedorRespuesta.firstChild);
    }
         personajes.forEach(personaje => {
    contenedorRespuesta.appendChild(creaCard(personaje));
})
}

const spinner = () =>{
    const html = 
    `<div class="d-flex align-items-center">
        <strong>Loading...</strong>
        <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
        </div>
    </div>`;
  return html;
}

const creaCard = (personaje) => {
   const card = document.createElement('div');
    const html = `
    <div class="card m-3" style="width: 18rem; float: left;">
    <img loading="lazy" src="${personaje.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${personaje.name}</h5>
      <p class="card-text">${personaje.status}</p>
      <button 
      class="btn btn-primary btn-block"
       data-id="${personaje.id}"
       data-bs-toggle="modal" 
       data-bs-target="#exampleModal">Ver Más</button>
      
    </div>
  </div>`;
  card.innerHTML = html;
  return card;
}