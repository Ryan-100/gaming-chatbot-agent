import PageLayout from 'shared/src/components/layout/PageLayout';
import YearlyReport from 'shared/src/components/pages/report/yearly-report';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function MonthlyReportPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Report', href: '/yearly-report' },
    { label: 'Yearly Report', href: '/yearly-report' },
  ];

  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <YearlyReport />
    </div>
  );
}
