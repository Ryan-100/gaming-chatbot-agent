import PageLayout from 'shared/src/components/layout/PageLayout';
import SystemSettings from 'shared/src/components/pages/settings/system-settings';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function SystemSettingsPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Settings', href: '/settings/system-settings' },
    { label: 'System Settings', href: '/settings/system-settings' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <SystemSettings />
    </div>
  );
}
