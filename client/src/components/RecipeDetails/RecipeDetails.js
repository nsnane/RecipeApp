import React from 'react';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';
import axios from "axios";
import "./SingleRecipe.css";
class RecipeDetails extends React.Component {
    state = {
      singleRecipe: [],
      ingredients:[],
      redirect: false,
      editForm:false,
      valueIngredient:"",
      valueQuantity:"",
      valueTitle:"",
      valueSubTitle:"",
      ingredientsN:[],
      addIngredientForm:false,
      addIngredient:"",
      addQuantity:"",
      redirectToDetailsPage:false,
      redirectToAddPage:false

    }
    constructor(props){
        super(props);
  
    }
    componentWillMount = async () => {
      this.handleChangeIngredient = this.handleChangeIngredient.bind(this);
      this.handleChangeQuantity = this.handleChangeQuantity.bind(this);
      axios.get("http://localhost:5000/recipes/"+this.props.match.params.id)
      .then(response => {
        this.setState({ singleRecipe: response.data});
        this.setState({valueTitle:response.data.title,valueSubTitle:response.data.subTitle,ingredientsN:response.data.ingredients });
        let tableingredients=[];
        response.data.ingredients.forEach(element => {
            axios.get("http://localhost:5000/ingredients/"+element)
            .then(response => {
                const obj={
                 id:response.data._id,
                 name:response.data.name,
                 quantity:response.data.quantity
                }
                tableingredients.push(obj);
                this.setState({ 
              
                ingredients: tableingredients,
                valueIngredient:response.data.name,
                valueQuantity:response.data.quantity});
            });
        });
      });
    }
    handleChangeIngredient (e) {
      this.setState({valueIngredient:e.target.value})
    }
    handleChangeQuantity (e) {
      this.setState({valueQuantity:e.target.value})
    }
     deleteRecipe(id_Recipe) {
        axios.delete("http://localhost:5000/recipes/"+id_Recipe)
        .then(response => { 
            this.setState({ redirect: true});
        });
      }
      editRecipe(){
        this.setState({ editForm: true})
      }
      renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/recipes' />
        }else if(this.state.redirectToDetailsPage){
          return <Redirect to={`/recipe/${this.state.singleRecipe._id}`} />
        }else if(this.state.redirectToAddPage){
          return <Redirect to={`/addRecipe`} />
        }
   
      }
      editIngredient(id_Ingredient){
        const Ingredient={
          name:this.state.valueIngredient,
          quantity:this.state.valueQuantity
        }
        axios.put("http://localhost:5000/ingredients/"+id_Ingredient,Ingredient)
        .then(response => { 
          
        });

      }
      handleChangeTitle(e){
        this.setState({valueTitle:e.target.value})
      }
      handleChangeSubTitle(e){
        this.setState({valueSubTitle:e.target.value})
        
      }
      editRecipeValues(id){
 
        const Ingredient={
          name:  this.state.addIngredient,
          quantity: this.state.addQuantity,
          Recipe:this.state.singleRecipe._id
        }
        if(Ingredient.name!=""&&Ingredient.quantity!=""){
          axios.post("http://localhost:5000/ingredients/addIngredient",Ingredient)
          .then(response => { 


          });
          axios.get("http://localhost:5000/ingredients/getAllIngredientsByIdRecipe/"+this.state.singleRecipe._id)
          .then(response => { 
            this.setState({ingredientsN:response.data})
          });
        }
        const Recipe={
          title:this.state.valueTitle,
          subTitle:this.state.valueSubTitle,
          ingredients:this.state.ingredientsN
        }
        axios.put("http://localhost:5000/recipes/"+id,Recipe)
        .then(response => { 
          this.setState({redirectToDetailsPage:true})
        });
      }
      deleteIngredient(id){

        axios.delete("http://localhost:5000/ingredients/"+id)
        .then(response => { 
          this.setState({redirect:true})
        });
      }
      handleChangeAddIngredient(e){
        this.setState({addIngredient:e.target.value})

      }
      handleChangeAddQuantity(e){
        this.setState({addQuantity:e.target.value})
      }
      addIngredient(){
        this.setState({addIngredientForm:true});
   
      }
      redirectaddRecipe(){
        this.setState({redirectToAddPage:true})
      }
    render() {
      return (
        <div className="">
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
          <button className="btn" onClick={() => {this.redirectaddRecipe()}}><i className="fa fa-plus"></i> Add recipe</button>
        </div>
      </nav>
    </header>
          <div className="row">
{!this.state.editForm ?(

<div className="recipe_container">
<div className="recipe_pic">
  <img  src={
    "https://i.ibb.co/KFpCKPb/anna-pelzer-IGf-IGP5-ONV0-unsplash.jpg"
    } alt="" />
</div>

<div className="" >

  <div className="text" >
    <h4>
      <span className="drink-data">Title :</span>
    </h4>
    <span className="text-style">{this.state.singleRecipe.title}</span>
    <br></br>
    <h4>Subtitle :</h4>
    <span className="text-style">{this.state.singleRecipe.subTitle}</span>
    <div>
   
    </div>
    <br></br>
    <h4>
      <span className="drink-data">Ingredients :</span>
    </h4>
    {
        this.state.ingredients.map((item, index) => {
          return (
            <div key={index}>
             <ul><li style={{listStyle:"square"}}><span className="text-style">{item.quantity} {item.name} </span></li></ul> 
            </div>
          );
        })}
    <p></p>
  </div>
  <div style={{marginTop:200,marginLeft:500}} className="btn-group">
  <button className="btn-edit" onClick={() => {this.editRecipe()}}>Edit Recipe</button>
  <button className="btn-danger" onClick={() => {this.deleteRecipe(this.state.singleRecipe._id)}}>Delete Recipe</button>
  </div>

</div>
</div>
):null}
 {this.renderRedirect()}
 {this.state.editForm ? (
<div className="recipe_container">
<div className="text">
<h4>
<span className="drink-data">Title :</span>
</h4>
<input type="text" className="form-control form-control-lg" onChange={(e) => {this.handleChangeTitle(e)}}  placeholder="Change title of recipe" defaultValue={this.state.singleRecipe.title}></input>
<h4>
<span className="drink-data">Subtitle :</span>
</h4>
  <input type="text" className="form-control form-control-lg" onChange={(e) => {this.handleChangeSubTitle(e)}}  placeholder="Change the subTitle of recipe" defaultValue={this.state.singleRecipe.subTitle}></input> 
  <h4>
  <span className="drink-data">Ingredients :</span>
  </h4>
 
  {
        this.state.ingredients.map((item, index) => {
          return (
            <div className="input-group" style={{marginBottom:15}}>
            <span className="form-control form-control-lg">Ingredient</span>
            <input type="text" className="form-control" style={{marginRight:50}} defaultValue={item.name} onChange={(e) => {this.handleChangeIngredient(e)}} placeholder="Ingredient name"  />
            <span className="form-control form-control-lg"  style={{borderLeft:0,borderRight:0}}>Quantity</span>
            <input type="text" className="form-control"   defaultValue={item.quantity} onChange={(e) => {this.handleChangeQuantity(e)}} placeholder="Ingredient quantity" />
            <button className="btn-edit" onClick={() => {this.editIngredient(item.id)}}>Edit ingredient</button>
            <button className="btn-danger" onClick={() => {this.deleteIngredient(item.id)}}>Delete ingredient</button>
            </div>
          );
        })
        }
        <button className="btn-edit" onClick={() => {this.editRecipeValues(this.state.singleRecipe._id) }} style={{marginLeft:350,marginTop:50}}>Edit Recipe</button>
          </div>
          </div>
     )
    :null
    }
    
      </div> 
    </div>
      );
    }
  };
  
  export default RecipeDetails;
  