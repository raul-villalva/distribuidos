# mutant

Para hacer funcionar el proyecto, primero tendriamos que tener instalado npm, node, git y mongodb previamente

1) Clonar el proyecto #git clone git@github.com:raul-villalva/mutant.git
2) Abrimos el directorio #cd mutant
3) Ascribimos en la consola #npm install 
4) Arrancamos el servicio #node bin/www

El proyecto tiene dos servicios

/mutant , que recibe un array del tipo json de string por el metodo POST
/stats, que por el metodo GET manda las estadisticas.


#Code Covered

1) para arrancar los test simplemente hay que correr el comando #npm run test-case
El mismo corre con istanbul que a la vez este usa jasmine.
# rest
