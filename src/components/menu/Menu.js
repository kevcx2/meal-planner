import React, { Component } from 'react';

import { ContextConsumer } from '../../state/context';
import MenuTabs from './MenuTabs';
import MenuList from './MenuList';

import './Menu.css';

// TODO: move these constants into separate file for sharing
const MENU_TAB = 'Menu';

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
            mealPlan,
            toggleLike,
            toggleDislike,
            addToMealPlan,
            removeFromMealPlan,
          } = context;

          const menu = this.getMenuToDisplay(context.menu, mealPlan);

          return (
            <div className="Menu__container">
              <MenuTabs
                currentTab={this.state.currentTab}
                onChange={this.onChangeTab}
              />
              <MenuList
                menu={menu}
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
