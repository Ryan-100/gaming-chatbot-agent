import RegisterBonusDetails from 'shared/src/components/pages/bonus/register-details';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function RegisterBonusDetailsPage({
  searchParams,
}: {
  searchParams: {
    name: string;
    id: string;
  };
}) {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Bonus', href: '' },
    { label: 'Active Bonus', href: '/active-bonus' },
    {
      label: `${searchParams.name}`,
      href: `/active-bonus/register?name=${searchParams.name}&id=${searchParams.id}`,
    },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} enableBack />
      <RegisterBonusDetails id={searchParams?.id} />
    </div>
  );
}
