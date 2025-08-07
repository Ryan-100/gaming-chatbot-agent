'use client';
import React from 'react';
import { Box, Flex, Grid, Text } from '@radix-ui/themes';
import ActiveStatus from './components/ActiveStatus';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

import Link from 'next/link';
import dayjs from '../../../../utils/dayjs';
import { toast } from 'sonner';
import { Image } from '../../../ui/image';
import { Button } from '../../../ui/button';
import { Icons } from '../../../ui/icons';
import { Card } from '../../../ui/card';
import { Avatar, AvatarImage } from '../../../ui/avatar';
import Loading from '../../../ui/loading';
import { cn } from '../../../../utils/cn';
import { CurrencyFormat } from '../../../../utils/currencyFormat';
import PropsTable from '../../../../components/shared/PropsTable';
import ReceivingAccountTable from './components/ReceivingAccountTable';
import DeviceInfoTable from './components/DeviceInfoTable';
import { UserBlockDialog } from '../../../shared/dialog/UserBlockDialog';
import { UserUnblockDialog } from '../../../shared/dialog/UserUnblockDialog';
import { UserUnlockDialog } from '../../../shared/dialog/UserUnlockDialog';
import {
  useChangePasswordPlayerMutation,
  useGetPlayerDetailQuery,
  useUnlockPlayerMutation,
} from '../../../../stores/reducers/player.reducer';
import {
  useBlockPlayerMutation,
  useUnblockPlayerMutation,
} from '../../../../stores/reducers/player.reducer';
import { ChangePassDialog } from '../../../shared/dialog/ChangePassDialog';

