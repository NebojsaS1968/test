const sviGlumci = require('../data/glumci.json')

const vratiSveGlumce = async (req, res, next) => {
  res.status(200)
  res.send({ glumci: sviGlumci })
}

const vratiGlumcaPoImenuIPrezimenu = async (req, res, next) => {
  const { imePrezime } = req.params
  const glumac = sviGlumci.filter(glumac => new RegExp(imePrezime, 'i').exec(glumac.name))
  if (glumac.length===0){
    res.status(200).send({err:"Doslo je do greske"})
  }else{
    res.status(200).send({glumac})
  }
  
}

const vratiNagradeGlumca = async (req, res, next) => {}

const vratiFilmoveGlumca = async (req, res, next) => {}

module.exports = {
  vratiSveGlumce,
  vratiGlumcaPoImenuIPrezimenu,
  vratiNagradeGlumca,
  vratiFilmoveGlumca
}
