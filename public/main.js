window.onload = function() {
    const icona = document.querySelector('.icona');
    const divAScomparsa = document.querySelector('.div-a-scomparsa');
    // Imposta il tab attivo quando viene fatto clic su un elemento della lista
    const tab = document.querySelector('.tab');
    const tabLink = tab.querySelectorAll('button');
    const client = document.querySelector('p.client');


    console.log(document.cookie);
    let clientId = document.cookie.replace(/(?:(?:^|.*;\s*)clientId\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    client.textContent = "clientId: " + clientId;

    axios.get('/api/shopping', {
        params: {
          clientId: clientId
        }
    })
    .then(response => {
        console.debug(response);
    })
    .catch(function (error) {
        console.error(error);
    });

    icona.addEventListener('click', () => {
        divAScomparsa.classList.toggle('attivato');
    });

    tabLink.forEach((tabLink) => {
        tabLink.addEventListener('click', () => {
          // Rimuove la classe "attivo" da tutti i tab
          tabLink.forEach((tabLink) => {
            tabLink.classList.remove('attivo');
          });
      
          // Aggiunge la classe "attivo" al tab corrente
          tabLink.classList.add('attivo');
      
          // Mostra il contenuto del tab corrispondente
          const contenuto = document.querySelector('.contenuto');
          const tabID = tabLink.getAttribute('tab-id');
          const contenutoTab = contenuto.querySelector(`div[id="${tabID}"]`);
      
          contenuto.querySelectorAll('div').forEach((div) => {
            div.classList.remove('attivo');
          });
          contenutoTab.classList.add('attivo');
        });
    });
};