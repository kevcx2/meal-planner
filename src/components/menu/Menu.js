import React, { Component } from 'react';
import FadeIn from 'react-fade-in';
import introJs from 'intro.js';

import { ContextConsumer } from '../../state/context';
import MenuTabs from './MenuTabs';
import MenuList from './MenuList';
import MealPlanSuggestor from './MealPlanSuggestor';

import { MENU_TAB, MEAL_PLAN_TAB } from '../../util/constants';

import 'intro.js/introjs.css';
import './Menu.css';

class Menu extends Component {
  state = {
    currentTab: MENU_TAB,
  };

  componentDidMount() {
    const onIntroStepChange = el => {
      if (el.dataset.step === '4') {
        this.onChangeTab(MEAL_PLAN_TAB);
      }
    };

    const onIntroExit = () => {
      this.onChangeTab(MENU_TAB);
    };

    const startIntro = () => {
      introJs()
        .setOption('showStepNumbers', false)
        .onbeforechange(onIntroStepChange)
        .onexit(onIntroExit)
        .start();
    };

    setTimeout(startIntro, 0);
  }

  onChangeTab = tabName => {
    this.setState({
      currentTab: tabName,
    });
  };

  getMenuToDisplay = (fullMenu, mealPlan) => {
    if (this.state.currentTab === MENU_TAB) {
      return fullMenu;
    } else {
      return fullMenu.filter(menuItem => mealPlan.includes(menuItem.id));
    }
  };

  render() {
    return (
      <ContextConsumer>
        {context => {
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
            addCustomMeal,
            setMealPlan,
          } = context;

          const displayMenu = this.getMenuToDisplay(fullMenu, mealPlan);

          return (
            <div className="Menu__container">
              <MenuTabs
                currentTab={this.state.currentTab}
                onChange={this.onChangeTab}
              />
              <div
                className="Menu__suggestion"
                data-step="4"
                data-intro="Click here to see a personalized meal plan that fits your nutrition goals. 🙌"
              >
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
              <FadeIn>
                <MenuList
                  currentTab={this.state.currentTab}
                  menu={displayMenu}
                  mealPlan={mealPlan}
                  onLike={toggleLike}
                  onDislike={toggleDislike}
                  onAddToMealPlan={addToMealPlan}
                  onRemoveFromMealPlan={removeFromMealPlan}
                  onAddCustomMeal={addCustomMeal}
                />
              </FadeIn>
            </div>
          );
        }}
      </ContextConsumer>
    );
  }
}

export default Menu;
