const qrcode = require('qrcode-terminal');
const myLocalIP = require('my-local-ip');
const ip = myLocalIP();

console.log("Honey Maid S'mores Cereal")
qrcode.generate('http://' + ip + ':8080/product.html?id=884912268372', {small: true});

console.log("O's Breakfast Cereal")
qrcode.generate('http://' + ip + ':8080/product.html?id=884912273116', {small: true});

console.log("Chips Ahoy Breakfast Cereal")
qrcode.generate('http://' + ip + ':8080/product.html?id=752798246473', {small: true});

console.log("Tootie Fruities Breakfast Cereal")
qrcode.generate('http://' + ip + ':8080/product.html?id=042400244998', {small: true});

console.log("Fruity Pebbles Cereal")
qrcode.generate('http://' + ip + ':8080/product.html?id=884912129710', {small: true});

console.log("Peanut Butter & Chici Pebbles")
qrcode.generate('http://' + ip + ':8080/product.html?id=884912290090', {small: true});

console.log("Fruit Dyno Bites")
qrcode.generate('http://' + ip + ':8080/product.html?id=884912129320', {small: true});