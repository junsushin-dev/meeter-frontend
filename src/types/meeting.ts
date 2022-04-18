import { Dayjs } from "dayjs";

export interface Meeting {
  meetingId: number;
  meetingTitle: string;
  meetingDesc: string;
  meetingUrlKey: string;
  participants: string[];
  availableDates: Dayjs[];
  scheduleStart: Dayjs | null;
  scheduleEnd: Dayjs | null;
  timeRangeStart: Dayjs;
  timeRangeEnd: Dayjs;
}
