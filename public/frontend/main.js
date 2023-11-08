window.onload = function () {
  const icona = document.querySelector('.icon');
  const divAScomparsa = document.querySelector('.content-disappearance');
  // Imposta il tab attivo quando viene fatto clic su un elemento della lista
  const tab = document.querySelector('.tab');
  const tabLink = tab.querySelectorAll('li');
  const client = document.querySelector('p.client');
  const tShoppingList = document.querySelector('#shopping-list table');
  const tCart = document.querySelector('#cart table');
  const tCartTotalExpsense = tCart.querySelector('tfoot th.total-expense');
  const bToPay = document.querySelector('button.to-pay');
  const baseUrl = window.location.protocol + "//" + window.location.hostname + ':3000';

  console.log(document.cookie);
  let clientId = document.cookie.replace(/(?:(?:^|.*;\s*)clientId\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  client.textContent = "clientId: " + clientId;

  icona.addEventListener('click', () => {
    divAScomparsa.classList.toggle('active');
    if (divAScomparsa.classList.contains('active')) {
      axios({method:'get', url:'/api/shopping', baseURL:baseUrl}, {
        params: {
          clientId: clientId
        }
        })
        .then(response => {
          renderTables(response);
          console.debug(response);
        })
        .catch(function (error) {
          console.error(error);
        }
      );
    }    
  });

  bToPay.addEventListener('click', function() {
    axios({method:'get', url:'/api/shopping/topay', baseURL:baseUrl},{
      params: {
        clientId: clientId
      }
    })
    .then(response => {
      renderTables(response);
      console.debug(response);
    })
    .catch(function (error) {
      console.error(error);
    });
    this.blur();
  });

  tabLink.forEach((t) => {
    t.addEventListener('click', () => {
      // Rimuove la classe "attivo" da tutti i tab
      tabLink.forEach((tabLink) => {
        tabLink.classList.remove('active');
      });

      // Aggiunge la classe "attivo" al tab corrente
      t.classList.add('active');

      // Mostra il contenuto del tab corrispondente
      const contenuto = document.querySelector('.inner-content');
      const tabID = t.getAttribute('tab-id');
      const contenutoTab = contenuto.querySelector(`div[id="${tabID}"]`);

      contenuto.querySelectorAll('div').forEach((div) => {
        div.classList.remove('active');
      });
      contenutoTab.classList.add('active');
    });
  });

  function renderTables(response) {
    // Ottieni i riferimenti ai corpi delle tabelle
    let tShoppingListBody = document.querySelector('#shopping-list table tbody');
    let tCartBody = document.querySelector('#cart table tbody');

    // Prima di tutto, rimuovi tutte le righe esistenti dai corpi delle tabelle
    while (tShoppingListBody.firstChild) {
        tShoppingListBody.removeChild(tShoppingListBody.firstChild);
    }
    while (tCartBody.firstChild) {
        tCartBody.removeChild(tCartBody.firstChild);
    }

    // Crea un ciclo for per iterare sui dati
    for (const prodotto of response.data.shoppingList.products) {
      // Crea una nuova riga
      let riga = document.createElement('tr');

      // Aggiungi le celle alla riga
      riga.appendChild(document.createElement('td')).textContent = prodotto.name;
      riga.appendChild(document.createElement('td')).textContent = prodotto.quantity;

      // Aggiungi la riga alla tabella
      tShoppingListBody.appendChild(riga);
    }

    let totalExpesne = 0;
    // Crea un ciclo for per iterare sui dati
    for (const prodotto of response.data.cart.products) {
      totalExpesne += prodotto.expense;
      // Crea una nuova riga
      let riga = document.createElement('tr');

      // Aggiungi le celle alla riga
      riga.appendChild(document.createElement('td')).textContent = prodotto.name;
      riga.appendChild(document.createElement('td')).textContent = prodotto.quantity;
      riga.appendChild(document.createElement('td')).textContent = toCurrency(prodotto.expense);

      // Aggiungi la riga alla tabella
      tCartBody.appendChild(riga);
    }
    tCartTotalExpsense.textContent = toCurrency(totalExpesne);
    bToPay.setAttribute('disabled', '');
    if(totalExpesne){
      bToPay.removeAttribute('disabled')
    }
  };

  function toCurrency(value){
    if(value === undefined) return "";
    return (Math.round(value * 100) / 100 || 0).toString().replace('.', ',') + " €";
  };
};