import PageLayout from 'shared/src/components/layout/PageLayout';
import PocketMoneyTransactions from 'shared/src/components/pages/pocket-money/transactions';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function PocketMoneyTransactionsPage({
  searchParams,
}: {
  searchParams: {
    id: string;
  };
}) {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Pocket Money', href: '/pocket-money/active-pocket-money' },
    { label: 'Active Pocket Money', href: '/pocket-money/active-pocket-money' },
    {
      label: 'Pocket Money Transactions',
      href: `/pocket-money/active-pocket-money/transactions?id=${searchParams?.id}`,
    },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} enableBack />
      <PocketMoneyTransactions id={searchParams?.id} />
    </div>
  );
}
