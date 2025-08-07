import PageLayout from 'shared/src/components/layout/PageLayout';
import WithdrawTransactionHistory from 'shared/src/components/pages/withdraw-admin/withdraw-rejected/details/transaction-history';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function WithdrawTransactionHistoryPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Withdraw Rejected', href: '/withdraw-rejected' },
    {
      label: 'Transaction History',
      href: '',
    },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} enableBack />
      <WithdrawTransactionHistory />
    </div>
  );
}
