import mongoose from 'mongoose';

// Schema for the Club Model

const ClubSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	location: {
		type: {
			type: String,
			trim: true,
		},
		coordinates: [],
	},
	website: {
		type: String,
	},
	games: [GameSchema],
	visible: {
		type: Boolean,
	},
});

// Schema for games, which will be used in the club model

const GameSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
});

// Export the Club model

module.exports = mongoose.models.Club || mongoose.model('Club', ClubSchema);
