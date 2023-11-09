const express = require('express');
const axios = require('axios');
const cors = require('cors');
const qrcode = require('qrcode-terminal');
const myLocalIP = require('my-local-ip');
const cookieParser = require('cookie-parser');
const path = require('path');
const uuid = require('uuid');
const port = 8085;
const ip = myLocalIP();
const app = express();
const fs = require('fs');
const baseUrl = 'http://localhost:8085';
console.log(baseUrl);

qrcode.generate('http://localhost:8085/product.html?id=884912268372', {small: true})
// Middleware per il parsing del corpo delle richieste JSON
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public')); // Serve i file statici dalla cartella 'public'

app.get('/main.html', (req, res) => {
  // Genera un UUID per il cliente se non ne esiste già uno
  console.log('chiamato main.html ');
  let clientId = req.cookies.clientId;
  if (!clientId) {
    clientId = uuid.v4();
    res.cookie('clientId', clientId);
  }
  const pagePath = path.join(__dirname, 'public', 'main-component.html');
  console.log(pagePath);
  console.log("clientId: " + clientId),
  res.sendFile(pagePath); // Invia il file index.html quando si visita l'URL principale
});

app.get('/product.html', (req, res) => {
  let id = req.query.id;
  res.cookie('id', id);
  // Genera un UUID per il cliente se non ne esiste già uno
  let clientId = req.cookies.clientId;
  if (!clientId) {
    clientId = uuid.v4();
    res.cookie('clientId', clientId);
  }
  const pagePath = path.join(__dirname, 'public', 'product-component.html');
  console.log(pagePath);
  console.log("clientId: " + clientId),
  console.log("productId: " + id);
  res.sendFile(pagePath); // Invia il file index.html quando si visita l'URL principale
});

app.post('/api/product/add', function(req, res) {
  // Ottieni l'ID dalla query string
  let id = req.body.id;
  console.log("increse product quantity by id: " + id);

  addToCart(id);  

  let product = getProductByBarcode(id);
  let productList = getProductByBarcodeOrListCode(id);
  let productCart = getCartProductByBarcodeOrListCode(id);
  // Rispondi alla richiesta
  let data = {price: product.price, quantity: (productCart.quantity || 0), requisite: productList.quantity || 0};
  res.send(data);
});

app.post('/api/product/remove', function(req, res) {
  // Ottieni l'ID dalla query string
  let id = req.body.id;
  console.log("decrase product quantity by id: " + id);

  removeFromCart(id);
  
  let product = getProductByBarcode(id);
  let productList = getProductByBarcodeOrListCode(id);
  let productCart = getCartProductByBarcodeOrListCode(id);
  // Rispondi alla richiesta
  let data = {price: product.price, quantity: (productCart.quantity || 0), requisite: productList.quantity || 0};
  res.send(data);
});

app.get('/api/product', function(req, res) {
  // Ottieni l'ID dalla query string
  let id = req.query.id;
  console.log("get product by id: " + id);
  // Fai qualcosa con l'ID
  
  let product = getProductByBarcode(id);
  let productList = getProductByBarcodeOrListCode(id);
  let productCart = getCartProductByBarcodeOrListCode(id);
   // Rispondi alla richiesta
  let data = {price: product.price, quantity: (productCart.quantity || 0), requisite: productList.quantity || 0};
  console.log(data);
  res.send(data);

});

app.get('/api/shopping', function(req, res) {
  // Ottieni l'ID dalla query string
  let clientId = req.query.clientId;
  console.log("get shoppinglist by clientId: " + clientId);
  // Fai qualcosa con l'ID
  let productsCart = readJsonFile('Fake-DB/cart.json');
  let shoppingLists = readJsonFile('Fake-DB/shopping-lists.json');
  // Rispondi alla richiesta
  let data = { 
    shoppingList: {products: shoppingLists},
    cart: {products: productsCart}
  };
  res.send(data);
});

app.get('/api/shopping/topay', function(req, res) {
  // Ottieni l'ID dalla query string
  let clientId = req.query.clientId;
  console.log("pay cart by clientId: " + clientId);
  // Fai qualcosa con l'ID
  resetCartByListcode();
  let productsCart = readJsonFile('Fake-DB/cart.json');
  let shoppingLists = readJsonFile('Fake-DB/shopping-lists.json');
  // Rispondi alla richiesta
  let data = { 
    shoppingList: {products: shoppingLists},
    cart: {products: productsCart}
  };
  res.send(data);
});

