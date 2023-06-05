import mongoose from 'mongoose';

// Schema for games, which will be used in the club model
const GameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

// Schema for the Club Model
const ClubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  logo: {
    type: String,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  website: {
    type: String,
  },
  games: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game'
  }],
  visible: {
    type: Boolean,
  },
},
{
  toJSON: { virtuals: true },
});

ClubSchema.virtual('slug').get(function() {
  const urlSafeName = this.name.replace(' ', '_').replace(/[^\w\s]/gi, '');
  return `${urlSafeName}_${this._id}`;
});

// Export the models
export const Club = mongoose.models.Club || mongoose.model('Club', ClubSchema);
export const Game = mongoose.models.Game || mongoose.model('Game', GameSchema);
