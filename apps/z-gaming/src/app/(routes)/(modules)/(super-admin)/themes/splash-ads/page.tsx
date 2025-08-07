import PageLayout from 'shared/src/components/layout/PageLayout';
import SplashAds from 'shared/src/components/pages/themes/splash-ads';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function SplashAdsThemePage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Themes & Appearance', href: '/themes' },
    { label: 'Splash Ads', href: '/themes/splash-ads' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} enableBack />
      <SplashAds />
    </div>
  );
}
