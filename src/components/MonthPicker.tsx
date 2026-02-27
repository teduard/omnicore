import DatePicker from "@cloudscape-design/components/date-picker";
import FormField from "@cloudscape-design/components/form-field";
import { Button, Icon, SpaceBetween } from "@cloudscape-design/components";

import { useExpenseStore } from "../hooks";
import { useEffect } from "react";

interface IMonthPickerProps {
  onRefresh: () => void;
}

function MonthPicker(props: IMonthPickerProps) {
  const { selectedDate, updateDate } = useExpenseStore();

  useEffect(() => {
    props.onRefresh();
  }, [selectedDate]);

  return (
    <FormField>
      <SpaceBetween size="l" direction="horizontal">
        <DatePicker
          onChange={({ detail }) => {
            updateDate(detail.value);
          }}
          value={selectedDate}
          isDateEnabled={(date) => date <= new Date()}
          openCalendarAriaLabel={(selectedDate) =>
            "Choose month" +
            (selectedDate ? `, selected period is ${selectedDate}` : "")
          }
          granularity="month"
          placeholder="YYYY/MM"
        />
        <Button variant="normal" onClick={props.onRefresh}>
          <Icon name="refresh" />
        </Button>
      </SpaceBetween>
    </FormField>
  );
}

export default MonthPicker;
