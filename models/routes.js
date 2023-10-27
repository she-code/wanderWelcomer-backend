const { Double } = require("mongodb");
const { mongoose } = require("mongoose");

const routeSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  from: { type: String, required: [true, "Starting route is required"] },
  to: {
    type: String,
    required: [true, "Destination is required"],
  },
  price: {
    type: Number,
    required: [true, "Estimated price is required"],
  },
  duration: {
    type: String,
  },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Route = mongoose.model("Route", routeSchema);
module.exports = { Route };
