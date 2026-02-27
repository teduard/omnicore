import { DashboardRoutes, ExpenseRoutes } from "../../routes";
import ExpenseLayout from "./ExpenseLayout";
import CategoriesTable from "./components/CategoriesTable";
import AppBreadcrumbs from "../../components/AppBreadcrumbs";

function Breadcrumbs() {
  return (
    <AppBreadcrumbs
      items={[
        { text: "Dashboard", href: DashboardRoutes.path },
        { text: "Expense", href: `${ExpenseRoutes.path}` },
        { text: "All Categories", href: `${ExpenseRoutes.path}/categories` },
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
