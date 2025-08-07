import PageLayout from 'shared/src/components/layout/PageLayout';
import GameTrackingPanel from 'shared/src/components/pages/game-tracking-panel';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function DashboardPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Game Tracking Panel', href: '/game-tracking-panel' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <GameTrackingPanel />
    </div>
  );
}
