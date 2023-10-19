const { mongoose } = require("mongoose");

const placeSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Place name is required"] },
  description: { type: String },
  location: { type: String, required: [true, "Place location is required"] },
  category: {
    type: String,
    required: [true, "Place category is required"],
    enum: [
      "mall",
      "beach",
      "bar",
      "bank",
      "cinema",
      "gym",
      "hospital",
      "library",
      "park",
      "restaurant",
      "pharmacy",
      "others",
    ],
  },
  image: { type: String },
  rating: {
    type: Number,
    default: 4.5,
  },
});

const Place = mongoose.model("Place", placeSchema);
module.exports = { Place };
