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

  render() {
    return (
      <ContextConsumer>
        {(context) => {
          return (
            <div className="Menu__container">
              <MenuTabs
                currentTab={this.state.currentTab}
                onChange={this.onChangeTab}
              />
              <MenuList
                menu={context.menu}
                mealPlan={context.mealPlan}
                onLike={context.toggleLike}
                onDislike={context.toggleDislike}
                onAddToMealPlan={context.addToMealPlan}
                onRemoveFromMealPlan={context.removeFromMealPlan}
              />
            </div>
          );
        }}
      </ContextConsumer>
    );
  }
}

export default Menu;
