import {
  Container,
  Form,
  FormField,
  Header,
  Input,
  KeyValuePairs,
} from "@cloudscape-design/components";
import Layout from "./Layout";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

import { DashboardRoutes } from "../../routes";
import AppBreadcrumbs from "../../components/AppBreadcrumbs";

function GeneralConfig() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  const { isAuthenticated, user } = authContext;

  return (
    <>
      {!isAuthenticated && user && "not logged in"}
      {isAuthenticated && user && (
        <Container header={<Header variant="h2">General configuration</Header>}>
          <KeyValuePairs
            columns={1}
            items={[
              {
                label: "First Name",
                value: user.FirstName,
              },
              {
                label: "Last Name",
                value: user.LastName,
              },
              {
                label: "Email",
                value: user.Email,
              },
              {
                label: "City/Town",
                value: user.Town,
              },
              {
                label: "Phone number",
                value: user.Phone,
              },
              {
                label: "",
                value: (
                  <Box textAlign="right" variant="p">
                    <Button>Edit</Button>
                  </Box>
                ),
              },
            ]}
          />
        </Container>
      )}
    </>
  );
}

function GeneralConfigEditForm() {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Form
        actions={
          <SpaceBetween direction="horizontal" size="xs">
            <Button formAction="none" variant="link">
              Cancel
            </Button>
            <Button variant="primary">Save</Button>
          </SpaceBetween>
        }
      >
        <Container header={<Header variant="h2">General configuration</Header>}>
          <SpaceBetween direction="vertical" size="l">
            <FormField label="First Name">
              <Input value={""} />
            </FormField>
            <FormField label="Last Name">
              <Input value={""} />
            </FormField>
            <FormField label="Email">
              <Input value={""} />
            </FormField>
            <FormField label="City/Town">
              <Input value={""} />
            </FormField>
            <FormField label="Phone numer">
              <Input value={""} />
            </FormField>
          </SpaceBetween>
        </Container>
      </Form>
    </form>
  );
}

function ResetPassword() {
  return (
    <>
      <Container header={<Header variant="h2">Reset password</Header>}>
        <KeyValuePairs
          columns={1}
          items={[
            {
              label: "Password",
              value: "None",
            },
            {
              label: "Confirm Password",
              value: "None",
            },
            {
              label: "",
              value: (
                <Box textAlign="right" variant="p">
                  <Button>Edit</Button>
                </Box>
              ),
            },
          ]}
        />
      </Container>
    </>
  );
}

function AppContent() {
  return (
    <SpaceBetween size="m">
      <Header
        variant="h1"
        actions={
          <SpaceBetween direction="horizontal" size="xs">
            {/* <Button variant='primary'>
                                Save profile
                              </Button> */}
          </SpaceBetween>
        }
      >
        Your profile
      </Header>

      <SpaceBetween direction="vertical" size="l">
        <GeneralConfig />
        <GeneralConfigEditForm />
        <ResetPassword />
      </SpaceBetween>
    </SpaceBetween>
  );
}

function Breadcrumbs() {
  return (
    <AppBreadcrumbs
      items={[
        { text: "Dashboard", href: "/" + DashboardRoutes.path },
        { text: "Profile", href: `${DashboardRoutes.path}/profile` },
      ]}
    />
  );
}

function Profile() {
  return (
    <>
      <Layout content={<AppContent />} breadcrumbs={<Breadcrumbs />} />
    </>
  );
}

export default Profile;
