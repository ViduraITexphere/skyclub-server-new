const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  itinerary: { type: Array, required: true },
  userDetails: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    country: { type: String, required: true },
    passportNo: { type: String },
    noOfPax: { type: Number },
    mealPlan: { type: String },
    hotelCategory: { type: String },
    vehicleType: { type: String },
    specialRequirements: { type: String },
    children: [{ type: String }],
  },
  hotels: {
    type: Array,
    required: true,
  },
  cost: {
    accommodationCost: { type: Number },
    flightTicketCost: { type: Number },
    trainTicketCost: { type: Number },
    taxiRentalCost: { type: Number },
    personCount: { type: Number },
    subTotal: { type: Number },
    tax: { type: Number },
    totalCost: { type: Number },
  },
  revision: { type: String, default: "No" },
  pinned: {
    type: Boolean,
    default: false,
  },
});

const Quote = mongoose.model("Quote", quoteSchema);

module.exports = Quote;
