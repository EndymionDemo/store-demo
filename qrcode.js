const qrcode = require('qrcode-terminal');
const myLocalIP = require('my-local-ip');
const ip = myLocalIP();
const fs = require('fs');

function invertQRCode(qrcode) {
    // Crea un array di caratteri da cui partire
    let arr = qrcode.split("");
  
    // Sostituisci i caratteri nell'array
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === " " && arr[i] !== "\u001b[47m  \u001b[0m") {
        arr[i] = "\u001b[47m  \u001b[0m";
      } else if (arr[i] === "\u001b[47m  \u001b[0m") {
        arr[i] = " ";
      }
    }
  
    // Riunisci l'array in una stringa
    return arr.join("");
  }

qrcode.generate('https://smpt-agriverse.eu.ngrok.io/product.html?id=884912268372', {small: true}, function(qr){
    console.log(qr);
     
    // Inverti i colori
    let invertedQRCode = invertQRCode(qr);
    
    fs.writeFile('qr.txt', invertedQRCode, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });

})

//qrcode.generate('https://smpt-agriverse.eu.ngrok.io/main.html', {small: true});