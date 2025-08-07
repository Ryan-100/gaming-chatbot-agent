import HotGamesDetails from 'shared/src/components/pages/games/hot-games/details';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function HotGamesDetailsPage({
  searchParams,
}: {
  searchParams: {
    name: string;
  };
}) {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Games', href: '/main-games' },
    { label: 'Hot Games', href: '/hot-games' },
    { label: `${searchParams.name}`, href: `` },
  ];

  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <HotGamesDetails />
    </div>
  );
}
