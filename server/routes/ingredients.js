const express = require('express');
const router = express.Router();
const ingredient = require('../models/Ingredient');


router.post('/addIngredient', async (req,res) => {
    const ingr = new ingredient(
        req.body
    );
    try {
        const savedIngredient = await ingr.save();
        res.send(savedIngredient); 
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }
});
router.get('/getAllIngredientsByIdRecipe/:RecipeID' , (req,res) => {
  ingredient.find({Recipe:req.params.RecipeID})
  .then(recipes => res.json(recipes))
  .catch(err => res.status(400).json('Error' + err));
});

router.get("/:ingredientID", (req, res) => {
    ingredient.findById(req.params.ingredientID)
      .then(ingredient => {
        if (!ingredient) {
          return res.status(404).send({
            message: `No ingredient found with id ${req.params.ingredientID}`
          });
        }
        res.status(200).send(ingredient);
      })
      .catch(err => {
        if (err.kind === "ObjectId") {
          res.status(404).send({
            message: `No ingredient found with id ${req.params.ingredientID}`
          });
        }
        res.status(500).send({
          message:
            err.message ||
            `Some error occurred while finding  the recipe with id ${
              req.params.ingredientID
            }`
        });
      });
  });
  router.get("/getIngredientByNameAndQuantity/:name/:quantity", (req, res) => {
    ingredient.find({name:req.params.name,quantity:req.params.quantity})
      .then(ingredient => {
        if (!ingredient) {
          return res.status(404).send({
            message: `No ingredient found with name ${req.params.name}`
          });
        }
        res.status(200).send(ingredient);
      })
      .catch(err => {
        if (err.kind === "ObjectId") {
          res.status(404).send({
            message: `No ingredient found with name ${req.params.name}`
          });
        }
        res.status(500).send({
          message:
            err.message ||
            `Some error occurred while finding  the recipe with name ${
              req.params.name
            }`
        });
      });
  });
  // Update a recipe with Id
router.put("/:ingredientID",(req, res) => {
  if (
    !req.body.name ||
    !req.body.quantity) {
    return res.status(400).send({
      message: "ingredient details cannot be empty"
    });
  }
  ingredient.findByIdAndUpdate(
    req.params.ingredientID,
    {
      name: req.body.name,
      quantity: req.body.quantity,
    },

    { new: true }
  )
    .then(ingredient => {
      if (!ingredient) {
        return res.status(404).send({
          message: `No ingredient found with the id ${req.params.ingredientID}`
        });
      }
      res.send(ingredient);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: `No ingredient found with the id ${req.params.ingredientID}`
        });
      }
      res.status(500).send({
        message: `Error updating ingredient with id ${req.params.ingredientID}`
      });
    });
});
router.delete("/:IngredientID",(req, res) => {
  ingredient.findByIdAndRemove(req.params.IngredientID)
    .then(ingredient => {
      if (!ingredient) {
        return res.status(404).send({
          message: `No ingredient found with the id ${req.params.IngredientID}`
        });
      }
      res.send({
        message: "ingredient Deleted Successfully"
      });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: `No ingredient found with the id ${req.params.ingredientID}`
        });
      }
      res.status(500).send({
        message: `Error deleting ingredient with id ${req.params.ingredientID}`
      });
    });})

module.exports = router;