import dayjs, { Dayjs } from "dayjs";
import create from "zustand";

interface State {
  dates: Date[];
  title: string;
  description: string;
  timeRangeStart: Dayjs | null;
  timeRangeEnd: Dayjs | null;
  setSelectedDates: (newDates: Date[]) => void;
  setTitle: (newTitle: string) => void;
  setDescription: (newDescription: string) => void;
  setTimeRangeStart: (newDate: Dayjs | null) => void;
  setTimeRangeEnd: (newDate: Dayjs | null) => void;
}

export const useStore = create<State>((set) => ({
  dates: [] as Date[],
  title: "",
  description: "",
  timeRangeStart: dayjs("1970-01-01T09:00:00.000+09:00"),
  timeRangeEnd: dayjs("1970-01-01T22:00:00.000+09:00"),
  setSelectedDates: (newDates: Date[]) => set((state) => ({ dates: newDates })),
  setTitle: (newTitle: string) => set((state) => ({ title: newTitle })),
  setDescription: (newDescription: string) =>
    set((state) => ({ description: newDescription })),
  setTimeRangeStart: (newDate: Dayjs | null) =>
    set((state) => ({ timeRangeStart: newDate })),
  setTimeRangeEnd: (newDate: Dayjs | null) =>
    set((state) => ({ timeRangeEnd: newDate })),
}));
