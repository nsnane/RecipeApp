import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import App from "../App";
import Recipe from "./Recipe/Recipe";
import RecipeDetails from "./RecipeDetails/RecipeDetails";
import NewRecipe from "./Recipe/NewRecipe";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/recipes" component={App} exact />
      <Route path="/" component={App} exact />
      <Route path="/recipe/:id" component={RecipeDetails} />
      <Route path="/addRecipe" component={NewRecipe} />
    </Switch>
  </BrowserRouter>
);

export default Router;



