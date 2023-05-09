const {
  regexPhone,
  regexEmail,
  regexPassword,
} = require("../utils/regex.util");

const user = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const useController = {
  register: async (req, res) => {
    try {
      const { name, email, password, phone, address } = req.body;
      if (!name || !email || !password || !phone || !address) {
        return res.status(403).json({
          success: false,
          message: "Invalid item",
        });
      } else {
        if (!regexPhone(phone)) {
          return res.status(403).json({
            success: false,
            message: "Invalid phone number",
          });
        }
        if (!regexPassword(password)) {
          return res.status(403).json({
            success: false,
            message: "Invalid phone  password",
            suggest:
              "Chứa ít nhất một chữ cái viết thường, Chứa ít nhất một chữ cái viết hoa, Chứa ít nhất một chữ số, Chứa ít nhất một ký tự đặc biệt trong danh sách @, $, !, %, *, ?, &,  Bao gồm chữ cái, số và ký tự đặc biệt trong danh sách trên, ít nhất 8 ký tự",
          });
        }
        if (!regexEmail(email)) {
          return res.status(403).json({
            success: false,
            message: "Invalid phone  email",
          });
        }

        const findUser = await user.findOne({ email: email });

        if (findUser) {
          console.log(findUser);
          return res.status(400).json({
            success: false,
            message: "User is already exist",
          });
        } else {
          const salt = await bcrypt.genSalt(10, "a");
          const hash = await bcrypt.hash(password, salt);
          const newUser = new user({
            name: name,
            email: email,
            password: hash,
            address: address,
            phone: phone,
          });
          newUser.save();
          return res.status(200).json({
            success: true,
            message: "User is register successfully",
            user: newUser,
          });
        }
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    // simple validate
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(401).json({
          success: false,
          message: "Missing  email or password",
        });
      } else {
        if (!regexEmail(email)) {
          return res.status(403).json({
            success: false,
            message: "Invalid  email",
          });
        }
      }

      if (!regexPassword(password)) {
        return res.status(403).json({
          success: false,
          message: "Invalid phone  password",
          suggest:
            "Chứa ít nhất một chữ cái viết thường, Chứa ít nhất một chữ cái viết hoa, Chứa ít nhất một chữ số, Chứa ít nhất một ký tự đặc biệt trong danh sách @, $, !, %, *, ?, &,  Bao gồm chữ cái, số và ký tự đặc biệt trong danh sách trên, ít nhất 8 ký tự",
        });
      }
      const findUser = await user.findOne({ email: email });
      if (!findUser) {
        return res.status(401).json({
          success: false,
          message: "User does not exist",
        });
      } else {
        // console.log(findUser);
        const comparePassword = await bcrypt.compare(
          password,
          findUser.password
        );
        if (!comparePassword) {
          return res.status(403).json({
            success: false,
            message: "Invalid password",
          });
        }
        console.log(findUser._id);
        const accessToken = await jwt.sign(
          { userId: findUser._id, role: findUser.role },
          process.env.ACCESS_TOKEN_SECRET
        );
        return res.status(200).json({
          success: true,
          message: "Login is successfully",
          user: findUser,
          token: accessToken,
        });
      }
    } catch (error) {}
  },
  changePassword: async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const { id } = req.params;
      console.log(currentPassword, newPassword);
      const findUser = await user.findOne({ _id: id });
      const comparePassword = await bcrypt.compare(
        currentPassword,
        findUser.password
      );

      console.log(findUser);
      console.log(comparePassword);
      if (!comparePassword) {
        return res.status(404).json({
          success: false,
          message: "password is wrong",
        });
      } else {
        const salt = await bcrypt.genSalt(10, "a");
        findUser.password = await bcrypt.hashSync(newPassword, salt);
        await findUser.save();
        return res.status(200).json({
          success: true,
          message: "Password changed successfully",
          user: findUser,
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: true,
        message: error.message,
      });
    }
  },
};

module.exports = useController;
