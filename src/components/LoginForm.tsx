import * as React from "react";
import Form from "@cloudscape-design/components/form";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import FormField from "@cloudscape-design/components/form-field";
import Input from "@cloudscape-design/components/input";
import { Box } from "@cloudscape-design/components";
import { useState } from "react";
import Flashbar from "@cloudscape-design/components/flashbar";

import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useDatabase } from "../db/hooks/useDatabase";
import { logger } from "../lib/logger";

function LoginForm() {
  const authContext = useContext(AuthContext);
   if (!authContext) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  const { setIsAuthenticated, setUser } = authContext;

  const { execute } = useDatabase();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const prefillHandler = () => {
    setUsername("john.doe@gmail.com");
    setPassword("P@ssw0rd#3");
  };

  const handleForm = () => {
    const sql = `SELECT user_id, first_name, last_name, email, town, phone
      from Users
      where 
      email = '${username}'
      and password_hash = '${password}'
    `;

    logger.debug("SQL:", sql);

    const res = execute(sql);

    logger.debug("RES:", res);
    if (res && res[0] && res[0].values) {
      logger.debug("user exists");
      const data = res[0].values[0];

      const userData = {
        UserId: data[0],
        FirstName: data[1],
        LastName: data[2],
        Email: data[3],
        Town: data[4],
        Phone: data[5],
      };

      setUser(userData);
      setIsAuthenticated(true);

      logger.debug("USER:", userData);
    } else {
      logger.debug("incorrect credentials");

      setItems([demoFlashMsg, errorFlashMsg]);

      setIsAuthenticated(false);
    }
  };

  const demoFlashMsg = {
    type: "info",
    dismissible: true,
    dismissLabel: "Dismiss message",
    onDismiss: () => setItems([]),
    content: (
      <>
        <Box variant="awsui-key-label">
          Available credentials for demo
          <br />
          <br />
          Username: john.doe@gmail.com
          <br />
          Password: P@ssw0rd#3
          <br />
          <br />
          <Button fullWidth onClick={prefillHandler}>
            Prefill credentials
          </Button>
        </Box>
      </>
    ),
    id: "message_1",
  };

  const errorFlashMsg = {
    type: "error",
    dismissible: true,
    dismissLabel: "Dismiss message",
    onDismiss: () => setItems([]),
    content: (
      <>
        <Box variant="awsui-key-label">Incorrect credentials.</Box>
      </>
    ),
    id: "message_2",
  };

  const [items, setItems] = React.useState([demoFlashMsg]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
        backgroundColor: "var(--color-background-layout-main)",
      }}
    >
      <div style={{ width: "100%", maxWidth: 400 }}>
        <Container header={<Header variant="h1">Sign in</Header>}>
          <Form
            actions={
              <Button variant="primary" fullWidth onClick={handleForm}>
                Sign in
              </Button>
            }
          >
            <SpaceBetween size="m">
              <Flashbar items={items} />

              <FormField label="Username">
                <Input
                  value={username}
                  onChange={({ detail }) => setUsername(detail.value)}
                  type="text"
                  autoFocus
                />
              </FormField>
              <FormField label="Password">
                <Input
                  value={password}
                  onChange={({ detail }) => setPassword(detail.value)}
                  type="password"
                />
              </FormField>
            </SpaceBetween>
          </Form>
        </Container>
      </div>
    </div>
  );
}

export default LoginForm;
