import PageLayout from 'shared/src/components/layout/PageLayout';
import Example from 'shared/src/components/pages/example';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function ExamplePage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Home', href: '/dashboard' },
    { label: 'Example', href: '/example' },
  ];

  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <Example />
    </div>
  );
}