const PlayerDetails = () => {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const route = searchParams.get('route');
  const router = useRouter();

  const [unlockModalOpen, setUnlockModalOpen] = React.useState(false);
  const [unblockModalOpen, setUnblockModalOpen] = React.useState(false);
  const [blockModalOpen, setBlockModalOpen] = React.useState(false);

  const { data, isLoading } = useGetPlayerDetailQuery({ id });
  const detailData = data?.body?.data;

  const [blockAction, { isLoading: isBlocking }] = useBlockPlayerMutation();
  const [unblockAction, { isLoading: isUnblocking }] =
    useUnblockPlayerMutation();
  const [unlockAction, { isLoading: isUnlocking }] = useUnlockPlayerMutation();
  const [changePassAction] = useChangePasswordPlayerMutation();

  const blockHandler = async (reason: string) => {
    try {
      const response = await blockAction({
        id,
        data: { reason: reason },
      });
      if (response.data?.meta?.success) {
        toast.success(response.data?.meta?.message);
        setBlockModalOpen(false);
        router.back();
      } else {
        const errorResponse: any = response;
        toast.error(errorResponse?.error.data?.meta?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const unblockHandler = async () => {
    try {
      const response = await unblockAction({
        id,
      });
      if (response.data?.meta?.success) {
        toast.success(response.data?.meta?.message);
        setUnblockModalOpen(false);
        router.back();
      } else {
        const errorResponse: any = response;
        toast.error(errorResponse?.error.data?.meta?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const unlockHandler = async () => {
    try {
      const response = await unlockAction({
        id,
      });
      if (response.data?.meta?.success) {
        toast.success(response.data?.meta?.message);
        setUnlockModalOpen(false);
        router.back();
      } else {
        const errorResponse: any = response;
        toast.error(errorResponse?.error.data?.meta?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const changePassHandler = async (password: string) => {
    try {
      const response = await changePassAction({
        id,
        data: { password: password },
      });
      if (response.data?.meta?.success) {
        toast.success(response.data?.meta?.message);
        router.back();
      } else {
        const errorResponse: any = response;
        toast.error(errorResponse?.error.data?.meta?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Flex direction="column" gap="4" className="w-full">
      {detailData?.PlayerStatus === 'BLOCKED' && (
        <Flex
          justify="between"
          align="center"
          className={cn(
            'px-6 py-4 rounded-lg border border-border-error',
            'bg-surface-brandLight'
          )}
        >
          <Flex align="center" gapX="8px">
            <Icons.Cancel className="w-8 h-8 text-primary" />
            <Text className="text-sm text-text-error">
              This player was blocked by the&nbsp;
              {
                detailData?.PlayerBlock[detailData?.PlayerBlock?.length - 1]
                  ?.CreatedByAdmin?.name
              }
              &nbsp;on&nbsp;
              {dayjs(
                detailData?.PlayerBlock[detailData?.PlayerBlock?.length - 1]
                  ?.createdAt
              ).format('MMM D, YYYY')}
              , for&nbsp;
              <Text as="span" className="font-semibold">
                {
                  detailData?.PlayerBlock[detailData?.PlayerBlock?.length - 1]
                    ?.reason
                }
              </Text>
              .
            </Text>
          </Flex>
        </Flex>
      )}
      {detailData?.PlayerStatus === 'LOCKED' && (
        <Flex
          justify="between"
          align="center"
          className={cn(
            'px-6 py-4 rounded-lg border border-border-accent',
            'bg-surface-accentLight'
          )}
        >
          <Flex align="center" gapX="8px">
            <Icons.Lock className="w-8 h-8 text-surface-accent" />
            <Text className="text-sm">Something went wrong!</Text>
          </Flex>
          <Button
            size="sm"
            className="bg-icon-accent text-neutral-700"
            onClick={() => setUnlockModalOpen(true)}
          >
            Unlock
          </Button>
        </Flex>
      )}
      <Card>
        <Flex
          justify="between"
          className="px-6 py-[19px] items-start flex-wrap gap-2"
        >
          <Flex align="center" className="gap-2 flex-wrap">
            <Flex
              direction="column"
              className="relative"
              align="center"
              justify="center"
            >
              <Flex
                className="bg-surface-accent rounded-full py-1 px-2 z-10 w-fit max-h-6 items-center justify-center"
                gap="2"
              >
                <Image
                  src={
                    detailData?.PlayerLevel?.Image?.url ??
                    '/upload/images/default_profile.png'
                  }
                  alt="Level Icon"
                  className="w-[18px] h-[18px]"
                />
                <p className="text-text-invert text-[10px] lg:text-xs max-w-fit">
                  {detailData?.PlayerLevel?.rank}
                </p>
              </Flex>
              <Avatar className="w-[64px] h-[64px] -mt-2">
                <AvatarImage
                  alt="profile"
                  src={
                    detailData?.Image?.url ??
                    '/upload/images/default_profile.png'
                  }
                />
                {/* <AvatarFallback>ပုံလို</AvatarFallback> */}
              </Avatar>
            </Flex>
            <Box className="space-y-1 text-xs leading-5">
              <Flex className="items-center justify-center gap-4 flex-wrap">
                <Text weight="bold" className="text-base md:text-lg lg:text-xl">
                  {detailData?.name}
                </Text>
                <Flex align="center" gap="4px">
                  <ActiveStatus />
                  <Text>
                    Last Active:&nbsp;
                    {dayjs(detailData?.lastLoginDate).format(
                      'DD MMM YYYY, h:mm A'
                    )}
                  </Text>
                </Flex>
              </Flex>
              <Text className="white-space-normal breaks-normal block">
                ID: {detailData?.playerCode} •{' '}
                {detailData?.email ?? detailData?.phone} •{' '}
                {detailData?.PlayerLevel?.name}
              </Text>
              <Text className="text-neutral-500">
                since&nbsp;
                {dayjs(detailData?.createdAt).format('DD MMM YYYY, h:mm A')}
              </Text>
            </Box>
          </Flex>
          {detailData?.PlayerStatus === 'ACTIVE' ? (
            <Button
              size="sm"
              className="max-w-16"
              variant="outline"
              onClick={() => setBlockModalOpen(true)}
            >
              Block
            </Button>
          ) : (
            <Button
              size="sm"
              className="max-w-16"
              onClick={() => setUnblockModalOpen(true)}
            >
              Unblock
            </Button>
          )}
        </Flex>
      </Card>
      <Grid
        columns={{
          initial: '1',
          sm: '2',
          lg: '3',
        }}
        gap="4"
      >
        <Card className="p-4">
          <PropsTable
            rows={[
              {
                key: 'Total Balance',
                value: CurrencyFormat(detailData?.totalBalance || 0),
              },
              {
                key: 'Required Bet Amount',
                value: CurrencyFormat(detailData?.requiredBetAmount ?? 0),
              },
              {
                key: 'Bonus',
                value: CurrencyFormat(detailData?.bonus ?? 0),
              },
              {
                key: 'Win',
                value: (
                  <p className="text-text-error">
                    {CurrencyFormat(detailData?.winningAmount ?? 0)}
                  </p>
                ),
              },
            ]}
          />
        </Card>
        <Card className="p-4">
          <p className="text-sm font-bold text-center">
            Deposit (Count/Amount)
          </p>
          <PropsTable
            rows={[
              {
                key: 'Fiat Total',
                value: `${
                  detailData?.topupWithdraw?.data?.totalTopupCount
                } / ${CurrencyFormat(
                  detailData?.topupWithdraw?.data?.totalTopupAmount ?? 0
                )}`,
              },
              {
                key: 'Fiat (Last 30 Days)',
                value: `${
                  detailData?.topupWithdraw?.data?.totalTopupOneMonthCount
                } / ${CurrencyFormat(
                  detailData?.topupWithdraw?.data?.totalTopupOneMonthAmount ?? 0
                )}`,
              },
              {
                key: 'USDT Total',
                value: `${
                  detailData?.topupWithdraw?.data?.totalTopupUsdtCount
                } / ${CurrencyFormat(
                  detailData?.topupWithdraw?.data?.totalTopupUsdt ?? 0
                )}`,
              },
              {
                key: 'USDT (Last 30 Days)',
                value: `${
                  detailData?.topupWithdraw?.data?.totalTopupOneMonthUsdtCount
                } / ${CurrencyFormat(
                  detailData?.topupWithdraw?.data?.totalTopupOneMonthUsdt ?? 0
                )}`,
              },
            ]}
          />
        </Card>
        <Card className="p-4">
          <p className="text-sm font-bold text-center">
            Withdraw (Count/Amount)
          </p>
          <PropsTable
            rows={[
              {
                key: 'Fiat Total',
                value: `${
                  detailData?.topupWithdraw?.data?.totalWithdrawalCount
                } / ${CurrencyFormat(
                  detailData?.topupWithdraw?.data?.totalWithdrawalAmount ?? 0
                )}`,
              },
              {
                key: 'Fiat (Last 30 Days)',
                value: `${
                  detailData?.topupWithdraw?.data?.totalWithdrawalOneMonthCount
                } / ${CurrencyFormat(
                  detailData?.topupWithdraw?.data
                    ?.totalWithdrawalOneMonthAmount ?? 0
                )}`,
              },
              {
                key: 'USDT Total',
                value: `${
                  detailData?.topupWithdraw?.data?.totalWithdrawlUsdtCount
                } / ${CurrencyFormat(
                  detailData?.topupWithdraw?.data?.totalWithdrawalUsdt ?? 0
                )}`,
              },
              {
                key: 'USDT (Last 30 Days)',
                value: `${
                  detailData?.topupWithdraw?.data
                    ?.totalWithdrawlOneMonthUsdtCount
                } / ${CurrencyFormat(
                  detailData?.topupWithdraw?.data
                    ?.totalWithdrawalOneMonthUsdt ?? 0
                )}`,
              },
            ]}
          />
        </Card>

        <Card className="p-4">
          <PropsTable
            rows={[
              {
                key: 'Password',
                value: (
                  <div className="ml-6">
                    <ChangePassDialog
                      onSubmit={changePassHandler}
                      isDigit
                      maxLength={6}
                    />
                  </div>
                ),
              },
              {
                key: 'Password Locked',
                value: detailData?.passwordLocked ?? 'No',
              },
              {
                key: 'Login Attempts',
                value: CurrencyFormat(detailData?.loginAttempt ?? 0),
              },
            ]}
          />
        </Card>
      </Grid>
      <Grid
        columns={{
          initial: '1',
          sm: '1',
          lg: '2',
        }}
        gap={'4'}
      >
        <Box className="relative">
          <ReceivingAccountTable
            data={detailData?.PlayerPaymentAccount ?? []}
          />
        </Box>
        <Box className="relative">
          <DeviceInfoTable data={detailData?.PlayerLoginActivity ?? []} />
        </Box>
      </Grid>
      <Link
        href={`/players/${id}/transaction-history?name=${detailData?.name}&route=${route}&id=${id}`}
      >
        <Button size="lg">Transaction History</Button>
      </Link>
      <Link
        href={`/players/${id}/bonus-history?name=${detailData?.name}&route=${route}&id=${id}`}
      >
        <Button size="lg">Bonus History</Button>
      </Link>
      <Link
        href={`/players/${id}/game-activity?name=${detailData?.name}&route=${route}&id=${id}`}
      >
        <Button size="lg">Game Activity</Button>
      </Link>
      <Link
        href={`/players/${id}/same-ip-users?name=${detailData?.name}&route=${route}&id=${id}`}
      >
        <Button size="lg">Same IP Users</Button>
      </Link>
      {unlockModalOpen && (
        <UserUnlockDialog
          title="Unlock Profile?"
          message="Are you sure you want to unlock this profile?"
          open={unlockModalOpen}
          onClose={() => setUnlockModalOpen(false)}
          onSubmit={unlockHandler}
          isLoading={isUnlocking}
        />
      )}
      {unblockModalOpen && (
        <UserUnblockDialog
          title="Unblock?"
          message="Are you sure you want to unblock this player?"
          open={unblockModalOpen}
          onClose={() => setUnblockModalOpen(false)}
          onSubmit={unblockHandler}
          isLoading={isUnblocking}
        />
      )}
      {blockModalOpen && (
        <UserBlockDialog
          title="Block?"
          message="Are you sure you want to block this player?"
          open={blockModalOpen}
          onClose={() => setBlockModalOpen(false)}
          onSubmit={blockHandler}
          isLoading={isBlocking}
        />
      )}
    </Flex>
  );
};

export default PlayerDetails;
