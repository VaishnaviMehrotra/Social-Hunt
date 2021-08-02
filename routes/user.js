const express = require("express");
const router = express.Router();
const UserController = require("../controller/user");
const upload = require("../config/multer");
const {
  validateUserRegister,
  validateUserLogin,
} = require("../config/validator");
const authMiddleware = require("../config/auth");
const User = require("../models/user");
/**
 * @method POST
 * @route /api/users/register
 */
router.post("/register", validateUserRegister, UserController.registerUser);

// /**
//  * @method POST
//  * @route /api/users/login
//  */
router.post("/login", validateUserLogin, UserController.loginUser);

/**
 * @method GET
 * @route /api/users
 */
router.get("/", authMiddleware, UserController.getAllUsers);
/**
 * @method GET
 * @route /api/users/particularUser
 */
router.get(
  "/particularUser/:userId",
  authMiddleware,
  UserController.getParticularUser
);
/**
 * @method DELETE
 * @route /api/users/:userId
 */

router.delete("/", authMiddleware, UserController.deleteUser);

/**
 * @method PUT
 * @route /api/users/:userId
 */

router.put("/update", authMiddleware, UserController.updateUser);

/**
 * @route /api/user/fetch
 */
router.get("/fetch", authMiddleware, UserController.fetchUser);

router.post("/upload", upload.single("profile"), UserController.upload);

router.get("/followers/:userId", authMiddleware, UserController.getFollowers);

router.get("/following/:userId", authMiddleware, UserController.getFollowing);

router.put("/follow", authMiddleware, UserController.followUser);

router.put("/unfollow", authMiddleware, UserController.unFollowUser);



module.exports = router;
