import * as React from "react";
import DateRangePicker from "@cloudscape-design/components/date-range-picker";

function DateRange () {
  const [value, setValue] = React.useState(undefined);

  return (
    <DateRangePicker
      onChange={({ detail }) => setValue(detail.value)}
      value={value}
      relativeOptions={[
        {
          key: "previous-1-month",
          amount: 1,
          unit: "month",
          type: "relative"
        },
        {
          key: "previous-3-months",
          amount: 3,
          unit: "month",
          type: "relative"
        },
        {
          key: "previous-6-months",
          amount: 6,
          unit: "month",
          type: "relative"
        },
        {
          key: "previous-1-year",
          amount: 1,
          unit: "year",
          type: "relative"
        }
      ]}
      isValidRange={range => {
        if (range === null) {
          return {
            valid: false,
            errorMessage:
              "The selected date range is incomplete. Select a start and end date for the date range."
          };
        }
        if (range.type === "absolute") {
          if (!range.startDate || !range.endDate) {
            return {
              valid: false,
              errorMessage:
                "The selected date range is incomplete. Select a start and end date for the date range."
            };
          }
          if (
            new Date(range.startDate).getTime() -
              new Date(range.endDate).getTime() >
            0
          ) {
            return {
              valid: false,
              errorMessage:
                "The selected date range is invalid. The start date must be before the end date."
            };
          }
        }
        if (range.type === "relative") {
          if (isNaN(range.amount)) {
            return {
              valid: false,
              errorMessage:
                "The selected date range is incomplete. Specify a duration for the date range."
            };
          }
          if (
            (range.unit === "month" &&
              range.amount < 1) ||
            range.amount === 0
          ) {
            return {
              valid: false,
              errorMessage:
                "The selected date range is too small. Select a range of one month or larger."
            };
          }
        }
        return { valid: true };
      }}
      i18nStrings={{}}
      granularity="month"
      placeholder="Filter by month"
    />
  );
}

export default DateRange;