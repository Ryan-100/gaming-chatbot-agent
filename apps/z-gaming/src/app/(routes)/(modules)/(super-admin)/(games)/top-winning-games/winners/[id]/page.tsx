import Winners from 'shared/src/components/pages/games/top-winning-games/winners';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function WinnersPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Games', href: '/main-games' },
    { label: 'Top Winning Games', href: '/top-winning-games' },
    {
      label: `Winners`,
      href: `/top-winning-games/winners`,
    },
  ];

  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} enableBack />
      <Winners />
    </div>
  );
}
