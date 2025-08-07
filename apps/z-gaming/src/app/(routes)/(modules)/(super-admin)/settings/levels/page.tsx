import PageLayout from 'shared/src/components/layout/PageLayout';
import Levels from 'shared/src/components/pages/settings/levels';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function LevelsPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Settings', href: '/settings/levels' },
    { label: 'Levels', href: '/settings/levels' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <Levels />
    </div>
  );
}
