import React, { Component } from 'react';

import './NumberPicker.css';

class NumberPicker extends Component {
  constructor(props) {
    super(props);
    this.calorieInputRef = React.createRef();
  }

  onStepCalories = stepAmount => {
    const calorieInputEl = this.calorieInputRef.current;
    const currentCalorieValue = parseInt(calorieInputEl.value, 10);

    calorieInputEl.value = currentCalorieValue + stepAmount;
    this.onNewCalorieValue();
  };

  onNewCalorieValue = () => {
    const calorieInputEl = this.calorieInputRef.current;
    const value = parseInt(calorieInputEl.value, 10);

    if (!value || value < this.props.minVal) {
      this.props.onChange(this.props.minVal);
      calorieInputEl.value = this.props.minVal;
      return;
    }

    if (value > this.props.maxVal) {
      this.props.onChange(this.props.maxVal);
      calorieInputEl.value = this.props.maxVal;
      return;
    }

    this.props.onChange(value);
  };

  render() {
    const isSmall = this.props.small;
    const arrowContainerClass = `NumberPicker__inputArrowContainer${
      isSmall ? ' NumberPicker__inputArrowContainer--small' : ''
    }`;
    const inputClass = `NumberPicker__input${
      isSmall ? ' NumberPicker__input--small' : ''
    }`;
    const labelClass = `NumberPicker__label${
      isSmall ? ' NumberPicker__label--small' : ''
    }`;

    return (
      <div className="NumberPicker__container">
        <div className="NumberPicker__arrowsContainer">
          <div
            className={arrowContainerClass}
            onClick={() => this.onStepCalories(this.props.stepSize)}
          >
            <div className="NumberPicker__inputArrow NumberPicker__inputArrow--up" />
          </div>
          <div
            className={arrowContainerClass}
            onClick={() => this.onStepCalories(-this.props.stepSize)}
          >
            <div className="NumberPicker__inputArrow NumberPicker__inputArrow--down" />
          </div>
        </div>
        <input
          className={inputClass}
          ref={this.calorieInputRef}
          type="number"
          pattern="\d*"
          defaultValue={this.props.defaultValue}
          onBlur={this.onNewCalorieValue}
          step={this.props.stepSize}
          min={this.props.minVal}
          max={this.props.maxVal}
          required
        />
        <span className={labelClass}>{this.props.label}</span>
      </div>
    );
  }
}

export default NumberPicker;
