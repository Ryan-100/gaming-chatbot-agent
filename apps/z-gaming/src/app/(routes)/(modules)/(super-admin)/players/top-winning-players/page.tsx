import PageLayout from 'shared/src/components/layout/PageLayout';
import TopWinningPlayers from 'shared/src/components/pages/players/top-winning-players';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function TopWinningPlayersPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Players', href: '' },
    { label: 'Top Winning Players', href: '' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <TopWinningPlayers />
    </div>
  );
}
