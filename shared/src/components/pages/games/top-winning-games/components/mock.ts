import { WinningGameType } from './types';

export const statusOptions = [
  {
    label: 'All',
    value: 'ALL',
  },
  {
    label: 'Active',
    value: 'ACTIVE',
  },
  {
    label: 'Inactive',
    value: 'INACTIVE',
  },
];

export const dummyWinningGameList: WinningGameType[] = [
  {
    id: 1,
    name: 'Mario',
    status: 'Active',
    mainGameName: 'Childhood',
    amount: 10000,
  },
];
