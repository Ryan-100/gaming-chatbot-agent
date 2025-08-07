import DepositRecordHistoryDetail from 'shared/src/components/pages/deposit-admin/deposit-record-history/details';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function DepositRecordHistoryDetailPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Record History', href: '/deposit-record-history' },
    {
      label: 'Record History Details',
      href: '/deposit-record-history/details',
    },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} enableBack />
      <DepositRecordHistoryDetail />
    </div>
  );
}
