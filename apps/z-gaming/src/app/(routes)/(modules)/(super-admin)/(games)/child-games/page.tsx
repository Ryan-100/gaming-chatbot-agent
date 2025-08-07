import ChildGames from 'shared/src/components/pages/games/child-games';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function ChildGamesPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Games', href: '/main-games' },
    { label: 'Child Games', href: '/child-games' },
  ];

  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <ChildGames />
    </div>
  );
}
