const product = require("../models/product.model");

const productController = {
  getProducts: async (req, res) => {
    try {
      const products = await product.find();
      if (!products) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "get products is successful",
          products: products,
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
  getProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await product.find({ _id: id });
      if (!item) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "get products is successful",
          product: item,
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
  createProduct: async (req, res) => {
    try {
      const { title, description, price, location, rating } = req.body;
      let images = [];
      const { userId } = req.user;
      const listImage = req.files;

      if (!title || !description || !price || !location || !rating) {
        return res.status(404).json({
          success: false,
          message: "invalid item",
        });
      }

      console.log(listImage);
      [...listImage].map((image, i) => {
        images.push(image.originalname);
      });

      const item = new product({
        title: title,
        description: description,
        price: price,
        location: location,
        rating: rating,
        images: images,
        user: userId,
      });
      await item.save();
      return res.status(200).json({
        success: true,
        message: "Product created successfully",
        item: item,
      });
    } catch (error) {}
  },

  updateProduct: async (req, res) => {
    try {
      const { title, description, price, location, rating } = req.body;
      const { id } = req.params;
      let images = [];
      const { userId } = req.user;
      const listImage = req.files;
      [...listImage].map((image, i) => {
        images.push(image.originalname);
      });
      if (!title || !description || !price || !location || !rating) {
        return res.status(404).json({
          success: false,
          message: "invalid item",
        });
      }

      let item = {
        title: title,
        description: description,
        price: price,
        location: location,
        rating: rating,
        images: images,
        user: userId,
      };

      item = await product.findByIdAndUpdate({ _id: id }, item, { new: true });
      if (!item) {
        return res.status(404).json({
          success: false,
          message: "Update product failed",
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "Product updated successfully",
          product: item,
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await product.find({ _id: id });
      if (!item) {
        return res.status(404).json({
          success: false,
          message: "product does not exist",
        });
      } else {
        const remove = await product.findOneAndRemove({ _id: id });
        if (remove) {
          return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            product: remove,
          });
        }
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
  filterProduct: async (req, res) => {
    try {
      //? basic filtering
      const objectId = { ...req.query };
      let excludedFields = ["sort", "page", "field", "limit"];
      excludedFields.forEach((element) => {
        delete objectId[element];
      });
      //? 2 advanced filtering
      let queryStr = JSON.stringify(objectId);
      queryStr = queryStr.replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      );
      let items = await product.find(JSON.parse(queryStr));

      //? 3 sorting
      if (req.query.sort) {
        console.log(req.query.sort);
        const sortBy = req.query.sort.split(",").join(" ");
        console.log(sortBy);
        items = await product.find(JSON.parse(queryStr)).sort(sortBy);
      } else {
        items = await product.find(JSON.parse(queryStr)).sort("rating");
      }

      //? pagination
      const page = Number(req.query.page);
      const limit = Number(req.query.limit);
      const skip = (page - 1) * limit;
      if (page && limit) {
        items = await product.find({}).skip(skip).limit(limit);
      }
      return res.status(200).json({
        success: true,
        length: items.length,
        message: "get items successfully",
        items,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};

module.exports = productController;
