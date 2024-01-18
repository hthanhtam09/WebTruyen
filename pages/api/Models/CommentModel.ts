import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, required: true },
  content: { type: String, required: true },
  nameUser: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);