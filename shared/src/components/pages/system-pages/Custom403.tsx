'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Image } from '../../ui/image';
import { Flex } from '@radix-ui/themes';
import { Button } from '../../ui/button';
import { getUserInfo } from '../../../utils/auth';
import { ROLE_TYPE } from '../../../utils/constants';

const Custom403: React.FC = () => {
  const user = getUserInfo();
  const router = useRouter();
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      className="h-screen"
    >
      <Image
        src={'/upload/images/primary-logo.png'}
        width={300}
        height={200}
        alt="Logo Picture"
        className="w-[300px] h-[200px]"
      />
      <Flex direction="column" justify="center" className="text-center" gap="2">
        <h3>No Authorization found</h3>
        <p className="mb-0">
          You don't have the permission to access the page.
        </p>
        <p>Please go back to your main page.</p>
        <Button
          onClick={() => {
            router.replace(
              user.role.type === ROLE_TYPE.SUPER_ADMIN ||
                user.role.type === ROLE_TYPE.SERVICE_ADMIN
                ? '/dashboard'
                : user.role.type === ROLE_TYPE.WITHDRAW_ADMIN
                ? '/withdraw-dashboard'
                : user.role.type === ROLE_TYPE.DEPOSIT_ADMIN
                ? '/deposit-dashboard'
                : user.Role[0]?.route
            );
          }}
        >
          Return to Home
        </Button>
      </Flex>
    </Flex>
  );
};

export default Custom403;
