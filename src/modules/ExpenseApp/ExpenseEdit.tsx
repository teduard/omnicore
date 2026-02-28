import ExpenseEditPage from "./ExpenseEditPage";
import ExpenseLayout from "./ExpenseLayout";
import { ExpenseRoutes } from "../../routes";
import AppBreadcrumbs from "../../components/AppBreadcrumbs";

function Content() {
  return (
    <>
      <ExpenseEditPage />
    </>
  );
}

function Breadcrumbs() {
  return (
    <AppBreadcrumbs
      items={[
        { text: "Dashboard", href: ExpenseRoutes.path },
        { text: "Add expense", href: `${ExpenseRoutes.path}/add` },
      ]}
    />
  );
}

function ExpenseEdit() {
  return <ExpenseLayout content={<Content />} breadcrumbs={<Breadcrumbs />} />;
}

export default ExpenseEdit;
