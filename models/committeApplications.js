const { mongoose } = require("mongoose");

const committeApplicationSchema = new mongoose.Schema(
  {
    reason: { type: String, required: [true, "Reason is required"] },
    committeType: {
      type: String,
      required: [true, "Committe type is required"],
      enum: ["auto", "government"],
    },
    image: { type: String },
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "approved", "rejected"],
    },
  }
  // {
  //   toJSON: true,
  //   toObject: true,
  // }
);

const CommitteApplication = mongoose.model(
  "CommitteApplication",
  committeApplicationSchema
);
module.exports = { CommitteApplication };
