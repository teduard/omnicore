import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import OrganizationLayout from "./FitnessLayout";
import AppBreadcrumbs from "../../components/AppBreadcrumbs";

const queryClient = new QueryClient();

function AppContent() {
  return <>Fitness app</>;
}

function Breadcrumbs() {
  return (
    <AppBreadcrumbs
     items={[
        { text: "Dashboard", href: "/dashboard" },
        { text: "Organization", href: "/dashboard/taskifier" },
        { text: "Your applications", href: "/organization/applications" },
      ]}
    />
  );
}

function FitnessApplications() {
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

export default FitnessApplications;
