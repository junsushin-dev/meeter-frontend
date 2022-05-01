import { Dayjs } from "dayjs";

export interface Participant {
  participantId: number;
  name: string;
  timeslots: Dayjs[];
}
