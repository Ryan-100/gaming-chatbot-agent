'use client';
import React from 'react';

import { Box, Flex, Link } from '@radix-ui/themes';

import { Image } from '../ui/image';
import { Icons } from '../ui/icons';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Eye, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { logout } from '../../utils/auth';

const Header = () => {
  const router = useRouter();
  const AvatarAction = () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Flex
            className="h-[32px] bg-gray-200 rounded-full px-1 space-x-1 cursor-pointer"
            justify="center"
            align="center"
          >
            <Avatar className="w-[24px] h-[24px]">
              <AvatarImage src="/upload/images/logo.png" alt="profile avatar" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Icons.ArrowDown className="w-3 h-3" />
          </Flex>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="text-xs">
          <Link href={`/profile`}>
            <DropdownMenuItem className="text-sm">
              <Eye className="mr-2 h-4 w-4" />
              <span>View Profile</span>
            </DropdownMenuItem>
          </Link>

          <DropdownMenuItem
            className="text-sm"
            onClick={() => {
              logout();
              window.location.reload();
              router.replace('/login');
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <Box className="relative z-[99999]">
      <header className="fixed top-0 w-full h-[60px] shadow bg-white">
        <Flex className="w-full px-4 h-full" align="center" justify="between">
          <Image
            src="/upload/images/horizontal-logo.png"
            width={170}
            height={40}
            alt="Logo Image"
            className="w-[170px] h-[40px]"
          />
          <Box>
            <Flex align="center" className="space-x-2">
              {/* i(Daung) had commented below flag image since there is no language change feature for agent panel */}
              {/* <Flex
                className="w-[32px] h-[32px] bg-gray-200 rounded-full"
                justify="center"
                align="center"
              >
                <Image
                  src="/upload/icons/eng-icon.svg"
                  width={16}
                  height={16}
                  alt="Logo Image"
                  className="w-[16px] h-[16px]"
                />
              </Flex> */}
              {/* <Flex
                className="w-[32px] h-[32px] bg-gray-200 rounded-full"
                justify="center"
                align="center"
              >
                <Icons.Message className="w-4 h-4" />
              </Flex>
              <Flex
                className="w-[32px] h-[32px] bg-gray-200 rounded-full"
                justify="center"
                align="center"
              >
                <Icons.Notification className="w-4 h-4" />
              </Flex> */}
              <AvatarAction />
            </Flex>
          </Box>
        </Flex>
      </header>
    </Box>
  );
};

export default Header;
