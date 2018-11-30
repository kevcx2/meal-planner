// Customizes InputRange from react-input-range.
import React, { Component } from 'react';
import InputRange from 'react-input-range';

import 'react-input-range/lib/css/index.css';
import './MacroSelectionSlider.css';

// Reserve some space, so that even a section of the slider with a value of 0 will
// still render some area, making it easier to see and interact with all the sections.
const BASE_SLIDER_SPACE = 15;

class MacroSelectionSlider extends Component {
  onChangeMacros = value => {
    let percentProtein = value.min - BASE_SLIDER_SPACE;
    if (percentProtein < 0) percentProtein = 0;
    if (percentProtein > 100) percentProtein = 100;

    let percentCarbs =
      value.max - BASE_SLIDER_SPACE - (percentProtein + BASE_SLIDER_SPACE);
    if (percentCarbs < 0) percentCarbs = 0;
    if (percentCarbs > 100) percentCarbs = 100;
    if (percentCarbs + percentProtein > 100) {
      percentCarbs = 100 - percentProtein;
    }

    let percentFat = 100 - (percentProtein + percentCarbs);
    if (percentFat < 0) percentFat = 0;
    if (percentFat > 100) percentFat = 100;

    this.props.onChange({
      protein: percentProtein,
      carbs: percentCarbs,
      fat: percentFat,
    });
  };

  render() {
    return (
      <div className="MacroSelectionSlider__container">
        <InputRange
          maxValue={100 + 3 * BASE_SLIDER_SPACE}
          minValue={0}
          value={{
            min: this.props.percentProtein + BASE_SLIDER_SPACE,
            max:
              this.props.percentProtein +
              BASE_SLIDER_SPACE +
              (this.props.percentCarbs + BASE_SLIDER_SPACE),
          }}
          onChange={this.onChangeMacros}
        />
      </div>
    );
  }
}

export default MacroSelectionSlider;
