'use client';
import React from 'react';
import dayjs from '../../../../../utils/dayjs';
import { useParams } from 'next/navigation';
import { Box, Flex, Text } from '@radix-ui/themes';
import { toast } from 'sonner';
import { cn } from '../../../../../utils/cn';
import { CurrencyFormat } from '../../../../../utils/currencyFormat';
import { Image } from '../../../../ui/image';
import { Card } from '../../../../ui/card';
import { Button } from '../../../../ui/button';
import StatusAmount from '../../components/StatusAmount';
import { ConfirmationDialog } from '../../../../shared/dialog/ConfirmationDialog';
import { RejectTransactionDialog } from '../../components/RejectTransactionDialog';
import PropsTable from '../../../../shared/PropsTable';
import {
  useApproveTransactionsDepositMutation,
  useGetTransactionsDepositDetailQuery,
  useRejectTransactionsDepositMutation,
} from '../../../../../stores/reducers/transactions-deposit.reducer';
import Loading from '../../../../ui/loading';

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
  const [acceptModalOpen, setAcceptModalOpen] = React.useState(false);
  const [rejectModalOpen, setRejectModalOpen] = React.useState(false);
  const params = useParams<{ id: string }>();

  const { data, isLoading, isSuccess } = useGetTransactionsDepositDetailQuery({
    id: params.id,
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

  const [acceptAction] = useApproveTransactionsDepositMutation();
  const [rejectAction] = useRejectTransactionsDepositMutation();

  const acceptHandler = async () => {
    try {
      const response = await acceptAction({ id: params.id });
      if (response.data?.meta?.success) {
        toast.success(response.data?.meta?.message);
      } else {
        const errorResponse: any = response;
        toast.error(errorResponse?.error.data?.meta?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const rejectHandler = async (reason: string) => {
    try {
      const response = await rejectAction({
        id: params.id,
        data: { reason: reason },
      });
      if (response.data?.meta?.success) {
        toast.success(response.data?.meta?.message);
        setRejectModalOpen(false);
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
        {detailData?.status === 'PENDING' && (
          <Flex className="space-x-2">
            <Button
              variant="destructive"
              className="flex-1"
              onClick={() => setRejectModalOpen(true)}
            >
              Reject
            </Button>
            <Button
              variant="success"
              className="flex-1"
              onClick={() => setAcceptModalOpen(true)}
            >
              Accept
            </Button>
          </Flex>
        )}
      </Flex>
      <ConfirmationDialog
        open={acceptModalOpen}
        onClose={() => setAcceptModalOpen(false)}
        yesLabel="Accept"
        noLabel="Cancel"
        title="Accept Deposit Request"
        message="Are you sure you want to accept this deposit amount?"
        onSubmit={() => {
          acceptHandler();
        }}
        yesBtnColor="surface-success"
      />
      <RejectTransactionDialog
        open={rejectModalOpen}
        onClose={() => setRejectModalOpen(false)}
        title="Reject Deposit Request"
        message="Are you sure you want to reject this deposit amount?"
        onSubmit={rejectHandler}
      />
    </div>
  );
};

export default DepositDetail;
