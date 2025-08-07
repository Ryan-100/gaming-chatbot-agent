import { ChildGameType } from './types';

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

export const dummyChildGameList: ChildGameType[] = [
  {
    id: '1',
    name: 'Mario',
    status: 'Active',
    mainGameName: 'Childhood',
  },
  {
    id: '2',
    name: 'MLBB',
    status: 'Inactive',
    mainGameName: 'Moonton',
  },
  {
    id: '3',
    name: 'LOL',
    status: 'Active',
    mainGameName: 'chinland',
  },
  {
    id: '4',
    name: 'HOK',
    status: 'Inactive',
    mainGameName: 'HKK',
  },
  {
    id: '5',
    name: 'AOV',
    status: 'Active',
    mainGameName: 'America',
  },
];
