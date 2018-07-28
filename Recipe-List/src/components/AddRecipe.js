import React, { Component } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
 
class AddRecipe extends Component{
  render() {

    const editor = (!this.props.modalVisible ? null :
      <div className='backdrop'>
        <div className='modal' key='modal'>
          <div className='recipe-editor'>
            <h1 className='editor-titlecard'>
              {this.props.recipeToEdit!== undefined ? 'EDIT RECIPE' : 'ADD RECIPE'}
            </h1>
            <form onSubmit={this.props.cancelFormReload}>
              <input
                id='editor-name'
                type='text'
                placeholder='Recipe Name'
                defaultValue={this.props.recipeToEdit !== undefined ? this.props.recipeToEdit.name : ''} />
              <br/>
              <textarea
                id='editor-ingredients'
                className='editor-textarea'
                placeholder='Separate ingredients by pressing enter after each'
                defaultValue={this.props.recipeToEdit !== undefined ? this.props.recipeToEdit.ingredients.join('\n') : ''}
                onKeyUp={this.props.resizeTextarea}
                onClick={this.props.resizeTextarea}>
              </textarea>
              <br/>
              <textarea
                id='editor-instructions'
                placeholder='Separate steps by pressing enter after each'
                className='editor-textarea'
                defaultValue={this.props.recipeToEdit !== undefined ? this.props.recipeToEdit.instructions.join('\n') : ''}
                onKeyUp={this.props.resizeTextarea}
                onClick={this.props.resizeTextarea}>
              </textarea>
            </form>
          </div>
          <div className="editor-footer">
            {this.props.recipeToEdit !== undefined ?
              <button
                className='std-button modal-edit-recipe'
                onClick={this.props.editRecipe}>
                Finish Edit
              </button> :
              <button
                className='std-button modal-add-recipe'
                onClick={this.props.addRecipe}>
                Add Recipe
              </button> }
              <button
                onClick={this.props.closeModal}
                className='std-button close-modal' >
                Close
              </button>
          </div>
        </div>
      </div>);

    return (
      <div>
      <CSSTransitionGroup
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
        component='div'
        transitionName='fadeInDown'
        onClick={this.props.checkIfBackdropClicked}>
        {editor}
      </CSSTransitionGroup>
        
     </div>
    )
  }
}


export default AddRecipe;
