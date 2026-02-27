import Table from "@cloudscape-design/components/table";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import Header from "@cloudscape-design/components/header";
import Link from "@cloudscape-design/components/link";

import type { IExpenseTableData, IExpenseRow } from "../interfaces/data";
import { Icon } from "@cloudscape-design/components";
import MonthPicker from "../../../components/MonthPicker";
import { useContext, useEffect } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { logger } from "../../../lib/logger";

function ExpenseCostExplorerTable(props: IExpenseTableData) {
  const userContext = useContext(UserContext);
  const {defaultCurrency} = userContext;


  useEffect(() => {
    logger.debug("props.LoadingStatus= ", props.LoadingStatus);
  }, [props.LoadingStatus]);

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
          cell: item => `${item.amount} ${defaultCurrency.value}` || "-",
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
        },
        {
          id: "avoidable",
          header: "Avoidable",
          cell: item => (item.couldHaveBeenAvoided ? <Icon name="status-warning" /> : "")
        }
      ]}
      enableKeyboardNavigation
      items={props.expenseData}
      sortingDisabled
      stripedRows
      stickyHeader
      empty={
        <Box
          margin={{ vertical: "xs" }}
          textAlign="center"
          color="inherit"
        >
          <SpaceBetween size="m">
            <b>No expense items</b>
            <Button>Add expense</Button>
          </SpaceBetween>
        </Box>
      }
      header={<Header
           
            
        actions={
            <SpaceBetween
              direction="horizontal"
              size="xs"
            >
              <MonthPicker onRefresh={function (): void {
                logger.debug("mnth picker")
                props.onMonthChange()
                //logger.debug(props)
              } }/>
              {/* <Button variant="primary">
                <Icon name="refresh" />
              </Button>  */}
            </SpaceBetween>
          }
          >

          Your Expenses

          </Header>}
    //   footer={ <Box textAlign="center">
    //   <Link href="#" variant="primary">
    //     View all expenses
    //   </Link>
    // </Box>}
    />
  );
}

export default ExpenseCostExplorerTable;