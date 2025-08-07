import RoleUpdate from 'shared/src/components/pages/admin-management/roles/update';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function UpdateRolePage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Admin Management', href: '/admin-management' },
    { label: 'Roles', href: '/roles' },
    { label: 'Update Role', href: '' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} enableBack />
      <RoleUpdate />
    </div>
  );
}
