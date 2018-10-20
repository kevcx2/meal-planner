export const createTargetActions = (provider) => ({
  changeCals: (newCals) => provider.setState({
    cals: newCals,
  }),
  changeMacros: (newMacros) => provider.setState({
    protein: newMacros.protein,
    fat: newMacros.fat,
    carbs: newMacros.carbs,
  }),
});
