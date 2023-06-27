const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");
// const Recipe = require("../models/Recipe");
// const AWS = require("aws-sdk");
// const multer = require("multer");
// const multerS3 = require("multer-s3");
// require("dotenv").config();

// App Routes
router.get("/", recipeController.homepage);
router.get("/recipe/:id", recipeController.exploreRecipe);
router.get("/images/:key", recipeController.getImage);
router.get("/categories", recipeController.exploreCategories);
router.get("/categories/:id", recipeController.exploreCategoriesById);
router.post("/search", recipeController.searchRecipe);
router.get("/explore-latest", recipeController.exploreLatest);
router.get("/random-recipe", recipeController.exploreRandom);
router.get("/submit-recipe", recipeController.submitRecipe);
router.post("/submit-recipe", recipeController.upload.single("image"), recipeController.submitRecipeOnPost);

router.delete("/recipe/:id", recipeController.deleteRecipe);

module.exports = router;
