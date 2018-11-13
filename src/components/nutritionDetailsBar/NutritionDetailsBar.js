import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import ScrollLock from 'react-scrolllock';

import { ContextConsumer } from '../../state/context';
import NutritionPicker from './NutritionPicker';

import {
  getGramsProtein,
  getGramsCarbs,
  getGramsFat,
} from '../../util/macroUtils';

import './NutritionDetailsBar.css';

class NutritionDetailsBar extends Component {
  state = {
    showNutritionPicker: false,
  };

  onOpenNutritionPicker = () => {
    this.setState({
      showNutritionPicker: true,
    });
  }

  onCloseNutritionPicker = () => {
    this.setState({
      showNutritionPicker: false,
    });
  }

  getMealPlanNutrition(mealPlan, menu) {
    let mealPlanCals = 0;
    let mealPlanProtein = 0;
    let mealPlanCarbs = 0;
    let mealPlanFat = 0;

    mealPlan.forEach((mealId) => {
      const meal = menu.find((menuItem) => menuItem.id === mealId);
      mealPlanCals += meal.cals;
      mealPlanProtein += meal.protein;
      mealPlanCarbs += meal.carbs;
      mealPlanFat += meal.fat;
    });

    return {
      mealPlanCals,
      mealPlanProtein,
      mealPlanCarbs,
      mealPlanFat,
    };
  }

  getMacroGramsFromPercent(cals, percentProtein, percentCarbs, percentFat) {
    const gramsProtein = getGramsProtein(cals, percentProtein);
    const gramsCarbs = getGramsCarbs(cals, percentCarbs);
    const gramsFat = getGramsFat(cals, percentFat);

    return {
      gramsProtein,
      gramsCarbs,
      gramsFat,
    };
  }

  render() {
    return (
      <ContextConsumer>
        {(context) => {
          const {
            goalCals,
            goalProtein,
            goalCarbs,
            goalFat,
            changeGoalCals,
            changeGoalMacros,
            menu,
            mealPlan,
          } = context;
          const hasMealPlan = !!mealPlan.length;

          const barClass =
            `NutritionDetailsBar__bar${hasMealPlan ? ' NutritionDetailsBar__bar--large' : ''}`;

          return (
            <div>
              {this.state.showNutritionPicker ? (
                <ScrollLock />
              ) : null}
              <div
                className={barClass}
                onClick={this.onOpenNutritionPicker}
                data-step="1"
                data-intro="Here is your daily nutrition target. Here you can adjust your goal nutrition. 💪"
                data-tooltipclass="NutritionDetailsBar__introTooltip"
              >
                {this.renderGoalNutritionRow(goalCals, goalProtein, goalCarbs, goalFat)}
                {this.renderMealPlanNutritionRow(mealPlan, menu)}
                {this.renderNutritionColumnLabels()}
              </div>
              <Popup
                trigger={(<div className="NutritionDetailsBar__fixedSpacer"></div>)}
                className="NutritionDetailsBar__nutritionPopup"
                open={this.state.showNutritionPicker}
                onClose={this.onCloseNutritionPicker}
                modal
              >
                {(onClose) => (
                  <NutritionPicker
                    onClose={onClose}
                    cals={goalCals}
                    protein={goalProtein}
                    carbs={goalCarbs}
                    fat={goalFat}
                    onChangeCals={changeGoalCals}
                    onChangeMacros={changeGoalMacros}
                  />             
                )}
              </Popup>
            </div>
          );
        }}
      </ContextConsumer>
    );
  }

  renderGoalNutritionRow(goalCals, goalProtein, goalCarbs, goalFat) {
    const {
      gramsProtein: goalGramsProtein,
      gramsCarbs: goalGramsCarbs,
      gramsFat: goalGramsFat
    } = this.getMacroGramsFromPercent(goalCals, goalProtein, goalCarbs, goalFat);

    return this.renderNutritionRow(
      goalCals,
      goalGramsProtein,
      goalGramsCarbs,
      goalGramsFat,
      'Goal: ',
    );
  }

  renderMealPlanNutritionRow(mealPlan, menu) {
    const hasMealPlan = !!mealPlan.length;

    if (hasMealPlan) {
      const {
        mealPlanCals,
        mealPlanProtein,
        mealPlanCarbs,
        mealPlanFat
      } = this.getMealPlanNutrition(mealPlan, menu);

      return this.renderNutritionRow(
        mealPlanCals,
        mealPlanProtein,
        mealPlanCarbs,
        mealPlanFat,
        'My Meals: ',
      );
    } else {
      return null;
    }
  }

  renderNutritionRow(cals, protein, carbs, fat, rowLabel) {
    return (
      <section className="NutritionDetailsBar__row">
        <div className="NutritionDetailsBar__rowContainer">
          <div className="NutritionDetailsBar__rowLabel">{rowLabel}</div>
          {this.renderNutritionDisplaySection(cals, 'Calories')}
          {this.renderNutritionDisplaySection(`${protein}g`)}
          {this.renderNutritionDisplaySection(`${carbs}g`)}
          {this.renderNutritionDisplaySection(`${fat}g`)}
        </div>
      </section>
    );
  }

  renderNutritionColumnLabels() {
    return(
      <div className="NutritionDetailsBar__row NutritionDetailsBar__row--columnLabels">
        <div className="NutritionDetailsBar__rowContainer NutritionDetailsBar__rowContainer--columnLabels">
          <div className="NutritionDetailsBar__rowLabel"></div>
          {this.renderNutritionDisplaySection('Calories')}
          {this.renderNutritionDisplaySection('Protein')}
          {this.renderNutritionDisplaySection('Carbs')}
          {this.renderNutritionDisplaySection('Fat')}
        </div>
      </div>
    );
  }

  renderNutritionDisplaySection(value) {
    return (
      <div className="NutritionDetailsBar__rowSection">
        <div>{value}</div>
      </div>
    );
  }
}

export default NutritionDetailsBar;
