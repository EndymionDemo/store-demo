const express = require('express');
const axios = require('axios');
const qrcode = require('qrcode-terminal');
const myLocalIP = require('my-local-ip');
const cookieParser = require('cookie-parser');
const path = require('path');
const uuid = require('uuid');
const port = 8080;
const ip = myLocalIP();
const app = express();
console.log(ip);

qrcode.generate('https://smpt-agriverse.eu.ngrok.io/product.html?id=884912268372', {small: true})

app.use(cookieParser());
app.use(express.static('public')); // Serve i file statici dalla cartella 'public'

app.get('/main.html', (req, res) => {
  // Genera un UUID per il cliente se non ne esiste già uno
  let clientId = req.cookies.clientId;
  if (!clientId) {
    clientId = uuid.v4();
    res.cookie('clientId', clientId);
  }
  let pagePath = path.join(__dirname, 'public', 'main-component.html');
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
  let pagePath = path.join(__dirname, 'public', 'product-component.html');
  console.log(pagePath);
  console.log("clientId: " + clientId),
  console.log("productId: " + id);
  res.sendFile(pagePath); // Invia il file index.html quando si visita l'URL principale
});

let quantity = 0;

app.post('/api/product/add', function(req, res) {
  // Ottieni l'ID dalla query string
  let id = req.query.id;
  console.log("increse product quantity by id: " + id);
  // Fai qualcosa con l'ID
  // ...

  // Rispondi alla richiesta
  quantity++;
  var data = {price: '4,99 €', quantity: quantity, requisite: 2};
  res.send(data);
});

app.post('/api/product/remove', function(req, res) {
  // Ottieni l'ID dalla query string
  let id = req.query.id;
  console.log("decrase product quantity by id: " + id);
  // Fai qualcosa con l'ID
  // ...

  // Rispondi alla richiesta
  if(quantity > 0) quantity--;
  var data = {price: '4,99 €', quantity: quantity, requisite: 2};
  res.send(data);
});

app.get('/api/product', function(req, res) {
  // Ottieni l'ID dalla query string
  let id = req.query.id;
  console.log("get product by id: " + id);
  // Fai qualcosa con l'ID
  // ...

  // Rispondi alla richiesta
  quantity = 0;
  var data = {price: '4,99 €', quantity: quantity, requisite: 2};
  res.send(data);
});

app.get('/api/shopping', function(req, res) {
  // Ottieni l'ID dalla query string
  let clientId = req.query.clientId;
  console.log("get shoppinglist by clientId: " + clientId);
  // Fai qualcosa con l'ID
  // ...

  // Rispondi alla richiesta
  var data = {};
  res.send(data);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});