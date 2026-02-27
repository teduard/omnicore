export const getMonthDateRange = (selectedDate: string) => {
  const [year, month] = selectedDate.split("-").map(Number);
  const start = `${selectedDate}-01`;
  const lastDay = new Date(year, month, 0).getDate();
  const end = `${selectedDate}-${String(lastDay).padStart(2, "0")}`;
  return { start, end };
};

export const formatDisplayMonth = (selectedDate: string): string => {
  const [year, month] = selectedDate.split("-").map(Number);
  return new Date(year, month - 1).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
};

export const getCurrentYearMonth = (): string => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `${now.getFullYear()}-${month}`;
};
