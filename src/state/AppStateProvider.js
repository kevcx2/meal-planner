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

  componentDidMount() {
    fetch('https://api.apify.com/v1/5iWJ9eWmADqBzvXGX/crawlers/XrSBDvu5s3wEwojnN/lastExec/results?token=pGM3nKkB4ZmSxaSziHEP5PyKp')
      .then(response => response.json())
      .then(data => this.receiveMenuData(data));
  }

  receiveMenuData = (data) => {
    const menu = data[0].pageFunctionResult.menu;

    menu.forEach((menuItem) => {
      menuItem.liked = false;
      menuItem.disliked = false;
      menuItem.picture = undefined;
    });

    this.setState({
      menu,
    });
  }

  render() {
    return <ContextProvider value={this.state}>
      {this.props.children}
    </ContextProvider>
  }
}

export default AppStateProvider;
