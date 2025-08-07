import Image from 'next/image';
import { Menu } from '../types/base.types';

const MenuIcon = (props: { src: string }) => {
  return (
    <Image
      src={props.src}
      width={20}
      height={20}
      alt="Agent"
      className="w-[20px] h-[20px]"
    />
  );
};

// const layout = '/super-admin';
const depositAdminRoute: Menu[] = [
  {
    name: 'Dashboard',
    path: '/deposit-dashboard',
    icon: <MenuIcon src="/upload/icons/side-bar/dashboard-icon.svg" />,
    activeIcon: (
      <MenuIcon src="/upload/icons/side-bar/dashboard-active-icon.svg" />
    ),
    haveSubMenu: false,
  },
  {
    name: 'Record History',
    path: '/deposit-record-history',
    icon: <MenuIcon src="/upload/icons/side-bar/third-party-bal-icon.svg" />,
    activeIcon: (
      <MenuIcon src="/upload/icons/side-bar/third-party-bal-active-icon.svg" />
    ),
    haveSubMenu: false,
  },
  {
    name: 'Auto Top-up',
    path: '/deposit-auto-top-up',
    icon: <MenuIcon src="/upload/icons/side-bar/game-tracking-icon.svg" />,
    activeIcon: (
      <MenuIcon src="/upload/icons/side-bar/game-tracking-active-icon.svg" />
    ),
    haveSubMenu: false,
  },
  {
    name: 'Profile',
    path: '/profile',
    icon: <MenuIcon src="/upload/icons/side-bar/logout-icon.svg" />,
    activeIcon: (
      <MenuIcon src="/upload/icons/side-bar/logout-active-icon.svg" />
    ),
    haveSubMenu: false,
    hide: true,
  },
  // {
  //   name: 'Log Out',
  //   path: '/themes',
  //   icon: <MenuIcon src="/upload/icons/side-bar/logout-icon.svg" />,
  //   activeIcon: (
  //     <MenuIcon src="/upload/icons/side-bar/logout-active-icon.svg" />
  //   ),
  //   haveSubMenu: false,
  // },
];

export default depositAdminRoute;
