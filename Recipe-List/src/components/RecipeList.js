import React, { Component } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

class RecipeList extends  Component{
  render() {
    const recipes = this.props.recipes.map((item) => {

      const ingredients = item.ingredients.map((ingredient, i) => {
        return (
          <li className='ingredient list-item' key={'ingredient' + i}>
            {ingredient}
          </li>
        )
      });

      const instructions = item.instructions.map((instruction, i) => {
        return (
          <li className='instruction list-item' key={'instruction' + i}>
            {instruction}
          </li>
        )
      });

      const details = (!item.visible ? null : <div className='recipe-details'>
        <div className='list-title ingredients-title'>
          Ingredients
        </div>
        <ul className='ingredients-list list'>
          {ingredients}
        </ul>
        <div className='list-title instructions-title'>
          Instructions
        </div>
        <ol className='instructions-list list'>
          {instructions}
        </ol>
        <div className='details-button-row'>
          <button
            className='std-button close-button'
            id={'closeBtn'+item.id}
            onClick={this.props.hideDetails}>
            Close
          </button>
          <button
            className='std-button edit-button'
            id={'editBtn'+item.id}
            onClick={this.props.handleEditRequest}>
            Edit
          </button>
          <button
            id={'deleteBtn'+item.id}
            className='std-button delete-button'
            onClick={this.props.deleteRecipe}>
            Delete
          </button>
        </div>
      </div>);

      return (
        <div className='recipe' key={item.id} id={item.id}>
          <div
            onClick={(!item.visible ? this.props.showDetails : this.props.hideDetails)}
            className='recipe-title'
            id={'title'+item.id}>
            {item.name}
          </div>
          <CSSTransitionGroup
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
            transitionName='slideDown'>
            {details}
          </CSSTransitionGroup>
        </div>
      )
    })

    return (
      <div id='recipe-list'>
        <div className='recipe-page-title'>
          RECIPES
        </div>
          {recipes}
      </div>
    )
  }
}
export default RecipeList;
