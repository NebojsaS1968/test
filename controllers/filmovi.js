const sviFilmovi = require('../data/filmovi.json')
const Film = require("../models/film");

const sortFilmove = (a, b, value) => {
  if (a[value] < b[value]) {
    return -1
  }
  if (a[value] > b[value]) {
    return 1
  }
  return 0
}

//SORT FILMS BY YEAR AND RATING
const vratiSveFilmove = async (req, res, next) => {
  if(req.query.sort === "godina" && req.query.order === "asc"){
    const film = sviFilmovi.sort((a, b) => sortFilmove(a, b, "year"))
    res.status(200).send({ film })
  }

  if(req.query.sort === "godina" && req.query.order === "desc"){
    const film = sviFilmovi.sort((a, b) => sortFilmove(a, b, "year")).reverse()
    res.status(200).send({ film })
  }

  if(req.query.sort === "ocena" && req.query.order === "desc"){
    const film = sviFilmovi.sort((a, b) => sortFilmove(a, b, "rating"))
    res.status(200).send({ film })
  }

  if(req.query.sort === "ocena" && req.query.order === "asc"){
    const film = sviFilmovi.sort((a, b) => sortFilmove(a, b, "rating")).reverse()
    res.status(200).send({ film })
  }

  if (!req.query.sort && !req.query.order) {
    const Filmovi = await Film.find({})
    res.status(200)
    res.send({ filmovi: Filmovi })
  }

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


const dodajFilm = async (req, res, next) => {
  console.log(req.body)
  const newFilm = {
    title:  req.body.title,
    year: req.body.year,
    runtime: req.body.runtime,
    genres: req.body.genres,
    director: req.body.director,
    actors: req.body.actors,
    plot: req.body.plot
  }

  if(!newFilm.title || !newFilm.year || !newFilm.runtime || !newFilm.genres || !newFilm.director || !newFilm.actors || !newFilm.plot){
    return res.status(400).json({ msg: "Please include all properties" })
  }
  const movie = new Film(newFilm)
  const saveMovie = await movie.save()
  res.status(201).json({ msg: "Film is saved", newFilm: saveMovie })
}

const izbrisiFilm = async (req, res, next) =>{
  const { id } = req.params;
  await Film.findByIdAndDelete(id);
  res.status(200).send({ msg: "Film is deleted" });
}

const azurirajFilm = async (req, res, next) =>{
  const { id } = req.params;
  const update = req.body;
  await Film.findByIdAndUpdate(id, update);
  res.status(200).send({ msg: "Film is updated" });
}

module.exports = { vratiSveFilmove, vratiFilmovePoNazivu, vratiOpisFilma, dodajFilm, izbrisiFilm, azurirajFilm}
