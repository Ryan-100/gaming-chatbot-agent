import PageLayout from 'shared/src/components/layout/PageLayout';
import WithdrawDetail from 'shared/src/components/pages/transactions/withdraw/detail';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function WithdrawDetailPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Transactions', href: '' },
    { label: 'Withdraw', href: '/transactions/withdraw' },
    { label: 'Detail', href: '/transactions/withdraw/detail' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} enableBack />
      <WithdrawDetail />
    </div>
  );
}
