import React, { Component } from 'react';
import Popup from "reactjs-popup";

import { ContextConsumer } from '../../state/context';
import CaloriePicker from './CaloriePicker';
import MacroPicker from './MacroPicker';

import './GoalNutritionBar.css';

// TODO: extract into a central constants file.
const CALS_PER_GRAM_PROTEIN = 4;
const CALS_PER_GRAM_CARBS = 4;
const CALS_PER_GRAM_FAT = 9;

class GoalNutritionBar extends Component {
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
          const { mealPlan } = context;
          const hasMealPlan = !!mealPlan.length;

          const fixedSpacerClass =
            `GoalNutritionBar__fixedSpacer ${hasMealPlan ? 'GoalNutritionBar__fixedSpacer--large' : ''}`;
          const barClass =
            `GoalNutritionBar__bar${hasMealPlan ? ' GoalNutritionBar__bar--large' : ''}`;

          return (
            <React.Fragment>
              <div className={barClass}>
                <Popup
                  trigger={this.renderGoalNutritionRow(context)}
                  className="GoalNutritionBar__nutritionPopup"
                  modal
                >
                  {(onClose) => this.renderNutritionPicker(onClose, context)}
                </Popup>
                {this.renderMealPlanNutritionRow(context)}
                {this.renderGoalVsPlanDifferenceRow(context)}
              </div>
              <div className={fixedSpacerClass}></div>
            </React.Fragment>
          );
        }}
      </ContextConsumer>
    );
  }

  renderGoalNutritionRow(appContext) {
    const {
      goalCals,
      goalProtein,
      goalCarbs,
      goalFat,
    } = appContext;

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
    );
  }

  renderMealPlanNutritionRow(appContext) {
    const { mealPlan, menu } = appContext;

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

  renderGoalVsPlanDifferenceRow(appContext) {
    const { mealPlan, menu } = appContext;
    const hasMealPlan = !!mealPlan.length;

    if (hasMealPlan) {
      const {
        mealPlanCals,
        mealPlanProtein,
        mealPlanCarbs,
        mealPlanFat
      } = this.getMealPlanNutrition(mealPlan, menu);

      const {
        goalCals,
        goalProtein,
        goalCarbs,
        goalFat,
      } = appContext;

      const {
        gramsProtein: goalGramsProtein,
        gramsCarbs: goalGramsCarbs,
        gramsFat: goalGramsFat
      } = this.getMacroGramsFromPercent(goalCals, goalProtein, goalCarbs, goalFat);

      const calsDiff = goalCals - mealPlanCals;
      const proteinDiff = goalGramsProtein - mealPlanProtein;
      const carbsDiff = goalGramsCarbs - mealPlanCarbs;
      const fatDiff = goalGramsFat - mealPlanFat;

      return this.renderNutritionRow(
        calsDiff,
        proteinDiff,
        carbsDiff,
        fatDiff,
      );
    } else {
      return null;
    }
  }

  renderNutritionRow(cals, protein, carbs, fat, rowLabel, clickable) {
    const rowClass =
      `GoalNutritionBar__row${clickable ? ' GoalNutritionBar__row--clickable' : ''}`;

    return (
      <section className={rowClass}>
        <div className="GoalNutritionBar__rowContainer">
          <div className="GoalNutritionBar__rowLabel">{rowLabel}</div>
          {this.renderNutritionDisplaySection(cals, 'Calories')}
          {this.renderNutritionDisplaySection(`${protein}g`, 'Protein')}
          {this.renderNutritionDisplaySection(`${carbs}g`, 'Carbs')}
          {this.renderNutritionDisplaySection(`${fat}g`, 'Fat')}
        </div>
      </section>
    );
  }

  renderNutritionDisplaySection(value, description) {
    return (
      <div className="GoalNutritionBar__rowSection">
        <div>{value}</div>
        <div className="GoalNutritionBar__rowSectionLabel">{description}</div>
      </div>
    );
  }

  renderNutritionPicker(onClose, appContext) {
    const {
      goalCals,
      goalProtein,
      goalCarbs,
      goalFat,
      changeGoalCals,
      changeGoalMacros,
    } = appContext;

    return (
      <div>
        <div className="GoalNutritionBar__closePopup" onClick={onClose}>X</div>
        <CaloriePicker defaultValue={goalCals} onChange={changeGoalCals}/>
        <MacroPicker
          totalCalories={goalCals}
          protein={goalProtein}
          carbs={goalCarbs}
          fat={goalFat}
          onChange={changeGoalMacros}
        />
      </div>
    );
  }
}

export default GoalNutritionBar;
