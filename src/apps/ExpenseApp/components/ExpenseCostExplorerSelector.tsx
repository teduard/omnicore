import { Box, Container, Header, StatusIndicator, Table, type TableProps } from "@cloudscape-design/components";
import {type IExpenseInsightsData, type IExpenseInsightsItem, type LoadingStateProps} from '../interfaces/data';

function Content(
    {insightsDefinition, insightsItems,loadingStatus}:
    {insightsDefinition:TableProps<IExpenseInsightsItem>['columnDefinitions'],
    insightsItems:TableProps<IExpenseInsightsItem>['items'],
    loadingStatus: LoadingStateProps.Status}
 ) {
  if(loadingStatus === 'not-started') {
    return (
      <Box textAlign="center">
        <StatusIndicator type="info">Insights not loaded. Reload page</StatusIndicator>
      </Box>
    );
  }

  if(loadingStatus === 'loading') {
    return (
      <Box textAlign="center">
        <StatusIndicator type="loading">
          Loading
        </StatusIndicator>
      </Box>
    );
  }

  if(loadingStatus === 'error') {
     return (
      <Box textAlign="center">
        <StatusIndicator type="error">Error loading insights</StatusIndicator>
      </Box>
    );
  }

  return <Table
      enableKeyboardNavigation={true}
      variant="borderless"
      resizableColumns={true}
      items={insightsItems}
      columnDefinitions={insightsDefinition}
    />
}
function ExpenseCostExplorerSelector(props: IExpenseInsightsData) {
  
const insightsDefinition: TableProps<IExpenseInsightsItem>['columnDefinitions'] = [
  {
    id: 'name',
    header: 'Metric',
    cell: (item) => item.name, //<Link href="/expense/couldHavebeenAvoided/month">{item.name}</Link>,
    width: 160,
    isRowHeader: true,
  },
  {
    id: 'status',
    header: 'Count',
    cell: ({ statusText, status }) => <StatusIndicator type={status}>{statusText}</StatusIndicator>,
    //width: 100,
  },
];

const insightsItems: TableProps<IExpenseInsightsItem>['items'] = [
  { name: 'Expense days', statusText: props.ExpenseItemsCount.toString(), status: 'info' },
  { name: 'Total transactions', statusText: props.ExpenseItemsCount.toString(), status: 'info' },
  { name: 'Avoidable expenses', statusText: props.CouldHaveBeenAvoidedCount.toString(), status: 'warning' },
];

  return (
    <Container
      header={
        <Header
          variant="h2"
          description="Your expenses at a glance"
        >
          Cost overview
        </Header>
      }
    >

    <Content 
       insightsDefinition={insightsDefinition}
       insightsItems={insightsItems}
       loadingStatus={props.LoadingStatus}
      />
    </Container>
  );
}

export default ExpenseCostExplorerSelector;