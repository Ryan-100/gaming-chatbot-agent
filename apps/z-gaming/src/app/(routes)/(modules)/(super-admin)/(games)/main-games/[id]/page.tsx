import MainGamesDetails from 'shared/src/components/pages/games/main-games/details';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function MainGamesDetailsPage({
  searchParams,
}: {
  searchParams: {
    name: string;
  };
}) {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Games', href: '/main-games' },
    { label: 'Main Games', href: '/main-games' },
    {
      label: `${searchParams.name}`,
      href: `#`,
    },
  ];

  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} enableBack />
      <MainGamesDetails />
    </div>
  );
}
