import Table from "@cloudscape-design/components/table";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Header from "@cloudscape-design/components/header";
import Link from "@cloudscape-design/components/link";

import type { IExpenseTableData, IExpenseRow } from "../interfaces/data";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

function ExpenseTable(props: IExpenseTableData) {
  const userContext = useContext(UserContext);
  const { defaultCurrency } = userContext;

  return (
    <Table
      loading={props.LoadingStatus === "loading" ? true : false}
      loadingText="Loading expenses"
      renderAriaLive={({ firstIndex, lastIndex, totalItemsCount }) =>
        `Displaying items ${firstIndex} to ${lastIndex} of ${totalItemsCount}`
      }
      columnDefinitions={[
        {
          id: "entryDate",
          header: "Entry Date",
          cell: (item: IExpenseRow) => (
            <Link href={"/expense/edit/" + item.expenseId}>
              {item.entryDate || "-"}
            </Link>
          ),
          sortingField: "name",
          isRowHeader: true,
        },
        {
          id: "amount",
          header: "Amount",
          cell: (item) => `${item.amount} ${defaultCurrency.value}` || "-",
          sortingField: "alt",
        },
        {
          id: "category",
          header: "Category",
          cell: (item) => item.category || "-",
        },
        {
          id: "comment",
          header: "Comment",
          cell: (item) => item.comment || "-",
        },
      ]}
      enableKeyboardNavigation
      items={props.expenseData}
      sortingDisabled
      stripedRows
      empty={
        <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
          <SpaceBetween size="m">
            <b>No expenses</b>
          </SpaceBetween>
        </Box>
      }
      header={<Header> Latest Expenses </Header>}
      footer={
        <Box textAlign="center">
          <Link
            href={import.meta.env.BASE_URL + "dashboard/expense/costlocal"}
            variant="primary"
          >
            View all expenses
          </Link>
        </Box>
      }
    />
  );
}

export default ExpenseTable;
