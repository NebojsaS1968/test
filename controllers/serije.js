const sveSerije = require('../data/serije.json')
const vratiSveSerije = async (req, res, next) => {
  res.status(200)
  res.send({ serije: sveSerije })
}

const vratiSerijuPoNazivu = async (req, res, next) => {
  const { naziv } = req.params
  const serija = sveSerije.filter(serija => new RegExp(naziv, 'i').exec(serija.name))
  if (serija.length===0){
    res.status(200).send({err:"Doslo je do greske"})
  }else{
    res.status(200).send({serija})
  }
}

const vratiOpisSerije = async (req, res, next) => {}

const vratiEpizodeSerije = async (req, res, next) => {}

module.exports = {
  vratiSveSerije,
  vratiSerijuPoNazivu,
  vratiOpisSerije,
  vratiEpizodeSerije
}
