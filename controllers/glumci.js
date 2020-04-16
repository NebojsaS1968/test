const Actor = require("../models/actor")
const Film = require("../models/film")

const sortActors = (a, b, value) => {
  if (a[value] < b[value]) {
    return -1
  }
  if (a[value] > b[value]) {
    return 1
  }
  return 0
}

const getAllActors = async (req, res, next) => {
  if(req.query.age === "asc"){
    const actor = await Actor.find({})
    const actors = actor.sort((a, b) => sortActors(a, b, "age"))
    res.status(200).send({ actors }) 
  }

  if(req.query.age === "desc"){
    const actor = await Actor.find({})
    const actors = actor.sort((a, b) => sortActors(a, b, "age")).reverse()
    res.status(200).send({ actors })
  }

  if(!req.query.age){
    if (req.query.limit){
      const actors = await Actor.find({}).limit(parseInt(req.query.limit))
      return res.status(200).send(actors)
   }
    const actors = await Actor.find({})
    res.status(200).send({ actors: actors })
  }
}

const getActorById = async (req, res, next) =>{
  const { id } = req.params
  const actor = await Actor.findById(id).populate("movies")
  res.status(200).send({ actor })
}

const getActorByName = async (req, res, next) => {
  const { name } = req.params
  const actor = await Actor.find().where("name").equals(new RegExp(name, "i"))
  if(actor.length === 0){
    res.status(200).send({ err: "Actor doesn't exist in the database!" })
  } else{
    res.status(200).send({actor})
  }
}

const getAwards = async (req, res, next) => {
  const { id } = req.params
  const actor = await Actor.findById(id)
    const awards = {
      "Actor": actor.name,
      "Awards": actor.awards
    }
    res.status(200).send({awards})
}

const getActorFilms = async (req, res, next) => {
  const { id } = req.params
  const actor = await Actor.findById(id)
    const movies = {
      "Actor": actor.name,
      "Movies": actor.movies
    }
    res.status(200).send({movies})
}

const addActor = async (req, res, next) => {
  const newActor = {
      name: req.body.name,
      awards: req.body.awards,
      movies: req.body.movies,
      age: req.body.age
  }
  const actor = new Actor(newActor)
  const saveActor = await actor.save()
  res.status(201).send({ msg: "Actor has been saved", newActor: saveActor })
}

const deleteActor = async (req, res, next) => {
  await Actor.deleteMany();
  res.status(200).send("Empty actors!");
}

const updateActor = async (req, res, next) => {
  const { id } = req.params
  const { film } = req.body

  const actor = await Actor.findById(id)
  const movie = await Film.findById(film)
  console.log(film)

  if(actor.movies.includes(film)){
    res.status(200).send({ msg: "Movie already exists for this actor!" })
  } else if(movie){
    movie.actors.push(id)
    const save = await movie.save()

    actor.movies.push(film)
    await actor.save()

    res.status(201).send({save})
  } else {res.status(200).send({ msg: "Wrong id!" })}
} 

module.exports = {
  getAllActors,
  getActorByName,
  getAwards,
  getActorFilms,
  addActor,
  getActorById,
  deleteActor,
  updateActor
}
