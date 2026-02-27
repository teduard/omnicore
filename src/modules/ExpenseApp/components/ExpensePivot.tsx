import { Box, Container, Header, Link, StatusIndicator, Table, type StatusIndicatorProps, type TableProps } from "@cloudscape-design/components";
import type { IExpenseCategoryAggregate } from "../interfaces/data";
import React, { useEffect,useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

interface Item {
  name: string;
  statusText: string;
  status: StatusIndicatorProps.Type;
}

function ExpensePivot(props: IExpenseCategoryAggregate) {
  const [expenseAggregateItems, setExpenseAggregateItems] = React.useState<TableProps<Item>['items']>();

    const userContext = useContext(UserContext);
  const {defaultCurrency} = userContext;

  const expenseAggregateDefinition: TableProps<Item>['columnDefinitions'] = [
  {
    id: 'name',
    header: 'Category',
    cell: item => <Link href="#">{item.name}</Link>,
    width: 160,
    isRowHeader: true,
  },
  {
    id: 'status',
    header: 'Total Spent',
    cell: ({ statusText, status }) => `${statusText} ${defaultCurrency.value}`,
    width: 140,
  },
  {
    id: 'quota',
    header: 'Budget quota',
    cell: ({ statusText, status }) => <><StatusIndicator type={status}>30%</StatusIndicator>
    {" "}/{" "}{parseFloat(statusText) * 2} {defaultCurrency.value}
    </>,
    //width: 100,
  },
];

  useEffect(() => {
    const data: Array<Item> = new Array<Item>();

    props.expenseAggregate.forEach(item => {
      data.push( {
        name: item.categoryName,
        statusText: item.categoryAmount.toString(),
        status: 'info'
      });
    });

    const tableData: TableProps<Item>['items'] = data;

    setExpenseAggregateItems(tableData);

  }, [props.expenseAggregate]);

  return (
    <Container
          header={
            <Header
              variant="h2"
              description="Transactions aggregated by category"
            >
              Category summary
            </Header>
          }
        >
    <Table
      enableKeyboardNavigation={true}
      variant="borderless"
      resizableColumns={true}
      items={expenseAggregateItems}
      columnDefinitions={expenseAggregateDefinition}
      loading={props.LoadingStatus === 'loading' ? true : false}
      loadingText="Loading category aggregates"
      footer={
        <Box textAlign="center">
          <h3>Total: <b>{props.expenseTotal} {defaultCurrency.value}</b></h3>
        </Box>
      }/>
    </Container>    
  );
}

export default ExpensePivot;