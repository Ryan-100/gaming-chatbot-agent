'use client';
import React from 'react';

import { Box, Flex, Section } from '@radix-ui/themes';
import { cn } from '../../utils/cn';
import SideBar from './SideBar';
import Header from './HeaderView';
import superAdminMenu from '../../lib/super-admin-route';
import withdrawAdminMenu from '../../lib/withdraw-admin-route';
import depositAdminMenu from '../../lib/deposit-admin-route';
import ProtectRoute from './ProtectRoute';
import { getUserInfo } from '../../utils/auth';
import { ROLE_TYPE } from '../../utils/constants';
import { filterMenu } from '../../utils/filterMenu';
import { useSocket } from '../../stores/socket.slice';
import { usePathname } from 'next/navigation';

interface Props {
  children: React.ReactNode;
  className?: string;
  hideHeader?: boolean;
  hideSideBar?: boolean;
  title?: string;
  subTitle?: string;
  paddingZero?: boolean;
}

const PageLayout: React.FC<Props> = ({
  children,
  className,
  hideHeader,
  hideSideBar,
  paddingZero = true,
  ...props
}: Props) => {
  const user = JSON.parse(getUserInfo()) ?? {};
  const pathname = usePathname();
  useSocket();

  function accessibleRoutes(role: string) {
    switch (role) {
      case ROLE_TYPE.CUSTOM_ADMIN:
        return filterMenu(superAdminMenu, user?.Role);
      case ROLE_TYPE.WITHDRAW_ADMIN:
        return withdrawAdminMenu;
      case ROLE_TYPE.DEPOSIT_ADMIN:
        return depositAdminMenu;
      case ROLE_TYPE.SERVICE_ADMIN:
        return superAdminMenu;
      case ROLE_TYPE.SUPER_ADMIN:
        return superAdminMenu;
      default:
        return superAdminMenu;
    }
  }

  return (
    <Section className="relative max-h-screen h-screen overflow-hidden" p="0">
      <ProtectRoute
        routeType={user?.role?.type}
        routes={accessibleRoutes(user?.role?.type)}
      >
        <Box className="items-start h-full">
          {!hideHeader && <Header />}
          <Flex className="h-full bg-white overflow-hidden">
            {!hideSideBar && (
              <SideBar menuData={accessibleRoutes(user?.role?.type)} />
            )}
            <Box
              className={cn(
                'flex-1 bg-gray-100 h-full',
                paddingZero
                  ? pathname === '/inbox'
                    ? 'px-0'
                    : 'px-4 pt-[76px]'
                  : 'px-0',
                hideHeader && 'pt-0',
                pathname === '/inbox'
                  ? 'pt-[70px] bg-white overflow-hidden'
                  : 'overflow-auto ',
                className
              )}
            >
              <Box className="h-full py-4">
                {children}
                <Box className="h-[30px]" />
              </Box>
            </Box>
          </Flex>
        </Box>
      </ProtectRoute>
    </Section>
  );
};

export default PageLayout;
