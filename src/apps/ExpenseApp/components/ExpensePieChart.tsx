import * as React from "react";
import { PieChart } from '@cloudscape-design/chart-components';
import { percentageFormatter, useHighcharts } from '../chart-commons';
import { colorChartsPaletteCategorical1, colorChartsPaletteCategorical2, colorChartsPaletteCategorical3, colorChartsPaletteCategorical4, colorChartsPaletteCategorical5, colorChartsPaletteCategorical6, colorChartsPaletteCategorical7, colorChartsPaletteCategorical8, colorChartsPaletteCategorical9, colorChartsPaletteCategorical10, colorChartsPaletteCategorical11, colorChartsPaletteCategorical12, colorChartsPaletteCategorical13, colorChartsPaletteCategorical14, colorChartsPaletteCategorical15, colorChartsPaletteCategorical16, colorChartsPaletteCategorical17, colorChartsPaletteCategorical18, colorChartsPaletteCategorical19, colorChartsPaletteCategorical20, colorChartsPaletteCategorical21, colorChartsPaletteCategorical22, colorChartsPaletteCategorical23, colorChartsPaletteCategorical24, colorChartsPaletteCategorical25, colorChartsPaletteCategorical26, colorChartsPaletteCategorical27, colorChartsPaletteCategorical28, colorChartsPaletteCategorical29, colorChartsPaletteCategorical30, colorChartsPaletteCategorical31, colorChartsPaletteCategorical32, colorChartsPaletteCategorical33, colorChartsPaletteCategorical34, colorChartsPaletteCategorical35, colorChartsPaletteCategorical36, colorChartsPaletteCategorical37, colorChartsPaletteCategorical38, colorChartsPaletteCategorical39, colorChartsPaletteCategorical40, colorChartsPaletteCategorical41, colorChartsPaletteCategorical42, colorChartsPaletteCategorical43, colorChartsPaletteCategorical44, colorChartsPaletteCategorical45, colorChartsPaletteCategorical46, colorChartsPaletteCategorical47, colorChartsPaletteCategorical48, colorChartsPaletteCategorical49, colorChartsPaletteCategorical50
} from '@cloudscape-design/design-tokens';
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import type { IExpenseCategoryAggregate, IChartDataRow } from "../interfaces/data";
import { useEffect } from "react";

const colors:Array<string> = [
colorChartsPaletteCategorical1, colorChartsPaletteCategorical2, colorChartsPaletteCategorical3, colorChartsPaletteCategorical4, colorChartsPaletteCategorical5, colorChartsPaletteCategorical6, colorChartsPaletteCategorical7, colorChartsPaletteCategorical8, colorChartsPaletteCategorical9, colorChartsPaletteCategorical10, colorChartsPaletteCategorical11, colorChartsPaletteCategorical12, colorChartsPaletteCategorical13, colorChartsPaletteCategorical14, colorChartsPaletteCategorical15, colorChartsPaletteCategorical16, colorChartsPaletteCategorical17, colorChartsPaletteCategorical18, colorChartsPaletteCategorical19, colorChartsPaletteCategorical20, colorChartsPaletteCategorical21, colorChartsPaletteCategorical22, colorChartsPaletteCategorical23, colorChartsPaletteCategorical24, colorChartsPaletteCategorical25, colorChartsPaletteCategorical26, colorChartsPaletteCategorical27, colorChartsPaletteCategorical28, colorChartsPaletteCategorical29, colorChartsPaletteCategorical30, colorChartsPaletteCategorical31, colorChartsPaletteCategorical32, colorChartsPaletteCategorical33, colorChartsPaletteCategorical34, colorChartsPaletteCategorical35, colorChartsPaletteCategorical36, colorChartsPaletteCategorical37, colorChartsPaletteCategorical38, colorChartsPaletteCategorical39, colorChartsPaletteCategorical40, colorChartsPaletteCategorical41, colorChartsPaletteCategorical42, colorChartsPaletteCategorical43, colorChartsPaletteCategorical44, colorChartsPaletteCategorical45, colorChartsPaletteCategorical46, colorChartsPaletteCategorical47, colorChartsPaletteCategorical48, colorChartsPaletteCategorical49, colorChartsPaletteCategorical50
]

function ExpensePieChart( props: IExpenseCategoryAggregate) {
  const highcharts = useHighcharts();

  const [chartData, setChartData] = React.useState<Array<IChartDataRow>>([]);

  useEffect(() => {
    const data: Array<IChartDataRow> = new Array<IChartDataRow>();
    let categoryIndex = 0;

    props.expenseAggregate.forEach(item => {
      //console.log('item:', item);

      if(item.categoryAmount > 0) {
        data.push({
          name: item.categoryName,
          y: item.categoryAmount,
          color: colors[categoryIndex++],
        })
      }
    });

    setChartData(data);
  }, [props.expenseAggregate]);

  return (<>
  <Container
      header={
        <Header
          variant="h2"
          description="Your expenses at a glance"
        >
          Expenses aggregate by category
        </Header>
      }
    >
   <PieChart
      highcharts={highcharts}
      //fitHeight={true}
      noData={{
        statusType: "loading",
      }}
      series={{
        type: 'donut',//pie
        name: 'Zone status',
        data: chartData,
       // [
          // { name: 'Clothes', y: 225, color: colorChartsStatusPositive },
          // { name: 'Electronics', y: 119, color: colorChartsBlue2300 },
          // { name: 'Food', y: 427.05, color: colorChartsBlue2400 },
          // { name: 'House', y: 86.5, color: colorChartsBlue2500 },
          // { name: 'Misc', y: 287.5, color: colorChartsBlue2600 },
          // { name: 'Out', y: 475, color: colorChartsPaletteCategorical11 },
          // { name: 'Personal Care', y: 60, color: colorChartsPaletteCategorical38 },
          // { name: 'Transport', y: 40, color: colorChartsPaletteCategorical37 },
          // { name: 'TransportCar', y: 0, color: colorChartsPaletteCategorical39 },
          // { name: 'TransportCarFuel', y: 0, color: colorChartsStatusHigh },
        //],
      }}
      ariaLabel="Category aggregate chart"
      innerAreaDescription="RON"
      innerAreaTitle={props.expenseTotal.toString()}
      segmentDescription={({ segmentValue, totalValue }) =>
        `${segmentValue} zones, ${percentageFormatter(segmentValue / totalValue)}`
      }
      tooltip={{
        details: ({ segmentValue, totalValue }) => [
          {
            key: 'Zone count',
            value: segmentValue,
          },
          {
            key: 'Percentage',
            value: percentageFormatter(segmentValue / totalValue),
          },
        ],
      }}
      i18nStrings={{
        chartRoleDescription: 'Pie chart summarizing the status of all zones.',
        seriesFilterLabel: 'Filter displayed data',
        seriesFilterPlaceholder: 'Filter data',
        seriesFilterSelectedAriaLabel: 'selected',
        detailPopoverDismissAriaLabel: 'Dismiss',
        legendAriaLabel: 'Legend',
        segmentRoleDescription: 'segment',
      }}
    />
    </Container>
    </>
  );
}

export default ExpensePieChart;