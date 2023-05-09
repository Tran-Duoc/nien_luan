const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    role: {
      type: String,
      default: "false",
    },
    name: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
      unique: true,
    },
    password: {
      type: "string",
    },
    phone: {
      type: "string",
      required: true,
    },
    address: {
      type: "string",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", User);
