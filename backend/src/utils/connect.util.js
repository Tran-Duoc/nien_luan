const mongoose = require("mongoose");

const connect = async (url) => {
  return await mongoose
    .connect(url)
    .then(() => {
      console.log(`mongoose is connected`);
    })
    .catch((err) => console.error(err));
};

module.exports = connect;
