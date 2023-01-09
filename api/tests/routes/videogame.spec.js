/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
  id: 120,
  name: 'Super Mario Bros',
};

describe('Videogame routes', () => {
//   before(() => conn.authenticate()
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   }));
//   beforeEach(() => Videogame.sync({ force: true })
//     .then(() => Videogame.create(videogame)));
//   describe('GET /games', () => {
//     it('should get 200', () =>
//       agent.get('/games').expect(200)
//     );
//   });
// });

describe('Get Games:', function() {
  it('GET respons with status 200', function(){
    return agent
      .get('/games')
      .expect(function(res){
        expect(res.status).equal(200)})
  }).timeout(10000)

  it('Elements received are Object type',  function() {
    return agent 
      .get('/games') 
      .expect(function(res) {
        expect(typeof res.body[0]).equal('object'); 
      });
  }).timeout(10000)
  })
  
  describe('Search by Query:', function() {
  it('GET receives a body lenght larger if there is query coincidences',  function() {
    return agent 
      .get('/games?name=hitman') 
      .expect(function(res) {
        expect(res.body.length); 
      });
  }).timeout(6000)
  })
  
  describe('Search by ID:', function() {
    it('GET responses with status 200 if a dog is found',  function() {
      return agent 
        .get('/game/3498') 
        .expect(function(res){
          expect(res.status).equal(200)}); 
        }).timeout(10000);
    
    })
  })
  

