import WithdrawAdmin from 'shared/src/components/pages/admin-management/withdraw-admin';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function WithdrawAdminPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Admin Management', href: '/admin-management' },
    { label: 'Withdraw Admin', href: '/withdraw-admin' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <WithdrawAdmin />
    </div>
  );
}
