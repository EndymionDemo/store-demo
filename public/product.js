window.onload = function() {
    const priceLabel = document.querySelector('.price');
    const quantityValueLabel = document.querySelector('.label-quantity');
    const quantityLabel = document.querySelector('.label-quantity span.quantity');
    const requisiteLabel = document.querySelector('.label-quantity span.requisite');
    const addButton = document.querySelector('button.add');
    const removeButton = document.querySelector('button.remove');
    const frame = document.querySelector('div.frame');
    const client = document.querySelector('p.client');

    console.log(document.cookie);
    const id = sessionStorage.getItem('id');
    const clientId = document.cookie.replace(/(?:(?:^|.*;\s*)clientId\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    client.textContent = "clientId: " + clientId;

    /* window.addEventListener('message', function(event) {
        if (event.data === 'show') {
            // Esegui il tuo codice qui
        }
        console.log(event);
        axios.post('/api/log/postmessage', event)
        .then(response => {
            console.log(response);
        })
        .catch(function (error) {
            console.error(error);
        });
    }); */
  
    // Carica il prezzo e la quantità iniziali
    axios.get('/api/product', {
        params: {
          id: id,
          clientId: clientId
        }
    })
    .then(response => {
        priceLabel.textContent = toCurrency(response.data.price);
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
            id: id,
            clientId: clientId
        })
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
        axios.post('/api/product/remove',{
            id: id,
            clientId: clientId
        })
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
        let frameObj;
        if(response.data.quantity != response.data.requisite && response.data.requisite == 0 && response.data.quantity == 0){
            quantityValueLabel.classList.remove("red");
            quantityValueLabel.classList.remove("green")
           
            frame.classList.remove('red');
            frame.classList.remove('green');

            if(frameObj && frameObj.objectId){
                endymion.core.destroyObject(frameObj.objectId);
            }
            
            //endymion.with(framered).setScale({x:0, y:0, z:0}).apply(); 
            //endymion.with(framegreen).setScale({x:0, y:0, z:0}).apply(); 

            console.debug('neutral');
        }
        else if(response.data.quantity != response.data.requisite){
            quantityValueLabel.classList.remove("green")
            quantityValueLabel.classList.add("red")

            frame.classList.remove('green');
            frame.classList.add('red');

           /*  endymion.with(framegldf)
            .setColor(rgba(192, 0, 0, 0.3))
            .apply(); */
            if(frameObj && frameObj.objectId){
                endymion.core.destroyObject(frameObj.objectId);
            }
            //endymion.with(framegreen).setScale({x:0, y:0, z:0}).apply(); 
            frameObj = getFrameRed();
            //endymion.with(framered).setScale({x:0.5, y:0.05, z:0.5}).apply(); 

            console.debug('red');
        }
        else if(response.data.quantity == response.data.requisite){
            quantityValueLabel.classList.remove("red")
            quantityValueLabel.classList.add("green")

            frame.classList.remove('red');
            frame.classList.add('green');

            /* endymion.with(framegldf)
            .setColor(rgba(0, 176, 80, 0.3))
            .apply(); */

            if(frameObj && frameObj.objectId){
                endymion.core.destroyObject(frameObj.objectId);
            }
            //endymion.with(framered).setScale({x:0, y:0, z:0}).apply(); 
            frameObj = getFrameGreen();
            //endymion.with(framegreen).setScale({x:0.5, y:0.05, z:0.5}).apply(); 

            console.debug('green');
        }
    };

    function addActiveClass() {
        // Aggiungi la classe 'active'
        this.classList.add('active');
    };
    
    function removeActiveClass() {
    // Rimuovi la classe 'active'
    this.classList.remove('active');
    };

    function toCurrency(value){
        if(value === undefined) return "";
        return (Math.round(value * 100) / 100).toString().replace('.', ',') + " €";
    };

    /* const framegldf = endymion.quad()
        .setScale({x:-2.5, y:-2.5, z:-2.5})
        .setPosY(2.0)
        .render(); */
      
    /* const framegreen = endymion.loadAsset('assets/framegreen.glb')
        .setScale({x:0, y:0, z:0})
        .setPosition({ x: 0, y: 2.3, z: 0 })
        .setRotation({ x: 0, y:90, z: 90 })
        //.setPosY(2.0)
        .render();

    const framered = endymion.loadAsset('assets/framered.glb')
        .setScale({x:0, y:0, z:0})
        .setPosition({ x: 0, y: 2.3, z: 0 })
        .setRotation({ x: 0, y:90, z: 90 })
        //.setPosY(2.0)
        .render();
 */
    function getFrameRed(){
        return endymion.loadAsset('assets/framered.glb')
        //.setScale({x:0, y:0, z:0})
        .setScale({x:0.5, y:0.05, z:0.5})
        .setPosition({ x: 0, y: 2.3, z: 0 })
        .setRotation({ x: 0, y:90, z: 90 })
        //.setPosY(2.0)
        .render();
    };

    function getFrameGreen(){
        return endymion.loadAsset('assets/framegreen.glb')
        //.setScale({x:0, y:0, z:0})
        .setScale({x:0.5, y:0.05, z:0.5})
        .setPosition({ x: 0, y: 2.3, z: 0 })
        .setRotation({ x: 0, y:90, z: 90 })
        //.setPosY(2.0)
        .render();
    }
};