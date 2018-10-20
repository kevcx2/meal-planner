import React, { Component } from 'react';

import AppStateProvider from './state/AppStateProvider';
import TopBar from './components/TopBar';

class App extends Component {
  render() {
    return (      
      <AppStateProvider>
        <TopBar/>
      </AppStateProvider>
    );
  }
}

export default App;
