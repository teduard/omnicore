// import * as React from "react";
// import Form from "@cloudscape-design/components/form";
// import SpaceBetween from "@cloudscape-design/components/space-between";
// import Button from "@cloudscape-design/components/button";
// import Container from "@cloudscape-design/components/container";
// import Header from "@cloudscape-design/components/header";
// import FormField from "@cloudscape-design/components/form-field";
// import Input from "@cloudscape-design/components/input";
// import { Box, Grid } from "@cloudscape-design/components";

// function LoginForm() {
//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         minHeight: "100vh",
//         backgroundColor: "var(--color-background-layout-main)",
//       }}
//     >
//     <Container header={<Header variant="h1">Sign in</Header>}>
//     {/* <Grid
//       gridDefinition={[
//           { colspan: 4, offset: { xxs: 4 } }
//       ]}
//     >
//      */}
//     <form onSubmit={e => e.preventDefault()}>
//       <Form
//         actions={
//           <SpaceBetween direction="horizontal" size="xs">
//             <Button variant="normal"
//               disabled
//               disabledReason="Registration form disabled in current demo"
//             >
//               Sign up
//             </Button>
//             <Button variant="primary">Sign in</Button>
//           </SpaceBetween>
//         }
//         header={<Header variant="h1">Sign in to your account</Header>}
//       >
//         <Container>
//           <SpaceBetween direction="vertical" size="l">
//             <Box variant="awsui-key-label">Use following credentials for demo: 
//             <br/>
//             Username: john.doe@gmail.com
//             <br/>
//             Password: P@ssw0rd#3
//             </Box>
//             <FormField label="Username">
//               <Input value={""} />
//             </FormField>
//             <FormField label="Password">
//               <Input value={""} />
//             </FormField>
//           </SpaceBetween>
//         </Container>
//       </Form>
//     </form>

//      {/* </Grid> */}
//      </Container>
//      </div>
//   );
// }

// export default LoginForm;
import * as React from "react";
import Form from "@cloudscape-design/components/form";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import FormField from "@cloudscape-design/components/form-field";
import Input from "@cloudscape-design/components/input";
import { Box, Grid } from "@cloudscape-design/components";
import { useState } from "react";
import Flashbar from "@cloudscape-design/components/flashbar";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [items, setItems] = React.useState([
    {
      type: "info",
      dismissible: true,
      dismissLabel: "Dismiss message",
      onDismiss: () => setItems([]),
      content: (
        <>
          <Box variant="awsui-key-label">Use following credentials for demo<br/>
              <br/>
              Username: john.doe@gmail.com
              <br/>
              Password: P@ssw0rd#3
              </Box>
        </>
      ),
      id: "message_1"
    }
  ]);
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
              <Button variant="primary" fullWidth>
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