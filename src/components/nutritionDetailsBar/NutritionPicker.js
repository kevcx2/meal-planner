import React, { Component } from 'react';

import NumberPicker from './NumberPicker';
import MacroPicker from './MacroPicker';  

import './NutritionPicker.css';

const MIN_CAL_VALUE = 500;
const MAX_CAL_VALUE = 9999;
const CAL_PICKER_STEP_SIZE = 100;

class NutritionPicker extends Component {
  render() {
    const {
      onClose,
      cals,
      protein,
      carbs,
      fat,
      onChangeCals,
      onChangeMacros,
    } = this.props;

    return (
      <div>
        <div className="NutritionPicker__closePopup" onClick={onClose}>X</div>
        <div className="NutritionPicker__header">Set Nutrition Goal</div>
        <NumberPicker
          defaultValue={cals}
          onChange={onChangeCals}
          minVal={MIN_CAL_VALUE}
          maxVal={MAX_CAL_VALUE}
          stepSize={CAL_PICKER_STEP_SIZE}
          label="Calories"
        />
        <MacroPicker
          totalCalories={cals}
          protein={protein}
          carbs={carbs}
          fat={fat}
          onChange={onChangeMacros}
        />
      </div>
    );
  }
}

export default NutritionPicker;
