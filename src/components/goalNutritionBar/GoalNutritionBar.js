import React, { Component } from 'react';
import Popup from "reactjs-popup";

import { ContextConsumer } from '../../state/context';
import NutritionPicker from './NutritionPicker';

import './GoalNutritionBar.css';

// TODO: extract into a central constants file.
const CALS_PER_GRAM_PROTEIN = 4;
const CALS_PER_GRAM_CARBS = 4;
const CALS_PER_GRAM_FAT = 9;

class GoalNutritionBar extends Component {
  state = {
    showNutritionPicker: false,
  };

  onOpenNutritionPicker = () => {
    this.setState({
      showNutritionPicker: true,
    });

    document.body.classList.add('noScroll');
  }

  onCloseNutritionPicker = () => {
    this.setState({
      showNutritionPicker: false,
    });

    document.body.classList.remove('noScroll');
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

          const fixedSpacerClass =
            `GoalNutritionBar__fixedSpacer ${hasMealPlan ? 'GoalNutritionBar__fixedSpacer--large' : ''}`;
          const barClass =
            `GoalNutritionBar__bar${hasMealPlan ? ' GoalNutritionBar__bar--large' : ''}`;

          return (
            <div>
              <div className={barClass}>
                {this.renderGoalNutritionRow(goalCals, goalProtein, goalCarbs, goalFat)}
                {this.renderMealPlanNutritionRow(mealPlan, menu)}
                {this.renderNutritionColumnLabels()}
                <div></div>
              </div>
              <Popup
                trigger={(<div className={fixedSpacerClass}></div>)}
                className="GoalNutritionBar__nutritionPopup"
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
      'Nutrition Goals: ',
      true,
      this.onOpenNutritionPicker,
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

  renderNutritionRow(cals, protein, carbs, fat, rowLabel, clickable, onClick) {
    const rowClass =
      `GoalNutritionBar__row${clickable ? ' GoalNutritionBar__row--clickable' : ''}`;

    return (
      <section className={rowClass} onClick={onClick}>
        <div className="GoalNutritionBar__rowContainer">
          <div className="GoalNutritionBar__rowLabel">{rowLabel}</div>
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
      <div className="GoalNutritionBar__row GoalNutritionBar__row--columnLabels">
      <div className="GoalNutritionBar__rowContainer GoalNutritionBar__rowContainer--columnLabels">
        <div className="GoalNutritionBar__rowLabel"></div>
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
      <div className="GoalNutritionBar__rowSection">
        <div>{value}</div>
      </div>
    );
  }
}

export default GoalNutritionBar;
