import PageLayout from 'shared/src/components/layout/PageLayout';
import WithdrawRejected from 'shared/src/components/pages/withdraw-admin/withdraw-rejected';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function WithdrawRejectedPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Withdraw Rejected', href: '/withdraw-rejected' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <WithdrawRejected />
    </div>
  );
}
