const sveSerije = require('../data/serije.json')

const vratiSveSerije = async (req, res, next) => {
  res.status(200)
  res.send({ serije: sveSerije })
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

const dodajSeriju = (req, res) => {
  const newSer = {
    name: req.body.name,
    description: req.body.description,
    episode: req.body.episode
  }

  if(!newSer.name || !newSer.description || !newSer.episode){
    return res.status(400).json({ msg: "Please include all properties" })
  }

  sveSerije.push(newSer)
  res.status(200).json(sveSerije)
}

module.exports = {
  vratiSveSerije,
  vratiSerijuPoNazivu,
  vratiOpisSerije,
  vratiEpizodeSerije,
  dodajSeriju
}

