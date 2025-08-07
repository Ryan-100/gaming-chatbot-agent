import PageLayout from 'shared/src/components/layout/PageLayout';
import GameActivity from 'shared/src/components/pages/players/details/sections/game-activity';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function GameActivityPage({
  searchParams,
}: {
  searchParams: {
    name: string;
    route: string;
    id: string;
  };
}) {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Players', href: '/players/all-players' },
    {
      label: `${
        searchParams.route === 'ALL'
          ? 'All Players'
          : searchParams.route === 'BLOCKED'
          ? 'Blocked Players'
          : 'Top Winning Players'
      }`,
      href: `${
        searchParams.route === 'ALL'
          ? '/players/all-players'
          : searchParams.route === 'BLOCKED'
          ? '/players/blocked-players'
          : '/players/top-winning-players'
      }`,
    },
    {
      label: `${searchParams.name}`,
      href: `-1`,
    },
    {
      label: `Game Activity`,
      href: ``,
    },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} enableBack />
      <GameActivity />
    </div>
  );
}
