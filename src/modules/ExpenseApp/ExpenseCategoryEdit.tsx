import { useEffect, useState } from "react";
import {
  useGetCategoryById,
  useUpdateCategory,
} from "../../hooks/useCategories";

import Form from "@cloudscape-design/components/form";
import Button from "@cloudscape-design/components/button";
import FormField from "@cloudscape-design/components/form-field";
import Input from "@cloudscape-design/components/input";
import {
  Container,
  Header,
  SpaceBetween,
  Spinner,
} from "@cloudscape-design/components";
import { useParams, useNavigate } from "react-router-dom";
import ExpenseLayout from "./ExpenseLayout";
import { DashboardRoutes, ExpenseRoutes } from "../../routes";
import AppBreadcrumbs from "../../components/AppBreadcrumbs";

function Breadcrumbs() {
  return (
    <AppBreadcrumbs
      items={[
        { text: "Dashboard", href:import.meta.env.BASE_URL +  DashboardRoutes.path },
        { text: "Expense", href: import.meta.env.BASE_URL + `${ExpenseRoutes.path}` },
        { text: "All Categories", href: import.meta.env.BASE_URL + `${ExpenseRoutes.path}/categories` },
        { text: "Add category", href: import.meta.env.BASE_URL + `${ExpenseRoutes.path}/categories/add` },
      ]}
    />
  );
}

function Content() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const id = parseInt(categoryId ?? "0");

  const { data: category, isLoading } = useGetCategoryById(id);
  const { mutate: updateCategory, isPending } = useUpdateCategory();

  const [nameError, setNameError] = useState("");

  const [name, setName] = useState("");

  useEffect(() => {
    if (category) setName(category.name);
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setNameError("");

    if (!name.trim()) {
      setNameError("Category name cannot be empty");
      return;
    }

    updateCategory(
      { categoryId: id, name: name.trim() },
      {
        onSuccess: () => navigate(-1),
        onError: (err: Error) => setNameError(err.message),
      },
    );
  };

  if (isLoading) return <Spinner />;
  if (!category) return <div>Category not found.</div>;

  return (
    <form onSubmit={handleSubmit}>
      <Form
        actions={
          <SpaceBetween direction="horizontal" size="xs">
            <Button
              formAction="none"
              variant="link"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button variant="primary" loading={isPending}>
              Save
            </Button>
          </SpaceBetween>
        }
      >
        <Container header={<Header variant="h2">Edit category</Header>}>
          <FormField label="Name" errorText={nameError}>
            <Input value={name} onChange={(e) => setName(e.detail.value)} />
          </FormField>
        </Container>
      </Form>
    </form>
  );
}

export default function ExpenseCategoryEdit() {
  return (
    <>
      <ExpenseLayout content={<Content />} breadcrumbs={<Breadcrumbs />} />
    </>
  );
}
