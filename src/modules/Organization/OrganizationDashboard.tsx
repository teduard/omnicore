import {
  ColumnLayout,
  Container,
  Header,
  Spinner,
} from "@cloudscape-design/components";

import OrganizationLayout from "./OrganizationLayout";
import { useOrganization } from "../../hooks";
import AppBreadcrumbs from "../../components/AppBreadcrumbs";

function Content2() {
  const { organizationData } = useOrganization();

  return (
    <>
      <Container header={<Header variant="h1">Organization details</Header>}>
        {organizationData.fetched && (
          <>
            <ColumnLayout columns={2} variant="text-grid">
              <div>
                <h3>
                  You are a member of <b>{organizationData?.name}</b>
                </h3>
              </div>
              <div>
                <h3>Since: 2026-02-10</h3>
              </div>
              <div>
                <h3>Organization Id: {organizationData?.organizationId}</h3>
              </div>
              <div>
                <h3>
                  Status: {organizationData?.active && "Active"}{" "}
                  {!organizationData?.active && "Inactive"}
                </h3>
              </div>
            </ColumnLayout>
          </>
        )}

        {!organizationData.fetched && <Spinner />}
      </Container>
    </>
  );
}

function Breadcrumbs() {
  return (
    <AppBreadcrumbs
      items={[
        { text: "Dashboard", href: "/dashboard" },
        { text: "Organization", href: "/organization" },
      ]}
    />
  );
}

function OrganizationDashboard() {
  return (
    <>
      <OrganizationLayout
        content={<Content2 />}
        breadcrumbs={<Breadcrumbs />}
      />
    </>
  );
}

export default OrganizationDashboard;
