import { ProfileSchema } from '../../../../../src/types/profile.type';

export const generateProfileData = (): ProfileSchema => {
  const data: ProfileSchema = {
    user: {
      id: '1',
      name: 'Gaming Agent One',
      agentId: 'ZGB128',
      phone: '1234568372',
      email: 'user@example.com',
      joined: '2024-05-20T20:30:00Z',
      profilePicture: 'https://via.placeholder.com/150',
    },
    loginActivity: [
      {
        id: '1',
        device: 'Window PC',
        location: 'Bangkok, Thailand',
        dateTime: 'Now',
        status: 'Login Active',
      },
      {
        id: '2',
        device: 'Galaxy S',
        location: 'Beijing, China',
        dateTime: '2024-02-20T14:30:00Z',
        status: 'Login Active',
      },
      {
        id: '3',
        device: 'Pixel 3',
        location: 'Mandalay, Myanmar',
        dateTime: '2023-12-03T21:40:00Z',
        status: 'Login Active',
      },
      {
        id: '4',
        device: 'Pixel 3',
        location: 'Mandalay, Myanmar',
        dateTime: '2023-12-03T21:40:00Z',
        status: 'Logout',
      },
      {
        id: '5',
        device: 'Pixel 3',
        location: 'Mandalay, Myanmar',
        dateTime: '2023-12-03T21:40:00Z',
        status: 'Logout',
      },
    ],
  };

  // Validate and filter the data using applicationListSchema
  return data;
};
