import solver from 'javascript-lp-solver';

import {
  getGramsProtein,
  getGramsCarbs,
  getGramsFat,
} from './macroUtils';

const LOW_PRIORITY_VALUE = 100;
const NO_PRIORITY_VALUE = 50;
const HIGH_PRIORITY_VALUE =  1;

const CALORIE_MAX_PADDING = 100;
const CALORIE_MIN_PADDING = 200;

const getConstraints = (
  menu,
  goalCals,
  goalProteinPercentage,
  goalCarbsPercentage,
  goalFatPercentage,
  noRepeats,
) => {
  const maxCals = goalCals + CALORIE_MAX_PADDING;
  const minCals = goalCals - CALORIE_MIN_PADDING;
  const constraints = {
    cals: {
      min: minCals , max: maxCals
    },
    protein: {
      min: getGramsProtein(minCals, goalProteinPercentage),
      max: getGramsProtein(maxCals, goalProteinPercentage),
    },
    carbs: {
      min: getGramsCarbs(minCals, goalCarbsPercentage),
      max: getGramsCarbs(maxCals, goalCarbsPercentage),
    },
    fat: {
      min: getGramsFat(minCals, goalFatPercentage),
      max: getGramsFat(maxCals, goalFatPercentage),
    },
    avoid: {
      min: 0,
      max: 0,
    },
  };

  if (noRepeats) {
    menu.forEach((menuItem) => {
      constraints[menuItem.id] = { max: 1 };
    })
  }

  return constraints;
};

const getVariables = (menu) => {
  const variables = {};

  menu.forEach((menuItem) => {
    variables[menuItem.id] = menuItem;

    if (menuItem.liked) {
      variables[menuItem.id].priority = HIGH_PRIORITY_VALUE;
      variables[menuItem.id].avoid = 0;
    } else if (menuItem.disliked) {
      variables[menuItem.id].avoid = 1;
      variables[menuItem.id].priority = LOW_PRIORITY_VALUE;
    } else {
      variables[menuItem.id].priority = NO_PRIORITY_VALUE;
      variables[menuItem.id].avoid = 0;
    }

    variables[menuItem.id][menuItem.id] = 1;
  });

  return variables;
}

const getInts = (menu) => {
  const ints = {};
  menu.forEach((menuItem) => {
    ints[menuItem.id] = 1
  });
  return ints;
}

export const createMealPlan = (
  menu,
  goalCals,
  goalProteinPercentage,
  goalCarbsPercentage,
  goalFatPercentage,
) => {
  const constraints = getConstraints(
    menu,
    goalCals,
    goalProteinPercentage,
    goalCarbsPercentage,
    goalFatPercentage,
    true,
  );
  const variables = getVariables(menu);
  const ints = getInts(menu);

  const model = {
    optimize: "priority",
    opType: "min",
    constraints,
    variables,
    ints,
  };

  const results = solver.Solve(model);

  if (results.feasible) {
    delete results.bounded;
    delete results.feasible;
    delete results.result;

    const mealList = [];
    Object.keys(results).forEach((mealId) => {
      if (results[mealId] > 0) {
        mealList.push(parseInt(mealId, 10));
      }
    });

    return mealList;
  }

  else return undefined;
};
