import PageLayout from 'shared/src/components/layout/PageLayout';
import Guide from 'shared/src/components/pages/settings/guide';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function GuidePage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Settings', href: '/settings/guide' },
    { label: 'Guide', href: '/settings/guide' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <Guide />
    </div>
  );
}
