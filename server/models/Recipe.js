var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var RecipeSchema   = new Schema({
    title:{
        type: String,
        required: true
    },
    subTitle: String,
    ingredients: [{ type: Schema.Types.ObjectId, ref: 'Ingredient' }],
});

module.exports = mongoose.model('Recipe', RecipeSchema);