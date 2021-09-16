import React, { useState } from "react";
import "./Recipe.css";
import axios from "axios";
import { Redirect } from "react-router-dom";
function FormRecipe() {
  const [inputList, setInputList] = useState([{ name: "", quantity: "" }]);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [redirect, setredirect] = useState(false);
  const [ingredients, setIngredients] = useState([]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
  const handleChangeTitle= (index) => {
  setTitle(index.target.value)
  };
  const handleChangeSubTitle= (index) => {
    setSubTitle(index.target.value)
    };
  

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { name: "", quantity: "" }]);
  };
  const renderRedirect =()=>{
    if(redirect){
      return <Redirect to='/recipes' />
    }
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    inputList.forEach(element => {
      if(element.name===""&&element.quantity===""){
  
       inputList.pop(element);
      }
    });
  if( (inputList.length===0) ){
   alert("You must add at least one ingredient ")
  }else{
    let tabIngredients=[];
    let i=0;
  inputList.forEach(element => {
    if(element.name!==""&&element.quantity!==""){
  
        axios.post("http://localhost:5000/ingredients/addIngredient",element)
        .then(response => { 
            tabIngredients.push(response.data._id)
            setIngredients(tabIngredients)
            i++;
            if(i===inputList.length){
                const Recipe={
                    title:  title,
                    subTitle: subTitle,
                    ingredients:tabIngredients
                  }
                  axios.post("http://localhost:5000/recipes/addRecipe",Recipe)
                  .then(response => { 
                  setredirect(true)
                  });
            }
            
          
        });
    }

    
});
   
  }
  }


  return (
<div className="container">
<form onSubmit={(e) => {handleSubmit(e)}}>
<h4>
<span className="drink-data">Title</span>
</h4>
<input type="text" className="form-control form-control-lg" required onChange={(e) => {handleChangeTitle(e)}}  placeholder="Recipe title" ></input>
<h4>
<span className="drink-data">Subtitle</span>
</h4>
<input type="text" className="form-control form-control-lg" onChange={(e) => {handleChangeSubTitle(e)}}  placeholder="Recipe Subtitle" ></input> 
<h4><span  className="drink-data"  >Ingredients</span></h4>
      {inputList.map((x, i) => {
        return (
          <div className="box" key={i}>
            <input
              className="form-control form-control-lg"
              name="name"
              placeholder="Ingredient Name"
      
              value={x.name}
              style={{marginBottom:15}}
              onChange={e => handleInputChange(e, i)}
            />
        
            <input
             className="form-control form-control-lg"
              name="quantity"
              placeholder="Ingredient Quantity"
          
              value={x.quantity}
              onChange={e => handleInputChange(e, i)}
            />
            <div className="btn-box">
              {inputList.length !== 1 && <button
                className="btn-danger"
                onClick={() => handleRemoveClick(i)}>Remove</button>}
              {inputList.length - 1 === i && <button onClick={handleAddClick} className="btn-add" style={{marginTop:15}}>Add Ingredient</button>}
            </div>
          </div>
        );
      })}
        {inputList.length !== 1 &&
        inputList.map((item, index) => {
          return (
            <div key={index}>
              <p>{item.name} {item.quantity}  </p>
            </div>
          );
        })}
      <button className="btn-danger" type="submit" style={{marginLeft:400}}><i className="fa fa-plus"></i> Add recipe</button>
      {renderRedirect()}
      </form>
    </div>
  );
}

export default FormRecipe;
