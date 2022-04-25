import { PersonMap } from "../pages/MeetingDetail";

export const createInitialPersonMap = (names: string[]): PersonMap =>
  names.reduce(
    (acc, name) => ({
      ...acc,
      [name]: { name, schedule: new Set() },
    }),
    {} as PersonMap
  );
