// models/Quote.js
const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  googleId: String,
  itinerary: { type: Array, required: true },
  userDetails: {
    name: String,
    email: String,
    message: String,
    phone: String,
    country: String,
  },
  cost: {
    accommodationCost: Number,
    flightTicketCost: Number,
    trainTicketCost: Number,
    taxiRentalCost: Number,
    personCount: Number,
    subTotal: Number,
    tax: Number,
    totalCost: Number
  }
});

const Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote;
