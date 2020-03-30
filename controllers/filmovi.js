const sviFilmovi = require('../data/filmovi.json')

const vratiSveFilmove = async (req, res, next) => {
  res.status(200)
  res.send({ filmovi: sviFilmovi })
}

const vratiFilmovePoNazivu = async (req, res, next) => {
  const { naziv } = req.params
  const film = sviFilmovi.filter(film => new RegExp(naziv, 'i').exec(film.title))
  if (film.length===0){
    res.status(200).send({err:"Doslo je do greske"})
  }else{
    res.status(200).send({film})
  }
}

const vratiOpisFilma = async (req, res, next) => {
  const { naziv } = req.params
  const film = sviFilmovi.filter(film => new RegExp(naziv, 'i').exec(film.title))
  if (film.length===0){
    res.status(200).send({err:"Doslo je do greske. Nismo mogli da nadjemo trazeni film."})
  }else{
    const opis = film[0].plot
    res.status(200).send({opis})
  }
}

module.exports = { vratiSveFilmove, vratiFilmovePoNazivu, vratiOpisFilma }
