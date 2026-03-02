import { useState, useContext } from "react";
import {
  Container,
  Header,
  SpaceBetween,
  FormField,
  Input,
  Button,
  Box,
  Spinner,
  StatusIndicator,
  Toggle,
  Popover,
  Link,
} from "@cloudscape-design/components";
import { useWebLLM } from "../../contexts/WebLLMContext";
import { useExpenses } from "../../hooks/useExpenses";
import { useExpenseStore } from "../../hooks/store";
import type { IExpenseRow } from "../../modules/ExpenseApp/interfaces/data";
import { UserContext } from "../../contexts/UserContext";
import { logger } from "../../lib/logger";
import { DashboardRoutes } from "../../routes";

// Builds a plain-text expense summary to inject as context
function buildExpenseContext(
  expenses: IExpenseRow[],
  currency: string,
): string {
  if (!expenses.length)
    return "No expense data available for the selected month.";

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const avoidable = expenses.filter((e) => e.couldHaveBeenAvoided);
  const avoidableTotal = avoidable.reduce((sum, e) => sum + e.amount, 0);

  // Aggregate by category
  const byCategory = expenses.reduce(
    (acc, e) => {
      const name = e.category.name;
      acc[name] = (acc[name] ?? 0) + e.amount;
      return acc;
    },
    {} as Record<string, number>,
  );

  const categoryLines = Object.entries(byCategory)
    .sort(([, a], [, b]) => b - a)
    .map(([name, amount]) => `  - ${name}: ${amount.toFixed(2)} ${currency}`)
    .join("\n");

  const res = [
    `Total spending: ${total.toFixed(2)} ${currency}`,
    `Number of transactions: ${expenses.length}`,
    `Marked as avoidable: ${avoidable.length} transactions totalling ${avoidableTotal.toFixed(2)} ${currency}`,
    `Breakdown by category:\n${categoryLines}`,
  ].join("\n");

  logger.debug("webllm res = ", res);

  return res;
}

function ShowWebLLM() {
  const { loadingState, loadingProgress, isEnabled, ask, isMobile } = useWebLLM();
  const { selectedDate } = useExpenseStore();
  const { data: expenses = [] } = useExpenses(selectedDate);
  const { defaultCurrency } = useContext(UserContext);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [asking, setAsking] = useState(false);
  const [error, setError] = useState("");

  const handleAsk = async () => {
    if (!question.trim()) return;
    setError("");
    setAsking(true);
    setAnswer("");

    try {
      const context = buildExpenseContext(expenses, defaultCurrency.value);
      const result = await ask(question, context);
      setAnswer(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setAsking(false);
    }
  };

  if(isMobile()) {
    return <></>
  }

  // Not enabled yet
  if (!isEnabled) {
    return (
      <Container header={<Header variant="h2">Expense AI Assistant</Header>}>
        <Box color="text-body-secondary">
          WebLLM is disabled. Enable it in <Link href={`${import.meta.env.BASE_URL}${DashboardRoutes.path}/system`}>System Settings</Link> to use the AI
          assistant.
        </Box>
      </Container>
    );
  }

  // Still loading
  if (loadingState === "loading") {
    return (
      <Container header={<Header variant="h2">Expense AI Assistant</Header>}>
        <SpaceBetween size="s">
          <Spinner />
          <Box color="text-body-secondary">{loadingProgress}</Box>
          <Box color="text-body-secondary" fontSize="body-s">
            The model is downloaded once and cached in your browser. This may
            take a minute.
          </Box>
        </SpaceBetween>
      </Container>
    );
  }

  return (
    <Container
      header={
        <Header variant="h2">Expense AI Assistant</Header>
      }
    >
      <SpaceBetween size="m">
        <StatusIndicator type="success">
          Model ready - Analysing {expenses.length} expenses for {selectedDate}
        </StatusIndicator>

        <FormField
          label="Ask about your expenses"
          description="Questions are answered using only your local expense data - nothing is sent to a server."
        >
          <Input
            value={question}
            onChange={({ detail }) => setQuestion(detail.value)}
            onKeyDown={({ detail }) => detail.key === "Enter" && handleAsk()}
            placeholder="e.g. What did I spend most on this month?"
            disabled={asking}
          />
        </FormField>

        <SpaceBetween size="m" direction="horizontal">
          <Button variant="primary" onClick={handleAsk} loading={asking}>
            Ask AI
          </Button>

          <Popover
            header="Context"
            size="large"
            content={<>
              Your questions will be asked using the context represented by the summary of your expense:<br/>
              <pre style={{"overflow":"scroll"}}>{buildExpenseContext(expenses, defaultCurrency.value)}</pre>
            </>}
          >
            <StatusIndicator type="info">Show details</StatusIndicator>
          </Popover>
        </SpaceBetween>

        {error && <StatusIndicator type="error">{error}</StatusIndicator>}

        {answer && (
          <Container header={<Header variant="h3">Analysis</Header>}>
            <Box>{answer}</Box>
          </Container>
        )}
      </SpaceBetween>
    </Container>
  );
}

export default ShowWebLLM;
