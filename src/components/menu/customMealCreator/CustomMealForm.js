import React, { Component } from 'react';

import NumberPicker from '../../nutritionDetailsBar/NumberPicker';

import './CustomMealForm.css';
import '../../../button.css';

class CustomMealForm extends Component {
  state = {
    name: '',
    cals: undefined,
    protein: undefined,
    carbs: undefined,
    fat: undefined,
  };

  onUpdateNutrition = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  onAddCustomMeal = () => {
    console.log(this.state);

    this.props.onAddCustomMeal(
      this.state.name,
      this.state.cals,
      this.state.protein,
      this.state.carbs,
      this.state.fat
    );

    this.onExitForm();
  };

  onExitForm = () => {
    this.setState({
      name: '',
      cals: undefined,
      protein: undefined,
      carbs: undefined,
      fat: undefined,
    });

    this.props.onExitForm();
  };

  render() {
    const canSave =
      this.state.name &&
      this.state.cals &&
      this.state.protein !== undefined &&
      this.state.carbs !== undefined &&
      this.state.fat !== undefined;

    return (
      <div className="CustomMealForm__container">
        <div className="CustomMealForm__cancelButtonContainer">
          <div
            className="CustomMealForm__cancelButton"
            onClick={this.onExitForm}
          >
            X
          </div>
        </div>
        <div>
          {this.renderNameInput()}
          <NumberPicker
            defaultValue={this.state.cals}
            onChange={val => this.onUpdateNutrition('cals', val)}
            minVal={0}
            maxVal={5000}
            stepSize={10}
            label="Calories"
            small
          />
          <NumberPicker
            defaultValue={this.state.protein}
            onChange={val => this.onUpdateNutrition('protein', val)}
            minVal={0}
            maxVal={500}
            stepSize={1}
            label="g Protein"
            small
          />
          <NumberPicker
            defaultValue={this.state.carbs}
            onChange={val => this.onUpdateNutrition('carbs', val)}
            minVal={0}
            maxVal={500}
            stepSize={1}
            label="g Carbs"
            small
          />
          <NumberPicker
            defaultValue={this.state.fat}
            onChange={val => this.onUpdateNutrition('fat', val)}
            minVal={0}
            maxVal={500}
            stepSize={1}
            label="g Fat"
            small
          />
        </div>
        <div className="CustomMealForm__buttonContainer">
          <button
            className="CustomMealForm__button button"
            disabled={!canSave}
            onClick={this.onAddCustomMeal}
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  renderNameInput() {
    return (
      <div className="CustomMealForm__inputGroup">
        <input
          value={this.state.name}
          onChange={event => this.onUpdateNutrition('name', event.target.value)}
          type="text"
          className="CustomMealForm__input"
        />
        <div className="CustomMealForm__label">Name</div>
      </div>
    );
  }
}

export default CustomMealForm;
