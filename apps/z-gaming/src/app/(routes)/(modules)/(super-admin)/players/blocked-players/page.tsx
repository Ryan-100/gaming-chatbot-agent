import PageLayout from 'shared/src/components/layout/PageLayout';
import BlockedPlayers from 'shared/src/components/pages/players/blocked-players';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function BlockedPlayersPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Players', href: '' },
    { label: 'Blocked Players', href: '' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <BlockedPlayers />
    </div>
  );
}
