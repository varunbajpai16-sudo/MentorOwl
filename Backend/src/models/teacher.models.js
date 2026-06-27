import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  subjects: {
    type: [String],
    required: true,
  },
  classes: {
    type: [String],
    required: true,
  },
  hourelyfee: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },

  coordinates: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },

  totalReviews: {
    type: Number,
    default: 0,
  },

  mode: {
    type: [String],
    enum: ['online', 'offline'],
  },

  isVerifiedTeacher: {
    type: Boolean,
    default: false,
  },

  education: [
    {
      degree: String,
      institute: String,
      year: Number,
    },
  ],

  experienceDetails: [
    {
      institution: String,
      years: Number,
    },
  ],
  documents: {
    type: [String],
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },

  totalReviews: {
    type: Number,
    default: 0,
  },
});

teacherSchema.index({ coordinates: '2dsphere' });

export const Teacher = mongoose.model('Teacher', teacherSchema);
