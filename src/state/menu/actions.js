import {
  createMenuItem,
  getNextDefaultId,
  getNextCustomId,
} from '../../util/menu';

export const createMenuActions = provider => ({
  toggleLike: menuItemId => {
    const currentMenuState = provider.state.menu;
    const menuItemIndex = currentMenuState.findIndex(
      menuItem => menuItem.id === menuItemId
    );
    if (menuItemIndex === -1) return;

    const menuState = [...currentMenuState];
    const menuItem = menuState[menuItemIndex];

    if (menuItem.liked) {
      menuItem.liked = false;
      provider.setState({
        menu: menuState,
      });
    } else {
      menuItem.liked = true;
      if (menuItem.disliked === true) {
        menuItem.disliked = false;
      }
      provider.setState({
        menu: menuState,
      });
    }
  },
  toggleDislike: menuItemId => {
    const currentMenuState = provider.state.menu;
    const menuItemIndex = currentMenuState.findIndex(
      menuItem => menuItem.id === menuItemId
    );
    if (menuItemIndex === -1) return;

    const menuState = [...currentMenuState];
    const menuItem = menuState[menuItemIndex];

    if (menuItem.disliked) {
      menuItem.disliked = false;
      provider.setState({
        menu: menuState,
      });
    } else {
      menuItem.disliked = true;
      if (menuItem.liked === true) {
        menuItem.liked = false;
      }
      provider.setState({
        menu: menuState,
      });
    }
  },
  addToMealPlan: menuItemId => {
    provider.setState({
      mealPlan: provider.state.mealPlan.concat([menuItemId]),
    });
  },
  removeFromMealPlan: menuItemId => {
    const currentMealPlan = [...provider.state.mealPlan];
    const mealPlan = currentMealPlan.filter(
      mealPlanItemId => mealPlanItemId !== menuItemId
    );
    provider.setState({
      mealPlan,
    });
  },
  setMealPlan: mealPlan => {
    provider.setState({
      mealPlan,
    });
  },
  addCustomMeal: (name, cals, protein, carbs, fat) => {
    provider.setState(state => {
      debugger;
      const currentMenuState = state.menu || [];
      const menuState = [...currentMenuState];
      const id = getNextCustomId(menuState);
      const newItem = createMenuItem(id, name, cals, protein, carbs, fat);
      menuState.unshift(newItem);

      debugger;

      return {
        menu: menuState,
      };
    });
  },
  addDefaultMeal: (name, cals, protein, carbs, fat) => {
    provider.setState(state => {
      const currentMenuState = state.menu || [];
      const menuState = [...currentMenuState];
      const id = getNextDefaultId(menuState);
      const newItem = createMenuItem(id, name, cals, protein, carbs, fat);
      menuState.push(newItem);

      return {
        menu: menuState,
      };
    });
  },
});

export default createMenuActions;
