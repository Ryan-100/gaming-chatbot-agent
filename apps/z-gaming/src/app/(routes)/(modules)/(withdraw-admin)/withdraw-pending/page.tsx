import PageLayout from 'shared/src/components/layout/PageLayout';
import WithdrawPending from 'shared/src/components/pages/withdraw-admin/withdraw-pending';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function WithdrawPendingPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Withdraw Pending', href: '/withdraw-pending' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <WithdrawPending />
    </div>
  );
}
