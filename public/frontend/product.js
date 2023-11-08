window.onload = function() {
    const priceLabel = document.querySelector('.price');
    const quantityValueLabel = document.querySelector('.label-quantity');
    const quantityLabel = document.querySelector('.label-quantity span.quantity');
    const requisiteLabel = document.querySelector('.label-quantity span.requisite');
    const addButton = document.querySelector('button.add');
    const removeButton = document.querySelector('button.remove');
    const frame = document.querySelector('div.frame');
    const client = document.querySelector('p.client');
    const baseUrl = window.location.protocol + "//" + window.location.hostname + ':3000';
    console.log(baseUrl);

    console.log(document.cookie);
    let id = document.cookie.replace(/(?:(?:^|.*;\s*)id\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    let clientId = document.cookie.replace(/(?:(?:^|.*;\s*)clientId\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    client.textContent = "clientId: " + clientId;
  
    // Carica il prezzo e la quantità iniziali
    axios({ method:'get', url:'/api/product', baseURL:baseUrl}, {
        params: {
          id: id,
          clientId: clientId
        }
    })
    .then(response => {
        priceLabel.textContent = response.data.price;
        quantityLabel.textContent = response.data.quantity;
        requisiteLabel.textContent = response.data.requisite;
        rednerLabelquantity(response);
    })
    .catch(function (error) {
        var div  = document.createElement('div');
        div.innerHTML = '<p>' + JSON.stringify(error) + '</p>';
        document.body.appendChild(div);
        console.error(error);
    });
  
    // Aggiunge un evento click al pulsante 'add'
    addButton.addEventListener('click', function() {
        axios.post('/api/product/add', {
            params: {
                id: id,
                clientId: clientId
            }}
        )
        .then(response => {
            quantityLabel.textContent = response.data.quantity;
            rednerLabelquantity(response);
            addButton
        })
        .catch(function (error) {
            console.error(error);
        });
        this.blur();
    });
  
    // Aggiunge un evento click al pulsante 'remove'
    removeButton.addEventListener('click', function() {
        axios.post('/api/product/remove', {
            params: {
            id: id,
            clientId: clientId
            }}
        )
        .then(response => {
            quantityLabel.textContent = response.data.quantity;
            rednerLabelquantity(response);
        })
        .catch(function (error) {
            console.error(error);
        });
        this.blur();
    });

    // Aggiungi un gestore di eventi 'mousedown' e 'touchstart' al pulsante
    removeButton.addEventListener('mousedown', addActiveClass);
    removeButton.addEventListener('touchstart', addActiveClass);

    // Aggiungi un gestore di eventi 'mouseup', 'mouseout' e 'touchend' al pulsante
    removeButton.addEventListener('mouseup', removeActiveClass);
    removeButton.addEventListener('mouseout', removeActiveClass);
    removeButton.addEventListener('touchend', removeActiveClass);

    // Aggiungi un gestore di eventi 'mousedown' e 'touchstart' al pulsante
    addButton.addEventListener('mousedown', addActiveClass);
    addButton.addEventListener('touchstart', addActiveClass);

    // Aggiungi un gestore di eventi 'mouseup', 'mouseout' e 'touchend' al pulsante
    addButton.addEventListener('mouseup', removeActiveClass);
    addButton.addEventListener('mouseout', removeActiveClass);
    addButton.addEventListener('touchend', removeActiveClass);

    function rednerLabelquantity(response){
        if(response.data.quantity != response.data.requisite && response.data.requisite == 0 && response.data.quantity == 0){
            quantityValueLabel.classList.remove("red");
            quantityValueLabel.classList.remove("green")
           
            frame.classList.remove('red');
            frame.classList.remove('green');

            console.debug('neutral');
        }
        else if(response.data.quantity != response.data.requisite){
            quantityValueLabel.classList.remove("green")
            quantityValueLabel.classList.add("red")

            frame.classList.remove('green');
            frame.classList.add('red');

            console.debug('error');
        }
        else if(response.data.quantity == response.data.requisite){
            quantityValueLabel.classList.remove("red")
            quantityValueLabel.classList.add("green")

            frame.classList.remove('red');
            frame.classList.add('green');

            console.debug('valid');
        }
    };

    function addActiveClass() {
        // Aggiungi la classe 'active'
        this.classList.add('active');
      }
      
      function removeActiveClass() {
        // Rimuovi la classe 'active'
        this.classList.remove('active');
      }
  };