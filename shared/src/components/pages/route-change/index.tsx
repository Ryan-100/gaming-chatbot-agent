'use client';
import React, { useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Image } from '../../ui/image';
import { Flex } from '@radix-ui/themes';
import { cn } from '../../../utils/cn';
import { BiLoaderCircle } from 'react-icons/bi';
import { getToken, setUserInfo } from '../../../utils/auth';
import { useGetMeQuery } from '../../../stores/reducers/auth.reducer';
import { ROLE_TYPE } from '../../../utils/constants';
import { mapAction } from '../../../utils/filterMenu';
import {
  validDepositRoutes,
  validServiceRoutes,
  validWithdrawRoutes,
} from '../../../data/PermissionList';

const RouteChange: React.FC = () => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const { data } = useGetMeQuery();

  useEffect(() => {
    if (data) {
      const user = data?.body?.data;
      const token = getToken();
      let route = '/dashboard';
      let roleType = ROLE_TYPE.SUPER_ADMIN;
      const userPermissionRoute =
        user?.Role?.RoleOnPermission[0]?.Permission.route ?? '';

      if (userPermissionRoute === '*') {
        route = '/dashboard';
        roleType = ROLE_TYPE.SUPER_ADMIN;
      } else if (validDepositRoutes.includes(userPermissionRoute)) {
        route = '/deposit-dashboard';
        roleType = ROLE_TYPE.DEPOSIT_ADMIN;
      } else if (validWithdrawRoutes.includes(userPermissionRoute)) {
        route = '/withdraw-dashboard';
        roleType = ROLE_TYPE.WITHDRAW_ADMIN;
      } else if (validServiceRoutes.includes(userPermissionRoute)) {
        route = '/dashboard';
        roleType = ROLE_TYPE.SERVICE_ADMIN;
      } else {
        const mappedRoutes = user?.Role.RoleOnPermission.map((permission) =>
          mapAction(permission.Permission.route)
        );
        route = mappedRoutes ? mappedRoutes[0]?.route : '/dashboard';
        roleType = ROLE_TYPE.CUSTOM_ADMIN;
      }

      if (user) {
        const updateUser = {
          Role: user.Role.RoleOnPermission.map((permission) =>
            mapAction(permission.Permission.route)
          ),
          role: { type: roleType },
        };
        setUserInfo(token, JSON.stringify(updateUser));
        if (updateUser) {
          setTimeout(() => {
            startTransition(() => router.replace(route));
          }, 2000);
        }
      }
    }
  }, [data]);

  return (
    <Flex
      direction="column"
      className="h-screen bg-primary"
      justify="center"
      align="center"
    >
      <Image
        src={'/upload/images/primary-logo.png'}
        width={300}
        height={200}
        alt="Logo Picture"
        className="w-[300px] h-[200px]"
      />
      <Flex
        justify="center"
        align="center"
        className={cn('animate-spin text-base font-bold mt-2', 'text-white')}
      >
        <BiLoaderCircle className="w-6 h-6" />
      </Flex>
    </Flex>
  );
};

export default RouteChange;
