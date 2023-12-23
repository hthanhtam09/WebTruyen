import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const movieSchema = new Schema({
  modified: {
    time: { type: String },
  },
  _id: { type: String, require },
  slug: { type: String, require },
  name: { type: String, require },
  origin_name: { type: String, require },
  thumb_url: { type: String, require },
  poster_url: { type: String, require },
  year: { type: Number },
}, {
  timestamps: true
});

export const Movie = mongoose.models.Movie || mongoose.model('Movie', movieSchema);