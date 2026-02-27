import ExpenseFormLocal from "./ExpenseForm";
import ExpenseLayout from "./ExpenseLayout";
import { ExpenseRoutes } from "../../routes";
import AppBreadcrumbs from "../../components/AppBreadcrumbs";

function Content() {
  return (
    <>
      <ExpenseFormLocal />
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

function ExpenseAdd() {
  return <ExpenseLayout content={<Content />} breadcrumbs={<Breadcrumbs />} />;
}

export default ExpenseAdd;
