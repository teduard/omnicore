import {
  Box,
  Button,
  Container,
  Header,
  KeyValuePairs,
  Link,
  Modal,
  SpaceBetween,
  Toggle,
} from "@cloudscape-design/components";
import Layout from "./Layout";
import { DashboardRoutes, SystemLogsRoutes } from "../../routes";

import React from "react";
import AppBreadcrumbs from "../../components/AppBreadcrumbs";
import { STORAGE_KEYS } from "../../lib/storageKeys";

function DatabaseConfig() {
  const handleDbDownload = () => {
    const b64 = localStorage.getItem("sqlite_db");
    const bin = Uint8Array.from(atob(b64 || ""), (c) => c.charCodeAt(0));
    const blob = new Blob([bin]);
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "OmniCore_db.sqlite";
    a.click();
  };

  const [visibleModal, setVisibleModal] = React.useState(false);

  const handleDbResetConfirmation = () => {
    localStorage.removeItem(STORAGE_KEYS.SQLITE_DB);
    localStorage.removeItem(STORAGE_KEYS.SESSION_USER);
    localStorage.removeItem(STORAGE_KEYS.LAYOUT_THEME);
    localStorage.removeItem(STORAGE_KEYS.LAYOUT_DENSITY);
    localStorage.removeItem(STORAGE_KEYS.SESSION_AUTH);
    window.location.reload();
  };

  return (
    <>
      <Container header={<Header variant="h2">Database configuration</Header>}>
        <p>
          This demo uses{" "}
          <Link href="https://www.npmjs.com/package/sql.js" external>
            sql.js
          </Link>{" "}
          for storing the data and stores it in the browser's localStorage so
          that data is persistent during your sessions.
          <br />
          The database can be download and explored with and SQLite explorers
        </p>
        <Button onClick={handleDbDownload}>Download database</Button>
        {/* <br />
        <br />
        The demo starts with seed data which can be restored at any point
        <br />
        <Button onClick={handleDbDownload}>Restore seed data</Button> */}
        <br />
        <br />
        Reseting the database to the initial state is also possible.
        <br />
        This will empty all tables and restore the <b>Users</b> tables to the
        default user.
        <br />
        <Button onClick={() => setVisibleModal(true)}>Reset data</Button>
        <Modal
          onDismiss={() => setVisibleModal(false)}
          visible={visibleModal}
          footer={
            <Box float="right">
              <SpaceBetween direction="horizontal" size="xs">
                <Button variant="link" onClick={() => setVisibleModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleDbResetConfirmation}>
                  Ok
                </Button>
              </SpaceBetween>
            </Box>
          }
          header="Reset data"
        >
          This operation is cannot be undone.
          <br />
          Are you sure you want to reset all data?
        </Modal>
      </Container>
    </>
  );
}

function AiConfig() {
  const [checked, setChecked] = React.useState(false);
  const [checkedWebLLM, setCheckedWebLLM] = React.useState(false);

  return (
    <>
      <Container header={<Header variant="h2">AI configuration</Header>}>
        <KeyValuePairs
          columns={2}
          items={[
            {
              label: "Embeddings",
              value: (
                <Toggle
                  onChange={({ detail }) => setChecked(detail.checked)}
                  checked={checked}
                >
                  Enabled
                </Toggle>
              ),
              info: (
                <Link variant="info" href="#">
                  Info
                </Link>
              ),
            },
            {
              label: "WebLLM",
              value: (
                <Toggle
                  onChange={({ detail }) => setCheckedWebLLM(detail.checked)}
                  checked={checkedWebLLM}
                >
                  Enabled
                </Toggle>
              ),
              info: (
                <Link variant="info" href="#">
                  Info
                </Link>
              ),
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
  );
}

function Content() {
  return (
    <>
      <SpaceBetween size="m">
        <Header variant="h1">System tools</Header>

        <SpaceBetween direction="vertical" size="l">
          <DatabaseConfig />
          <AiConfig />
        </SpaceBetween>
      </SpaceBetween>
    </>
  );
}

function Breadcrumbs() {
  return (
    <AppBreadcrumbs
      items={[
        { text: "Dashboard", href: "/" + DashboardRoutes.path },
        { text: "System", href: SystemLogsRoutes.path },
      ]}
    />
  );
}

function SystemLogsDashboard() {
  return (
    <>
      <Layout content={<Content />} breadcrumbs={<Breadcrumbs />} />
    </>
  );
}

export default SystemLogsDashboard;
