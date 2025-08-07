import CustomAdmin from 'shared/src/components/pages/admin-management/custom-admin';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function CustomAdminPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Admin Management', href: '/admin-management' },
    { label: 'Custom Admin', href: '/custom-admin' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <CustomAdmin />
    </div>
  );
}
