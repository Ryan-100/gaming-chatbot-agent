import TopWinningGames from 'shared/src/components/pages/games/top-winning-games';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function TopWinningGamesPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Games', href: '/main-games' },
    { label: 'Top Winning Games', href: '/top-winning-games' },
  ];

  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <TopWinningGames />
    </div>
  );
}
