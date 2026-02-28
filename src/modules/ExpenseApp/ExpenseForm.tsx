import * as React from "react";
import { useEffect } from "react";
import Form from "@cloudscape-design/components/form";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import FormField from "@cloudscape-design/components/form-field";
import Input, { type InputProps } from "@cloudscape-design/components/input";
import {
  Link,
  Toggle,
  type NonCancelableCustomEvent,
} from "@cloudscape-design/components";
import Select from "@cloudscape-design/components/select";
import Calendar from "@cloudscape-design/components/calendar";
import Flashbar from "@cloudscape-design/components/flashbar";
import { useDatabase } from "../../db/hooks/useDatabase.tsx";
import { useNavigate } from "react-router-dom";
import { logger } from "../../lib/logger.ts";
import { useAddExpenses } from "../../hooks/useExpenses.ts";
import { ExpenseRoutes } from "../../routes/index.tsx";

function ExpenseFormLocal() {
  const navigate = useNavigate();
  const [fieldComment, setFieldComment] = React.useState("");
  const [fieldAmount, setFieldAmount] = React.useState("");

  const { execute, isReady } = useDatabase();

  const [flashbarItems, setFlashbarItems] = React.useState([
    {
      type: "info",
      dismissible: true,
      dismissLabel: "Dismiss message",
      onDismiss: () => setFlashbarItems([]),
      content: (
        <>
          Your new expense was added{" "}
          <Link color="inverted" href={`${import.meta.env.BASE_URL}${ExpenseRoutes.path}/costlocal`}>
            see all expenses
          </Link>
          .
        </>
      ),
      id: "added_expense",
    },
  ]);

  const handleAmount = (
    e: NonCancelableCustomEvent<InputProps.ChangeDetail>,
  ) => {
    setFieldAmount(parseFloat(e.detail.value).toString());
    logger.debug(e);
  };

  const handleComment = (
    e: NonCancelableCustomEvent<InputProps.ChangeDetail>,
  ) => {
    setFieldComment(e.detail.value);
  };

  const currentDate: Date = new Date();

  const [value, setValue] = React.useState(
    currentDate.getFullYear() +
      "-" +
      (currentDate.getMonth() < 9
        ? "0" + (currentDate.getMonth() + 1)
        : currentDate.getMonth() + 1) +
      "-" +
      currentDate.getDate(),
  );
  const [checked, setChecked] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState({
    label: "loading...",
    value: 0,
  });

  const { mutate: addExpense, isPending } = useAddExpenses();

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      amount: parseFloat(fieldAmount),
      categoryId: parseInt(selectedOption.value),
      comment: fieldComment,
      date: value,
      couldHaveBeenAvoided: checked,
    };

    addExpense(payload, {
      onSuccess: () => {
        setFlashbarVisible(true);

        // reset the form
        setFieldAmount("");
        setFieldComment("");
        setChecked(false);
      },
      onError: () => {
        logger.debug("error on adding expense");
      },
    });
  };

  const [flashbarVisible, setFlashbarVisible] = React.useState(false);
  const [categories, setCategories] = React.useState([]);

  useEffect(() => {
    if (isReady) {
      const res = execute("SELECT * FROM Categories where user_id = 1");
      logger.debug("categories: ", res);

      const list = [];
      if (res && res[0] && res[0].values) {
        res[0].values.map((el) => {
          list.push({
            label: el[2],
            value: el[0],
          });
        });

        setCategories(list);
        setSelectedOption(list[0]);
      }
    }
  }, [isReady]);

  return (
    <>
      {flashbarVisible && <Flashbar items={flashbarItems} />}

      <form onSubmit={handleForm}>
        <Form
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button
                formAction="none"
                variant="link"
                onClick={() => navigate("/dashboard/expense")}
              >
                Cancel
              </Button>
              <Button variant="primary" loading={isPending}>
                Add
              </Button>
            </SpaceBetween>
          }
        >
          <Container header={<Header variant="h2">New expense</Header>}>
            <SpaceBetween direction="vertical" size="l">
              <FormField label="Amount">
                <Input
                  type="number"
                  value={fieldAmount.toString()}
                  onChange={handleAmount}
                  placeholder="0"
                />
              </FormField>
              <FormField label="Category">
                <Select
                  selectedOption={selectedOption}
                  onChange={({ detail }) =>
                    setSelectedOption(detail.selectedOption)
                  }
                  options={
                    categories
                  }
                />
              </FormField>
              <FormField label="Comment">
                <Input value={fieldComment} onChange={handleComment} />
              </FormField>
              <FormField label="Could have been avoided">
                <Toggle
                  onChange={({ detail }) => setChecked(detail.checked)}
                  checked={checked}
                >
                  Yes
                </Toggle>
              </FormField>
              <FormField label="Entry Date">
                <Calendar
                  onChange={({ detail }) => {
                    logger.debug("calendar:", detail);
                    setValue(detail.value);
                  }}
                  value={value}
                />
              </FormField>
            </SpaceBetween>
          </Container>
        </Form>
      </form>
    </>
  );
}

export default ExpenseFormLocal;
