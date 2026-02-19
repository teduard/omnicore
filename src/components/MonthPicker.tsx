import * as React from "react";
import DatePicker from "@cloudscape-design/components/date-picker";
import FormField from "@cloudscape-design/components/form-field";
import { Button, Grid, Icon } from "@cloudscape-design/components";

import { useExpenseStore } from "../hooks";

interface IMonthPickerProps {
  onRefresh: () => void
}

function MonthPicker (props: IMonthPickerProps) {
  const [value, setValue] = React.useState("");

  const {selectedDate, updateDate} = useExpenseStore()

  return (
    <FormField
      //label="Select month"
      //constraintText="Use YYYY/MM format."
    >
      {/* {selectedDate} */}

      <Grid gridDefinition={[
                  { colspan: { default: 6 } },
                  { colspan: { default: 6 } },       
                ]}>
      <DatePicker
        onChange={({ detail }) => {setValue(detail.value); updateDate(detail.value);}}
        value={value}
        isDateEnabled={date => date <= new Date()}
        openCalendarAriaLabel={selectedDate =>
          "Choose month" +
          (selectedDate
            ? `, selected period is ${selectedDate}`
            : "")
        }
        granularity="month"
        placeholder="YYYY/MM"
      />
      <Button variant="normal" onClick={props.onRefresh}>
        <Icon name="refresh" />
      </Button> 
      </Grid>
    </FormField>
  );
}

export default MonthPicker;