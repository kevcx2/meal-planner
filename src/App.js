import React, { Component } from 'react';

import AppStateProvider from './state/AppStateProvider';
import NutritionDetailsBar from './components/nutritionDetailsBar/NutritionDetailsBar';
import Menu from './components/menu/Menu';

class App extends Component {
  render() {
    return (
      <AppStateProvider>
        <NutritionDetailsBar />
        <Menu />
      </AppStateProvider>
    );
  }
}

export default App;
