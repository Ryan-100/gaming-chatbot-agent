import PageLayout from 'shared/src/components/layout/PageLayout';
import WithdrawDetails from 'shared/src/components/pages/withdraw-admin/withdraw-accepted/details';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function WithdrawDetailsPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Withdraw Accepted', href: '/withdraw-accepted' },
    { label: 'Details', href: '' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} enableBack />
      <WithdrawDetails />
    </div>
  );
}
