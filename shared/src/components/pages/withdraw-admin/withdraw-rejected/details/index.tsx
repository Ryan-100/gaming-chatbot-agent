'use client';
import React from 'react';
import dayjs from '../../../../../utils/dayjs';
import { useParams, useRouter } from 'next/navigation';
import { Box, Flex, Text } from '@radix-ui/themes';
import { Card } from '../../../../ui/card';
import { Image } from '../../../../ui/image';
import { Button } from '../../../../ui/button';
import { Icons } from '../../../../ui/icons';
import Loading from '../../../../ui/loading';
import PropsTable from '../../../../shared/PropsTable';
import { CurrencyFormat } from '../../../../../../src/utils/currencyFormat';
import { handleCopyClick } from '../../../../../../src/utils/handleCopyClick';
import { useGetTransactionsWithdrawDetailQuery } from '../../../../../stores/reducers/transactions-withdraw.reducer';
import ReceivingAccountTable from './components/ReceivingAccountTable';

const RejectedDetails = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading } = useGetTransactionsWithdrawDetailQuery({
    id: params.id,
  });

  const detailData = data?.body?.data;

  const isCrypto = data?.body?.data?.PaymentCategory?.PaymentType?.isCrypto;

  const initialTableData = [
    {
      key: 'Deposit Count/ Amount',
      value: `${detailData?.topupWithdraw?.totalTopupCount} / ${CurrencyFormat(
        detailData?.topupWithdraw?.totalTopupAmount ?? 0
      )}`,
    },
    {
      key: 'Deposit (Last 30 Days) Count/ Amount',
      value: `${
        detailData?.topupWithdraw?.totalTopupOneMonthCount
      } / ${CurrencyFormat(
        detailData?.topupWithdraw?.totalTopupOneMonthAmount ?? 0
      )}`,
    },
    {
      key: 'Withdraw Count/ Amount',
      value: `${
        detailData?.topupWithdraw?.totalWithdrawalCount
      } / ${CurrencyFormat(
        detailData?.topupWithdraw?.totalWithdrawalAmount ?? 0
      )}`,
    },
    {
      key: 'Withdraw (Last 30 Days) Count/ Amount',
      value: `${
        detailData?.topupWithdraw?.totalWithdrawalOneMonthCount
      } / ${CurrencyFormat(
        detailData?.topupWithdraw?.totalWithdrawalOneMonthAmount ?? 0
      )}`,
    },
  ];
  const [tableData, setTableData] = React.useState(initialTableData);

  React.useEffect(() => {
    const newTableData = [...initialTableData]; // Clone the initial table data
    if (isCrypto) {
      const totalUsdtCountAmount = {
        key: 'USDT Deposit Count/ Amount',
        value: `${
          detailData?.topupWithdraw?.totalTopupUsdtCount
        } / ${CurrencyFormat(detailData?.topupWithdraw?.totalTopupUsdt ?? 0)}`,
      };
      const totalOneMonthUsdtCountAmount = {
        key: 'USDT Deposit (Last 30 Days) Count/ Amount',
        value: `${
          detailData?.topupWithdraw?.totalTopupOneMonthUsdtCount
        } / ${CurrencyFormat(
          detailData?.topupWithdraw?.totalTopupOneMonthUsdt ?? 0
        )}`,
      };
      const totalUsdtCountAmountWithdraw = {
        key: 'USDT Withdraw Count/ Amount',
        value: `${
          detailData?.topupWithdraw?.totalWithdrawlUsdtCount
        } / ${CurrencyFormat(
          detailData?.topupWithdraw?.totalWithdrawalUsdt ?? 0
        )}`,
      };
      const totalOneMonthUsdtCountAmountWithdraw = {
        key: 'USDT Withdraw (Last 30 Days) Count/ Amount',
        value: `${
          detailData?.topupWithdraw?.totalWithdrawlOneMonthUsdtCount
        } / ${CurrencyFormat(
          detailData?.topupWithdraw?.totalWithdrawalOneMonthUsdt ?? 0
        )}`,
      };
      newTableData.splice(2, 0, totalUsdtCountAmount);
      newTableData.splice(3, 0, totalOneMonthUsdtCountAmount);
      newTableData.splice(6, 0, totalUsdtCountAmountWithdraw);
      newTableData.splice(7, 0, totalOneMonthUsdtCountAmountWithdraw);
    }
    setTableData(newTableData);
  }, [isCrypto, detailData]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box className="space-y-6">
      {/* first detail data  */}
      {isCrypto && (
        <Card className="p-4 flex items-center justify-center">
          <div
            dangerouslySetInnerHTML={{ __html: detailData?.totalRate ?? '' }}
            className="font-semibold text-sm lg:text-base break-words
          whitespace-normal flex flex-col gap-1 text-center"
          />
        </Card>
      )}
      <Card className="flex items-center gap-4 py-4 max-[297px]:divide-y min-[297px]:divide-x-0 sm:divide-x sm:divide-y-0 divide-border-secondary flex-wrap">
        <Flex align="center" className="flex-1 px-4 gap-2">
          <Image
            src={detailData?.PaymentCategory.File?.url ?? ''}
            alt="screenshot"
            width={32}
            height={32}
            className="rounded-[10px]"
          />
          <Flex direction="column" className="gap-2">
            <Text className="font-semibold text-sm lg:text-base">
              Withdraw Amount
            </Text>
            <Text className="text-sm lg:text-base">
              {CurrencyFormat(detailData?.amount ?? 0)}
            </Text>
          </Flex>
        </Flex>
        {isCrypto && (
          <Flex align="center" className="flex-1 px-4 gap-2">
            <Image
              src={detailData?.PaymentCategory.File?.url ?? ''}
              alt="screenshot"
              width={32}
              height={32}
              className="rounded-[10px]"
            />
            <Flex direction="column" className="gap-2">
              <Text className="font-semibold text-sm lg:text-base">
                USDT Amount
              </Text>
              <Text className="text-sm lg:text-base">
                {CurrencyFormat(detailData?.receiveableAmount ?? 0)}
              </Text>
            </Flex>
          </Flex>
        )}
        {isCrypto && (
          <Flex align="center" className="flex-1 px-4 gap-2">
            <Flex direction="column" className="gap-2">
              <p className="font-semibold text-sm lg:text-base max-w-32 sm:max-w-60">
                Network Type
              </p>
              <p className="text-sm lg:text-base max-w-32 sm:max-w-60">
                {detailData?.PaymentCategory?.accountType}
              </p>
            </Flex>
          </Flex>
        )}
        {isCrypto && (
          <Flex align="center" className="flex-1 px-4 gap-2">
            <Flex direction="column" className="gap-2">
              <p className="font-semibold text-sm lg:text-base max-w-32 sm:max-w-60">
                Memo
              </p>
              <p className="text-sm lg:text-base max-w-32 sm:max-w-60">
                {detailData?.Player?.PlayerPaymentAccount[0]?.memo ?? '-'}
              </p>
            </Flex>
          </Flex>
        )}
        <Flex align="center" className="flex-1 px-4 gap-2">
          <Flex direction="column" className="gap-2">
            <p className="font-semibold text-sm lg:text-base max-w-32 sm:max-w-60">
              {detailData?.Player?.PlayerPaymentAccount[0]?.accountName}
            </p>
            <p className="text-sm lg:text-base max-w-32 sm:max-w-60">
              {detailData?.Player?.PlayerPaymentAccount[0]?.accountnumber}
            </p>
          </Flex>
        </Flex>
        <Flex align="center" className="flex-1 px-4 gap-2">
          <Flex direction="column" className="gap-2">
            <Text className="font-semibold text-sm lg:text-base">
              Requested Date & Time
            </Text>
            <Text className="text-sm lg:text-base">
              {dayjs(detailData?.createdAt).format('DD MMM YYYY, h:mm A')}
            </Text>
          </Flex>
        </Flex>
      </Card>
      {/* copy button */}
      <Flex className="flex-wrap items-center gap-4">
        <Button
          variant="secondary"
          className="flex items-center gap-2 flex-1"
          onClick={() => {
            handleCopyClick(`${detailData?.amount ?? 0}`);
          }}
        >
          <Icons.Copy />
          <Text className="text-sm lg:text-base">Copy Amount</Text>
        </Button>
        <Button
          variant="secondary"
          className="flex items-center gap-2 flex-1"
          onClick={() => {
            handleCopyClick(
              detailData?.Player?.PlayerPaymentAccount[0]?.accountnumber ?? '-'
            );
          }}
        >
          <Icons.Copy />
          <Text className="text-sm lg:text-base">
            Copy {isCrypto ? 'Address' : 'Phone'}
          </Text>
        </Button>
        {isCrypto && detailData?.Player?.PlayerPaymentAccount[0]?.memo && (
          <Button
            variant="secondary"
            className="flex items-center gap-2 flex-1"
            onClick={() => {
              handleCopyClick(
                detailData?.Player?.PlayerPaymentAccount[0]?.memo ?? '-'
              );
            }}
          >
            <Icons.Copy />
            <Text className="text-sm lg:text-base">Copy Memo</Text>
          </Button>
        )}
        <Button
          variant="secondary"
          className="flex items-center gap-2 flex-1"
          onClick={() => {
            handleCopyClick(
              `Amount : ${detailData?.amount ?? 0} / ${
                isCrypto ? 'Address' : 'Phone'
              } : ${
                detailData?.Player?.PlayerPaymentAccount[0]?.accountnumber ??
                '-'
              } ${isCrypto ? '/ Memo :' : ''} ${
                isCrypto
                  ? detailData?.Player?.PlayerPaymentAccount[0]?.memo
                    ? detailData?.Player?.PlayerPaymentAccount[0]?.memo
                    : '-'
                  : ''
              }`
            );
          }}
        >
          <Icons.Copy />
          <Text className="text-sm lg:text-base">Copy All</Text>
        </Button>
      </Flex>
      {/* Reject Reason Box  */}
      <Flex
        direction="column"
        className={
          'py-4 px-6 rounded-lg bg-surface-brandLight border border-border-brand'
        }
      >
        <Text className="text-sm lg:text-base text-text-brand font-semibold pb-2">
          Reject Reason
        </Text>
        <Text className="text-xs md:text-sm">{detailData?.reason}</Text>
      </Flex>
      {/* bet amount table  */}
      <Card>
        <Flex
          align="center"
          justify="center"
          className="p-4 border-b border-b-surface-secondary"
        >
          <Text className="font-semibold text-sm lg:text-base text-center">
            Balance & Game Bet Amount
          </Text>
        </Flex>
        <PropsTable
          rows={[
            {
              key: 'Total Balance',
              value: CurrencyFormat(
                detailData?.Player?.PlayerWallet[0]?.balance ?? 0
              ),
            },
            {
              key: 'Bonus',
              value: CurrencyFormat(
                detailData?.Player?.PlayerWallet[0]?.bonus ?? 0
              ),
            },
            {
              key: 'Remaining Bet Amount',
              value: CurrencyFormat(
                detailData?.Player?.PlayerWallet[0]?.requiredBetAmount ?? 0
              ),
            },
          ]}
        />
      </Card>
      {/* deposit withdraw table  */}
      <Card>
        <Flex
          align="center"
          justify="center"
          className="p-4 border-b border-b-surface-secondary"
        >
          <Text className="font-semibold text-sm lg:text-base text-center">
            Deposit/ Withdraw
          </Text>
        </Flex>
        <PropsTable rows={tableData} />
      </Card>
      {/* user information table  */}
      <Card>
        <Flex
          align="center"
          justify="center"
          className="p-4 border-b border-b-surface-secondary"
        >
          <Text className="font-semibold text-sm lg:text-base text-center">
            User Information
          </Text>
        </Flex>
        <PropsTable
          rows={[
            {
              key: 'Name',
              value: detailData?.Player?.name ?? '-',
            },
            {
              key: 'Phone/Email',
              value: detailData?.Player?.phone ?? detailData?.Player?.email,
            },
            {
              key: 'Created Date & Time',
              value: dayjs(detailData?.Player?.createdAt).format(
                'DD MMM YYYY, h:mm A'
              ),
            },
            {
              key: 'Last Login Date & Time',
              value: dayjs(detailData?.Player?.lastLoginDate).format(
                'DD MMM YYYY, h:mm A'
              ),
            },
            {
              key: 'Account Open Days',
              value: detailData?.Player?.accountOpenDate ?? 0,
            },
            {
              key: 'Status',
              value: detailData?.Player?.PlayerStatus ?? '-',
            },
            {
              key: 'Login Attempts',
              value: detailData?.Player?.loginAttempt ?? 0,
            },
          ]}
        />
      </Card>
      <ReceivingAccountTable
        data={detailData?.Player?.AllPlayerPaymentAccounts ?? []}
      />
      {/* transaction table  */}
      <Flex className="flex-wrap items-center gap-4">
        <Button
          variant="default"
          className="flex items-center gap-2 flex-1"
          onClick={() => {
            router.push(
              `${params.id}/transaction-history/${detailData?.Player?.id}`
            );
          }}
        >
          <Text className="text-sm lg:text-base">Transaction History</Text>
          <Icons.Right />
        </Button>
        <Button
          variant="default"
          className="flex items-center gap-2 flex-1"
          onClick={() => {
            router.push(
              `${params.id}/bet-transaction/${detailData?.Player?.id}`
            );
          }}
        >
          <Text className="text-sm lg:text-base">Bet Transactions</Text>
          <Icons.Right />
        </Button>
        <Button
          variant="default"
          className="flex items-center gap-2 flex-1"
          onClick={() => {
            router.push(`${params.id}/bonus-history/${detailData?.Player?.id}`);
          }}
        >
          <Text className="text-sm lg:text-base">Bonus History</Text>
          <Icons.Right />
        </Button>
        <Button
          variant="default"
          className="flex items-center gap-2 flex-1"
          onClick={() => {
            router.push(`${params.id}/same-ip-users/${detailData?.Player?.id}`);
          }}
        >
          <Text className="text-sm lg:text-base">Same IP Users</Text>
          <Icons.Right />
        </Button>
      </Flex>
      {/* IP address and device info table  */}
      <Card>
        <Flex
          align="center"
          justify="center"
          className="p-4 border-b border-b-surface-secondary"
        >
          <Text className="font-semibold text-sm lg:text-base text-center">
            Device Information
          </Text>
        </Flex>
        <PropsTable
          rows={
            detailData?.Player?.PlayerLoginActivity.map((activity) => {
              return {
                key: `Device - ${activity.device}`,
                value: `IP Address - ${activity.ipAddress}`,
              };
            }) ?? []
          }
        />
      </Card>
    </Box>
  );
};

export default RejectedDetails;
