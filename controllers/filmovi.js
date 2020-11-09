const Film = require("../models/film")

// @@@ getAllFilms @@@ //
const getAllFilms = async (req, res, next) => {
  await Film.find({}, (err, films) => {
    if(err){
      console.log(err);
    }
    else{
      res.render('index', {
        title: "My films",
        films: films
      });
    }
  });
}

const getFilmById = async (req, res, next) => {
  const { id } = req.params;
  const film = await Film.findById(id).populate("actors").populate("users");
  res.render('film', {
    film: film
  });
}

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
  // JUST FOR SERVER SIDE WITHOUT PUG
  /* 
      console.log(req.body)
      const newFilm = {
      title:  req.body.title,
      year: req.body.year,
      genres: req.body.genres,
      director: req.body.director,
      plot: req.body.plot,
      rating: req.body.rating,
      actors: req.body.actors,
      runtime: req.body.runtime
      }
      const movie = new Film(newFilm)
      const saveMovie = await movie.save()
      res.status(201).json({ msg: "Film is saved", newFilm: saveMovie })
*/
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
    4. Zatim se renderuje index.pug fajl koji prikayuje sve filmove u listi
  */
}

// UPDATE || EDIT FILM
const updateForm = async (req, res, next) => {
  const { id } = req.params;
  const film = await Film.findById(id).populate("actors").populate("users");
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
  
  // res.status(200).send({ msg: "Film is deleted" })
}

const deleteAllFilms = async (req, res, next) =>{
  await Film.deleteMany()
  res.status(200).send({msg: "Empty films!"})
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
   
  }
