import Table from "@cloudscape-design/components/table";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import Header from "@cloudscape-design/components/header";
import Link from "@cloudscape-design/components/link";

import type { IExpenseTableData, IExpenseRow } from "../interfaces/data";
import StatusIndicator from "@cloudscape-design/components/status-indicator";

function ExpenseTable(props: IExpenseTableData) {
  // if(props.LoadingStatus === 'not-started') {
  //     return (
  //       <Box textAlign="center">
  //         <StatusIndicator type="info">Insights not loaded. Reload page</StatusIndicator>
  //       </Box>
  //     );
  //   }
  
  //   if(props.LoadingStatus === 'loading') {
  //     return (
  //       <Box textAlign="center">
  //         <StatusIndicator type="loading">
  //           Loading
  //         </StatusIndicator>
  //       </Box>
  //     );
  //   }
  
  //   if(props.LoadingStatus === 'error') {
  //      return (
  //       <Box textAlign="center">
  //         <StatusIndicator type="error">Error loading insights</StatusIndicator>
  //       </Box>
  //     );
  //   }

  return (
    <Table
      loading={props.LoadingStatus === 'loading' ? true : false}
      loadingText="Loading expenses"

      renderAriaLive={({
        firstIndex,
        lastIndex,
        totalItemsCount
      }) =>
        `Displaying items ${firstIndex} to ${lastIndex} of ${totalItemsCount}`
      }
      columnDefinitions={[
        {
          id: "entryDate",
          header: "Entry Date",
          cell: (item:IExpenseRow) => (
            <Link href={"/expense/edit/" + item.expenseId }>{item.entryDate || "-"}</Link>
          ),
          sortingField: "name",
          isRowHeader: true
        },
        {
          id: "amount",
          header: "Amount",
          cell: item => item.amount || "-",
          sortingField: "alt"
        },
        {
          id: "category",
          header: "Category",
          cell: item => item.category || "-"
        },
        {
          id: "comment",
          header: "Comment",
          cell: item => item.comment || "-"
        }
      ]}
      enableKeyboardNavigation
      items={props.expenseData}
      sortingDisabled
      stripedRows
      empty={
        <Box
          margin={{ vertical: "xs" }}
          textAlign="center"
          color="inherit"
        >
          <SpaceBetween size="m">
            <b>No resources</b>
            <Button>Create resource</Button>
          </SpaceBetween>
        </Box>
      }
      header={<Header> Latest Expenses </Header>}
      footer={ <Box textAlign="center">
      <Link href="/expense/cost" variant="primary">
        View all expenses
      </Link>
    </Box>}
    />
  );
}

export default ExpenseTable;