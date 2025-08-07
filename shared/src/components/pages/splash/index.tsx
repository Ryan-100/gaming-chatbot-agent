'use client';
import React, { useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Image } from '../../ui/image';
import { Flex } from '@radix-ui/themes';
import { getToken, getUserInfo } from '../../../utils/auth';
import { BiLoaderCircle } from 'react-icons/bi';
import { cn } from '../../../utils/cn';
import { ROLE_TYPE } from '../../../utils/constants';

const Splash: React.FC = () => {
  const router = useRouter();
  const [, startTransition] = useTransition();

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      const token = getToken();
      if (token) {
        const user = JSON.parse(getUserInfo() ?? '{}') ?? {};
        startTransition(() =>
          router.replace(
            user.role.type === ROLE_TYPE.SUPER_ADMIN ||
              user.role.type === ROLE_TYPE.SERVICE_ADMIN
              ? '/dashboard'
              : user.role.type === ROLE_TYPE.WITHDRAW_ADMIN
              ? '/withdraw-dashboard'
              : user.role.type === ROLE_TYPE.DEPOSIT_ADMIN
              ? '/deposit-dashboard'
              : user.Role[0]?.route
          )
        );
      } else {
        startTransition(() => router.replace('/login'));
      }
    }, 2000);

    return () => clearTimeout(redirectTimeout);
  }, [router]);

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

export default Splash;
