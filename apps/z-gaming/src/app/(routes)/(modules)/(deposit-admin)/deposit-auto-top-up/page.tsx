import DepositAutoTopup from 'shared/src/components/pages/deposit-admin/deposit-auto-top-up';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function DepositAutoTopupPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Auto Top-up', href: '/deposit-auto-top-up' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <DepositAutoTopup />
    </div>
  );
}
