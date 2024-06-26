const express = require("express");

const controllers = require("../controllers/controller");

const router = express.Router();


router.route("/login").post(controllers.loginUser);
router.route("/register").post(controllers.addUser);
router.route("/products").get(controllers.getAllItem);
router.route("/addProduct").post(controllers.addProduct)
router.route("/addProducts").post(controllers.addProducts)

module.exports = router;