import {
  CustomAdminData,
  customAdminListSchema,
  DepositAdminData,
  depositAdminListSchema,
  RoleData,
  roleListSchema,
  ServiceAdminData,
  serviceAdminListSchema,
  WithdrawAdminData,
  withdrawAdminListSchema,
} from './type';

export const generateDepositAdminData = (): DepositAdminData[] => {
  const data: DepositAdminData[] = [
    {
      id: '1',
      name: 'Admin 1',
      login_id: 'wavedr21',
      password: '123456',
      payment_type: 'Kpay',
      phone: '09123456789',
      status: 'ACTIVE',
    },
    {
      id: '2',
      name: 'Admin 2',
      login_id: 'wavedr21',
      password: '123456',
      payment_type: 'Kpay',
      phone: '09123456789',
      status: 'ACTIVE',
    },
  ];

  // Validate the data
  const validData = data.filter(
    (transaction) => depositAdminListSchema.safeParse(transaction).success
  );

  return validData;
};

export const generateWithdrawAdminData = (): WithdrawAdminData[] => {
  const data: WithdrawAdminData[] = [
    {
      id: '1',
      name: 'Admin 1',
      login_id: 'wavedr21',
      password: '123456',
      payment_type: 'Kpay',
      phone: '09123456789',
      from_range: 1000,
      to_range: 100000,
      status: 'Active',
    },
    {
      id: '2',
      name: 'Admin 2',
      login_id: 'wavedr21',
      password: '123456',
      payment_type: 'Kpay',
      phone: '09123456789',
      from_range: 1000,
      to_range: 100000,
      status: 'Active',
    },
  ];

  // Validate the data
  const validData = data.filter(
    (transaction) => withdrawAdminListSchema.safeParse(transaction).success
  );

  return validData;
};

export const generateServiceAdminData = (): ServiceAdminData[] => {
  const data: ServiceAdminData[] = [
    {
      id: '1',
      name: 'Admin 1',
      login_id: 'wavedr21',
      password: '123456',
      payment_type: 'Kpay',
      phone: '09123456789',
      status: 'Active',
    },
    {
      id: '2',
      name: 'Admin 2',
      login_id: 'wavedr21',
      password: '123456',
      payment_type: 'Kpay',
      phone: '09123456789',
      status: 'Active',
    },
  ];

  // Validate the data
  const validData = data.filter(
    (transaction) => serviceAdminListSchema.safeParse(transaction).success
  );

  return validData;
};

export const generateCustomAdminData = (): CustomAdminData[] => {
  const data: CustomAdminData[] = [
    {
      id: '1',
      name: 'Admin 1',
      login_id: 'wavedr21',
      password: '123456',
      phone: '09123456789',
      status: 'Active',
    },
    {
      id: '2',
      name: 'Admin 2',
      login_id: 'wavedr21',
      password: '123456',
      phone: '09123456789',
      status: 'Active',
    },
  ];

  // Validate the data
  const validData = data.filter(
    (transaction) => customAdminListSchema.safeParse(transaction).success
  );

  return validData;
};

export const generateRoleData = (): RoleData[] => {
  const data: RoleData[] = [
    {
      id: '1',
      name: 'Admin 1',
      created_at: '12 Jan 2023',
      created_by: 'Super Admin',
      status: 'Active',
      permissions: [
        { id: '1', module: 'Deposit' },
        { id: '2', module: 'Withdraw' },
      ],
    },
    {
      id: '2',
      name: 'Admin 2',
      created_at: '12 Jan 2023',
      created_by: 'Super Admin',
      status: 'Active',
      permissions: [
        { id: '1', module: 'Deposit' },
        { id: '2', module: 'Withdraw' },
      ],
    },
  ];

  // Validate the data
  const validData = data.filter(
    (transaction) => roleListSchema.safeParse(transaction).success
  );

  return validData;
};
