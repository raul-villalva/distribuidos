
docker pull php:7.4-cli

docker run -it --rm --network=host --name my-running-script -v "$PWD":/usr/src/myapp -w /usr/src/myapp php:7.4-cli php client.php  “Nombre de archivo”

