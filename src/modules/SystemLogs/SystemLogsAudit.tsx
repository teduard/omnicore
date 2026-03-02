import { Container, Header } from "@cloudscape-design/components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SystemsLogsLayout from "./SystemLogsLayout";
import { SystemLogsRoutes, DashboardRoutes } from "../../routes";
import AppBreadcrumbs from "../../components/AppBreadcrumbs";

const queryClient = new QueryClient();

function AppContent() {
  return (
    <Container header={<Header variant="h1">System Audit</Header>}></Container>
  );
}

function Breadcrumbs() {
  return (
    <AppBreadcrumbs
      items={[
        { text: "Dashboard", href: import.meta.env.BASE_URL + DashboardRoutes.path },
        { text: "System", href: import.meta.env.BASE_URL + SystemLogsRoutes.path },
        { text: "Audit", href: import.meta.env.BASE_URL + `${SystemLogsRoutes.path}/audit` },
      ]}
    />
  );
}

function SystemsLogsAudit() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SystemsLogsLayout
          content={<AppContent />}
          breadcrumbs={<Breadcrumbs />}
        />
      </QueryClientProvider>
    </>
  );
}

export default SystemsLogsAudit;