/* app.post('/api/log/postmessage', function(req, res) {
  // Ottieni l'ID dalla query string
  console.log(req.body);
  res.send({});
}); */

app.listen(port, () => {
  console.log('App listening at http://' + ip + ':' + port);
});

printQrForAllProducts();

// Funzione per leggere i dati JSON
function readJsonFile(filePath) {
  try {
      // Leggi il file come stringa
      const data = fs.readFileSync(filePath, 'utf8');

      // Converte la stringa in un oggetto JSON
      const jsonData = JSON.parse(data);

      return jsonData || [];
  } catch (error) {
      console.error(`Errore durante la consttura del file: ${filePath}`, error);
      return [];
  }
};

function writeJsonFile(filePath, data) {
  try {
      const jsonData = JSON.stringify(data, null, 2);
      fs.writeFileSync(filePath, jsonData);
  } catch (error) {
      console.error(`Errore durante la scrittura del file: ${filePath}`, error);
  }
};

function addToCart(barCode, listCode) {
  const cart = readJsonFile('Fake-DB/cart.json');
  const product = getProductByBarcode(barCode);
  const existingProductIndex = cart.findIndex(item => item.barCode === barCode && item.listCode === (listCode || 'AA01'));

  if (existingProductIndex >= 0) {
      // Il prodotto esiste già nel carrello, quindi aggiorna la quantità e l'expense
      if(cart[existingProductIndex].quantity + 1 <= product.quantityInStock){
        cart[existingProductIndex].quantity += 1;
      }      
      cart[existingProductIndex].expense = product.price * cart[existingProductIndex].quantity;
  } else {
      // Il prodotto non esiste nel carrello, quindi aggiungilo
      const productToadd = {
        "barCode": barCode,
        "name": product.name,
        "listCode": "AA01",
        "unitPrice": product.price,
        "quantity": 1,
        "expense": product.price
      };
      cart.push(productToadd);
  }

  writeJsonFile('Fake-DB/cart.json', cart);
};

function removeFromCart(barCode, listCode) {
  const cart = readJsonFile('Fake-DB/cart.json');
  const existingProductIndex = cart.findIndex(item => item.barCode === barCode && item.listCode === (listCode || 'AA01'));

  if (existingProductIndex >= 0) {
      // Il prodotto esiste nel carrello
      if (cart[existingProductIndex].quantity > 1) {
          // Se la quantità è maggiore di 1, decrementa la quantità e aggiorna l'expense
          cart[existingProductIndex].quantity -= 1;
          cart[existingProductIndex].expense -= cart[existingProductIndex].unitPrice;
      } else {
          // Se la quantità è 1, rimuovi il prodotto dal carrello
          cart.splice(existingProductIndex, 1);
      }

      writeJsonFile('Fake-DB/cart.json', cart);
  } else {
      console.log("Il prodotto non è presente nel carrello.");
  }
};

function resetCartByListcode(listCode){
  const cart = readJsonFile('Fake-DB/cart.json');
  const updatedCart = cart.filter(item => item.listCode !== (listCode || 'AA01'));
  writeJsonFile('Fake-DB/cart.json', updatedCart);
};

function getProductByBarcode(barcode) {
  const data = readJsonFile('Fake-DB/products.json');
  const product = data.find(item => item.barCode === barcode);
  return product || {};
};

function getProductByBarcodeOrListCode(barcode, listCode) {
  const data = readJsonFile('Fake-DB/shopping-lists.json');
  const product = data.find(item => item.barCode === barcode && item.listCode === (listCode || 'AA01'));
  return product || {};
};

function getCartProductByBarcodeOrListCode(barcode, listCode) {
  const data = readJsonFile('Fake-DB/cart.json');
  const product = data.find(item => item.barCode === barcode && item.listCode === (listCode || 'AA01'));
  return product || {};
}

function printQrForAllProducts(){
  const products = readJsonFile('Fake-DB/products.json');
  products.forEach(product => {
    console.log(product.name);
    qrcode.generate('http://localhost:8085/product.html?id=' + product.barCode, {small: true})
  });
}