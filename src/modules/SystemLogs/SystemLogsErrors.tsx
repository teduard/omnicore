import { Container } from "@cloudscape-design/components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "@cloudscape-design/components/header";
import { DashboardRoutes, SystemLogsRoutes } from "../../routes";
import SystemLogsLayout from "./SystemLogsLayout";
import AppBreadcrumbs from "../../components/AppBreadcrumbs";

const queryClient = new QueryClient();

function Content() {
  return (
    <Container header={<Header variant="h1">System Errors</Header>}></Container>
  );
}

function Breadcrumbs() {
  return (
    <AppBreadcrumbs
      items={[
        { text: "Dashboard", href: DashboardRoutes.path },
        { text: "System", href: SystemLogsRoutes.path },
        { text: "Errors", href: `${SystemLogsRoutes.path}/errors` },
      ]}
    />
  );
}

function SystemLogsErrors() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SystemLogsLayout content={<Content />} breadcrumbs={<Breadcrumbs />} />
      </QueryClientProvider>
    </>
  );
}

export default SystemLogsErrors;
