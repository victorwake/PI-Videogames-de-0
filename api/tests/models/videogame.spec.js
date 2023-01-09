const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Videogame model:', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Name Validator:', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Videogame.create({ name: 'Super Mario Bros' });
      });
    });
  });
});


 // Testing:
 
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


 // Testing:
 
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



