const chai = require('chai')
const chaiHttp = require('chai-http')

const index = require('../server');
const conn = require('../db/mongoose')

chai.should();
chai.use(chaiHttp)

// GET requests
describe('GET /api/v1/filmovi', () =>{

  after((done) => {
    conn.close()
    .then(() => done())
    .catch((err) => done(err))
  })

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

})



// POST requests
// .........