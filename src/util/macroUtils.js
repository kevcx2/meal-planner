const CALS_PER_GRAM_PROTEIN = 4;
const CALS_PER_GRAM_CARBS = 4;
const CALS_PER_GRAM_FAT = 9;

const getGramsMacro = (cals, percentage, calsPerGram) =>
  parseInt((cals * (percentage / 100)) / calsPerGram, 10);

export const getGramsProtein = (cals, percentage) =>
  getGramsMacro(cals, percentage, CALS_PER_GRAM_PROTEIN);

export const getGramsCarbs = (cals, percentage) =>
  getGramsMacro(cals, percentage, CALS_PER_GRAM_CARBS);

export const getGramsFat = (cals, percentage) =>
  getGramsMacro(cals, percentage, CALS_PER_GRAM_FAT);
