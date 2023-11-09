# Usa l'immagine ufficiale Node.js per la versione 14
FROM node:14

# Crea una directory per l'app nel contenitore
WORKDIR /usr/src/app

# Copia il file package.json e package-lock.json (se disponibile)
COPY package*.json ./

# Installa le dipendenze del progetto
RUN npm install

# Copia il resto del codice dell'app nel contenitore
COPY . .

# Esporta la porta che la tua app usa (ad esempio, 3000)
EXPOSE 8080

# Esegue il comando `node server.js` quando il contenitore viene avviato
CMD [ "node", "server.js" ]