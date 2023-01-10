//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
// const { getApiGenres } = require('./src/controllers/genresControllers');
// const { getApiPlatforms } = require('./src/controllers/platformsControllers');

// LEER!!!!! --> una vez que se cargaron los datos en la db hacer lo siguiente:
// 1- desactivar el Auto Save del visual (si es que lo tenes activo)
// 2- comentar la función getApiGenres() linea 22 y  linea 32
// 3- poner el force en false
// 4- volver a activar el Auto Save si lo usas o guardar
conn.sync({ force: false }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
    //getApiGenres()
    //getApiPlatforms()
  });
});
