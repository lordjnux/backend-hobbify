const mongoose = require('mongoose')


const schema = {
  title: String,
  year: Number,
  director: String,
  duration: String,
  genre: Array,
  rate: Number,
  poster: String

}


const moviesSchema = new mongoose.Schema(schema)

const movieModel = mongoose.model("movies", moviesSchema)


export {movieModel}