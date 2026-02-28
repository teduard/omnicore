import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetExpenseById, useEditExpense } from "../../hooks/useExpenses";
import { useDatabase } from "../../db/hooks/useDatabase";
import Form from "@cloudscape-design/components/form";
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import FormField from "@cloudscape-design/components/form-field";
import Input from "@cloudscape-design/components/input";
import Select from "@cloudscape-design/components/select";
import Calendar from "@cloudscape-design/components/calendar";
import Toggle from "@cloudscape-design/components/toggle";
import Button from "@cloudscape-design/components/button";
import SpaceBetween from "@cloudscape-design/components/space-between";
import { logger } from "../../lib/logger";

function ExpenseEditPage() {
  const { expenseId } = useParams<{ expenseId: string }>();
  const navigate = useNavigate();
  const id = parseInt(expenseId ?? "0");

  const { data: expense, isLoading } = useGetExpenseById(id);
  const { mutate: editExpense, isPending } = useEditExpense();
  const { execute, isReady } = useDatabase();

  // Form state — initialised empty, populated once expense loads
  const [fieldAmount, setFieldAmount] = useState("");
  const [fieldComment, setFieldComment] = useState("");
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState("");
  const [selectedOption, setSelectedOption] = useState({ label: "", value: 0 });
  const [categories, setCategories] = useState([]);

  // Pre-populate form when expense data arrives
  useEffect(() => {
    if (!expense) return;
    setFieldAmount(String(expense.amount));
    setFieldComment(expense.comment);
    setChecked(Boolean(expense.couldHaveBeenAvoided));
    setValue(expense.entryDate);
    setSelectedOption({
      label: expense.category.name,
      value: expense.category.categoryId,
    });
  }, [expense]);

  // Load categories
  useEffect(() => {
    if (!isReady) return;
    const res = execute(
      "SELECT category_id, name FROM Categories WHERE user_id = 1 ORDER BY name ASC",
    );
    if (res?.[0]?.values?.length) {
      setCategories(
        res[0].values.map((el) => ({ label: String(el[1]), value: Number(el[0]) })),
      );
    }
  }, [isReady]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(fieldAmount);
    if (isNaN(amount) || amount <= 0) return;

    editExpense(
      {
        expenseId: id,
        categoryId: selectedOption.value,
        amount,
        comment: fieldComment,
        date: value,
        couldHaveBeenAvoided: checked,
      },
      {
        onSuccess: () => {
            //navigate(-1),  // go back to the table
            logger.debug("expense was updated")
        },
        onError: (err) => logger.error("Failed to update expense:", err),
      },
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (!expense) return <div>Expense not found.</div>;

  return (
    <form onSubmit={handleSubmit}>
      <Form
        actions={
          <SpaceBetween direction="horizontal" size="xs">
            <Button formAction="none" variant="link" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button variant="primary" loading={isPending}>
              Save
            </Button>
          </SpaceBetween>
        }
      >
        <Container header={<Header variant="h2">Edit expense</Header>}>
          <SpaceBetween direction="vertical" size="l">
            <FormField label="Amount">
              <Input
                type="number"
                value={fieldAmount}
                onChange={(e) => setFieldAmount(e.detail.value)}
              />
            </FormField>
            <FormField label="Category">
              <Select
                selectedOption={selectedOption}
                onChange={({ detail }) => setSelectedOption(detail.selectedOption)}
                options={categories}
              />
            </FormField>
            <FormField label="Comment">
              <Input
                value={fieldComment}
                onChange={(e) => setFieldComment(e.detail.value)}
              />
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
                onChange={({ detail }) => setValue(detail.value)}
                value={value}
              />
            </FormField>
          </SpaceBetween>
        </Container>
      </Form>
    </form>
  );
}

export default ExpenseEditPage;