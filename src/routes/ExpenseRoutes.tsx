import {ExpenseDashboard, ExpenseAdd, ExpenseCategories} from '../apps/ExpenseApp/';
import ExpenseAddLocal from '../apps/ExpenseApp/ExpenseAddLocal';
import ExpenseCategoriesAdd from '../apps/ExpenseApp/ExpenseCategoriesAdd';
import ExpenseCostExplorerTable from '../apps/ExpenseApp/layout/ExpenseCostExplorer';
import ExpenseCostExplorerLocal from '../apps/ExpenseApp/layout/ExpenseCostExplorerLocal';

const appRoute = '/dashboard/expense';

const AppRoutes = [
    {
    path: appRoute,
    element: <ExpenseDashboard />
    },
    {
    path: `${appRoute}/add`,
    element: <ExpenseAdd />
    },
    {
    path: `${appRoute}/addlocal`,
    element: <ExpenseAddLocal />
    },
    {
    path: `${appRoute}/cost`,
    element: <ExpenseCostExplorerTable />
    },
    {
    path: `${appRoute}/local`,
    element: <ExpenseCostExplorerLocal />
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