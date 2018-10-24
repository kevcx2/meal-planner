import React, { Component } from 'react';

import AppStateProvider from './state/AppStateProvider';
import GoalNutritionBar from './components/goalNutritionBar/GoalNutritionBar';
import Menu from './components/menu/Menu';

class App extends Component {
  render() {
    return (      
      <AppStateProvider>
        <GoalNutritionBar />
        <Menu />
      </AppStateProvider>
    );
  }
}

export default App;
