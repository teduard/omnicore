import Table from "@cloudscape-design/components/table";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import Header from "@cloudscape-design/components/header";
import Link from "@cloudscape-design/components/link";

import type { IExpenseTableData, IExpenseRow } from "../interfaces/data";
import { ButtonDropdown, Icon } from "@cloudscape-design/components";
import MonthPicker from "../../../components/MonthPicker";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { logger } from "../../../lib/logger";

import { type NonCancelableCustomEvent } from "@cloudscape-design/components";
import { useDeleteExpenses } from "../../../hooks/useExpenses";

interface DropdownDetail {
  id: string;
}

function ExpenseCostExplorerTable(props: IExpenseTableData) {
  const userContext = useContext(UserContext);
  const {defaultCurrency} = userContext;

  const [selectedItems, setSelectedItems] = useState([]);

  const { mutate: deleteExpense, isPending } = useDeleteExpenses();

  useEffect(() => {
    logger.debug("props.LoadingStatus= ", props.LoadingStatus);
  }, [props.LoadingStatus]);

  const handleDropdownClick = (event: NonCancelableCustomEvent<DropdownDetail>) => {
      console.info(event);
      const actionId = event.detail.id;
  
      switch (actionId) {
        case "edit":
          logger.debug("edit expense: ", selectedItems);
          break;
        case "delete":
          logger.debug("delete expense: ", selectedItems);
          logger.debug("expenseID:", selectedItems[0].expenseId )
          deleteExpense({
            expenseId: selectedItems[0].expenseId  
           })
          break;
        default:
          break;
      }
    };

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
      columnDisplay={[
        { id: "expenseId", visible: false },
        { id: "entryDate", visible: true },
        { id: "amount", visible: true },
        { id: "category", visible: true },
        { id: "comment", visible: true },
        { id: "avoidable", visible: true },
      ]}
      columnDefinitions={[
        {
          id: "expenseId",
          header: "expenseId",
          cell: (item:IExpenseRow) => (
           item.expenseId 
          ),
          sortingField: "name",
          isRowHeader: true
        },
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
      selectedItems={selectedItems}
      onSelectionChange={({ detail }) =>
          setSelectedItems(detail.selectedItems)
        }
      enableKeyboardNavigation
      items={props.expenseData}
      sortingDisabled
      selectionType="single"
      trackBy="expenseId"
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
              <ButtonDropdown
                  onItemClick={handleDropdownClick}
                  items={[
                    {
                      text: "Edit",
                      id: "edit",
                      disabled: false,
                    },
                    {
                      text: "Delete",
                      id: "delete",
                      disabled: false,
                    },
                  ]}
                >
                  Actions
                </ButtonDropdown>
              <MonthPicker onRefresh={function (): void {
                logger.debug("mnth picker")
                props.onMonthChange()
              } }/>
            </SpaceBetween>
          }
          >

          Your Expenses

          </Header>}
    />
  );
}

export default ExpenseCostExplorerTable;