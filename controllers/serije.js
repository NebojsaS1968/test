const sveSerije = require('../data/serije.json')
const Series = require("../models/series");

const vratiSveSerije = async (req, res, next) => {
    const Serije = await Series.find({})
    res.status(200)
    res.send({ serije: Serije })
}

const vratiSerijuPoNazivu = async (req, res, next) => {
  const { naziv } = req.params
  const serija = sveSerije.filter(serija => new RegExp(naziv, 'i').exec(serija.name))
  if (serija.length===0){
    res.status(200).send({err:"Can't find the wanted series."})
  }else{
    res.status(200).send({serija})
  }
}

const vratiOpisSerije = async (req, res, next) => {
  const { naziv } = req.params
  const serija = sveSerije.filter(serija => new RegExp(naziv, 'i').exec(serija.name))
  if (serija.length===0){
    res.status(200).send({err:"Couldn't find the description for this series."})
  }else{
    const opis = {
      "Serija": serija[0].name,
      "Opis": serija[0].description
    }
    res.status(200).send({opis})
  }
}

const vratiEpizodeSerije = async (req, res, next) => {
  const { naziv } = req.params
  const serija = sveSerije.filter(serija => new RegExp(naziv, 'i').exec(serija.name))
  if (serija.length===0){
    res.status(200).send({err:"Couldn't find episodes for this series."})
  }else{
    const epizode = {
      "Serija": serija[0].name,
      "Epizode": serija[0].episode
    }
    res.status(200).send({epizode})
  }
}

const dodajSeriju = async (req, res, next) => {
  const newSer = {
    title: req.body.title,
    seasons: req.body.seasons,
    episodes: req.body.episodes,
    plot: req.body.plot
  }

  if(!newSer.title || !newSer.seasons || !newSer.episodes || !newSer.plot){
    return res.status(400).json({ msg: "Please include all properties" })
  }

  const series = new Series(newSer)
  const saveSer = await series.save()
  res.status(201).json({ msg: "Series is saved", newSer: saveSer })
}

module.exports = {
  vratiSveSerije,
  vratiSerijuPoNazivu,
  vratiOpisSerije,
  vratiEpizodeSerije,
  dodajSeriju
}

