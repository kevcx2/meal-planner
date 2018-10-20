import React, { Component } from 'react';

import MacroSelectionSlider from './MacroSelectionSlider';

import './MacroPicker.css';

const CALS_PER_GRAM_PROTEIN = 4;
const CALS_PER_GRAM_CARBS = 4;
const CALS_PER_GRAM_FAT = 9;

class MacroPicker extends Component {
  render() {
    const {
      protein: percentProtein,
      carbs: percentCarbs,
      fat: percentFat,
      totalCalories,
    } = this.props;

    const gramsProtein =
      parseInt((totalCalories * (percentProtein / 100)) / CALS_PER_GRAM_PROTEIN, 10);
    const gramsCarbs =
      parseInt((totalCalories * (percentCarbs / 100)) / CALS_PER_GRAM_CARBS, 10);
    const gramsFat =
      parseInt((totalCalories * (percentFat / 100)) / CALS_PER_GRAM_FAT, 10);

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

        // <div>{`protein: ${percentProtein}%`}</div>
        // <div>{`carbs: ${percentCarbs}%`}</div>
        // <div>{`fat: ${percentFat}%`}</div>
        // <div>
        //   <div className="MacroPicker__macroSection MacroPicker__macroSection--protein">
        //     {`${gramsProtein}g`}
        //   </div>
        //   <div className="MacroPicker__macroSection MacroPicker__macroSection--carbs">
        //     {`${gramsCarbs}g`}
        //   </div>
        //   <div className="MacroPicker__macroSection MacroPicker__macroSection--fat">
        //     {`${gramsFat}g`}
        //   </div>
        // </div>

export default MacroPicker;
