import { DashboardRoutes, ExpenseRoutes } from "../../routes";
import ExpenseLayout from "./ExpenseLayout";
import CategoriesTable from "./components/CategoriesTable";
import AppBreadcrumbs from "../../components/AppBreadcrumbs";

function Breadcrumbs() {
  return (
    <AppBreadcrumbs
      items={[
        { text: "Dashboard", href: import.meta.env.BASE_URL + DashboardRoutes.path },
        { text: "Expense", href: import.meta.env.BASE_URL + `${ExpenseRoutes.path}` },
        { text: "All Categories", href: import.meta.env.BASE_URL + `${ExpenseRoutes.path}/categories` },
      ]}
    />
  );
}

function Content() {
  return (
    <>
      <CategoriesTable />
    </>
  );
}

function ExpenseCategories() {
  return (
    <>
      <ExpenseLayout content={<Content />} breadcrumbs={<Breadcrumbs />} />
    </>
  );
}

export default ExpenseCategories;
