'use client';
import React from 'react';
import dayjs from '../../../../../../../utils/dayjs';
import { useParams } from 'next/navigation';
import { Box, Flex, Text } from '@radix-ui/themes';
import { cn } from '../../../../../../../utils/cn';
import { CurrencyFormat } from '../../../../../../../utils/currencyFormat';
import { Image } from '../../../../../../ui/image';
import { Card } from '../../../../../../ui/card';
import StatusAmount from '../../components/StatusAmount';
import PropsTable from '../../../../../../shared/PropsTable';
import Loading from '../../../../../../ui/loading';
import { useGetTransactionsDepositDetailQuery } from '../../../../../../../stores/reducers/transactions-deposit.reducer';

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

const DepositDetail = () => {
  const params = useParams<{ transactionId: string }>();

  const { data, isLoading, isSuccess } = useGetTransactionsDepositDetailQuery({
    id: params.transactionId,
  });
  const detailData = data?.body?.data;

  const initialTableData = [
    {
      key: 'Payment',
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
          <Text>{detailData?.PaymentCategory.accountType}</Text>
        </Flex>
      ),
    },
    {
      key: 'Type',
      value: 'Deposit',
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
      key: 'Created on',
      value: detailData?.createdAt
        ? dayjs(detailData?.createdAt).format('MMM DD, YYYY h:mm A')
        : '--',
    },
    {
      key: 'Updated on',
      value: detailData?.updatedAt
        ? dayjs(detailData?.updatedAt).format('MMM DD, YYYY h:mm A')
        : '--',
    },
    {
      key: 'Updated by',
      value: (
        <Flex>
          <Text>{detailData?.ApprovedAdmin?.name}</Text>
          {detailData?.ApprovedAdmin?.agentCode && (
            <Text>({detailData?.ApprovedAdmin?.agentCode})</Text>
          )}
        </Flex>
      ),
    },
    {
      key: 'Receiving Account Name',
      value: <Text>{detailData?.PaymentAccount?.accountName}</Text>,
    },
    {
      key: 'Receiving Account Number',
      value: <Text>{detailData?.PaymentAccount?.accountNumber}</Text>,
    },
  ];
  const [tableData, setTableData] = React.useState(initialTableData);

  React.useEffect(() => {
    const newTableData = [...initialTableData]; // Clone the initial table data
    if (detailData?.PaymentCategory?.PaymentType?.isCrypto) {
      const memo = {
        key: 'Memo',
        value: <p>{detailData?.PaymentAccount?.memo ?? '-'}</p>,
      };
      newTableData.splice(1, 0, memo);
    }
    setTableData(newTableData);
  }, [detailData, isSuccess]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 ">
      <Flex direction="column" gapY="16px" className="col-span-2">
        {detailData?.PaymentCategory.PaymentType.isCrypto ? (
          <Card className="py-2 px-4">
            <StatusAmount
              status={''}
              title="Deposit Amount"
              amount={CurrencyFormat(detailData?.amount ?? 0)}
            />
            <StatusAmount
              status={detailData?.status ?? 'PENDING'}
              title="Transfer Amount"
              rate={`${detailData?.totalRate}`}
              crypto={
                CurrencyFormat(detailData?.transferedAmount ?? 0) + ' USDT'
              }
            />
          </Card>
        ) : (
          <StatusAmount
            status={detailData?.status ?? 'PENDING'}
            title="Deposit Amount"
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
      <Flex direction="column" gapY="20px" className="col-span-2 md:col-span-1">
        {detailData?.Image?.url && (
          <Image
            src={detailData?.Image?.url}
            alt="screenshot"
            width={328}
            height={420}
            className="w-full h-auto rounded-[10px]"
          />
        )}
      </Flex>
    </div>
  );
};

export default DepositDetail;
