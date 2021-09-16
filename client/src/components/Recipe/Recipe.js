import React from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import "./Recipe.css";
class Recipe extends React.Component {
  state = {
    activeRecipe: []
  }
  componentDidMount = async () => {
    axios.get("http://localhost:5000/recipes/getAllRecipes")
    .then(response => {
      this.setState({ activeRecipe: response.data});
    });

  }
  componentDidUpdate = async () => {
    axios.get("http://localhost:5000/recipes/getAllRecipes")
    .then(response => {
      this.setState({ activeRecipe: response.data});
    });

  }
  deleteRecipe(id_Recipe){
  }
  render() {
    return (
      <div className="container">
        <div className="row">
    { this.state.activeRecipe.map((recipe) => {
      return (
        <article key={recipe._id} className="cocktail">
        <div className="img-container">
          <img
            src={
            "https://i.ibb.co/KFpCKPb/anna-pelzer-IGf-IGP5-ONV0-unsplash.jpg"
            }
            alt="Green Salad"          />
        </div>
        <div className="cocktail-footer">
          <h2>{recipe.title}</h2>
          <Link to={`/recipe/${recipe._id}`} style={{ color: "#444" }}>
            <h4>
              Check out the recipe <i className="fa fa-arrow-right"></i>
            </h4>
          </Link>
        </div>
      </article>
       );
     
    }
    
    )}
    </div> 
  </div>
    );
  }
};

export default Recipe;
