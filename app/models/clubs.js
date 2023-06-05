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
  location: { // GeoJSON data
    type: {
      type: String,
      enum: ['Point'], // 'location.type' must be 'Point'
    },
    coordinates: {
      type: [Number],
    }
  },
  city: {
    type: String,
    trim: true,
  },
  state: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  locationName: {
    type: String,
    trim: true,
  },
  website: {
    type: String,
  },
  games: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game'
  }],
  contactEmail: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
    unique: true
  },
  visible: {
    type: Boolean,
  },
},
{
  toJSON: { virtuals: true },
});

ClubSchema.virtual('slug').get(function() {
  const urlSafeName = this.name.toLowerCase().replace(' ', '_').replace(/[^\w\s]/gi, '');
  return `${urlSafeName}_${this._id}`;
});

// Export the models
export const Club = mongoose.models.Club || mongoose.model('Club', ClubSchema);
export const Game = mongoose.models.Game || mongoose.model('Game', GameSchema);
