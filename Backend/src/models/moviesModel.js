import { Schema, model } from 'mongoose';

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  language: {
    type: String,
    enum: ['ENGLISH','MALAYALAM','HINDI','TAMIL','SPANISH', 'FRENCH', 'OTHER'], 
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  theater: [{
    name: String,
    date: Date,
    ticketPrice: Number,
    id: Number
  }]

});

const moviesModel = model('movies', movieSchema);

export default moviesModel;
