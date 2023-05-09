const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connect = require("./src/utils/connect.util");
const userRouter = require("./src/routes/user.route");
const productRouter = require("./src/routes/product.route");

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use("/api/v2/user", userRouter);
app.use("/api/v2/product", productRouter);

const port = 8000;
const uri = process.env.MONGOOSE_URI;

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
  connect(uri);
});
