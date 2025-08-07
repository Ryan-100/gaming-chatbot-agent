import RoleCreate from 'shared/src/components/pages/admin-management/roles/create';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function RolesPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Admin Management', href: '/admin-management' },
    { label: 'Roles', href: '/roles' },
    { label: 'Create Role', href: '' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} enableBack />
      <RoleCreate />
    </div>
  );
}
