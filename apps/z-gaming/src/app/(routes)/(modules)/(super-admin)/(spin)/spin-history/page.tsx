import PageLayout from 'shared/src/components/layout/PageLayout';
import SpinHistory from 'shared/src/components/pages/spin/spin-history';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function SpinBonusPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Spin', href: '/spin-history' },
    { label: 'Spin History', href: '/spin-history' },
  ];

  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <SpinHistory />
    </div>
  );
}
