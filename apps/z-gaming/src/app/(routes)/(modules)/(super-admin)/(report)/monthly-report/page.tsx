import MonthlyReport from 'shared/src/components/pages/report/monthly-report';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function MonthlyReportPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Report', href: '/monthly-report' },
    { label: 'Monthly Report', href: '/monthly-report' },
  ];

  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <MonthlyReport />
    </div>
  );
}
