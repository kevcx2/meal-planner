import React, { Component } from 'react';

import { ContextProvider } from './context';
import { createGoalState } from './goal/state';
import { createGoalActions } from './goal/actions';
import { createMenuState } from './menu/state';
import { createMenuActions } from './menu/actions';

class AppStateProvider extends Component {
  state = {
    ...createGoalState(),
    ...createGoalActions(this),
    ...createMenuState(),
    ...createMenuActions(this),
  };

  render() {
    return <ContextProvider value={this.state}>
      {this.props.children}
    </ContextProvider>
  }
}

export default AppStateProvider;
