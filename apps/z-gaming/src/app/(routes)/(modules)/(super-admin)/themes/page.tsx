import PageLayout from 'shared/src/components/layout/PageLayout';
import ThemesOverview from 'shared/src/components/pages/themes';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function ThemePage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Themes & Appearance', href: '/themes' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <ThemesOverview />
    </div>
  );
}
