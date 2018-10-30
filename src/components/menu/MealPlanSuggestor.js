import React, { Component } from 'react';

import { createMealPlan } from '../../util/lpSolver';

import './MealPlanSuggestor.css';
import '../../button.css';

class MealPlanSuggestor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mealPlan: createMealPlan(
        props.menu,
        props.goalCals,
        props.goalProtein,
        props.goalCarbs,
        props.goalFat
      ),
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      mealPlan: createMealPlan(
        props.menu,
        props.goalCals,
        props.goalProtein,
        props.goalCarbs,
        props.goalFat
      ),
    };
  }

  onSetMealPlan = () => {
    this.props.onSetMealPlan(this.state.mealPlan);
  }

  render() {
    const suggestedMealPlan = this.state.mealPlan;
    const showSuggestion = 
      suggestedMealPlan &&
      suggestedMealPlan.sort().toString() !== this.props.currentMealPlan.sort().toString();
    const visibleClass = showSuggestion ? ' MealPlanSuggestor__trigger--visible' : '';

    return (
      <div
        className={`MealPlanSuggestor__trigger${visibleClass} button button--secondary`}
        onClick={this.onSetMealPlan}
      >
        See suggested meal plan
      </div>
    );
  }
}

export default MealPlanSuggestor;
