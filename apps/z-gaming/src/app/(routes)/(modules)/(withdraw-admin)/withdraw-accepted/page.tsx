import PageLayout from 'shared/src/components/layout/PageLayout';
import WithdrawAccepted from 'shared/src/components/pages/withdraw-admin/withdraw-accepted';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function WithdrawAcceptedPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Withdraw Accepted', href: '/withdraw-accepted' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <WithdrawAccepted />
    </div>
  );
}
