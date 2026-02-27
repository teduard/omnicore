import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import OrganizationLayout from "./OrganizationLayout";
import AppBreadcrumbs from "../../components/AppBreadcrumbs";

const queryClient = new QueryClient();

function AppContent() {
  return <>Your team</>;
}

function Breadcrumbs() {
  return (
    <AppBreadcrumbs
      items={[
        { text: "Dashboard", href: "/dashboard" },
        { text: "Organization", href: "/organization" },
        { text: "Your applications", href: "/organization/applications" },
      ]}
    />
  );
}

function OrganizationApplications() {
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

export default OrganizationApplications;
