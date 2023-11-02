window.onload = function () {
  const icona = document.querySelector('.icona');
  const divAScomparsa = document.querySelector('.div-a-scomparsa');
  // Imposta il tab attivo quando viene fatto clic su un elemento della lista
  const tab = document.querySelector('.tab');
  const tabLink = tab.querySelectorAll('li');
  const client = document.querySelector('p.client');
  const tShoppingList = document.querySelector('#lista-della-spesa table');
  const tCart = document.querySelector('#carrello table');


  console.log(document.cookie);
  let clientId = document.cookie.replace(/(?:(?:^|.*;\s*)clientId\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  client.textContent = "clientId: " + clientId;

  axios.get('/api/shopping', {
    params: {
      clientId: clientId
    }
  })
    .then(response => {
      renderTable(response);
      console.debug(response);
    })
    .catch(function (error) {
      console.error(error);
    });

  icona.addEventListener('click', () => {
    divAScomparsa.classList.toggle('attivato');
  });

  tabLink.forEach((t) => {
    t.addEventListener('click', () => {
      // Rimuove la classe "attivo" da tutti i tab
      tabLink.forEach((tabLink) => {
        tabLink.classList.remove('attivo');
      });

      // Aggiunge la classe "attivo" al tab corrente
      t.classList.add('attivo');

      // Mostra il contenuto del tab corrispondente
      const contenuto = document.querySelector('.contenuto');
      const tabID = t.getAttribute('tab-id');
      const contenutoTab = contenuto.querySelector(`div[id="${tabID}"]`);

      contenuto.querySelectorAll('div').forEach((div) => {
        div.classList.remove('attivo');
      });
      contenutoTab.classList.add('attivo');
    });
  });

  function renderTable(response) {
    // Crea un ciclo for per iterare sui dati
    for (const prodotto of response.data.shoppingList.products) {
      // Crea una nuova riga
      let riga = document.createElement('tr');

      // Aggiungi le celle alla riga
      riga.appendChild(document.createElement('td')).textContent = prodotto.name;
      riga.appendChild(document.createElement('td')).textContent = prodotto.quantity;

      // Aggiungi la riga alla tabella
      tShoppingList.appendChild(riga);
    }

    // Crea un ciclo for per iterare sui dati
    for (const prodotto of response.data.cart.products) {
      // Crea una nuova riga
      let riga = document.createElement('tr');

      // Aggiungi le celle alla riga
      riga.appendChild(document.createElement('td')).textContent = prodotto.name;
      riga.appendChild(document.createElement('td')).textContent = prodotto.quantity;
      riga.appendChild(document.createElement('td')).textContent = prodotto.expense;

      // Aggiungi la riga alla tabella
      tCart.appendChild(riga);
    }
  };
};