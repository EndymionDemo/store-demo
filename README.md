
# Store Demo

AR cube (and other object) positionig, painting and animate example using Endymion AR library



## Features

- Render 3D assets with a simple javascript code
- Just add endymion.js library
- and create AR object 


## Getting Started

For run demo you have to perform this step:   

1 - Download with your device (Android) the Endymion Browser apk scanning this qr code and clicking on "Download Beta"        
    (registration is required)   

![Endymion Browser](https://endymion.tech/qr-code-address/endymion.tech_300x300.png)      



2 - Install Docker on your computer, download available here: [Docker Download](https://docs.docker.com/desktop/)

3 - open your computer firewall for 8080 tcp port   
for linux
```bash
    sudo ufw allow 8085
```
for windows using powershell with admin privilege
```powershell
netsh advfirewall firewall add rule name="store-demo" dir=in action=allow protocol=TCP localport=8085
```
    
## Run Locally

Clone the project, go to the project directory, install dependencies and run demo

```bash
git clone https://github.com/EndymionDemo/store-demo.git   
cd cube-demo    
npm install   
npm run start   

```
Ensure that your smartphone and your computer are connected to same wifi/LAN        
And Finally scan QR Code that appear in terminal with Endymion Browser App and visualize assets


To stop demo    

```bash
  npm run stop
```

## Usage/Examples
In public folder there are 10 files        


Lets explore product.html
```html
<!DOCTYPE html>
<html>
  <head>
      <title>Store</title>
      <base href="/">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="transparent" content="true">
      <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
      <script src="endymion.js"></script>
      <script src="product.js"></script>
      <link rel="stylesheet" type="text/css" href="product.css">
</head>
  <body>
    <div class="frame" style="display: none;"></div>
    <div class="product-component">
      <label class="price" data-currency="EUR">0</label>
      <button class="remove">&minus;</button>
      <label class="label-quantity"><span class="quantity">0</span> di <span class="requisite">0</span></label>
      <button class="add">&plus;</button>
    </div>
    <p class="client"></p>
  </body>
</html>
```


## License

[MIT](https://choosealicense.com/licenses/mit/)

