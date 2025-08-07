import ChildGamesDetails from 'shared/src/components/pages/games/child-games/details';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function ChildGamesDetailsPage({
  searchParams,
}: {
  searchParams: {
    name: string;
  };
}) {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Games', href: '' },
    { label: 'Child Games', href: '/child-games' },
    {
      label: `${searchParams.name}`,
      href: ``,
    },
  ];

  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} enableBack />
      <ChildGamesDetails />
    </div>
  );
}
