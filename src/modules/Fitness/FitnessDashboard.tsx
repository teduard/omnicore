import { Container, Header } from "@cloudscape-design/components";
import OrganizationLayout from "./FitnessLayout";
import { DashboardRoutes, FitnessRoutes } from "../../routes";
import AppBreadcrumbs from "../../components/AppBreadcrumbs";

function Content2() {
  return (
    <>
      <Container header={<Header variant="h1">Fitness</Header>}></Container>
    </>
  );
}

function Breadcrumbs() {
  return (
    <AppBreadcrumbs
      items={[
        { text: "Dashboard", href: import.meta.env.BASE_URL + DashboardRoutes.path },
        { text: "Fitness", href: import.meta.env.BASE_URL + FitnessRoutes.path },
      ]}
    />
  );
}

function FitnessDashboard() {
  return (
    <>
      <OrganizationLayout
        content={<Content2 />}
        breadcrumbs={<Breadcrumbs />}
      />
    </>
  );
}

export default FitnessDashboard;
