import ServiceAdmin from 'shared/src/components/pages/admin-management/service-admin';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function ServiceAdminPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Admin Management', href: '/admin-management' },
    { label: 'Service Admin', href: '/service-admin' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <ServiceAdmin />
    </div>
  );
}
