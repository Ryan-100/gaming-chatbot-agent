export interface Permission {
  name: string;
  readRoute: string[];
  writeRoute: string[];
  hideReadAction?: boolean;
}

export const permissionData: Permission[] = [
  {
    name: 'Dashboard',
    readRoute: ['/dashboard-read'],
    writeRoute: ['/dashboard'],
  },
  {
    name: 'Third Party Balance',
    readRoute: ['/third-party-balance-read'],
    writeRoute: ['/third-party-balance'],
  },
  {
    name: 'Game Tracking',
    readRoute: ['/game-tracking-read'],
    writeRoute: ['/game-tracking'],
  },
  {
    name: 'Inbox',
    readRoute: ['/inbox-read'],
    writeRoute: ['/inbox'],
  },
  {
    name: 'Transactions Deposit',
    readRoute: ['/transactions/deposit-read'],
    writeRoute: ['/transactions/deposit'],
  },
  {
    name: 'Transactions Withdraw',
    readRoute: ['/transactions/withdraw-read'],
    writeRoute: ['/transactions/withdraw'],
  },
  {
    name: 'Transactions Games',
    readRoute: ['/transactions/games-read'],
    writeRoute: ['/transactions/games'],
  },
  {
    name: 'Transactions Deposit Bonus',
    readRoute: ['/transactions/bonus-deposit-read'],
    writeRoute: ['/transactions/bonus-deposit'],
  },
  {
    name: 'Transactions Register Bonus',
    readRoute: ['/transactions/register-bonus-read'],
    writeRoute: ['/transactions/register-bonus'],
  },
  {
    name: 'Transactions Pocket Money',
    readRoute: ['/transactions/pocket-money-read'],
    writeRoute: ['/transactions/pocket-money'],
  },
  {
    name: 'Games',
    readRoute: [
      '/main-games-read',
      '/child-games-read',
      '/top-winning-games-read',
      '/hot-games-read',
    ],
    writeRoute: [
      '/main-games',
      '/child-games',
      '/top-winning-games',
      '/hot-games',
    ],
  },

  {
    name: 'Pocket Money',
    readRoute: [
      '/pocket-money/active-pocket-money-read',
      '/pocket-money/history-read',
      '/pocket-money/upcoming-pocket-money-read',
    ],
    writeRoute: [
      '/pocket-money/active-pocket-money',
      '/pocket-money/history',
      '/pocket-money/upcoming-pocket-money',
    ],
  },
  {
    name: 'Bonus',
    readRoute: [
      '/active-bonus-read',
      '/deposit-bonus-read',
      '/first-time-deposit-bonus-read',
      '/register-bonus-read',
    ],
    writeRoute: [
      '/active-bonus',
      '/deposit-bonus',
      '/first-time-deposit-bonus',
      '/register-bonus',
    ],
  },
  {
    name: 'Report',
    readRoute: [
      '/daily-report-read',
      '/monthly-report-read',
      '/yearly-report-read',
      '/user-report-read',
      '/payment-report-read',
      '/report-deposit-admin-read',
      '/report-withdraw-admin-read',
    ],
    writeRoute: [
      '/daily-report',
      '/monthly-report',
      '/yearly-report',
      '/user-report',
      '/payment-report',
      '/report-deposit-admin',
      '/report-withdraw-admin',
    ],
  },
  {
    name: 'Notification',
    readRoute: ['/notification-read'],
    writeRoute: ['/notification'],
  },
  {
    name: 'Payment Category',
    readRoute: [
      '/payment-management-read',
      '/payment-category-read',
      '/exchange-rate-read',
    ],
    writeRoute: ['/payment-management', '/payment-category', '/exchange-rate'],
  },
  {
    name: 'Admin Management',
    readRoute: [
      '/deposit-admin-read',
      '/withdraw-admin-read',
      '/service-admin-read',
      '/custom-admin-read',
      '/roles-read',
    ],
    writeRoute: [
      '/deposit-admin',
      '/withdraw-admin',
      '/service-admin',
      '/custom-admin',
      '/roles',
    ],
  },
  {
    name: 'Settings',
    readRoute: [
      '/settings/system-settings-read',
      '/settings/levels-read',
      '/settings/support-read',
      '/settings/guide-read',
      '/settings/rules-regulations-read',
    ],
    writeRoute: [
      '/settings/system-settings',
      '/settings/levels',
      '/settings/support',
      '/settings/guide',
      '/settings/rules-regulations',
    ],
  },
  {
    name: 'Players',
    readRoute: [
      '/players/all-player-read',
      '/players/top-winning-player-read',
      '/players/blocked-player-read',
    ],
    writeRoute: [
      '/players/all-player',
      '/players/top-winning-player',
      '/players/blocked-player',
    ],
  },
  {
    name: 'Spin',
    readRoute: ['/spin-bonus-read', '/spin-history-read'],
    writeRoute: ['/spin-bonus', '/spin-history'],
  },
  {
    name: 'Bot Management',
    readRoute: ['/welcome-main-menu-read', '/download-app-read'],
    writeRoute: ['/welcome-main-menu', '/download-app'],
  },
  {
    name: 'Themes & Appearances',
    readRoute: ['/themes-read'],
    writeRoute: ['/themes'],
  },
];

