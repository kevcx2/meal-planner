import React, { Component } from 'react';

import { ContextProvider } from './context';
import { createTargetState } from './target/state';
import { createTargetActions } from './target/actions';

class AppStateProvider extends Component {
  state = {
    ...createTargetState(),
    ...createTargetActions(this),
  };

  render() {
    return <ContextProvider value={this.state}>
      {this.props.children}
    </ContextProvider>
  }
}

export default AppStateProvider;
