const { check } = require("express-validator");

const validateUserRegister = [
  check("name")
    .notEmpty()
    .withMessage("The name shouldn't be empty string")
    .isString()
    .withMessage("The name must be string")
    .withMessage("The name should be atleast 5 chars long"),
  check("email")
    .isEmail()
    .withMessage("The valid email is required")
    .normalizeEmail(),
  check("password")
    .notEmpty()
    .withMessage("The password shouldn't be empty string")
    .isLength({ min: 8 })
    .withMessage("The password should be atleast 8 chars long")
    .custom((val, { req }) => {
      
      if (req.body.repeatPassword !== val) {
        throw new Error("The password doesn't match");
      }
      // if(!req.body.password.match(/[A-z]/g)){
      //   throw new Error("Your password should contain one uppercase, one specials charcater and shoud");
      // }
      
      return true;
    }),
];

const validateUserLogin = [
  check("email")
    .notEmpty()
    .withMessage("The email field is required")
    .isEmail()
    .withMessage("The email is not valid"),
  check("password").notEmpty().withMessage("The password field is required"),
];

module.exports = { validateUserRegister, validateUserLogin };