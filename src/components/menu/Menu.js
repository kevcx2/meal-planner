import React, { Component } from 'react';

import { ContextConsumer } from '../../state/context';
import MenuTabs from './MenuTabs';
import MenuList from './MenuList';
import MealPlanSuggestor from './MealPlanSuggestor';

import { MENU_TAB } from '../../util/constants';

import './Menu.css';

class Menu extends Component {
  state = {
    currentTab: MENU_TAB,
  }

  onChangeTab = (tabName) => {
    this.setState({
      currentTab: tabName,
    });
  }

  getMenuToDisplay = (fullMenu, mealPlan) => {
    if (this.state.currentTab === MENU_TAB) {
      return fullMenu;
    } else {
      return fullMenu.filter((menuItem => mealPlan.includes(menuItem.id)));
    }
  }

  render() {
    return (
      <ContextConsumer>
        {(context) => {
          const {
            menu: fullMenu,
            goalCals,
            goalProtein,
            goalCarbs,
            goalFat,
            mealPlan,
            toggleLike,
            toggleDislike,
            addToMealPlan,
            removeFromMealPlan,
            setMealPlan
          } = context;

          const displayMenu = this.getMenuToDisplay(fullMenu, mealPlan);

          return (
            <div className="Menu__container">
              <MenuTabs
                currentTab={this.state.currentTab}
                onChange={this.onChangeTab}
              />
              <div className="Menu__suggestion">
                {this.state.currentTab === MENU_TAB ? null : (
                  <MealPlanSuggestor
                    menu={fullMenu}
                    goalCals={goalCals}
                    goalProtein={goalProtein}
                    goalCarbs={goalCarbs}
                    goalFat={goalFat}
                    onSetMealPlan={setMealPlan}
                    currentMealPlan={mealPlan}
                  />
                )}
              </div>
              <MenuList
                menu={displayMenu}
                mealPlan={mealPlan}
                onLike={toggleLike}
                onDislike={toggleDislike}
                onAddToMealPlan={addToMealPlan}
                onRemoveFromMealPlan={removeFromMealPlan}
              />
            </div>
          );
        }}
      </ContextConsumer>
    );
  }
}

export default Menu;
