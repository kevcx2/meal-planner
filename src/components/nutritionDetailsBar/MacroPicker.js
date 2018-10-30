import React, { Component } from 'react';

import MacroSelectionSlider from './MacroSelectionSlider';

import {
  getGramsProtein,
  getGramsCarbs,
  getGramsFat,
} from '../../util/macroUtils';

import './MacroPicker.css';

class MacroPicker extends Component {
  render() {
    const {
      protein: percentProtein,
      carbs: percentCarbs,
      fat: percentFat,
      totalCalories,
    } = this.props;

    const gramsProtein = getGramsProtein(totalCalories, percentProtein);
    const gramsCarbs = getGramsCarbs(totalCalories, percentCarbs);
    const gramsFat = getGramsFat(totalCalories, percentFat);

    return (
      <React.Fragment>
        <div className="MacroPicker__macroSectionsContainer">
        {this.renderMacroSection('Protein', percentProtein, gramsProtein)}
        {this.renderMacroSection('Carbs', percentCarbs, gramsCarbs)}
        {this.renderMacroSection('Fat', percentFat, gramsFat)}
        </div>
        <MacroSelectionSlider
          percentProtein={percentProtein}
          percentCarbs={percentCarbs}
          onChange={this.props.onChange}
        />
      </React.Fragment>
    )
  }

  renderMacroSection(title, percentMacro, gramsMacro) {
    return (
      <div className="MacroPicker__macroSection">
        <div className="MacroPicker__macroSectionTitle">
          {title}
        </div>
        <div>{`${percentMacro}%`}</div>
        <div>{`${gramsMacro}g`}</div>
      </div>
    );
  }
}

export default MacroPicker;
