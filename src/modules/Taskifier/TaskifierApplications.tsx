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
      items={[{ text: "Dashboard", href: import.meta.env.BASE_URL + "/dashboard" },
        { text: "Organization", href: import.meta.env.BASE_URL + "/dashboard/taskifier" },
        { text: "Your applications", href: import.meta.env.BASE_URL + "/organization/applications" },]}
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
