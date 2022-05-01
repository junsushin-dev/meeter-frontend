import { Dayjs } from "dayjs";

import { Participant } from "./participant";

export interface Meeting {
  meetingId: number;
  meetingTitle: string;
  meetingDesc: string;
  meetingUrlKey: string;
  participants: Participant[];
  availableDates: Dayjs[];
  scheduleStart: Dayjs | null;
  scheduleEnd: Dayjs | null;
  timeRangeStart: Dayjs;
  timeRangeEnd: Dayjs;
}
