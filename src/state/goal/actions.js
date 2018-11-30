export const createGoalActions = provider => ({
  changeGoalCals: newCals =>
    provider.setState({
      goalCals: newCals,
    }),
  changeGoalMacros: newMacros =>
    provider.setState({
      goalProtein: newMacros.protein,
      goalFat: newMacros.fat,
      goalCarbs: newMacros.carbs,
    }),
});
