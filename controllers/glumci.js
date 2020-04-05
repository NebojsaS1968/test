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

const vratiNagradeGlumca = async (req, res, next) => {
  const { imePrezime } = req.params
  const glumac = sviGlumci.filter(glumac => new RegExp(imePrezime, 'i').exec(glumac.name))
  if (glumac.length===0){
    res.status(200).send({err:"Doslo je do greske"})
  }else{
    const oscar = {
      "Glumac": glumac[0].name,
      "Nagrade": glumac[0].oscars
    }
    res.status(200).send({oscar})
  }
}

const vratiFilmoveGlumca = async (req, res, next) => {
  const { imePrezime } = req.params
  const glumac = sviGlumci.filter(glumac => new RegExp(imePrezime, 'i').exec(glumac.name))
  if (glumac.length===0){
    res.status(200).send({err:"Doslo je do greske"})
  }else{
    const filmovi = {
      "Glumac": glumac[0].name,
      "Filmovi": glumac[0].movies
    }
    res.status(200).send({filmovi})
  }
}

const dodajGlumca = (req, res) => {
  const newActor = {
      name: req.body.name,
      rating: req.body.rating,
      image_path: req.body.image_path,
      alternative_name: req.body.alternative_name,
      objectID: req.body.objectID,
      oscars: req.body.oscars,
      movies: req.body.movies
  }

  if(!newActor.name || !newActor.oscars || !newActor.movies){
    return res.status(400).json({ msg: "Please include all properties" })
  }

  sviGlumci.push(newActor)
  res.json(sviGlumci)
}

module.exports = {
  vratiSveGlumce,
  vratiGlumcaPoImenuIPrezimenu,
  vratiNagradeGlumca,
  vratiFilmoveGlumca,
  dodajGlumca
}
