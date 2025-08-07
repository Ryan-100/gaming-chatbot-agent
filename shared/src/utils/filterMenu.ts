import { Menu } from '../types/base.types';

export const mapAction = (name: string) => {
  const lowerName = name.toLowerCase();

  if (lowerName.includes('read')) {
    return {
      route: name.replace('-read', ''),
      action: 'read',
    };
  } else {
    return {
      route: name,
      action: 'write',
    };
  }
};

const checkPermission = (
  path: string,
  permissions: {
    route: string;
    action: string;
  }[]
): boolean => {
  return permissions.some((permission) => path.startsWith(permission.route));
};

export const filterMenu = (
  menu: Menu[],
  permissions: {
    route: string;
    action: string;
  }[]
): Menu[] => {
  return menu
    .map((item) => {
      if (item.haveSubMenu && item.subMenu) {
        const filteredSubMenu = item.subMenu.filter((subItem) =>
          checkPermission(subItem.path, permissions)
        );
        return {
          ...item,
          subMenu: filteredSubMenu,
          haveSubMenu: filteredSubMenu.length > 0,
        };
      } else {
        return item;
      }
    })
    .filter((item) =>
      item.haveSubMenu
        ? item.subMenu!.length > 0
        : checkPermission(item.path, permissions)
    );
};
