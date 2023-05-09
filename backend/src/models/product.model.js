const mongoose = require("mongoose");
const schema = mongoose.Schema;

const product = new schema(
  {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    price: {
      type: String || Number,
      required: true,
    },
    location: {
      type: "string",
      required: true,
    },
    images: {
      type: Array,
    },
    rating: {
      type: String || Number,
    },
    user: {
      type: "string",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("product", product);
