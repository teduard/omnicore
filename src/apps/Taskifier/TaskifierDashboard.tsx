import { BreadcrumbGroup, Container, Header } from '@cloudscape-design/components';
import TaskifierLayout from './TaskifierLayout';

import { useNavigate } from 'react-router-dom';
import { DashboardRoutes, TaskifierRoutes } from '../../routes';

function Content() {
    return <>
        <Container
      header={
        <Header
          variant="h1"
          //description="Organization details"
        >
          Taskifier
        </Header>
      }
    >
    </Container>
    </>
}

function Breadcrumbs() {
    const navigate = useNavigate();
    return <BreadcrumbGroup
                  items={[
                    { text: 'Dashboard', href: DashboardRoutes.path },
                    { text: 'Taskifier', href: TaskifierRoutes.path },
                  ]}
                  expandAriaLabel="Show path"
                  ariaLabel="Breadcrumbs"
                  onFollow={(event) => {
                    // 1. Check if it's an internal link
                    if (!event.detail.external) {
                      // 2. Stop the browser from reloading the page
                      event.preventDefault();
                      // 3. Let React Router handle the URL change
                      navigate(event.detail.href);
                    }
                  }}
                />
}

function TaskifierDashboard() {
    return <>
            <TaskifierLayout
                content={ <Content /> }
                breadcrumbs = { <Breadcrumbs /> }
            />
    </>
}

export default TaskifierDashboard;