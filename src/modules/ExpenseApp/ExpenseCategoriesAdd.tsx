import React from "react";
import { Link, SpaceBetween } from "@cloudscape-design/components";
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import { DashboardRoutes, ExpenseRoutes } from "../../routes/index.tsx";
import ExpenseLayout from "./ExpenseLayout.tsx";

import Form from "@cloudscape-design/components/form";
import Button from "@cloudscape-design/components/button";
import FormField from "@cloudscape-design/components/form-field";
import Input from "@cloudscape-design/components/input";
import { useDatabase } from "../../db/hooks/useDatabase.tsx";
import Flashbar from "@cloudscape-design/components/flashbar";
import AppBreadcrumbs from "../../components/AppBreadcrumbs.tsx";

function Breadcrumbs() {
  return (
    <AppBreadcrumbs
      items={[
        { text: "Dashboard", href: DashboardRoutes.path },
        { text: "Expense", href: `${ExpenseRoutes.path}` },
        { text: "All Categories", href: `${ExpenseRoutes.path}/categories` },
        { text: "Add category", href: `${ExpenseRoutes.path}/categories/add` },
      ]}
    />
  );
}

function Content() {
  const { execute } = useDatabase();
  const [categoryName, setCategoryName] = React.useState("");

  const [flashbarItems, setFlashBarItems] = React.useState([]);

  const handleForm = (e) => {
    e.preventDefault();

    execute(`INSERT INTO Categories (user_id, name, created_date) VALUES 
             (1, '${categoryName}', '2026/02/19')`);

    setFlashBarItems([{
        type: "info",
        dismissible: true,
        dismissLabel: "Dismiss message",
        onDismiss: () => setFlashBarItems([]),
        content: (
          <>
            The new category <b>{categoryName}</b> was added{" "}
            <Link color="inverted" href={`${ExpenseRoutes.path}/categories`}>
              see all categories
            </Link>
            .
          </>
        ),
        id: "message_1",
      },
    ]);
  };

  return (
    <>
      <SpaceBetween direction="vertical" size="l">
        <Flashbar items={flashbarItems} />

        <form onSubmit={handleForm}>
          <Form
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button variant="primary">Add</Button>
              </SpaceBetween>
            }
            header={<Header variant="h1">Add category</Header>}
          >
            <Container>
              <SpaceBetween direction="vertical" size="l">
                <FormField label="Name">
                  <Input
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.detail.value)}
                  />
                </FormField>
              </SpaceBetween>
            </Container>
          </Form>
        </form>
      </SpaceBetween>
    </>
  );
}

function ExpenseCategoriesAdd() {
  return (
    <>
      <ExpenseLayout content={<Content />} breadcrumbs={<Breadcrumbs />} />
    </>
  );
}

export default ExpenseCategoriesAdd;
