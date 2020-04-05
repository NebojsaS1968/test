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
    const opis = {
      "Film": film[0].title,
      "Opis": film[0].plot
    }
    res.status(200).send({opis})
  }
}

// POST BODY JSON
const dodajFilm =  (req, res) => {
  const newFilm = {
    id: req.body.id,
    title:  req.body.title,
    year: req.body.year,
    runtime: req.body.runtime,
    genres: req.body.genres,
    director: req.body.director,
    actors: req.body.actors,
    plot: req.body.plot
  }

  if(!newFilm.id || !newFilm.title || !newFilm.year || !newFilm.runtime || !newFilm.genres || !newFilm.director || !newFilm.actors || !newFilm.plot){
    return res.status(400).json({ msg: "Please include all properties" })
  }
  sviFilmovi.push(newFilm)
  res.status(200).json(sviFilmovi)
}

module.exports = { vratiSveFilmove, vratiFilmovePoNazivu, vratiOpisFilma, dodajFilm }
