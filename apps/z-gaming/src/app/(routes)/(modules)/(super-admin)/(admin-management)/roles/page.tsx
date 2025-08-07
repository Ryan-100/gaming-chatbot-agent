import Roles from 'shared/src/components/pages/admin-management/roles';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function RolesPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Admin Management', href: '/admin-management' },
    { label: 'Roles', href: '/roles' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <Roles />
    </div>
  );
}
