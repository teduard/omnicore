import BarChart from "@cloudscape-design/components/bar-chart";
import Box from "@cloudscape-design/components/box";
import Button from "@cloudscape-design/components/button";

function ExpenseChart() {
  return (
    <BarChart
      series={[
        {
          title: "Clothes",
          type: "bar",
          data: [
            //{ x: "January", y: 120 },
            { x: "February", y: 120 },
            // { x: new Date(1601074800000), y: 18 },
            // { x: new Date(1601082000000), y: 15 },
            // { x: new Date(1601089200000), y: 9 },
            // { x: new Date(1601096400000), y: 18 }
          ],
        },
        {
          title: "Electronics",
          type: "bar",
          data: [
            //{ x: "January", y: 90 },
            { x: "February", y: 120 },
            // { x: new Date(1601074800000), y: 11 },
            // { x: new Date(1601082000000), y: 12 },
            // { x: new Date(1601089200000), y: 11 },
            // { x: new Date(1601096400000), y: 13 }
          ],
        },
        {
          title: "Food",
          type: "bar",
          data: [
            //{ x: "January", y: 890 },
            { x: "February", y: 1000 },
            // { x: new Date(1601074800000), y: 9 },
            // { x: new Date(1601082000000), y: 8 },
            // { x: new Date(1601089200000), y: 7 },
            // { x: new Date(1601096400000), y: 5 }
          ],
        },
        {
          title: "House",
          type: "bar",
          data: [
            //{ x: "January", y: 2100 },
            { x: "February", y: 1800 },
            // { x: new Date(1601074800000), y: 8 },
            // { x: new Date(1601082000000), y: 6 },
            // { x: new Date(1601089200000), y: 4 },
            // { x: new Date(1601096400000), y: 6 }
          ],
        },
      ]}
      xDomain={[
        //"January",
        "February",
        // new Date(1601074800000),
        // new Date(1601082000000),
        // new Date(1601089200000),
        // new Date(1601096400000)
      ]}
      yDomain={[0, 3000]}
      i18nStrings={{
        xTickFormatter: (e) => e.toString(),
        // .toLocaleDateString("en-US", {
        //   month: "short",
        //   day: "numeric",
        //   hour: "numeric",
        //   minute: "numeric",
        //   hour12: !1
        // })
        // .split(",")
        // .join("\n")
      }}
      ariaLabel="Stacked bar chart"
      height={300}
      stackedBars
      xTitle="Month"
      yTitle="Your monthly summary"
      empty={
        <Box textAlign="center" color="inherit">
          <b>No data available</b>
          <Box variant="p" color="inherit">
            There is no data available
          </Box>
        </Box>
      }
      noMatch={
        <Box textAlign="center" color="inherit">
          <b>No matching data</b>
          <Box variant="p" color="inherit">
            There is no matching data to display
          </Box>
          <Button>Clear filter</Button>
        </Box>
      }
    />
  );
}

export default ExpenseChart;
