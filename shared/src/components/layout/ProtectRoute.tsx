import React from 'react';
import { usePathname } from 'next/navigation';
import { Redirect } from '../../utils/redirect';
import { Menu } from '../../types/base.types';
import { getToken, getUserInfo } from '../../utils/auth';
import { ROLE_TYPE } from '../../utils/constants';

interface ProtectRouteProps {
  children: React.ReactNode;
  routeType: string;
  routes: Menu[];
}

const ProtectRoute: React.FC<ProtectRouteProps> = ({
  children,
  routeType,
  routes,
}) => {
  const token = getToken();
  const user = JSON.parse(getUserInfo()) ?? {};

  // Extract the first segment of the route
  const pathname = usePathname();
  const currentPath = pathname.split('/')[1];

  const accessibleRoutes = routes.flatMap((route) => {
    const basePath = route.path.split('/')[1];
    if (route.haveSubMenu && route.subMenu) {
      return [basePath, ...route.subMenu.map((sub) => sub.path.split('/')[1])];
    }
    return [basePath];
  });

  if (!token) {
    return <Redirect to="/login" />;
  }

  switch (routeType) {
    case ROLE_TYPE.SUPER_ADMIN:
      if (user.role.type !== ROLE_TYPE.SUPER_ADMIN) {
        return <Redirect to="/forbidden" />;
      } else if (!accessibleRoutes.includes(currentPath)) {
        return <Redirect to="/forbidden" />;
      }
      break;
    case ROLE_TYPE.WITHDRAW_ADMIN:
      if (user.role.type !== ROLE_TYPE.WITHDRAW_ADMIN) {
        return <Redirect to="/forbidden" />;
      } else if (!accessibleRoutes.includes(currentPath)) {
        return <Redirect to="/forbidden" />;
      }
      break;
    case ROLE_TYPE.DEPOSIT_ADMIN:
      if (user.role.type !== ROLE_TYPE.DEPOSIT_ADMIN) {
        return <Redirect to="/forbidden" />;
      } else if (!accessibleRoutes.includes(currentPath)) {
        return <Redirect to="/forbidden" />;
      }
      break;
    case ROLE_TYPE.CUSTOM_ADMIN:
      if (user.role.type !== ROLE_TYPE.CUSTOM_ADMIN) {
        return <Redirect to="/forbidden" />;
      } else if (!accessibleRoutes.includes(currentPath)) {
        return <Redirect to="/forbidden" />;
      }
      break;
    case ROLE_TYPE.SERVICE_ADMIN:
      if (user.role.type !== ROLE_TYPE.SERVICE_ADMIN) {
        return <Redirect to="/forbidden" />;
      } else if (!accessibleRoutes.includes(currentPath)) {
        return <Redirect to="/forbidden" />;
      }
      break;
    default:
      return <Redirect to="/404" />;
  }

  return <div className="items-start h-full">{children}</div>;
};

export default ProtectRoute;
