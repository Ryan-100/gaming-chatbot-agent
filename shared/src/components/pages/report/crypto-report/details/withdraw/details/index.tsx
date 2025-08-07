'use client';
import React from 'react';
import dayjs from '../../../../../../../utils/dayjs';
import { useParams } from 'next/navigation';
import { Box, Flex, Text, Tooltip } from '@radix-ui/themes';
import { cn } from '../../../../../../../utils/cn';
import { CurrencyFormat } from '../../../../../../../utils/currencyFormat';
import { Image } from '../../../../../../ui/image';
import { Card } from '../../../../../../ui/card';
import StatusAmount from '../../components/StatusAmount';
import PropsTable from '../../../../../../shared/PropsTable';
import Loading from '../../../../../../ui/loading';
import { useGetTransactionsWithdrawDetailQuery } from '../../../../../../../stores/reducers/transactions-withdraw.reducer';

const getStatusText = (status: string) => {
  switch (status) {
    case 'PENDING':
      return 'text-text-surface-accent';
    case 'ACCEPTED':
      return 'text-text-success'; // Replace with your desired class
    case 'REJECTED':
      return 'text-text-error'; // Replace with your desired class
    default:
      return '';
  }
};

const WithdrawDetail = () => {
  const params = useParams<{ transactionId: string }>();

  const { data, isLoading, isSuccess } = useGetTransactionsWithdrawDetailQuery({
    id: params.transactionId,
  });
  const detailData = data?.body?.data;

  const initialTableData = [
    {
      key: 'Receiving account',
      value: (
        <Flex align="center" className="space-x-2">
          {detailData?.PaymentCategory?.File?.url && (
            <Image
              src={detailData?.PaymentCategory?.File?.url}
              alt="payment"
              width={32}
              height={32}
              className="rounded-[10px]"
            />
          )}
          <Box>
            <Tooltip
              content={
                detailData?.Player?.PlayerPaymentAccount[0]?.accountnumber
              }
            >
              <div className="font-semibold text-xs w-fit max-w-[100px] sm:max-w-52 md:max-w-64 truncate">
                {detailData?.Player?.PlayerPaymentAccount[0]?.accountnumber}
              </div>
            </Tooltip>
            <Tooltip
              content={detailData?.Player?.PlayerPaymentAccount[0]?.accountName}
            >
              <div className="text-xs w-fit max-w-[100px] sm:max-w-52 md:max-w-64 truncate">
                {detailData?.Player?.PlayerPaymentAccount[0]?.accountName}
              </div>
            </Tooltip>
          </Box>
        </Flex>
      ),
    },
    {
      key: 'Type',
      value: 'Withdraw',
    },
    {
      key: 'User',
      value: (
        <Flex>
          <p>{detailData?.Player?.name}</p>
          {detailData?.Player?.playerCode && (
            <p>({detailData?.Player?.playerCode})</p>
          )}
        </Flex>
      ),
    },
    {
      key: 'Status',
      value: (
        <Text
          className={cn(
            'capitalize',
            getStatusText(detailData?.status ?? 'PENDING')
          )}
        >
          {detailData?.status?.toLowerCase() ?? 'PENDING'}
        </Text>
      ),
    },
    {
      key: 'Requested on',
      value: dayjs(detailData?.createdAt ?? '').format('MMM DD, YYYY h:mm A'),
    },
    {
      key: 'Updated on',
      value: detailData?.updatedAt
        ? dayjs(detailData?.updatedAt).format('MMM DD, YYYY h:mm A')
        : '--',
    },
    {
      key: 'Updated by',
      value: detailData?.approvedBy ? detailData?.approvedBy : '--',
    },
    {
      key: 'Sending Account Name',
      value: detailData?.PaymentAccount.accountName ?? '',
    },
    {
      key: 'Sending Account Number',
      value: detailData?.PaymentAccount.accountNumber ?? '',
    },
  ];

  const [tableData, setTableData] = React.useState(initialTableData);

  React.useEffect(() => {
    const newTableData = [...initialTableData]; // Clone the initial table data
    if (detailData?.PaymentCategory?.PaymentType?.isCrypto) {
      const memo = {
        key: 'Memo',
        value: (
          <p>{detailData?.Player?.PlayerPaymentAccount[0]?.memo ?? '-'}</p>
        ),
      };
      const networkType = {
        key: 'Network Type',
        value: <p>{detailData?.PaymentCategory?.PaymentType?.name ?? '-'}</p>,
      };
      newTableData.splice(1, 0, memo);
      newTableData.splice(2, 0, networkType);
    }
    setTableData(newTableData);
  }, [detailData, isSuccess]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full gap-6">
      <Flex direction="column" gapY="16px" className="w-full">
        {detailData?.PaymentCategory.PaymentType.isCrypto ? (
          <Card className="py-2 px-4">
            <StatusAmount
              status={''}
              title="Withdraw Amount"
              amount={CurrencyFormat(detailData?.amount ?? 0)}
            />
            <StatusAmount
              status={detailData?.status ?? 'PENDING'}
              title="Deduced Amount"
              rate={`${detailData?.totalRate}`}
              crypto={
                CurrencyFormat(detailData?.receiveableAmount ?? 0) + ' USDT'
              }
            />
          </Card>
        ) : (
          <StatusAmount
            status={detailData?.status ?? 'PENDING'}
            title="Withdraw Amount"
            amount={CurrencyFormat(detailData?.amount ?? 0)}
          />
        )}
        <Card className="py-2 px-4">
          <PropsTable rows={tableData} />
        </Card>
        {detailData?.status === 'REJECTED' && (
          <Box
            className={cn(
              'py-4 px-6 items-center rounded-lg bg-surface-brandLight border border-border-brand mt-4'
            )}
          >
            <Box className="text-sm text-text-brand font-semibold pb-2">
              Reject Reason
            </Box>
            <Box className="text-sm ">{detailData?.reason}</Box>
          </Box>
        )}
      </Flex>
    </div>
  );
};

export default WithdrawDetail;
