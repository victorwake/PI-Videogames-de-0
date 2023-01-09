const { Router } = require('express');
const router = Router();
require("dotenv").config();
const  gamesRoutes = require('./gamesRoutes.js');
const  gameRoutes= require('./gameRoutes.js');
const  genresRoutes = require('./genresRoutes.js');



router.use('/games', gamesRoutes);
router.use('/game', gameRoutes)
router.use('/genres', genresRoutes);



module.exports = router;

//*Únicos Endpoints/Flags que pueden utilizar
/*
    GET https://api.rawg.io/api/games
    GET https://api.rawg.io/api/games?search={game}
    GET https://api.rawg.io/api/genres
    GET https://api.rawg.io/api/games/{id}
*/

/*
!IMPORTANTE: No está permitido utilizar los filtrados, ordenamientos y 
¡paginados brindados por la API externa, todas estas funcionalidades 
¡tienen que implementarlas ustedes.

?[ ] GET /videogames:
¡Obtener un listado de los videojuegos
¡Debe devolver solo los datos necesarios para la ruta principal
?[ ] GET /videogames?name="...":
¡Obtener un listado de las primeros 15 videojuegos que contengan la palabra 
¡ingresada como query parameter
¡Si no existe ningún videojuego mostrar un mensaje adecuado
?[ ] GET /videogame/{idVideogame}:
¡Obtener el detalle de un videojuego en particular
¡Debe traer solo los datos pedidos en la ruta de detalle de videojuego
¡Incluir los géneros asociados
?[ ] POST /videogames:
¡Recibe los datos recolectados desde el formulario controlado de la ruta de 
¡creación de videojuego por body
¡Crea un videojuego en la base de datos, relacionado a sus géneros.
?[ ] GET /genres:
¡Obtener todos los tipos de géneros de videojuegos posibles
¡En una primera instancia deberán traerlos desde rawg y guardarlos en su propia 
¡base de datos y luego ya utilizarlos desde allí
*/
