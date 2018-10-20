import React, { Component } from 'react';
import Popup from "reactjs-popup";

import { ContextConsumer } from '../state/context';
import CaloriePicker from './CaloriePicker';
import MacroPicker from './MacroPicker';

import './TopBar.css';

import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

class TopBar extends Component {
  render() {    
    return (
      <ContextConsumer>
        {context => {
          const { cals } = context;
          return (
            <Popup
              trigger={this.renderTopBar(cals)}
              className="TopBar__nutritionPopup"
              modal
            >
              {onClose => this.renderNutritionPicker(onClose, context)}
            </Popup>
          );
        }}
      </ContextConsumer>
    );
  }

  renderTopBar(cals) {
    return (
      <div>
        <div className="TopBar__bar">
          <span className="TopBar__calorieCount">{cals}</span>
        </div>
        <div className="TopBar__fixedSpacer"/>
      </div>
    );
  }

  renderNutritionPicker(onClose, appContext) {
    const { cals, protein, carbs, fat, changeCals, changeMacros } = appContext;
    return (
      <div>
        <div className="TopBar__closePopup" onClick={onClose}>X</div>
        <CaloriePicker defaultValue={cals} onChange={changeCals}/>
        <MacroPicker
          totalCalories={cals}
          protein={protein}
          carbs={carbs}
          fat={fat}
          onChange={changeMacros}
        />
      </div>
    );
  }
}

export default TopBar;
