import { useRouter } from 'next/navigation';
import { ColumnDef } from '@tanstack/react-table';
import { Text, Tooltip } from '@radix-ui/themes';
import { Button } from '../../../../ui/button';
import {
  ReportWithdrawAdminCryptoListData,
  ReportWithdrawAdminFiatListData,
} from '../../../../../types/report-withdraw-admin.types';
import { CurrencyFormat } from '../../../../../utils/currencyFormat';

function Name(props: { target: ReportWithdrawAdminFiatListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.adminName}>
      <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
        {target.adminName}
      </p>
    </Tooltip>
  );
}

function PaymentMethod(props: { target: ReportWithdrawAdminFiatListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.paymentMethod}>
      <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
        {target.paymentMethod}
      </p>
    </Tooltip>
  );
}
function Amount(props: { target: ReportWithdrawAdminFiatListData }) {
  const { target } = props;
  return <Text className="">{CurrencyFormat(target.acceptedAmount)}</Text>;
}

function Actions(props: { target: ReportWithdrawAdminFiatListData }) {
  const router = useRouter();
  const { target } = props;
  const handleDetailsClick = () => {
    router.push(
      `/report-withdraw-admin/${target.adminId}?name=${target.adminName}&type=FIAT`
    );
  };

  return (
    <Button size={'sm'} variant="success" onClick={() => handleDetailsClick()}>
      Details
    </Button>
  );
}

export const columnDefs: ColumnDef<ReportWithdrawAdminFiatListData>[] = [
  {
    header: 'Admin Name',
    accessorKey: 'name',
    cell({ row }) {
      return <Name target={row.original} />;
    },
  },
  {
    header: 'Payment Method',
    accessorKey: 'paymentMethod',
    cell({ row }) {
      return <PaymentMethod target={row.original} />;
    },
  },
  {
    header: 'Accepted Count',
    accessorKey: 'acceptedCount',
  },
  {
    header: 'Accepted Amount',
    accessorKey: 'amount',
    cell({ row }) {
      return <Amount target={row.original} />;
    },
  },
  {
    header: 'Action',
    cell: ({ row }) => <Actions target={row.original} />,
  },
];

function USDTAmount(props: { target: ReportWithdrawAdminCryptoListData }) {
  const { target } = props;
  return <Text className="">{CurrencyFormat(target.acceptedUsdt)}</Text>;
}

function CryptoActions(props: { target: ReportWithdrawAdminCryptoListData }) {
  const router = useRouter();
  const { target } = props;
  const handleDetailsClick = () => {
    router.push(
      `/report-deposit-admin/${target.adminId}?name=${target.adminName}&type=CRYPTO`
    );
  };

  return (
    <Button size={'sm'} variant="success" onClick={() => handleDetailsClick()}>
      Details
    </Button>
  );
}

export const cryptoAdminColumnDefs: ColumnDef<ReportWithdrawAdminCryptoListData>[] =
  [
    {
      header: 'Admin Name',
      accessorKey: 'name',
      cell({ row }) {
        return <Name target={row.original} />;
      },
    },
    {
      header: 'Payment Method',
      accessorKey: 'paymentMethod',
      cell({ row }) {
        return <PaymentMethod target={row.original} />;
      },
    },
    {
      header: 'Accepted Count',
      accessorKey: 'acceptedCount',
    },
    {
      header: 'Accepted Amount (USDT)',
      accessorKey: 'amount',
      cell({ row }) {
        return <USDTAmount target={row.original} />;
      },
    },
    {
      header: 'Action',
      cell: ({ row }) => <CryptoActions target={row.original} />,
    },
  ];
