//name email role password
const { mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: [true, "First name is required"] },
  lastName: { type: String },
  password: { type: String },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  role: {
    type: String,
    enum: ["admin", "user", "committee"],
  },
  currentLocation: {
    type: String,
    required: [true, "Current location is required"],
  },
});

const User = mongoose.model("User", userSchema);
module.exports = { User };
