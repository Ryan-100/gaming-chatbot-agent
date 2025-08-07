import { MainGameType } from './types';

export const statusOptions = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Active',
    value: 'active',
  },
  {
    label: 'Inactive',
    value: 'inactive',
  },
];

export const dummyMainGameList: MainGameType[] = [
  {
    id: '1',
    name: 'Mario',
    status: 'Active',
  },
  {
    id: '2',
    name: 'MLBB',
    status: 'Inactive',
  },
  {
    id: '3',
    name: 'LOL',
    status: 'Active',
  },
  {
    id: '4',
    name: 'HOK',
    status: 'Inactive',
  },
  {
    id: '5',
    name: 'AOV',
    status: 'Active',
  },
];
