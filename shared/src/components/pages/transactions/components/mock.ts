import { DepositData, depositListSchema, GameData, gameListSchema, WithdrawData, withdrawListSchema, DepositBonusData, depositBonusListSchema, RegisterBonusData, registerBonusListSchema, PocketMoneyData, pocketMoneyListSchema } from './type';

export const generateDepositData = (): DepositData[] => {
  const data: DepositData[] = [
    {
      id: 1,
      player: 'Jacky',
      playerId: 'ID12345678',
      receivingAccount_url: '/upload/images/temp.png',
      receivingAccount: '09123456789',
      amount: '1000',
      pin: '123450',
      screenshot: '',
      requestedOn: 'Aug 24, 2023, 10:00 PM',
      status: 'Pending',
    },
    {
      id: 2,
      player: 'Jacky',
      playerId: 'ID12345678',
      receivingAccount_url: '/upload/images/temp.png',
      receivingAccount: '09123456789',
      amount: '1000',
      pin: '123450',
      screenshot: '',
      requestedOn: 'Aug 24, 2023, 10:00 PM',
      status: 'Accepted',
    },
    {
      id: 3,
      player: 'Jacky',
      playerId: 'ID12345678',
      receivingAccount_url: '/upload/images/temp.png',
      receivingAccount: '0x009c04...acad138f',
      amount: '1000',
      pin: '123450',
      screenshot: '/upload/images/temp.png',
      requestedOn: 'Aug 24, 2023, 10:00 PM',
      status: 'Rejected',
    },
    {
      id: 4,
      player: 'Jacky',
      playerId: 'ID12345678',
      receivingAccount_url: '/upload/images/temp.png',
      receivingAccount: '0x009c04...acad138f',
      amount: '1000',
      pin: '123450',
      screenshot: "/upload/images/temp.png",
      requestedOn: 'Aug 24, 2023, 10:00 PM',
      status: 'Pending',
    },
  ];

  // Validate the data
  const validData = data.filter(
    (transaction) => depositListSchema.safeParse(transaction).success
  );

  return validData;
};

export const generateWithdrawData = (): WithdrawData[] => {
  const data: WithdrawData[] = [
    {
      id: 1,
      player: 'Jacky',
      playerId: 'ID12345678',
      receivingAccount_url: '/upload/images/temp.png',
      receivingAccount: '09123456789',
      amount: '1000',
      pin: '123450',
      requestedOn: 'Aug 24, 2023, 10:00 PM',
      status: 'Pending',
    },
    {
      id: 2,
      player: 'Jacky',
      playerId: 'ID12345678',
      receivingAccount_url: '/upload/images/temp.png',
      receivingAccount: '09123456789',
      amount: '1000',
      pin: '123450',
      requestedOn: 'Aug 24, 2023, 10:00 PM',
      status: 'Accepted',
    },
    {
      id: 3,
      player: 'Jacky',
      playerId: 'ID12345678',
      receivingAccount_url: '/upload/images/temp.png',
      receivingAccount: '0x009c04...acad138f',
      amount: '1000',
      pin: '123450',
      requestedOn: 'Aug 24, 2023, 10:00 PM',
      status: 'Rejected',
    },
    {
      id: 4,
      player: 'Jacky',
      playerId: 'ID12345678',
      receivingAccount_url: '/upload/images/temp.png',
      receivingAccount: '0x009c04...acad138f',
      amount: '1000',
      pin: '123450',
      requestedOn: 'Aug 24, 2023, 10:00 PM',
      status: 'Pending',
    },
  ];

  // Validate the data
  const validData = data.filter(
    (transaction) => withdrawListSchema.safeParse(transaction).success
  );

  return validData;
};

export const generateGameData = (): GameData[] => {
  const data: GameData[] = [
    {
      id: 1,
      player: 'Jacky',
      playerId: 'ID12345678',
      game: 'Jet Fruit',
      amount: '500',
      inGameAmount: '500',
      processState: 'End',
      requestedOn: 'Aug 24, 2025, 10:00 PM',
      updatedOn: 'Aug 24, 2025, 10:00 PM',
    },
    {
      id: 2,
      player: 'Jacky',
      playerId: 'ID12345678',
      game: 'Child Game',
      amount: '500',
      inGameAmount: '500',
      processState: 'End',
      requestedOn: 'Aug 24, 2025, 10:00 PM',
      updatedOn: 'Aug 24, 2025, 10:00 PM',
    },
    {
      id: 3,
      player: 'Jacky',
      playerId: 'ID12345678',
      game: 'Child Game',
      amount: '500',
      inGameAmount: '500',
      processState: 'End',
      requestedOn: 'Aug 24, 2025, 10:00 PM',
      updatedOn: 'Aug 24, 2025, 10:00 PM',
    },
    {
      id: 4,
      player: 'Jacky',
      playerId: 'ID12345678',
      game: 'Child Game',
      amount: '500',
      inGameAmount: '500',
      processState: 'End',
      requestedOn: 'Aug 24, 2025, 10:00 PM',
      updatedOn: 'Aug 24, 2025, 10:00 PM',
    },
    {
      id: 5,
      player: 'Jacky',
      playerId: 'ID12345678',
      game: 'Child Game',
      amount: '500',
      inGameAmount: '500',
      processState: 'End',
      requestedOn: 'Aug 24, 2025, 10:00 PM',
      updatedOn: 'Aug 24, 2025, 10:00 PM',
    },
    {
      id: 6,
      player: 'Jacky',
      playerId: 'ID12345678',
      game: 'Child Game',
      amount: '500',
      inGameAmount: '500',
      processState: 'End',
      requestedOn: 'Aug 24, 2025, 10:00 PM',
      updatedOn: 'Aug 24, 2025, 10:00 PM',
    },
  ];

  // Validate the data
  const validData = data.filter(
    (transaction) => gameListSchema.safeParse(transaction).success
  );

  return validData;
};

