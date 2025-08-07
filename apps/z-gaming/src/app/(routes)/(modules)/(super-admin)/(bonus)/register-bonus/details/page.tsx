import PageLayout from 'shared/src/components/layout/PageLayout';
import RegisterBonusDetails from 'shared/src/components/pages/bonus/deposit-details';
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
    { label: 'Register Bonus', href: '/register-bonus' },
    {
      label: `${searchParams.name}`,
      href: `/register-bonus/details?name=${searchParams.name}&id=${searchParams.id}`,
    },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} enableBack />
      <RegisterBonusDetails id={searchParams?.id} />
    </div>
  );
}
