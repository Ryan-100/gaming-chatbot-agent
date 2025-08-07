import PageLayout from 'shared/src/components/layout/PageLayout';
import Withdraw from 'shared/src/components/pages/transactions/withdraw';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function WithdrawPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Transactions', href: '' },
    { label: 'Withdraw', href: '/transactions/withdraw' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <Withdraw />
    </div>
  );
}