export const servicePermissionListData: { name: string; route: string }[] = [
  {
    name: 'Dashboard Read',
    route: '/dashboard-read',
  },
  {
    name: 'Third Party Balance Read',
    route: '/third-party-balance-read',
  },
  {
    name: 'Game Tracking Read',
    route: '/game-tracking-read',
  },
  {
    name: 'Inbox',
    route: '/inbox',
  },
  {
    name: 'Transactions Deposit Read',
    route: '/transactions/deposit-read',
  },
  {
    name: 'Transactions Withdraw Read',
    route: '/transactions/withdraw-read',
  },

  {
    name: 'Transactions Games Read',
    route: '/transactions/games-read',
  },
  {
    name: 'Transactions Deposit Bonus Read',
    route: '/transactions/bonus-deposit-read',
  },
  {
    name: 'Transactions Register Bonus Read',
    route: '/transactions/register-bonus-read',
  },
  {
    name: 'Transactions Pocket Money Read',
    route: '/transactions/pocket-money-read',
  },
  {
    name: 'Main Games Read',
    route: '/main-games-read',
  },
  {
    name: 'Child Games Read',
    route: '/child-games-read',
  },
  {
    name: 'Top Winning Games Read',
    route: '/top-winning-games-read',
  },
  {
    name: 'Hot Games Read',
    route: '/hot-games-read',
  },
  {
    name: 'Active Pocket Money Read',
    route: '/pocket-money/active-pocket-money-read',
  },
  {
    name: 'Pocket Money History Read',
    route: '/pocket-money/history-read',
  },
  {
    name: 'Upcoming Pocket Money Read',
    route: '/pocket-money/upcoming-pocket-money-read',
  },
  {
    name: 'Active Bonus Read',
    route: '/active-bonus-read',
  },
  {
    name: 'Deposit Bonus Read',
    route: '/deposit-bonus-read',
  },
  {
    name: 'First Time Deposit Bonus Read',
    route: '/first-time-deposit-bonus-read',
  },
  {
    name: 'Register Bonus Read',
    route: '/register-bonus-read',
  },
  {
    name: 'Daily Report Read',
    route: '/daily-report-read',
  },
  {
    name: 'Monthly Report Read',
    route: '/monthly-report-read',
  },
  {
    name: 'Yearly Report Read',
    route: '/yearly-report-read',
  },
  {
    name: 'User Report Read',
    route: '/user-report-read',
  },
  {
    name: 'Payment Report Read',
    route: '/payment-report-read',
  },
  {
    name: 'Crypto Report Read',
    route: '/crypto-report-read',
  },
  {
    name: 'Deposit Admin Report Read',
    route: '/deposit-admin-report-read',
  },
  {
    name: 'Withdraw Admin Report Read',
    route: '/withdraw-admin-report-read',
  },
  {
    name: 'Notification Read',
    route: '/notification-read',
  },
  {
    name: 'Payment Management Read',
    route: '/payment-management-read',
  },
  {
    name: 'Payment Category Read',
    route: '/payment-category-read',
  },
  {
    name: 'Exchange Rate Read',
    route: '/exchange-rate-read',
  },
  {
    name: 'Deposit/Withdraw Amount Read',
    route: '/deposit-withdraw-amount-read',
  },
  {
    name: 'Deposit Admin Read',
    route: '/deposit-admin-read',
  },
  {
    name: 'Withdraw Admin Read',
    route: '/withdraw-admin-read',
  },
  {
    name: 'Service Admin Read',
    route: '/service-admin-read',
  },
  {
    name: 'Custom Admin Read',
    route: '/custom-admin-read',
  },
  {
    name: 'Roles Read',
    route: '/roles-read',
  },
  {
    name: 'System Settings Read',
    route: '/settings/system-settings-read',
  },
  {
    name: 'Levels Read',
    route: '/settings/levels-read',
  },
  {
    name: 'Support Read',
    route: '/settings/support-read',
  },
  {
    name: 'Guide Read',
    route: '/settings/guide-read',
  },
  {
    name: 'Rules Regulations Read',
    route: '/settings/rules-regulations-read',
  },
  {
    name: 'All Players Read',
    route: '/players/all-player-read',
  },
  {
    name: 'Top Winning Players Read',
    route: '/players/top-winning-player-read',
  },
  {
    name: 'Blocked Players Read',
    route: '/players/blocked-player-read',
  },
  {
    name: 'Spin Bonus Read',
    route: '/spin-bonus-read',
  },
  {
    name: 'Spin History Read',
    route: '/spin-history-read',
  },
  {
    name: 'Welcome Main Menu Read',
    route: '/welcome-main-menu-read',
  },
  {
    name: 'Download App Read',
    route: '/download-app-read',
  },
  {
    name: 'Themes & Appearances Read',
    route: '/themes-read',
  },
];

