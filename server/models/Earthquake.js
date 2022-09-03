const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
const reactionSchema = require("./Reaction");

const earthquakeSchema = new Schema(
  {
    username: {
      type: String,
      // required: true,
    },
    Date: {
      type: Date,
      get: (timestamp) => dateFormat(timestamp),
      lowercase: true,
      trim: true,
      // required: "You need to leave a date!",
    },
    Latitude: {
      type: Number,
      // required: "You need to leave Latitude",
    },
    Longitude: {
      type: Number,
      // required: "You need to leave Longitude",
    },
    Depth: {
      type: Number,
      // required: true,
      get: (depthNumber) => Math.round(depthNumber),
      set: (depthNumber) => Math.round(depthNumber),
    },
    Magnitude: {
      type: Number,
      // required: "You need to leave Magnitude",
    },
    Region: {
      type: String,
      lowercase: true,
      trim: true,
      // required: "You need to leave Region",
      minLength: 5,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: { getters: true },
  }
);

earthquakeSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});
const earthquake = model("Earthquake", earthquakeSchema);

module.exports = earthquake;
