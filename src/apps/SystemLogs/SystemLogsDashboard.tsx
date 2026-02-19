import { BreadcrumbGroup,  Button,  Container, Header, Link, SpaceBetween } from '@cloudscape-design/components';
//import { MainLayout } from '../../layouts';

//import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'


//import { useOrganization } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { DashboardRoutes, SystemLogsRoutes } from '../../routes';
import SystemLogsLayout from './SystemLogsLayout';

function Content2() {
    //const {organizationData} = useOrganization();   

    const handleDbDownload = () => {
      const b64 = localStorage.getItem('sqlite_db');
      const bin = Uint8Array.from(atob(b64 || ""), c => c.charCodeAt(0));
      const blob = new Blob([bin]);
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'OmniCore_db.sqlite';
      a.click();
    }

    return <>
        <Container
      header={
        <Header
          variant="h1"
        >
          System Tools
        </Header>
      }
    >
        <SpaceBetween direction="vertical" size="l">
          <p>This demo uses <Link href="https://www.npmjs.com/package/sql.js" external>sql.js</Link> for storing the data and stores it in the browser's localStorage so that data is persistent during sessions.<br/>
          The database can be download and explored with and SQLite explorers
          </p>
          <Button onClick={handleDbDownload}>Download database</Button>
        </SpaceBetween>
    </Container>
    </>
}

function Breadcrumbs() {
    const navigate = useNavigate();
    return <BreadcrumbGroup
                  items={[
                    { text: 'Dashboard', href: DashboardRoutes.path },
                    { text: 'System', href: SystemLogsRoutes.path },
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

function SystemLogsDashboard() {
    return <>
            <SystemLogsLayout
                content={ <Content2 /> }
                breadcrumbs = { <Breadcrumbs /> }
            />
    </>
}

export default SystemLogsDashboard;