export const permissionListData: { name: string; route: string }[] = [
  {
    name: 'Dashboard Read',
    route: '/dashboard-read',
  },
  {
    name: 'Dashboard',
    route: '/dashboard',
  },
  {
    name: 'Third Party Balance Read',
    route: '/third-party-balance-read',
  },
  {
    name: 'Third Party Balance',
    route: '/third-party-balance',
  },
  {
    name: 'Game Tracking Read',
    route: '/game-tracking-read',
  },
  {
    name: 'Game Tracking',
    route: '/game-tracking',
  },
  {
    name: 'Inbox Read',
    route: '/inbox-read',
  },
  {
    name: 'Inbox',
    route: '/inbox',
  },
  {
    name: 'Transactions Deposit Read',
    route: '/transactions/deposit-read',
  },
  {
    name: 'Transactions Deposit',
    route: '/transactions/deposit',
  },
  {
    name: 'Transactions Withdraw Read',
    route: '/transactions/withdraw-read',
  },
  {
    name: 'Transactions Withdraw',
    route: '/transactions/withdraw',
  },
  {
    name: 'Transactions Games Read',
    route: '/transactions/games-read',
  },
  {
    name: 'Transactions Games',
    route: '/transactions/games',
  },
  {
    name: 'Transactions Deposit Bonus Read',
    route: '/transactions/bonus-deposit-read',
  },
  {
    name: 'Transactions Deposit Bonus',
    route: '/transactions/bonus-deposit',
  },
  {
    name: 'Transactions Register Bonus Read',
    route: '/transactions/register-bonus-read',
  },
  {
    name: 'Transactions Register Bonus',
    route: '/transactions/register-bonus',
  },
  {
    name: 'Transactions Pocket Money Read',
    route: '/transactions/pocket-money-read',
  },
  {
    name: 'Transactions Pocket Money',
    route: '/transactions/pocket-money',
  },
  {
    name: 'Main Games Read',
    route: '/main-games-read',
  },
  {
    name: 'Main Games',
    route: '/main-games',
  },
  {
    name: 'Child Games Read',
    route: '/child-games-read',
  },
  {
    name: 'Child Games',
    route: '/child-games',
  },
  {
    name: 'Top Winning Games Read',
    route: '/top-winning-games-read',
  },
  {
    name: 'Top Winning Games',
    route: '/top-winning-games',
  },
  {
    name: 'Hot Games Read',
    route: '/hot-games-read',
  },
  {
    name: 'Hot Games',
    route: '/hot-games',
  },
  {
    name: 'Active Pocket Money Read',
    route: '/pocket-money/active-pocket-money-read',
  },
  {
    name: 'Active Pocket Money',
    route: '/pocket-money/active-pocket-money',
  },
  {
    name: 'Pocket Money History Read',
    route: '/pocket-money/history-read',
  },
  {
    name: 'Pocket Money History',
    route: '/pocket-money/history',
  },
  {
    name: 'Upcoming Pocket Money Read',
    route: '/pocket-money/upcoming-pocket-money-read',
  },
  {
    name: 'Upcoming Pocket Money',
    route: '/pocket-money/upcoming-pocket-money',
  },
  {
    name: 'Active Bonus Read',
    route: '/active-bonus-read',
  },
  {
    name: 'Active Bonus',
    route: '/active-bonus',
  },
  {
    name: 'Deposit Bonus Read',
    route: '/deposit-bonus-read',
  },
  {
    name: 'Deposit Bonus',
    route: '/deposit-bonus',
  },
  {
    name: 'First Time Deposit Bonus Read',
    route: '/first-time-deposit-bonus-read',
  },
  {
    name: 'First Time Deposit Bonus',
    route: '/first-time-deposit-bonus',
  },
  {
    name: 'Register Bonus Read',
    route: '/register-bonus-read',
  },
  {
    name: 'Register Bonus',
    route: '/register-bonus',
  },
  {
    name: 'Daily Report Read',
    route: '/daily-report-read',
  },
  {
    name: 'Daily Report',
    route: '/daily-report',
  },
  {
    name: 'Monthly Report Read',
    route: '/monthly-report-read',
  },
  {
    name: 'Monthly Report',
    route: '/monthly-report',
  },
  {
    name: 'Yearly Report Read',
    route: '/yearly-report-read',
  },
  {
    name: 'Yearly Report',
    route: '/yearly-report',
  },
  {
    name: 'User Report Read',
    route: '/user-report-read',
  },
  {
    name: 'User Report',
    route: '/user-report',
  },
  {
    name: 'Payment Report Read',
    route: '/payment-report-read',
  },
  {
    name: 'Payment Report',
    route: '/payment-report',
  },
  {
    name: 'Crypto Report Read',
    route: '/crypto-report-read',
  },
  {
    name: 'Crypto Report',
    route: '/crypto-report',
  },
  {
    name: 'Deposit Admin Report Read',
    route: '/report-deposit-admin-read',
  },
  {
    name: 'Deposit Admin Report',
    route: '/report-deposit-admin',
  },
  {
    name: 'Withdraw Admin Report Read',
    route: '/report-withdraw-admin-read',
  },
  {
    name: 'Withdraw Admin Report',
    route: '/report-withdraw-admin',
  },
  {
    name: 'Notification Read',
    route: '/notification-read',
  },
  {
    name: 'Notification',
    route: '/notification',
  },
  {
    name: 'Payment Management Read',
    route: '/payment-management-read',
  },
  {
    name: 'Payment Management',
    route: '/payment-management',
  },
  {
    name: 'Payment Category Read',
    route: '/payment-category-read',
  },
  {
    name: 'Payment Category',
    route: '/payment-category',
  },
  {
    name: 'Exchange Rate Read',
    route: '/exchange-rate-read',
  },
  {
    name: 'Exchange Rate',
    route: '/exchange-rate',
  },
  {
    name: 'Deposit/Withdraw Amount Read',
    route: '/deposit-withdraw-amount-read',
  },
  {
    name: 'Deposit/Withdraw Amount',
    route: '/deposit-withdraw-amount',
  },
  {
    name: 'Deposit Admin Read',
    route: '/deposit-admin-read',
  },
  {
    name: 'Deposit Admin',
    route: '/deposit-admin',
  },
  {
    name: 'Withdraw Admin Read',
    route: '/withdraw-admin-read',
  },
  {
    name: 'Withdraw Admin',
    route: '/withdraw-admin',
  },
  {
    name: 'Service Admin Read',
    route: '/service-admin-read',
  },
  {
    name: 'Service Admin',
    route: '/service-admin',
  },
  {
    name: 'Custom Admin Read',
    route: '/custom-admin-read',
  },
  {
    name: 'Custom Admin',
    route: '/custom-admin',
  },
  {
    name: 'Roles Read',
    route: '/roles-read',
  },
  {
    name: 'Roles',
    route: '/roles',
  },
  {
    name: 'System Settings Read',
    route: '/settings/system-settings-read',
  },
  {
    name: 'System Settings',
    route: '/settings/system-settings',
  },
  {
    name: 'Levels Read',
    route: '/settings/levels-read',
  },
  {
    name: 'Levels',
    route: '/settings/levels',
  },
  {
    name: 'Support Read',
    route: '/settings/support-read',
  },
  {
    name: 'Support',
    route: '/settings/support',
  },
  {
    name: 'Guide Read',
    route: '/settings/guide-read',
  },
  {
    name: 'Guide',
    route: '/settings/guide',
  },
  {
    name: 'Rules Regulations Read',
    route: '/settings/rules-regulations-read',
  },
  {
    name: 'Rules Regulations',
    route: '/settings/rules-regulations',
  },
  {
    name: 'All Players Read',
    route: '/players/all-player-read',
  },
  {
    name: 'All Players',
    route: '/players/all-player',
  },
  {
    name: 'Top Winning Players Read',
    route: '/players/top-winning-player-read',
  },
  {
    name: 'Top Winning Players',
    route: '/players/top-winning-player',
  },
  {
    name: 'Blocked Players Read',
    route: '/players/blocked-player-read',
  },
  {
    name: 'Blocked Players',
    route: '/players/blocked-player',
  },
  {
    name: 'Spin Bonus Read',
    route: '/spin-bonus-read',
  },
  {
    name: 'Spin Bonus',
    route: '/spin-bonus',
  },
  {
    name: 'Spin History Read',
    route: '/spin-history-read',
  },
  {
    name: 'Spin History',
    route: '/spin-history',
  },
  {
    name: 'Welcome Main Menu Read',
    route: '/welcome-main-menu-read',
  },
  {
    name: 'Welcome Main Menu',
    route: '/welcome-main-menu',
  },
  {
    name: 'Download App Read',
    route: '/download-app-read',
  },
  {
    name: 'Download App',
    route: '/download-app',
  },
  {
    name: 'Themes & Appearances Read',
    route: '/themes-read',
  },
  {
    name: 'Themes & Appearances',
    route: '/themes',
  },
  {
    name: 'Deposit Management',
    route: '/deposit-management',
  },
  {
    name: 'Withdraw Management',
    route: '/withdraw-management',
  },
  {
    name: 'Service Management',
    route: '/service-management',
  },
];

export const validDepositRoutes = [
  '/deposit-management',
  '/deposit-management/',
  '/deposit-service',
  '/deposit-service/',
];

export const validWithdrawRoutes = [
  '/withdraw-management',
  '/withdraw-management/',
  '/withdraw-service',
  '/withdraw-service/',
];

export const validServiceRoutes = [
  '/service-management',
  '/service-management/',
  '/chat-management',
  '/chat-management/',
  '/chat-service',
  '/chat-service/',
];

export const validRoutes = [
  '*',
  ...validDepositRoutes,
  ...validWithdrawRoutes,
  ...validServiceRoutes,
];
