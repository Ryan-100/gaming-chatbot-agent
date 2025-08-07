import MainGames from 'shared/src/components/pages/games/main-games';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function MainGamesPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Games', href: '/main-games' },
    { label: 'Main Games', href: '' },
  ];

  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <MainGames />
    </div>
  );
}
