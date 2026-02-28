import { create } from 'zustand'

interface ExpenseState {
  selectedDate: string,
  updateDate: (newDate:string) => void,
}

const useExpenseStore = create<ExpenseState>()((set) => {

  const curDate = new Date();
  const year = '' + curDate.getFullYear();
  let month = '' + (curDate.getMonth()+1);

  month = (month.length < 2 ) ? "0" + month : month;

  return {
    selectedDate: `${year}-${month}`,
    updateDate: (selectedDate) => set(() => ({selectedDate}))
    };
  }
  );

export { useExpenseStore};
