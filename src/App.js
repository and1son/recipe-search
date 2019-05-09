import React, {Component} from 'react';
import './App.css';
import Form from "./components/Form"
import Recipes from "./components/Recipes"

const API = "6c5fb4e986d45bc7e606e42f70dc33bc"



class App extends Component{
  state = {
    recipes : []
  }
  getRecipe = async (e) => { 
    const recipeName = e.target.elements.recipeName.value
    e.preventDefault()
    const api_call = await fetch(`https://www.food2fork.com/api/search?key=${API}&q=${recipeName}&count=10`)
    const data = await api_call.json()
    this.setState({ recipes : data.recipes })
    console.log(this.state.recipes)
  }

  componentDidMount = () => {
    const json = localStorage.getItem("recipes")
    const recipes = JSON.parse(json)
    this.setState({
      recipes : recipes
    })

  }

  componentDidUpdate = () => {
    const recipes = JSON.stringify(this.state.recipes)
    localStorage.setItem("recipes", recipes)


  }


  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h1> Recipe search </h1>
        </header>
        <Form getRecipe = {this.getRecipe}  />
        <Recipes recipes={this.state.recipes} />
      </div>
    );
  }
}

export default App;
