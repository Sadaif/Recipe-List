import React, { Component } from 'react';
import AddRecipe from './components/AddRecipe';
import RecipeList from './components/RecipeList';
 

 class App extends Component { 
  constructor(props) {
    super(props);

    this.state = {
      recipes: [{
        id: 0,
        name: 'Cold Pea Salad Recipe',
        ingredients: [
          '16-ounces frozen petite peas (do not thaw)',
          '6 ounces smokehouse almonds',
          '1/2 cup chopped green onions',
          '8 ounces chopped water chestnuts',
          '2/3 cup mayonnaise',
          '2 tsp yellow curry powder',
          'Salt and freshly ground pepper to taste'
        ],
        instructions: [
          'Remove the excess salt and chop the almonds: In a fine-mesh strainer under cold running water, rinse the almonds to remove the excess salt. Spread between 2 paper towel layers and pat dry. Spread on a cutting board, and coarse chop with a large knife.',
          'Combine the salad ingredients: In a large bowl, whisk the mayonnaise, curry powder, salt, and pepper until smooth. Add the peas, scallions, and water chestnuts to the bowl. Gently fold the salad into the mayonnaise dressing. Taste and add more salt and pepper, if you like. Refrigerate until ready to serve.',
          'Add the almonds: Just before serving, stir in the chopped almonds.'
        ],
        visible: false
      }, {
        id: 1,
        name: 'Chicken Tortilla Pie',
        ingredients: [
          '2 cups shredded cooked chicken breast',
          '1/4 cup Fresh Salsa',
          '1 cup spicy black bean dip',
          '4 (8-inch) multigrain flour tortillas',
          '1/2 cup (2 ounces) shredded Monterey Jack cheese',
          'Cooking spray or butter'
        ],
        instructions: [
          'Preheat oven to 450°.',
          'Combine chicken and salsa in a medium bowl.',
          'Spread 1/4 cup black bean dip over each tortilla. Top each evenly with chicken mixture and 2 tablespoons cheese. Stack tortillas in bottom of a 9-inch springform pan coated with cooking spray or butter. Bake at 450° for 10 minutes or until thoroughly heated and cheese melts. Remove sides of pan. Cut pie into 4 wedges. Serve immediately.'
        ],
        visible: false
      }, {
        id: 2,
        name: 'Rosemary Fig Chicken',
        ingredients: [
          '1/2 teaspoon salt',
          '1/2 teaspoon garlic powder',
          '1/2 teaspoon freshly ground black pepper',
          '4 (6-ounce) skinless, boneless chicken breast halves',
          'Butter-flavored cooking spray',
          '2/3 cup fig preserves',
          '1 tablespoon minced fresh rosemary',
          '6 tablespoons port or other sweet red wine'
        ],
        instructions: [
          'Sprinkle first 3 ingredients evenly over chicken. Coat chicken with cooking spray.',
          'Heat a large nonstick skillet over medium-high heat. Add chicken; cook 3 minutes on each side or until browned. Combine fig preserves, rosemary, and wine in a bowl; add to chicken, stirring gently. Cover, reduce heat to medium, and cook 6 minutes or until chicken is done. Uncover and cook 1 minute over medium-high heat or until sauce is slightly thick. Serve sauce over chicken.'
        ],
        visible: false
      }],
      index: 2,
      modalVisible: false,
      recipeToEdit: undefined
    }

    this.showDetails = this.showDetails.bind(this);
    this.hideDetails = this.hideDetails.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.resizeTextarea = this.resizeTextarea.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
    this.handleEditRequest = this.handleEditRequest.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.checkIfBackdropClicked = this.checkIfBackdropClicked.bind(this);
    this.cancelFormReload = this.cancelFormReload.bind(this);
  }

    componentWillMount() {
    if (!window.localStorage._recipeBookRecipes) {
      window.localStorage._recipeBookRecipes = JSON.stringify(this.state.recipes);
      window.localStorage._recipeBookIndex = this.state.index
    }
    else {
      this.setState({
        recipes: JSON.parse(window.localStorage._recipeBookRecipes),
        index: parseInt(window.localStorage._recipeBookIndex)
      });
    }
  }

  componentDidUpdate() {
    window.localStorage._recipeBookRecipes = JSON.stringify(this.state.recipes);
    window.localStorage._recipeBookIndex = this.state.index;
  }

   
  showDetails(e) {
    const recipeId = e.currentTarget.getAttribute('id').replace(/\D/g, '')
    const recipeIndex = this.state.recipes.findIndex((el) =>{
      return el.id === parseInt(recipeId)
    });
    let newArr = this.state.recipes.slice();
    for (let i = 0; i < newArr.length; i++) {
      newArr[i].visible = false;
    }
    newArr[recipeIndex].visible = true;
    this.setState({recipes: newArr});
  }

 
  hideDetails(e) {
    const recipeId = e.currentTarget.getAttribute('id').replace(/\D/g, '')
    const recipeIndex = this.state.recipes.findIndex((el) =>{
      return el.id === parseInt(recipeId)
    });
    let newArr = this.state.recipes.slice();
    newArr[recipeIndex].visible = false;
    this.setState({recipes: newArr});
  }

 
  showModal() {
    this.setState({modalVisible: true});
  }

 
  closeModal() {
    this.setState({modalVisible: false});
    this.setState({recipeToEdit: undefined});
  }

 
  resizeTextarea(e) {
    const textarea = e.currentTarget;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight+'px';
    textarea.scrollTop = textarea.scrollHeight;
  }

 
  addRecipe() {
    const newName = document.getElementById('editor-name').value;
    const newIngredients = document.getElementById('editor-ingredients').value.split('\n');
    const newInstructions = document.getElementById('editor-instructions').value.split('\n');
    if (!newName || !newIngredients || !newInstructions) {
      document.getElementById('editor-name').setAttribute('required', true);
      document.getElementById('editor-ingredients').setAttribute('required', true);
      document.getElementById('editor-instructions').setAttribute('required', true);
      return null;
    }

    const newIndex = this.state.index + 1;
    this.setState({
      index: newIndex,
    });
    const newArr = this.state.recipes.slice();
    newArr.push({
      id: newIndex,
      name: newName,
      ingredients: newIngredients,
      instructions: newInstructions,
      visible: false
    });
    this.setState({recipes: newArr});
    this.closeModal();
  }

  handleEditRequest(e) {
    const recipeNum = e.currentTarget.getAttribute('id').replace(/\D/g, '');
    function findId(el) {
      return el.id === parseInt(recipeNum);
    }
    const recipe = this.state.recipes.filter(findId)[0];
    this.setState({recipeToEdit: recipe});
    this.showModal();
  }

  editRecipe() {
    const recipeIndex = this.state.recipes.findIndex((el) =>{
      return el.id === this.state.recipeToEdit.id;
    });
    const newName = document.getElementById('editor-name').value;
    const newIngredients = document.getElementById('editor-ingredients').value.split('\n');
    const newInstructions = document.getElementById('editor-instructions').value.split('\n');
    const newArr = this.state.recipes.slice();

    if (!newName || !newIngredients || !newInstructions) {
      document.getElementById('editor-name').setAttribute('required', true);
      document.getElementById('editor-ingredients').setAttribute('required', true);
      document.getElementById('editor-instructions').setAttribute('required', true);
      return null;
    }

    newArr[recipeIndex] = {
      id: this.state.recipeToEdit.id,
      name: newName,
      instructions: newInstructions,
      ingredients: newIngredients,
      visible: true
    }

    this.setState({
      recipes: newArr,
      recipeToEdit: undefined
    });
    this.closeModal();
  }

  deleteRecipe(e) {
    const recipeNum = e.currentTarget.getAttribute('id').replace(/\D/g, '')
    const recipeIndex = this.state.recipes.findIndex((el) =>{
      return el.id === parseInt(recipeNum);
    });
    const newRecipes = this.state.recipes.slice();
    newRecipes.splice(recipeIndex, 1);
    this.setState({recipes: newRecipes});
  }

  checkIfBackdropClicked(e) {
    if(e.target.getAttribute('class') !== 'backdrop') {
      return;
    }
    this.closeModal();
  }

  cancelFormReload(e) {
    e.preventDefault();
    if(this.state.recipeToEdit===undefined) {
      this.addRecipe();
    }
    else if (this.state.recipeToEdit!==undefined) {
      this.editRecipe();
    }
  }

  render() {
    return (
      <div id='app-container'>
      
        <AddRecipe
          cancelFormReload = {this.cancelFormReload}
          modalVisible= {this.state.modalVisible}
          closeModal = {this.closeModal}
          checkIfBackdropClicked = {this.checkIfBackdropClicked}
          resizeTextarea = {this.resizeTextarea}
          addRecipe = {this.addRecipe}
          editRecipe = {this.editRecipe}
          recipeToEdit = {this.state.recipeToEdit} />
        <RecipeList
          recipes = {this.state.recipes}
          showDetails = {this.showDetails}
          hideDetails = {this.hideDetails}
          handleEditRequest = {this.handleEditRequest}
          deleteRecipe = {this.deleteRecipe} />
        <button className='std-button add-recipe-button' onClick={this.showModal}>
          Add Recipe
        </button>
      </div>
    )
  }
}

export default App;
