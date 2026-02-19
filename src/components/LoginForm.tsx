import * as React from "react";
import Form from "@cloudscape-design/components/form";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import FormField from "@cloudscape-design/components/form-field";
import Input from "@cloudscape-design/components/input";

function LoginForm() {
  return (
    <form onSubmit={e => e.preventDefault()}>
      <Form
        actions={
          <SpaceBetween direction="horizontal" size="xs">
            <Button formAction="none" variant="link">
              Sign up
            </Button>
            <Button variant="primary">Sign in</Button>
          </SpaceBetween>
        }
        header={<Header variant="h1">Sign in to your account</Header>}
      >
        <Container>
          <SpaceBetween direction="vertical" size="l">
            <FormField label="Username">
              <Input value={""} />
            </FormField>
            <FormField label="Password">
              <Input value={""} />
            </FormField>
          </SpaceBetween>
        </Container>
      </Form>
    </form>
  );
}

export default LoginForm;