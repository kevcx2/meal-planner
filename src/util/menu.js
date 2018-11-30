const DEFAULT_MENU_ITEM_ATTRIBUTES = {
  liked: false,
  disliked: false,
  picture: undefined,
};

const idSort = (a, b) => a - b;

export const createMenuItem = (id, name, cals, protein, carbs, fat) => {
  return {
    id,
    name,
    cals,
    protein,
    carbs,
    fat,
    ...DEFAULT_MENU_ITEM_ATTRIBUTES,
  };
};

export const getNextCustomId = menu => {
  const customMenuItemIdList = menu.reduce((customIdList, menuItem) => {
    if (/c.+/.test(menuItem.id)) {
      customIdList.push(parseInt(menuItem.id.slice(1)));
    }
    return customIdList;
  }, []);

  if (customMenuItemIdList.length === 0) {
    return 'c1';
  }

  customMenuItemIdList.sort(idSort);
  const lastCustomIdNumber =
    customMenuItemIdList[customMenuItemIdList.length - 1];

  return `c${lastCustomIdNumber + 1}`;
};

export const getNextDefaultId = menu => {
  const defaultMenuItemIdList = menu.reduce((defaultIdList, menuItem) => {
    if (/m.+/.test(menuItem.id)) {
      defaultIdList.push(parseInt(menuItem.id.slice(1)));
    }
    return defaultIdList;
  }, []);

  if (defaultMenuItemIdList.length === 0) {
    return 'm1';
  }

  defaultMenuItemIdList.sort(idSort);
  const lastDefaultIdNumber =
    defaultMenuItemIdList[defaultMenuItemIdList.length - 1];

  return `m${lastDefaultIdNumber + 1}`;
};
