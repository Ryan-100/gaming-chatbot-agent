import { Image } from '../components/ui/image';

export interface Menu {
  name: string;
  path: string;
  icon: JSX.Element;
  activeIcon?: JSX.Element;
  subMenu?: { name: string; path: string }[];
  haveSubMenu: boolean;
}

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

const menuData: Menu[] = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: <MenuIcon src="/upload/icons/side-bar/dashboard-icon.svg" />,
    activeIcon: (
      <MenuIcon src="/upload/icons/side-bar/dashboard-active-icon.svg" />
    ),
    haveSubMenu: false,
  },
  {
    name: 'Third Party Balance',
    path: '/third-party-balance',
    icon: <MenuIcon src="/upload/icons/side-bar/third-party-bal-icon.svg" />,
    activeIcon: (
      <MenuIcon src="/upload/icons/side-bar/third-party-bal-active-icon.svg" />
    ),
    haveSubMenu: false,
  },
  {
    name: 'Game Tracking Panel',
    path: '/game-tracking-panel',
    icon: <MenuIcon src="/upload/icons/side-bar/game-tracking-icon.svg" />,
    activeIcon: (
      <MenuIcon src="/upload/icons/side-bar/game-tracking-active-icon.svg" />
    ),
    haveSubMenu: false,
  },
  {
    name: 'Inbox',
    path: '/inbox',
    icon: <MenuIcon src="/upload/icons/side-bar/inbox-icon.svg" />,
    activeIcon: <MenuIcon src="/upload/icons/side-bar/inbox-active-icon.svg" />,
    haveSubMenu: false,
  },
  {
    name: 'Transactions',
    path: '',
    icon: <MenuIcon src="/upload/icons/side-bar/transactions-icon.svg" />,
    subMenu: [
      { name: 'Deposit', path: '/transactions/deposit' },
      { name: 'Withdraw', path: '/transactions/withdraw' },
      { name: 'Games', path: '/transactions/games' },
      { name: 'Deposit Bonus', path: '/transactions/deposit-bonus' },
      { name: 'Register Bonus', path: '/transactions/register-bonus' },
      { name: 'Pocket Money', path: '/transactions/pocket-money' },
    ],
    haveSubMenu: true,
  },
  {
    name: 'Games',
    path: '',
    icon: <MenuIcon src="/upload/icons/side-bar/game-icon.svg" />,
    subMenu: [
      { name: 'Main Games', path: '/main-games' },
      { name: 'Child Games', path: '/child-games' },
      { name: 'Top Winning Games', path: '/top-winning-games' },
      { name: 'Hot Games', path: '/hot-games' },
    ],
    haveSubMenu: true,
  },
  {
    name: 'Pocket Money',
    path: '',
    icon: <MenuIcon src="/upload/icons/side-bar/pocket-money-icon.svg" />,
    subMenu: [
      {
        name: 'Active Pocket Money',
        path: '/pocket-money/active-pocket-money',
      },
      {
        name: 'Upcoming Pocket Money',
        path: '/pocket-money/upcoming-pocket-money',
      },
      { name: 'History', path: '/pocket-money/history' },
    ],
    haveSubMenu: true,
  },
  {
    name: 'Bonus',
    path: '',
    icon: <MenuIcon src="/upload/icons/side-bar/bonus-icon.svg" />,
    subMenu: [
      { name: 'Active Bonus', path: '/active-bonus' },
      { name: 'Deposit Bonus', path: '/deposit-bonus' },
      { name: 'First Time Deposit Bonus', path: '/first-time-deposit-bonus' },
      { name: 'Register Bonus', path: '/register-bonus' },
    ],
    haveSubMenu: true,
  },
  {
    name: 'Report',
    path: '',
    icon: <MenuIcon src="/upload/icons/side-bar/report-icon.svg" />,
    subMenu: [
      { name: 'Daily Report', path: '/daily-report' },
      { name: 'Monthly Report', path: '/monthly-report' },
      { name: 'Yearly Report', path: '/yearly-report' },
      { name: 'User Report', path: '/user-report' },
      { name: 'Payment Report', path: '/payment-report' },
      { name: 'Crypto Report', path: '/crypto-report' },
      { name: 'Deposit Admin Report', path: '/report-deposit-admin' },
      { name: 'Withdraw Admin Report', path: '/report-withdraw-admin' },
    ],
    haveSubMenu: true,
  },
  {
    name: 'Notification',
    path: '/notification',
    icon: <MenuIcon src="/upload/icons/side-bar/notification-icon.svg" />,
    activeIcon: (
      <MenuIcon src="/upload/icons/side-bar/notification-active-icon.svg" />
    ),
    haveSubMenu: false,
  },
  {
    name: 'Payment Category',
    path: '',
    icon: <MenuIcon src="/upload/icons/side-bar/payment-cat-icon.svg" />,
    subMenu: [
      { name: 'Payment Management', path: '/payment-management' },
      { name: 'Payment Category List', path: '/payment-category' },
      { name: 'Exchange Rate', path: '/exchange-rate' },
      { name: 'Deposit/Withdraw Amount', path: '/deposit-withdraw-amount' },
    ],
    haveSubMenu: true,
  },
  {
    name: 'Admin Management',
    path: '',
    icon: <MenuIcon src="/upload/icons/side-bar/admin-man-icon.svg" />,
    subMenu: [
      { name: 'Deposit Admin', path: '/deposit-admin' },
      { name: 'Withdraw Admin', path: '/withdraw-admin' },
      { name: 'Service Admin', path: '/service-admin' },
      { name: 'Custom Admin', path: '/custom-admin' },
      { name: 'Roles', path: '/roles' },
    ],
    haveSubMenu: true,
  },
  {
    name: 'Settings',
    path: '',
    icon: <MenuIcon src="/upload/icons/side-bar/setting-icon.svg" />,
    subMenu: [
      { name: 'System Settings', path: '/settings/system-settings' },
      { name: 'Levels', path: '/settings/levels' },
      { name: 'Support', path: '/settings/support' },
      { name: 'Guide', path: '/settings/guide' },
      { name: 'Rules & Regulations', path: '/settings/rules-regulations' },
    ],
    haveSubMenu: true,
  },
  {
    name: 'Players',
    path: '',
    icon: <MenuIcon src="/upload/icons/side-bar/players-icon.svg" />,
    subMenu: [
      { name: 'All Players', path: '/players/all-players' },
      { name: 'Top Winning Players', path: '/players/top-winning-players' },
      { name: 'Blocked Players', path: '/players/blocked-players' },
      { name: 'Promocode Owners', path: '/players/promo-code-owners' },
    ],
    haveSubMenu: true,
  },
  {
    name: 'Spin',
    path: '',
    icon: <MenuIcon src="/upload/icons/side-bar/spin-icon.svg" />,
    subMenu: [
      { name: 'Spin Bonus', path: '/spin-bonus' },
      { name: 'Spin History', path: '/spin-history' },
    ],
    haveSubMenu: true,
  },
  {
    name: 'Bot Management',
    path: '',
    icon: <MenuIcon src="/upload/icons/side-bar/bot-man-icon.svg" />,
    subMenu: [
      { name: 'Welcome & Main Menu', path: '/welcome-main-menu' },
      { name: 'Download App', path: '/download-app' },
    ],
    haveSubMenu: true,
  },
  {
    name: 'Themes & Appearances',
    path: '/themes',
    icon: <MenuIcon src="/upload/icons/side-bar/themes-icon.svg" />,
    activeIcon: (
      <MenuIcon src="/upload/icons/side-bar/themes-active-icon.svg" />
    ),
    haveSubMenu: false,
  },
  {
    name: 'Log Out',
    path: '/themes',
    icon: <MenuIcon src="/upload/icons/side-bar/logout-icon.svg" />,
    activeIcon: (
      <MenuIcon src="/upload/icons/side-bar/logout-active-icon.svg" />
    ),
    haveSubMenu: false,
  },
];
export default menuData;
