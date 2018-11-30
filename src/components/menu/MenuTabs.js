import React, { Component } from 'react';

import { MENU_TAB, MEAL_PLAN_TAB } from '../../util/constants';

import './MenuTabs.css';

class MenuTabs extends Component {
  render() {
    const menuTabClass = `MenuTabs__tab${
      this.props.currentTab === MENU_TAB ? ' MenuTabs__tab--active' : ''
    }`;
    const mealPlanTabClass = `MenuTabs__tab${
      this.props.currentTab === MEAL_PLAN_TAB ? ' MenuTabs__tab--active' : ''
    }`;

    return (
      <div className="MenuTabs__container">
        <div
          className={menuTabClass}
          onClick={() => this.props.onChange(MENU_TAB)}
        >
          {MENU_TAB}
        </div>
        <div
          className={mealPlanTabClass}
          onClick={() => this.props.onChange(MEAL_PLAN_TAB)}
          data-step="5"
          data-intro="This tab is where you will see the items you have added to your meal plan. Enjoy!"
        >
          {MEAL_PLAN_TAB}
        </div>
      </div>
    );
  }
}

export default MenuTabs;
