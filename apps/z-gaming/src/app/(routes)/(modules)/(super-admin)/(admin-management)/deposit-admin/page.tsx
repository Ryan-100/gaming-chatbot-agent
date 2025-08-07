import DepositAdmin from 'shared/src/components/pages/admin-management/deposit-admin';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function DepositAdminPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Admin Management', href: '/admin-management' },
    { label: 'Deposit Admin', href: '/deposit-admin' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <DepositAdmin />
    </div>
  );
}
