import React, { Component } from 'react';

import CaloriePicker from './CaloriePicker';
import MacroPicker from './MacroPicker';  

import './NutritionPicker.css';

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
        <CaloriePicker defaultValue={cals} onChange={onChangeCals}/>
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
