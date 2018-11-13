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
    // fetch('https://api.apify.com/v1/5iWJ9eWmADqBzvXGX/crawlers/XrSBDvu5s3wEwojnN/lastExec/results?token=pGM3nKkB4ZmSxaSziHEP5PyKp')
    //   .then(response => response.json())
    //   .then(data => this.receiveMenuData(data));

    this.receiveMenuData();
  }

  receiveMenuData = (data) => {
    // const menu = data[0].pageFunctionResult.menu;

    const menu = [
      {
        "name": "Egg Scramble and Potato Breakfast",
        "cals": 200,
        "protein": 19,
        "carbs": 17,
        "fat": 6
      },
      {
        "name": "Beef Patty, Brown Rice, Mixed Vegetables Meal",
        "cals": 400,
        "protein": 33,
        "carbs": 36,
        "fat": 14
      },
      {
        "name": "Turkey Patty, Brown Rice, Mixed Vegetables Meal",
        "cals": 390,
        "protein": 34,
        "carbs": 36,
        "fat": 12
      },
      {
        "name": "Basa, Brown Rice, Mixed Vegetables Meal",
        "cals": 280,
        "protein": 26,
        "carbs": 38,
        "fat": 4
      },
      {
        "name": "Chicken Tenders, Brown Rice, Mixed Vegetables Meal",
        "cals": 350,
        "protein": 38,
        "carbs": 36,
        "fat": 5
      },
      {
        "name": "Egg Scramble with Sausage and Potato Breakfast",
        "cals": 240,
        "protein": 21,
        "carbs": 27,
        "fat": 6
      },
      {
        "name": "Beef Patty, Sweet Potato, Mixed Vegetables Meal",
        "cals": 370,
        "protein": 32,
        "carbs": 32,
        "fat": 13
      },
      {
        "name": "Chicken Breast, Sweet Potato, Mixed Vegetables Meal",
        "cals": 310,
        "protein": 37,
        "carbs": 32,
        "fat": 4
      },
      {
        "name": "Salmon, Brown Rice, Mixed Vegetables Meal",
        "cals": 380,
        "protein": 34,
        "carbs": 36,
        "fat": 10
      },
      {
        "name": "Flat Iron Steak, Brown Rice, Mixed Vegetables Meal",
        "cals": 420,
        "protein": 33,
        "carbs": 36,
        "fat": 16
      },
      {
        "name": "Flat Iron Steak, Sweet Potato, Mixed Vegetables Meal",
        "cals": 390,
        "protein": 32,
        "carbs": 32,
        "fat": 15
      },
      {
        "name": "Salmon, Sweet Potato, Mixed Vegetables Meal",
        "cals": 340,
        "protein": 33,
        "carbs": 32,
        "fat": 9
      }
    ];

    menu.forEach((menuItem => {
      const { name, cals, protein, carbs, fat } = menuItem;
      this.state.addDefaultMeal(name, cals, protein, carbs, fat);
    }));
  }

  render() {
    return <ContextProvider value={this.state}>
      {this.props.children}
    </ContextProvider>
  }
}

export default AppStateProvider;
