// enums.ts
import { z } from 'zod';

export const PmTargetEnum = z.enum(['LEVEL', 'PLAYER']).optional();

export const PmTypeEnum = z.enum(['RANDOM', 'WEIGHT', 'FAIR']).optional();

export const StatusEnum = z.enum(['ACTIVE', 'DELETED']);

export const PlayerStatusEnum = z.enum([
  'PENDING',
  'ACTIVE',
  'SUSPENDED',
  'BLOCKED',
]);

export const AdminStatusEnum = z.enum(['ACTIVE', 'INACTIVE']);

export const OTPStatusEnum = z.enum(['PENDING', 'EXPIRED', 'CONFIRMED']);

export const PlayerBlockStatusEnum = z.enum(['BLOCKED', 'UNBLOCKED']);

export const PlayerWalletTransactionTypeEnum = z.enum(['WITHDRAW', 'DEPOSIT']);

export const PlayerWalletTransactionStatusEnum = z.enum([
  'PREACCEPTED',
  'PENDING',
  'ACCEPTED',
  'REJECTED',
]);

export const AdminLoginStatusEnum = z.enum(['LOGIN', 'LOGOUT', 'REVOKED']);

export const NotificationEnum = z.enum([
  'ANNOUNCEMENT',
  'PROMOTION',
  'POCKET_MONEY',
]);

export const PocketMoneyEnum = z.enum([
  'DEPOSIT_PAGE',
  'SPIN_WHEEL',
  'POCKET_MONEY',
  'NONE',
]);

export const DashboardRequestStatusEnum = z.enum([
  'PREACCEPTED',
  'PENDING',
  'ACCEPTED',
  'REJECTED',
]);

export const TimeUnitEnum = z.enum(['DAYS', 'HOURS', 'MINUTES']);
