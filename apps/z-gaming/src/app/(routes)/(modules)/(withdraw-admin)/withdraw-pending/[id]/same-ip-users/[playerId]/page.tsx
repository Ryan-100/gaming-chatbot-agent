import PageLayout from 'shared/src/components/layout/PageLayout';
import WithdrawSameIpUsers from 'shared/src/components/pages/withdraw-admin/withdraw-pending/details/same-ip-users';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function WithdrawSameIpUsersPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Withdraw Pending', href: '/withdraw-pending' },
    { label: 'Same IP Users', href: '' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} enableBack />
      <WithdrawSameIpUsers />
    </div>
  );
}