export const generateDepositBonusData = (): DepositBonusData[] => {
  const data: DepositBonusData[] = [
    {
      id: 1,
      player: 'Jacky',
      playerId: 'ID12345678',
      topupAmount: '100',
      bonusAmount: '500',
      requestedOn: 'Aug 24, 2025, 10:00 PM',
    },
    {
      id: 2,
      player: 'Jacky',
      playerId: 'ID12345678',
      topupAmount: '100',
      bonusAmount: '500',
      requestedOn: 'Aug 24, 2025, 10:00 PM',
    },
    {
      id: 3,
      player: 'Jacky',
      playerId: 'ID12345678',
      topupAmount: '100',
      bonusAmount: '500',
      requestedOn: 'Aug 24, 2025, 10:00 PM',
    },
    {
      id: 4,
      player: 'Jacky',
      playerId: 'ID12345678',
      topupAmount: '100',
      bonusAmount: '500',
      requestedOn: 'Aug 24, 2025, 10:00 PM',
    },
    {
      id: 5,
      player: 'Jacky',
      playerId: 'ID12345678',
      topupAmount: '100',
      bonusAmount: '500',
      requestedOn: 'Aug 24, 2025, 10:00 PM',
    },
    {
      id: 6,
      player: 'Jacky',
      playerId: 'ID12345678',
      topupAmount: '100',
      bonusAmount: '500',
      requestedOn: 'Aug 24, 2025, 10:00 PM',
    },
    {
      id: 7,
      player: 'Jacky',
      playerId: 'ID12345678',
      topupAmount: '100',
      bonusAmount: '500',
      requestedOn: 'Aug 24, 2025, 10:00 PM',
    },
    {
      id: 8,
      player: 'Jacky',
      playerId: 'ID12345678',
      topupAmount: '100',
      bonusAmount: '500',
      requestedOn: 'Aug 24, 2025, 10:00 PM',
    },
  ];

  // Validate the data
  const validData = data.filter(
    (transaction) => depositBonusListSchema.safeParse(transaction).success
  );

  return validData;
};

export const generateRegisterBonusData = (): RegisterBonusData[] => {
  const data: RegisterBonusData[] = [
    {
      id: 1,
      description: 'New Year Register Bonus',
      player: 'Jacky',
      playerId: 'ID12345678',
      registerBonus: 100,
      lastAmount: 500,
      registeredOn: 'Aug 24, 2025, 10:00 PM',
    },
    {
      id: 2,
      description: 'New Year Register Bonus',
      player: 'Jacky',
      playerId: 'ID12345678',
      registerBonus: 100,
      lastAmount: 500,
      registeredOn: 'Aug 24, 2025, 10:00 PM',
    },
    {
      id: 3,
      description: 'New Year Register Bonus',
      player: 'Jacky',
      playerId: 'ID12345678',
      registerBonus: 100,
      lastAmount: 500,
      registeredOn: 'Aug 24, 2025, 10:00 PM',
    },
    {
      id: 4,
      description: 'New Year Register Bonus',
      player: 'Jacky',
      playerId: 'ID12345678',
      registerBonus: 100,
      lastAmount: 500,
      registeredOn: 'Aug 24, 2025, 10:00 PM',
    },
    {
      id: 5,
      description: 'New Year Register Bonus',
      player: 'Jacky',
      playerId: 'ID12345678',
      registerBonus: 100,
      lastAmount: 500,
      registeredOn: 'Aug 24, 2025, 10:00 PM',
    },
    {
      id: 6,
      description: 'New Year Register Bonus',
      player: 'Jacky',
      playerId: 'ID12345678',
      registerBonus: 100,
      lastAmount: 500,
      registeredOn: 'Aug 24, 2025, 10:00 PM',
    },
  ];

  // Validate the data
  const validData = data.filter(
    (transaction) => registerBonusListSchema.safeParse(transaction).success
  );

  return validData;
};

export const generatePocketMoneyData = (): PocketMoneyData[] => {
  const data: PocketMoneyData[] = [
    {
      id: 1,
      description: 'New Year Pocket Money',
      player: 'Jacky',
      playerId: 'ID12345678',
      pmAmount: 100,
      lastAmount: 500,
      claimedOn: 'Aug 24, 2025, 10:00 PM',
    },
    {
      id: 2,
      description: 'New Year Pocket Money',
      player: 'Jacky',
      playerId: 'ID12345678',
      pmAmount: 100,
      lastAmount: 500,
      claimedOn: 'Aug 24, 2025, 10:00 PM',
    },
    {
      id: 3,
      description: 'New Year Pocket Money',
      player: 'Jacky',
      playerId: 'ID12345678',
      pmAmount: 100,
      lastAmount: 500,
      claimedOn: 'Aug 24, 2025, 10:00 PM',
    },
  ];

  // Validate the data
  const validData = data.filter(
    (transaction) => pocketMoneyListSchema.safeParse(transaction).success
  );

  return validData;
};
