const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Videogame model:', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));


    /*
    Este test está verificando la validación de nombres en un modelo de juego.
    crea una instancia de un juego de video con un nombre específico y 
    comprueva si se lanza un error si el nombre es nulo o si funciona 
    correctamente si el nombre es válido. El método beforeEach se 
    utiliza para sincronizar y vaciar la tabla de juegos de video 
    antes de cada prueba.
    */
  describe('Name Validator:', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Videogame.create({ name: 'victor' });
      });
    });
  });
});


 // Testing:

/*
Este test está verificando la validación de descripción en un modelo de juego 
de video. Utiliza la librería de pruebas "Jest" y el ORM Sequelize para 
crear una instancia de un juego de video con una descripción específica 
y comprobar si se lanza un error si la descripción es nula o si 
funciona correctamente si la descripción es válida. El método 
beforeEach se utiliza para sincronizar y vaciar la tabla de 
juegos de video antes de cada prueba.
 */
  describe('Description Validator:', () => {
  beforeEach(() => Videogame.sync({ force: true }));
  describe('description', () => {
    it('should throw an error if description is null', (done) => {
      Videogame.create({})
        .then(() => done(new Error('It requires a valid description')))
        .catch(() => done());
    });
    it('should work when its a valid description', () => {
      Videogame.create({ description: 'Some day i will go to the moon...' });
    });
  });
});




