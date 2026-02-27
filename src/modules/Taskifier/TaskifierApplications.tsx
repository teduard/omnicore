import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import OrganizationLayout from "./TaskifierLayout";
import AppBreadcrumbs from "../../components/AppBreadcrumbs";

const queryClient = new QueryClient();

function AppContent() {
  return <>Your current tasks</>;
}

function Breadcrumbs() {
  return (
    <AppBreadcrumbs
      items={[{ text: "Dashboard", href: "/dashboard" },
        { text: "Organization", href: "/dashboard/taskifier" },
        { text: "Your applications", href: "/organization/applications" },]}
    />
  );
}

function TaskifierApplications() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <OrganizationLayout
          content={<AppContent />}
          breadcrumbs={<Breadcrumbs />}
        />
      </QueryClientProvider>
    </>
  );
}

export default TaskifierApplications;
