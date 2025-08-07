'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { Box, Flex, Text, Tooltip } from '@radix-ui/themes';
import { cn } from '../../../../../utils/cn';
import { CurrencyFormat } from '../../../../../utils/currencyFormat';
import { Image } from '../../../../ui/image';
import { Card } from '../../../../ui/card';
import Loading from '../../../../ui/loading';
import StatusAmount from '../../components/StatusAmount';
import { RejectTransactionDialog } from '../../components/RejectTransactionDialog';
import PropsTable from '../../../../shared/PropsTable';
import {
  useApproveTransactionsWithdrawMutation,
  useGetTransactionsWithdrawDetailQuery,
  useRejectTransactionsWithdrawMutation,
} from '../../../../../stores/reducers/transactions-withdraw.reducer';
import dayjs from '../../../../../utils/dayjs';
import { Button } from '../../../../ui/button';
import { ConfirmationDialog } from '../../../../shared/dialog/ConfirmationDialog';
import { toast } from 'sonner';

const getStatusText = (status: string) => {
  switch (status) {
    case 'PENDING':
      return 'text-text-surface-accent';
    case 'ACCEPTED':
      return 'text-text-success';
    case 'REJECTED':
      return 'text-text-error';
    default:
      return '';
  }
};

const WithdrawDetail = () => {
  const [acceptModalOpen, setAcceptModalOpen] = React.useState(false);
  const [rejectModalOpen, setRejectModalOpen] = React.useState(false);
  const params = useParams<{ id: string }>();

  const { data, isLoading, isSuccess } = useGetTransactionsWithdrawDetailQuery({
    id: params.id,
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

  const [acceptAction] = useApproveTransactionsWithdrawMutation();
  const [rejectAction] = useRejectTransactionsWithdrawMutation();

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
    <Box>
      <Box className="space-y-4">
        {detailData?.PaymentCategory.PaymentType.isCrypto ? (
          <Card className="py-2 px-4">
            <StatusAmount
              status={''}
              title="Withdraw Amount"
              amount={CurrencyFormat(detailData?.amount ?? 0)}
            />
            <StatusAmount
              status={detailData?.status ?? 'PENDING'}
              title="Transfer Amount"
              rate={detailData?.totalRate ?? ''}
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

        <Card>
          <PropsTable rows={tableData} />
        </Card>
        {detailData?.status === 'PENDING' && (
          <Flex className="space-x-2 self-end w-1/4" justify="end">
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
      </Box>
      {detailData?.status === 'REJECTED' && (
        <Box
          className={cn(
            'py-4 px-6 items-center rounded-lg bg-surface-brandLight border border-border-brand mt-4'
          )}
        >
          <div className="text-sm text-text-brand font-semibold pb-2">
            Reject Reason
          </div>
          <div className="text-sm ">{detailData?.reason}</div>
        </Box>
      )}

      {acceptModalOpen && (
        <ConfirmationDialog
          open={acceptModalOpen}
          onClose={() => setAcceptModalOpen(false)}
          yesLabel="Accept"
          noLabel="Cancel"
          title="Accept Withdraw Request"
          message="Are you sure you want to accept this withdraw amount?"
          onSubmit={() => {
            acceptHandler();
          }}
          yesBtnColor="surface-success"
        />
      )}
      {rejectModalOpen && (
        <RejectTransactionDialog
          open={rejectModalOpen}
          onClose={() => setRejectModalOpen(false)}
          title="Reject Withdraw Request"
          message="Are you sure you want to reject this withdraw amount?"
          onSubmit={rejectHandler}
        />
      )}
    </Box>
  );
};

export default WithdrawDetail;
