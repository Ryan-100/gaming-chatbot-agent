import PageLayout from 'shared/src/components/layout/PageLayout';
import DepositDetail from 'shared/src/components/pages/transactions/deposit/detail';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function DepositDetailPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Transactions', href: '' },
    { label: 'Deposit', href: '/transactions/deposit' },
    { label: 'Detail', href: '/transactions/deposit/detail' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} enableBack />
      <DepositDetail />
    </div>
  );
}
