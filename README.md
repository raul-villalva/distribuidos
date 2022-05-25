
#Bajamos la imagen

docker pull node:16.13.1-alpine

#Luego con este comando podemos arrancar el servidor, $PWD seria donde esta el codigo fuente.

 docker run -it --rm --name rest  -p 3000:3000 -v "$PWD":/usr/src/app -w /usr/src/app node:16.13.1-alpine node app.js  
