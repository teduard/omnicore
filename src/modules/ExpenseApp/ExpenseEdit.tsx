import ExpenseEditPage from "./ExpenseEditPage";
import ExpenseLayout from "./ExpenseLayout";
import { DashboardRoutes, ExpenseRoutes } from "../../routes";
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
        {
          text: "Dashboard",
          href:
            import.meta.env.BASE_URL + `${DashboardRoutes.path}`,
        },
        { text: "Expense", href: import.meta.env.BASE_URL + ExpenseRoutes.path },
        { text: "Edit expense", href: import.meta.env.BASE_URL + `${ExpenseRoutes.path}/edit` },
      ]}
    />
  );
}

function ExpenseEdit() {
  return <ExpenseLayout content={<Content />} breadcrumbs={<Breadcrumbs />} />;
}

export default ExpenseEdit;
