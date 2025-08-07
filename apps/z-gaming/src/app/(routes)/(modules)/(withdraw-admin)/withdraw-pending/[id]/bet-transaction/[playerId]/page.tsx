import PageLayout from 'shared/src/components/layout/PageLayout';
import WithdrawBetTransactions from 'shared/src/components/pages/withdraw-admin/withdraw-pending/details/bet-transaction';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function WithdrawBetTransactionsPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Withdraw Pending', href: '/withdraw-pending' },
    { label: 'BetTransactions', href: '' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} enableBack />
      <WithdrawBetTransactions />
    </div>
  );
}
