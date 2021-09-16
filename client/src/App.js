import React, { Component } from 'react';
import './App.css';
import { Link } from "react-router-dom";
import Recipe from "./components/Recipe/Recipe";
import { Redirect } from 'react-router';

class App extends Component {
  state = {
    redirect: false
  }

  componentDidMount = () => {

  }
  componentDidUpdate = () => {
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/addRecipe' />
    }

  }
  addRecipe(){
    this.setState({redirect:true})
  }
  render() {
    return (
      <div className="App">
          <header>
      <nav id="nav" className="App-header">
        <div className="container-app">
          <h1 className="logo">
            <i className="fa fa-cutlery"></i> Recipes
          </h1>

          <ul className="links-header">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/recipes">Recipes</Link>
            </li>
          </ul>
          <button className="btn" onClick={() => {this.addRecipe()}}><i className="fa fa-plus"></i> Add recipe</button>
          {this.renderRedirect()}
        </div>
      </nav>
    </header>
        <Recipe />
      </div>
    );
  }
}

export default App;
