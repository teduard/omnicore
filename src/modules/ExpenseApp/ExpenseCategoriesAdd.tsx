import React, { useState } from "react";
import { Link, SpaceBetween } from "@cloudscape-design/components";
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import { DashboardRoutes, ExpenseRoutes } from "../../routes/index.tsx";
import ExpenseLayout from "./ExpenseLayout.tsx";

import Form from "@cloudscape-design/components/form";
import Button from "@cloudscape-design/components/button";
import FormField from "@cloudscape-design/components/form-field";
import Input from "@cloudscape-design/components/input";
import Flashbar from "@cloudscape-design/components/flashbar";
import AppBreadcrumbs from "../../components/AppBreadcrumbs.tsx";
import { useAddCategory } from "../../hooks/useCategories";

function Breadcrumbs() {
  return (
    <AppBreadcrumbs
      items={[
        { text: "Dashboard", href: import.meta.env.BASE_URL + DashboardRoutes.path },
        { text: "Expense", href: import.meta.env.BASE_URL + `${ExpenseRoutes.path}` },
        { text: "All Categories", href: import.meta.env.BASE_URL + `${ExpenseRoutes.path}/categories` },
        { text: "Add category", href: import.meta.env.BASE_URL + `${ExpenseRoutes.path}/categories/add` },
      ]}
    />
  );
}

function Content() {
  const [categoryName, setCategoryName] = React.useState("");
  const { mutate: addCategory, isPending } = useAddCategory();
  const [nameError, setNameError] = useState("");
  const [flashbarItems, setFlashBarItems] = React.useState([]);

  const handleForm = (e) => {
    e.preventDefault();
    setFlashBarItems([])
    setNameError("");

    if (!categoryName.trim()) {
      setNameError("Category name cannot be empty");
      return;
    }

    addCategory(
      { name: categoryName.trim() },
      {
        onSuccess: () => {
          setCategoryName("");
          setFlashBarItems([
            {
              type: "info",
              dismissible: true,
              dismissLabel: "Dismiss message",
              onDismiss: () => setFlashBarItems([]),
              content: (
                <>
                  The new category <b>{categoryName}</b> was added{" "}
                  <Link
                    color="inverted"
                    href={`${import.meta.env.BASE_URL}${ExpenseRoutes.path}/categories`}
                  >
                    see all categories
                  </Link>
                  .
                </>
              ),
              id: "category_added",
            },
          ]);
        },
        onError: (err: Error) => setNameError(err.message),
      },
    );
  };

  return (
    <>
      <SpaceBetween direction="vertical" size="l">
        <Flashbar items={flashbarItems} />

        <form onSubmit={handleForm}>
          <Form
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button variant="primary" loading={isPending}>
                  Add
                </Button>
              </SpaceBetween>
            }
            header={<Header variant="h1">Add category</Header>}
          >
            <Container>
              <SpaceBetween direction="vertical" size="l">
                <FormField label="Name" errorText={nameError}>
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
