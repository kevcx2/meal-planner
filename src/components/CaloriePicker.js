import React, { Component } from 'react';

import './CaloriePicker.css';

const MIN_CAL_VALUE = 500;
const MAX_CAL_VALUE = 9999;
const PICKER_STEP_SIZE = 100;

class CaloriePicker extends Component {
  constructor(props) {
    super(props);
    this.calorieInputRef = React.createRef();
  }

  onStepCalories = (stepAmount) => {
    const calorieInputEl = this.calorieInputRef.current;
    const currentCalorieValue = parseInt(calorieInputEl.value, 10);

    calorieInputEl.value = currentCalorieValue + stepAmount;
    this.onNewCalorieValue();
  }

  onNewCalorieValue = () => {
    const calorieInputEl = this.calorieInputRef.current;
    const value = parseInt(calorieInputEl.value, 10);

    if (!value || value < MIN_CAL_VALUE) {
      this.props.onChange(MIN_CAL_VALUE);
      calorieInputEl.value = MIN_CAL_VALUE;
      return;
    }

    if (value > MAX_CAL_VALUE) {
      this.props.onChange(MAX_CAL_VALUE);
      calorieInputEl.value = MAX_CAL_VALUE;
      return;
    }

    this.props.onChange(value);
  }

  render() {
    return (
      <div className="CaloriePicker__container">
        <input
          className="CaloriePicker__input"
          ref={this.calorieInputRef}
          type="number"
          defaultValue={this.props.defaultValue}
          onBlur={this.onNewCalorieValue}
          step={PICKER_STEP_SIZE}
          min={MIN_CAL_VALUE}
          max={MAX_CAL_VALUE}
          required
        />
        <div className="CaloriePicker__arrowsContainer">
          <div
            className="CaloriePicker__inputArrowContainer"
            onClick={() => this.onStepCalories(PICKER_STEP_SIZE)}
          >
            <div className="CaloriePicker__inputArrow CaloriePicker__inputArrow--up"/>
          </div>
          <div
            className="CaloriePicker__inputArrowContainer"
            onClick={() => this.onStepCalories(-PICKER_STEP_SIZE)}
          >
            <div className="CaloriePicker__inputArrow CaloriePicker__inputArrow--down"/>
          </div>
        </div>
      </div>
    );
  }
}

export default CaloriePicker;
