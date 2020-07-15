const chai = require('chai')
const chaiHttp = require('chai-http')

const index = require('../server');
const conn = require('../db/mongoose')

chai.should();
chai.use(chaiHttp)

/**
 * GET REQUESTS
 */
describe('GET /api/v1/filmovi', () =>{

      // Closing db after testing
      after((done) => {
        conn.close()
        .then(() => done())
        .catch((err) => done(err))
      })

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
          res.body.film[0].should.have.property('year')
          res.body.film[0].should.have.property('rating')
          res.body.film[0].should.have.property('plot')
          done();
        });
      })
})

/** Film IDs
 5ea543a80419b21b28a884b9
 5ea544260419b21b28a884ba
 */




// POST requests
// .........