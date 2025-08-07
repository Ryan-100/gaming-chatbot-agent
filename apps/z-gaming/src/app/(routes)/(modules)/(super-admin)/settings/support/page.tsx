import PageLayout from 'shared/src/components/layout/PageLayout';
import Support from 'shared/src/components/pages/settings/support';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function SupportPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Settings', href: '/settings/support' },
    { label: 'Support', href: '/settings/support' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <Support />
    </div>
  );
}
