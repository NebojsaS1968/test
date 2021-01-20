const Film = require("../models/film")
const User = require('../models/user')

// @@@ getAllFilms @@@ //
const getAllFilms = async (req, res, next) => {
  await Film.find({}, (err, films) => {
    if(err){
      console.log(err);
    }
    else{
      res.render('index', {
        title: "Films",
        films: films
      });
    }
  });
}

const getFilmById = async (req, res, next) => {
  const { id } = req.params;
  const film = await Film.findById(id).populate("users")
  res.render('film', {
    film: film
  });
}

// Search line needed in pug
const getFilmByTitle = async (req, res, next) => {
  const { title } = req.params
  const film = await Film.find().where("title").equals(new RegExp(title, "i"))
  if (film.length === 0) {
    res.status(200).send({ err: "No such film in the database!" })
  } else {
    res.status(200).send({ film })
  }
}

// @@@ getForm and addFilm @@@ //
const addForm = async (req, res, next) => {
  res.render('add', {
    title: "Add Film"
  })
}

const addFilm = async (req, res, next) => {
  const film = {
    title: req.body.title,
    year: req.body.year,
    genres: req.body.genres,
    director: req.body.director,
    plot: req.body.plot,
    rating: req.body.rating,
    actors: req.body.actors,
    runtime: req.body.runtime
  }
  const movie = new Film(film)
  await movie.save((err) => {
    if(err){
      console.log(err)
    } else {
      res.redirect('/api/v1/filmovi')
    }
  })

  /* Objasnjenje: 
    1. Nakon cuvanja novog filma iz forme, res.redirect salje korisnika na /api/v1/filmovi rutu. 
    2. Redirect poziva GET metodu i aktivira se funkcija namenjena za tu rutu i tu metodu, getAllFilms.  
    3. U getAllFilms funkciji se traze svi filmovi u bazi, i tu ce biti nas novi sacuvani film
    4. Zatim se renderuje index.pug fajl koji prikazuje sve filmove u listi
  */
}

// UPDATE || EDIT FILM
const updateForm = async (req, res, next) => {
  const { id } = req.params;
  const film = await Film.findById(id)
  res.render('update-film', {
    title: film.title ,
    film: film
  });
}

const updateFilm = async (req, res, next) =>{
  // const { id } = req.params
  const update = {
    title: req.body.title,
    year: req.body.year,
    director: req.body.director,
    plot: req.body.plot,
    rating: req.body.rating
  }  
  const query = {_id:req.params.id}
  await Film.findOneAndUpdate(query, update, (err) => {
    if(err){
      console.log(err)
    } else {
      res.redirect('/api/v1/filmovi')
    }
  })
  // send({ msg: "Film is updated" })
}

const deleteFilm = async (req, res, next) =>{
  // const query = {_id:req.params.id}
  const { id } = req.params
  await Film.findByIdAndDelete(id, (err) => {
    if(err){
      console.log(err);
    } else {
      res.status(200).send("Film has been deleted.")
    }
  })
}

const deleteAllFilms = async (req, res, next) =>{
  await Film.deleteMany()
  res.status(200).send({msg: "Empty films!"})
}

const addToUserWatchlist = async (req, res, next) => {
  const userId = req.userId
  const { id } = req.params

  const film = await Film.findById(id)
  const user = await User.findById(userId)


    if(user.watchlist.includes(id) || film.users.includes(userId)) {
      return res.status(200).send({ msg: "This film is already in your watchlist." })
    } else {
      user.watchlist.push(id)
      const saveUser = await user.save()

      film.users.push(userId)
      await film.save()

      return res.status(201).send({ msg: saveUser })
    }
}

const rateFilm = async (req, res, next) => {
  const { id } = req.params
  const { grade } = req.body
  const userId = req.userId

  const filteredFilms = []
  let countOfFilms = 0

  const user = await User.findById(userId)
  const film = await Film.findById(id)
  
    if(user.watchlist.includes(id) || film.users.includes(userId)){
      const index = user.watchlist.findIndex((i) => i.id === id)
      user.watchlist[index].grade = grade
      await user.save()
      film.grade = grade
      await film.save()

      let watchlist = user.watchlist
      const films = await Film.find({})

      films.forEach((film) => {
        for(i=0; i<watchlist.length; i++){
          if(watchlist[i].id === film.id){
            filteredFilms.push(film)
            countOfFilms++
          } 
        }
      })

      console.log(`Number of films in the watchlist: ${countOfFilms}`);
      return res.render('user', {
        name: user.username,
        filteredFilms: filteredFilms,
        count: countOfFilms
      })
    }
    
  if(!user){
    return res.status(400).send({ err: "Wrong id of the user!" })
  }
  if(!film){
    return res.status(400).send({ err: "Wrong id of the film!" })
  }
}

module.exports = {
   getAllFilms,
   getFilmById, 

   addFilm, 
   addForm,

   updateForm,
   updateFilm,

   deleteFilm,
   getFilmByTitle,
   deleteAllFilms,
   
   addToUserWatchlist,
   rateFilm
  }
