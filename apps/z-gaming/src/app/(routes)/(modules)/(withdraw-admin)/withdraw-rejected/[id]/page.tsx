import PageLayout from 'shared/src/components/layout/PageLayout';
import WithdrawDetails from 'shared/src/components/pages/withdraw-admin/withdraw-rejected/details';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function WithdrawDetailsPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Withdraw Rejected', href: '/withdraw-rejected' },
    { label: 'Details', href: '' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} enableBack />
      <WithdrawDetails />
    </div>
  );
}
