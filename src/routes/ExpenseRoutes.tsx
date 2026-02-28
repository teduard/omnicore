import { lazy } from "react";
const ExpenseAdd = lazy(() => import("../modules/ExpenseApp/ExpenseAdd"));
const ExpenseCategories = lazy(() => import("../modules/ExpenseApp/ExpenseCategories"));
const ExpenseCategoriesAdd = lazy(() => import("../modules/ExpenseApp/ExpenseCategoriesAdd"));
const ExpenseDashboard = lazy(() => import("../modules/ExpenseApp/ExpenseDashboard"));
const ExpenseCostExplorer = lazy(() => import("../modules/ExpenseApp/layout/ExpenseCostExplorer"));
const ExpenseEdit = lazy(() => import("../modules/ExpenseApp/ExpenseEdit"));

const appRoute = 'dashboard/expense';

const AppRoutes = [
    {
    path: `${appRoute}`,
    element: <ExpenseDashboard />
    },
    {
    path: `${appRoute}/addlocal`,
    element: <ExpenseAdd />
    },
    {
    path: `${appRoute}/costlocal`,
    element: <ExpenseCostExplorer />
    },
    {
    path: `/${appRoute}/edit/:expenseId`,
    element: <ExpenseEdit />
    },
    {
    path: `${appRoute}/categories`,
    element: <ExpenseCategories />
    },
    {
    path: `${appRoute}/categories/add`,
    element: <ExpenseCategoriesAdd />
    },
]

const ExpenseRoutes = {
    routes: AppRoutes,
    path: appRoute
}

export default ExpenseRoutes;