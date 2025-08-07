import PageLayout from 'shared/src/components/layout/PageLayout';
import Players from 'shared/src/components/pages/players/all-players';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function PlayersPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Players', href: '/players/all-players' },
    { label: 'All Players', href: '/players/all-players' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <Players />
    </div>
  );
}
