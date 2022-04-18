import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { Meeting } from "../../types/meeting";

console.log(customParseFormat);

dayjs.extend(customParseFormat);

interface GetMeetingRequestParams {
  meetingUrlKey: string;
}

interface GetMeetingResponse
  extends Omit<
    Meeting,
    | "availableDates"
    | "scheduleStart"
    | "scheduleEnd"
    | "timeRangeStart"
    | "timeRangeEnd"
  > {
  availableDates: string[];
  scheduleStart: string;
  scheduleEnd: string;
  timeRangeStart: string;
  timeRangeEnd: string;
}

export const getMeeting = async (
  params: GetMeetingRequestParams
): Promise<Meeting> => {
  const response = await fetch(`/api/meetings/${params.meetingUrlKey}`);
  const meetingResponseData: GetMeetingResponse = await response.json();
  const {
    availableDates,
    scheduleStart,
    scheduleEnd,
    timeRangeStart,
    timeRangeEnd,
  } = meetingResponseData;

  const meeting: Meeting = {
    ...meetingResponseData,
    availableDates: availableDates.map((dateString) => dayjs(dateString)),
    scheduleStart: dayjs(scheduleStart),
    scheduleEnd: dayjs(scheduleEnd),
    timeRangeStart: dayjs(timeRangeStart, "HH:mm:ss"),
    timeRangeEnd: dayjs(timeRangeEnd, "HH:mm:ss"),
  };

  return meeting;
};
