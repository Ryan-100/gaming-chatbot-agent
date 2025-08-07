import PageLayout from 'shared/src/components/layout/PageLayout';
import SplashScreen from 'shared/src/components/pages/themes/splash-screen';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function SplashScreenThemePage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Themes & Appearance', href: '/themes' },
    { label: 'Splash Screen', href: '/themes/splash-screen' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} enableBack />
      <SplashScreen />
    </div>
  );
}
