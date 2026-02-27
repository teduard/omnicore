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

import { FitnessRoutes } from "../../routes";

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
            href: FitnessRoutes.path,
          },
          {
            type: "link",
            text: "View members",
            href: `${FitnessRoutes.path}/members`,
            info: <Badge color="green">2</Badge>,
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

function TaskifierLayout(props: IOrganizationLayoutProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MainLayout
          content={props.content}
          breadcrumbs={props.breadcrumbs}
          search={false}
          tools={<Tools />}
          toolsHide={true}
          navigation={<Navigation />}
          splitPanel={false} //{ <OrganizationSplitPanel /> }
        />
      </QueryClientProvider>
    </>
  );
}

export default TaskifierLayout;
