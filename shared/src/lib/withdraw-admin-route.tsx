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
const withdrawAdminRoute: Menu[] = [
  {
    name: 'Dashboard',
    path: '/withdraw-dashboard',
    icon: <MenuIcon src="/upload/icons/side-bar/dashboard-icon.svg" />,
    activeIcon: (
      <MenuIcon src="/upload/icons/side-bar/dashboard-active-icon.svg" />
    ),
    haveSubMenu: false,
  },
  {
    name: 'Pending',
    path: '/withdraw-pending',
    icon: <MenuIcon src="/upload/icons/side-bar/third-party-bal-icon.svg" />,
    activeIcon: (
      <MenuIcon src="/upload/icons/side-bar/third-party-bal-active-icon.svg" />
    ),
    haveSubMenu: false,
  },
  {
    name: 'Accepted',
    path: '/withdraw-accepted',
    icon: <MenuIcon src="/upload/icons/side-bar/game-tracking-icon.svg" />,
    activeIcon: (
      <MenuIcon src="/upload/icons/side-bar/game-tracking-active-icon.svg" />
    ),
    haveSubMenu: false,
  },
  {
    name: 'Rejected',
    path: '/withdraw-rejected',
    icon: <MenuIcon src="/upload/icons/side-bar/inbox-icon.svg" />,
    activeIcon: <MenuIcon src="/upload/icons/side-bar/inbox-active-icon.svg" />,
    haveSubMenu: false,
  },

  {
    name: 'Report',
    path: '/withdraw-report',
    icon: <MenuIcon src="/upload/icons/side-bar/notification-icon.svg" />,
    activeIcon: (
      <MenuIcon src="/upload/icons/side-bar/notification-active-icon.svg" />
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

export default withdrawAdminRoute;
