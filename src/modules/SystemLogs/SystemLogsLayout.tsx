import {
  Badge,
  HelpPanel,
  SideNavigation,
} from "@cloudscape-design/components";
import { MainLayout } from "../../layouts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { type IOrganizationLayoutProps } from "./interfaces";

const queryClient = new QueryClient();

import { SystemLogsRoutes } from "../../routes";

function Tools() {
  return (
    <HelpPanel header={<h2>Your Organization</h2>}>
      Detail about your organization
      <br />
      <br />
      it's members and other details
    </HelpPanel>
  );
}

function Navigation() {
  const navigate = useNavigate();

  return (
    <>
      <SideNavigation
        activeHref={location.pathname}
        onFollow={(event) => {
          // 1. Check if it's an internal link
          if (!event.detail.external) {
            // 2. Stop the browser from reloading the page
            event.preventDefault();
            // 3. Let React Router handle the URL change
            navigate(event.detail.href);
          }
        }}
        header={{
          href: "#",
          text: "Overview",
        }}
        items={[
          {
            type: "link",
            text: `Summary`,
            href: SystemLogsRoutes.path,
          },
          {
            type: "link",
            text: "Errors",
            href: `${SystemLogsRoutes.path}/errors`,
            info: <Badge color="red">2</Badge>,
          },
          {
            type: "link",
            text: "Audit",
            href: `${SystemLogsRoutes.path}/audit`,
            info: <Badge color="green">9</Badge>,
          },
        ]}
      />
    </>
  );
}

// function OrganizationSplitPanel() {
//     return <SplitPanel header={"Organization help"}>
//                  <h2>Organization</h2>
//                  <Spinner size="large" />
//            </SplitPanel>
// }

function SystemLogsLayout(props: IOrganizationLayoutProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MainLayout
          content={props.content}
          breadcrumbs={props.breadcrumbs}
          //breadcrumbs = { <Breadcrumbs /> }

          tools={<Tools />}
          toolsHide={true}
          search={false}
          navigation={<Navigation />}
          splitPanel={false} //{ <OrganizationSplitPanel /> }
        />
      </QueryClientProvider>
    </>
  );
}

export default SystemLogsLayout;
