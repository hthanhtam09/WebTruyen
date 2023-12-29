import mongoose from 'mongoose';

const { Schema } = mongoose;

const episodeSchema = new Schema({
  server_name: { type: String },
  server_data: [
    {
      name: { type: String },
      slug: { type: String },
      filename: { type: String },
      link_embed: { type: String },
      link_m3u8: { type: String },
    },
  ],
});

const movieDetailModel = new Schema(
  {
    movie: {
      created: {
        time: { type: String },
      },
      modified: {
        time: { type: String },
      },
      _id: { type: String },
      name: { type: String },
      origin_name: { type: String },
      content: { type: String },
      type: { type: String },
      status: { type: String },
      thumb_url: { type: String },
      trailer_url: { type: String },
      time: { type: String },
      episode_current: { type: String },
      episode_total: { type: String },
      quality: { type: String },
      lang: { type: String },
      notify: { type: String },
      showtimes: { type: String },
      slug: { type: String },
      year: { type: Number },
      view: { type: Number },
      actor: { type: [String] },
      director: { type: [String] },
      category: [
        {
          id: { type: String },
          name: { type: String },
          slug: { type: String },
        },
      ],
      country: [
        {
          id: { type: String },
          name: { type: String },
          slug: { type: String },
        },
      ],
      is_copyright: { type: Boolean },
      chieurap: { type: Boolean },
      poster_url: { type: String },
      sub_docquyen: { type: Boolean },
    },
    episodes: { type: [episodeSchema] },
  },
  {
    timestamps: true,
  },
);

export const MovieDetail = mongoose.models.MovieDetail || mongoose.model('MovieDetail', movieDetailModel);
