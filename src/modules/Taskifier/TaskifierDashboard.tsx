import { Container, Header } from "@cloudscape-design/components";
import TaskifierLayout from "./TaskifierLayout";
import { DashboardRoutes, TaskifierRoutes } from "../../routes";
import AppBreadcrumbs from "../../components/AppBreadcrumbs";

function Content() {
  return (
    <>
      <Container
        header={
          <Header
            variant="h1"
          >
            Taskifier
          </Header>
        }
      ></Container>
    </>
  );
}

function Breadcrumbs() {
  return (
    <AppBreadcrumbs
      items={[
        { text: "Dashboard", href: import.meta.env.BASE_URL + DashboardRoutes.path },
        { text: "Taskifier", href: import.meta.env.BASE_URL + TaskifierRoutes.path },
      ]}
    />
  );
}

function TaskifierDashboard() {
  return (
    <>
      <TaskifierLayout content={<Content />} breadcrumbs={<Breadcrumbs />} />
    </>
  );
}

export default TaskifierDashboard;
