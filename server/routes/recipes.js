const express = require('express');
const router = express.Router();
const recipe = require('../models/Recipe');


router.post('/addRecipe', async (req,res) => {
    const rec = new recipe(
        req.body
    );
    try {
        const savedRecipe = await rec.save();
        res.send(savedRecipe); 
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }
})
router.get('/getAllRecipes' , (req,res) => {
        recipe.find()
        .then(recipes => res.json(recipes))
        .catch(err => res.status(400).json('Error' + err));
});

router.get("/:recipeID", (req, res) => {
    recipe.findById(req.params.recipeID)
      .then(recipe => {
        if (!recipe) {
          return res.status(404).send({
            message: `No recipe found with id ${req.params.recipeID}`
          });
        }
        res.status(200).send(recipe);
      })
      .catch(err => {
        if (err.kind === "ObjectId") {
          res.status(404).send({
            message: `No recipe found with id ${req.params.recipeID}`
          });
        }
        res.status(500).send({
          message:
            err.message ||
            `Some error occurred while finding  the recipe with id ${
              req.params.recipeID
            }`
        });
      });
  });
// Update a recipe with Id
router.put("/:recipeID",(req, res) => {
    if (
      !req.body.title ||
      !req.body.subTitle ||
      !req.body.ingredients
    ) {
      return res.status(400).send({
        message: "Recipe details cannot be empty"
      });
    }
    recipe.findByIdAndUpdate(
      req.params.recipeID,
      {
        title: req.body.title,
        subTitle: req.body.subTitle,
        ingredients: req.body.ingredients
      },
  
      { new: true }
    )
      .then(recipe => {
        if (!recipe) {
          return res.status(404).send({
            message: `No recipe found with the id ${req.params.recipeID}`
          });
        }
        res.send(recipe);
      })
      .catch(err => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: `No recipe found with the id ${req.params.recipeID}`
          });
        }
        res.status(500).send({
          message: `Error updating recipe with id ${req.params.recipeID}`
        });
      });
  });
router.delete("/:recipeID",(req, res) => {
    recipe.findByIdAndRemove(req.params.recipeID)
      .then(recipe => {
        if (!recipe) {
          return res.status(404).send({
            message: `No recipe found with the id ${req.params.recipeID}`
          });
        }
        res.send({
          message: "Recipe Deleted Successfully"
        });
      })
      .catch(err => {
        if (err.kind === "ObjectId" || err.name === "NotFound") {
          return res.status(404).send({
            message: `No recipe found with the id ${req.params.recipeID}`
          });
        }
        res.status(500).send({
          message: `Error deleting recipe with id ${req.params.recipeID}`
        });
      });}
  )
module.exports = router;