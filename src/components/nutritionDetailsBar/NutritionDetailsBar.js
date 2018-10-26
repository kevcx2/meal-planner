import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import ScrollLock from 'react-scrolllock';

import { ContextConsumer } from '../../state/context';
import NutritionPicker from './NutritionPicker';

import './NutritionDetailsBar.css';

// TODO: extract into a central constants file.
const CALS_PER_GRAM_PROTEIN = 4;
const CALS_PER_GRAM_CARBS = 4;
const CALS_PER_GRAM_FAT = 9;

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

  // TODO: extract into util
  getMacroGramsFromPercent(cals, percentProtein, percentCarbs, percentFat) {
    const gramsProtein =
      parseInt((cals * (percentProtein / 100)) / CALS_PER_GRAM_PROTEIN, 10);
    const gramsCarbs =
      parseInt((cals * (percentCarbs / 100)) / CALS_PER_GRAM_CARBS, 10);
    const gramsFat =
      parseInt((cals * (percentFat / 100)) / CALS_PER_GRAM_FAT, 10);

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
              <div className={barClass} onClick={this.onOpenNutritionPicker}>
                {this.renderGoalNutritionRow(goalCals, goalProtein, goalCarbs, goalFat)}
                {this.renderMealPlanNutritionRow(mealPlan, menu)}
                {this.renderNutritionColumnLabels()}
                <div></div>
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
