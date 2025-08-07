import HotGames from 'shared/src/components/pages/games/hot-games';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function HotGamesPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Games', href: '/main-games' },
    { label: 'Hot Games', href: '' },
  ];

  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <HotGames />
    </div>
  );
}
