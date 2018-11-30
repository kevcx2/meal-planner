import React, { Component } from 'react';

import { ContextProvider } from './context';
import { createGoalState } from './goal/state';
import { createGoalActions } from './goal/actions';
import { createMenuState } from './menu/state';
import { createMenuActions } from './menu/actions';

import { INITIAL_MENU } from '../util/constants';

class AppStateProvider extends Component {
  state = {
    ...createGoalState(),
    ...createGoalActions(this),
    ...createMenuState(),
    ...createMenuActions(this),
  };

  componentDidMount() {
    this.receiveMenuData();
  }

  receiveMenuData = data => {
    INITIAL_MENU.forEach(menuItem => {
      const { name, cals, protein, carbs, fat } = menuItem;
      this.state.addDefaultMeal(name, cals, protein, carbs, fat);
    });
  };

  render() {
    return (
      <ContextProvider value={this.state}>
        {this.props.children}
      </ContextProvider>
    );
  }
}

export default AppStateProvider;
