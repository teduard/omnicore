import { BreadcrumbGroup,  Button,  Container, Header, KeyValuePairs, Link, SpaceBetween, StatusIndicator, Toggle } from '@cloudscape-design/components';
//import { MainLayout } from '../../layouts';

//import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'


//import { useOrganization } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { DashboardRoutes, SystemLogsRoutes } from '../../routes';
import SystemLogsLayout from './SystemLogsLayout';
import React from 'react';

function GeneralConfig() {
  return <>
  <Container header={<Header variant="h2">General configuration</Header>}>
    <KeyValuePairs
      columns={4}
      items={[
        {
          label: 'Engine',
          value: 'Oracle Enterprise Edition 12.1.0.2.v7',
        },
        {
          label: 'DB instance class',
          value: 'db.t2.large',
        },
        {
          label: 'DB instance status',
          value: <StatusIndicator type="success">Available</StatusIndicator>,
        },
        {
          label: 'Pending maintenance',
          value: 'None',
        },
      ]}
    />
  </Container>
  </>
}
function DatabaseConfig() {
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
  <Container header={<Header variant="h2">Database configuration</Header>}>
    {/* <KeyValuePairs
      columns={4}
      items={[
        {
          label: 'Engine',
          value: 'Oracle Enterprise Edition 12.1.0.2.v7',
        },
        {
          label: 'DB instance class',
          value: 'db.t2.large',
        },
        {
          label: 'DB instance status',
          value: <StatusIndicator type="success">Available</StatusIndicator>,
        },
        {
          label: 'Pending maintenance',
          value: 'None',
        },
      ]}
    /> */}
    <p>This demo uses <Link href="https://www.npmjs.com/package/sql.js" external>sql.js</Link> for storing the data and stores it in the browser's localStorage so that data is persistent during your sessions.<br/>
    The database can be download and explored with and SQLite explorers
    </p>
    <Button onClick={handleDbDownload}>Download database</Button>

    <br/>
    <br/>
    The demo starts with seed data which can be restored at any point
    <br/>
    <Button onClick={handleDbDownload}>Restore seed data</Button>

    <br/>
    <br/>
    Reseting the database to an empty state is also possible.
    <br/>
    This will empty all tables and restore the users tables to the seed data(user "admin", password "admin")
    <br/>
    <Button onClick={handleDbDownload}>Reset data</Button>
  </Container>
  </>
}

function AiConfig() {
  const [checked, setChecked] = React.useState(false);
  const [checkedWebLLM, setCheckedWebLLM] = React.useState(false);

  return <>
  <Container header={<Header variant="h2">AI configuration</Header>}>
    <KeyValuePairs
      columns={2}
      items={[
        {
          label: 'Embeddings',
          value: (
            <Toggle
              onChange={({ detail }) =>
                setChecked(detail.checked)
              }
              checked={checked}
            >
              Enabled
            </Toggle>
          ),
          info: (
            <Link variant="info" href="#">
              Info
            </Link>
          )
        },
        {
          label: 'WebLLM',
          value: (
            <Toggle
              onChange={({ detail }) =>
                setCheckedWebLLM(detail.checked)
              }
              checked={checkedWebLLM}
            >
              Enabled
            </Toggle>
          ),
          info: (
            <Link variant="info" href="#">
              Info
            </Link>
          )
        },
        // {
        //   label: 'DB instance status',
        //   value: <StatusIndicator type="success">Available</StatusIndicator>,
        // },
        // {
        //   label: 'Pending maintenance',
        //   value: 'None',
        // },
      ]}
    />
  </Container>
  </>
}

function Content2() {
    //const {organizationData} = useOrganization();   

    return <>
      <SpaceBetween size="m">
          <Header
            variant="h1">
            System tools
          </Header>

        <SpaceBetween direction="vertical" size="l">
          {/* <GeneralConfig/> */}
          <DatabaseConfig/>
          <AiConfig/>
        </SpaceBetween>
    </SpaceBetween>
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