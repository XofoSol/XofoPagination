XofoPagination
==============

Plugin de paginación de elementos en html, realizado con JQuery.

El uso de este plugin es muy sencillo.  A continuación describiré paso a paso como ponerlo a funcionar:

    Insertar en el area de Scripts (algunos suelen ponerlos en el head de la página, y otros hasta el final del documento) el archivo del framework jQuery (incluyo la versión 1.6.2, pero puedes descargarte la más reciente si lo usarás para otras funcionalidades).

    <script src="jquery-1.6.2.min.js" type="text/javascript"></script>
    Insertar en el area de Scripts el archivo de el plugin "jquery.xofoPaginator.js".

    <script src="jquery.xofoPagination.js" type="text/javascript"></script>
    Dentro del evento document ready (este evento se ejecuta cuando la pagina termina totalmente de cargarse) vincular el plugin a el contenedor de la lista que queremos paginar.  No es necesario que sea una lista ordenada o desordenada, puede ser un listado de divs contenidos en un div padre, o cualquier otro elemento de bloque.  La idea es tener un elemento padre que contenga una serie de elementos hijos.

    <script type="text/javascript">
            $(document).ready(function (){
                $('div#bloqueDiv').xofoPagination({
                    itemsPerPage: 2,
                    firstLabel: 'El Primero',
                    lastLabel: 'El ultimo'
                });
            });
     </script>
    Define los parámetros de tu paginación: itemsPerPage = cuantos elementos quieres por página, firstLabel = frase que te dirigirá a la primera página, lastLabel = frase que te dirigirá a la ultima página.
    ¡Listo! Disfruta tu paginación.  Ah, y recuerda, este sistema es para paginar una cantidad relativamente pequeña de elementos, ya que todos los elementos están cargados en la página y solo los va mostrando conforme los requieras.  Si vas a cargar una cantidad muy grande de elementos (miles de elementos), mejor deberás usar un paginador desde backend, ya que el proceso de cargarlos todos al principio hará que la página tarde mucho en cargar.

Si te queda alguna duda de la funcionalidad, en el archivo zip incluyo un ejemplo de como utilizarlo, igualmente puedes preguntar por medio de los comentarios de esta entrada.  Recuerda que es una primera versión alpha de este plugin, por lo que creo que hay muchas cosas que se le pueden mejorar, cualquier contribución al respecto es bien aceptada.
