import React from 'react';
import "./Recipe.css";
import { Link, Redirect } from "react-router-dom";
import FormRecipe from './FormRecipe';
class NewRecipe extends React.Component {

  render() {
    return (
      <div>
      <header>
      <nav id="nav" className="App-header">
        <div className="container-app">
          <h1 className="logo" style={{marginRight:200}}>
            <i className="fa fa-cutlery"></i> Recipes
          </h1>
          <ul className="links-header"  style={{marginRight:400}}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/recipes">Recipes</Link>
            </li>
          </ul>
    
        </div>
      </nav>
    </header>
    <div className="container" style={{marginTop:50}}> 
       <FormRecipe/>
  </div> 
 
  </div>

    );
  }
};

export default NewRecipe;
