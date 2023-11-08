const qrcode = require('qrcode-terminal');

const address = 'https://store-demo.endymion.tech';
console.log('address ', address);
console.log("Honey Maid S'mores Cereal")
qrcode.generate(address + '/product.html?id=884912268372', {small: true});

console.log("O's Breakfast Cereal")
qrcode.generate(address + '/product.html?id=884912273116', {small: true});

console.log("Chips Ahoy Breakfast Cereal")
qrcode.generate(address + ':8080/product.html?id=752798246473', {small: true});

console.log("Tootie Fruities Breakfast Cereal")
qrcode.generate(address + '/product.html?id=042400244998', {small: true});

console.log("Fruity Pebbles Cereal")
qrcode.generate(address + '/product.html?id=884912129710', {small: true});

console.log("Peanut Butter & Chici Pebbles")
qrcode.generate(address + '/product.html?id=884912290090', {small: true});

console.log("Fruit Dyno Bites")
qrcode.generate(address + '/product.html?id=884912129320', {small: true});