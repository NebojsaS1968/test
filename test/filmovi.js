const chai = require('chai')
const chaiHttp = require('chai-http')

const Film = require('../models/film')
const index = require('../server');
const conn = require('../db/mongoose')

chai.should();
chai.use(chaiHttp)

/**
 * GET REQUESTS
 */
describe('GET /api/v1/filmovi', () =>{

      //GET all films
      it('Should get all films', (done) =>{
        chai.request(index)
        .get('/api/v1/filmovi')
        .end((err, res) => {
          res.should.have.status(200)
          res.should.be.json
          res.body.should.be.a('object') //  ||  res.should.be.a('object')
          done();
        });
      })

      //GET film by ID
      it('Should get film by ID, /api/v1/filmovi/:id', (done) =>{
        const id = '5ea543a80419b21b28a884b9'
        chai.request(index)
        .get('/api/v1/filmovi/' + id)
        .end((err, res) => {
          //console.log(res.body);
          res.should.have.status(200)
          res.should.be.json
          res.body.should.be.a('object') //  ||  res.should.be.a('object')
          res.body.film.should.have.property('title')
          res.body.film.should.have.property('year')
          res.body.film.should.have.property('rating')
          res.body.film.should.have.property('plot')
          done();
        });
      })

      //GET film by title
      it('Should get film by title, /api/v1/filmovi/search/:title', (done) =>{
        const title = 'clock'
        chai.request(index)
        .get('/api/v1/filmovi/search/' + title)
        .end((err, res) => {
          //console.log(res.body);
          res.should.have.status(200)
          res.should.be.json
          res.body.should.be.a('object') //  ||  res.should.be.a('object')
          res.body.film[0].should.have.property('title')
          res.body.film[0].should.have.property('rating')
          res.body.film[0].should.have.property('plot')
          res.body.film[0].should.have.property('year').eq(1971)
          done();
        });
      })
})

/** Film IDs
 5ea543a80419b21b28a884b9
 5ea544260419b21b28a884ba
 */

/**
 * POST REQUESTS
 */
 describe('POST api/v1/filmovi', () => {

      // after goes at the last describe
      after((done) => {
        conn.close()
        .then(() => done())
        .catch((err) => done(err))
      })

      it('Should post film on /api/v1/filmovi', (done) =>{
        const newMovie = {
          title: "Deer Hunter",
          rating: 100,
          year: 1978,
          runtime: 181,
          director: "Michael Cimino",
          plot: "Vietnam War"
        }
        chai.request(index)
          .post('/api/v1/filmovi')
          .send(newMovie)
          .end((err, res) => {
            res.should.have.status(201)
            res.should.be.json
            res.body.newFilm.should.be.a('object') //  ||  res.should.be.a('object')
            res.body.newFilm.should.have.property('title').eq('Deer Hunter')
            res.body.newFilm.should.have.property('rating').eq(100)
            res.body.newFilm.should.have.property('plot').eq('Vietnam War')
            res.body.newFilm.should.have.property('year').eq(1978)
            done();
          });
      })

 })