import { create } from 'zustand'

interface INotification {
  id: number,
  text: string,
  active: boolean,
  dismissed: boolean,
}

interface INotificationState {
  notifications: INotification[],
  addNotification: (id: number, text: string) => void,
  dismissNotification: (id: number) => void,
}

// interface BearState {
//   bears: number
//   food: string
//   feed: (food: string) => void,
//   increase: (by:number) => void,
// }

interface ExpenseState {
  selectedDate: string,
  updateDate: (newDate:string) => void,
}

const useNotificationStore = create<INotificationState>()((set) => ({
  notifications: [],
  addNotification: (_id: number, _text:string) => {},
  dismissNotification: (_id: number) => {},
}))

// // Create store using the curried form of `create`
// const useBearStore = create<BearState>()((set) => ({
//   bears: 2,
//   food: 'honey',
//   feed: (food) => set(() => ({ food })),
//   increase: (by:number) => set((s) => ({ bears: s.bears + by })),
// }))


const useExpenseStore = create<ExpenseState>()((set) => {

  const curDate = new Date();
  const year = '' + curDate.getFullYear();
  let month = '' + (curDate.getMonth()+1);

  month = (month.length < 2 ) ? "0" + month : month;

  return {
    selectedDate: `${year}-${month}`, //"2026-02",
    updateDate: (selectedDate) => set(() => ({selectedDate}))
    };
  }
  );


export { useNotificationStore, useExpenseStore};
