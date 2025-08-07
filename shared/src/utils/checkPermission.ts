'use client';
import { getUserInfo } from './auth';
import { ROLE_TYPE } from './constants';

export const checkPermission = (data: { pathname: string }) => {
  const user = JSON.parse(getUserInfo()) ?? {};
  const action = user.Role.find((item: any) => item.route === data.pathname);
  console.log(user);

  return user.role.type === ROLE_TYPE.CUSTOM_ADMIN
    ? action?.action
    : user.role.type === ROLE_TYPE.SERVICE_ADMIN
    ? 'read'
    : 'write';
};
