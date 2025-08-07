import PageLayout from 'shared/src/components/layout/PageLayout';
import Deposit from 'shared/src/components/pages/transactions/deposit';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function DepositPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Transactions', href: '' },
    { label: 'Deposit', href: '/transactions/deposit' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <Deposit />
    </div>
  );
}
