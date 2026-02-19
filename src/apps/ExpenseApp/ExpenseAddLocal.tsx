import { useNavigate } from "react-router-dom";
import {useEffect} from 'react';


import {
  BreadcrumbGroup,
} from '@cloudscape-design/components';

import '@cloudscape-design/global-styles/index.css';

import ExpenseFormLocal from "./ExpenseFormLocal";
import ExpenseLayout from "./ExpenseLayout";
import { ExpenseRoutes } from "../../routes";

function Content() {
  return <>
        <ExpenseFormLocal/>
        </>
}

function Breadcrumbs() {
 const navigate = useNavigate();
    return <BreadcrumbGroup
                items={[
                    { text: 'Dashboard', href: ExpenseRoutes.path },
                    { text: 'Add expense', href: `${ExpenseRoutes.path}/add` },
                ]}
                expandAriaLabel="Show path"
                ariaLabel="Breadcrumbs"
                onFollow={(event) => {
                  // 1. Check if it's an internal link
                  if (!event.detail.external) {
                    // 2. Stop the browser from reloading the page
                    event.preventDefault();
                    // 3. Let React Router handle the URL change
                    navigate(event.detail.href);
                  }
                }}
              />
}

function ExpenseAddLocal() {
  return(
    <ExpenseLayout
        content={ <Content /> }
        breadcrumbs = { <Breadcrumbs /> }
      />
  )}

export default ExpenseAddLocal
