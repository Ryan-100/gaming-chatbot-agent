import PageLayout from 'shared/src/components/layout/PageLayout';
import WithdrawBetTransactions from 'shared/src/components/pages/withdraw-admin/withdraw-rejected/details/bet-transaction';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function WithdrawBetTransactionsPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Withdraw Rejected', href: '/withdraw-rejected' },
    { label: 'BetTransactions', href: '' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} enableBack />
      <WithdrawBetTransactions />
    </div>
  );
}
