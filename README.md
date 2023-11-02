
# Cube Demo 2

AR cube (and other object) positionig, painting and animate example using Endymion AR library



## Features

- Render 3D assets with a simple javascript code
- Just add endymion.js library
- and create AR object 


## Getting Started

For run demo you have to perform this step:   

1 - Download with your device (Android) the Endymion Browser apk scanning this qr code and clicking on "Download Beta"        
    (registration is required)   

![Endymion Browser](https://endymion.tech/endymion-address-qrcode-300x300.png)      



2 - Install Docker on your computer, download available here: [Docker Download](https://docs.docker.com/desktop/)

3 - open your computer firewall for 8080 tcp port   
for linux
```bash
    sudo ufw allow 8080
```
for windows using powershell with admin privilege
```powershell
netsh advfirewall firewall add rule name="store-demo" dir=in action=allow protocol=TCP localport=8080
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


Lets explore index.html
```html

```


## License

[MIT](https://choosealicense.com/licenses/mit/)

