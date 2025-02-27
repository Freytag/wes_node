const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'A store name is required.'
  },
  slug: String,
  description: {
    type: String,
    trim: true
  },
  tags: [String],
  created: {
    type: Date,
    default: Date.now()
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [{
      type: Number,
      required: 'Please supply coordinates for your store.'
    }],
    address: {
      type: String,
      required: 'Please supply an address.'
    }
  }
});

storeSchema.pre('save', function(next) {
  if (!this.isModified('name')) {
    next(); //skip it
    return; // stop this function from running
  }
  this.slug = slug(this.name);
  next();
  // TODO make more resilient so slugs are unique
});

module.exports = mongoose.model('Store', storeSchema);