import PageLayout from 'shared/src/components/layout/PageLayout';
import Onboarding from 'shared/src/components/pages/themes/onboarding';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function OnboardingThemePage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Themes & Appearance', href: '/themes' },
    { label: 'Onboarding', href: '/themes/onboarding' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} enableBack />
      <Onboarding />
    </div>
  );
}
