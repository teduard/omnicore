import Highcharts from "highcharts";
//import LineChart from "@cloudscape-design/components/line-chart";
import CartesianChart from '@cloudscape-design/chart-components/cartesian-chart';

function ChartNew() {
  return (
    <CartesianChart
      highcharts={Highcharts}
      ariaLabel="Line chart"
      series={[
        { name: "Site 1", type: "line", data: [1] },
        { name: "Site 2", type: "line", data: [2] },
        { type: "y-threshold", name: "Performance goal", value: 250000 },
      ]}
      xAxis={{ type: "datetime", title: "Time (UTC)" }}
      yAxis={{ title: "Bytes transferred", min: 0, max: 500000 }}
    />
  );
}

export default ChartNew;