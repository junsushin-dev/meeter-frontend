import { Dayjs } from "dayjs";

interface GetMeetingRequestParams {
  meetingUrlKey: string;
}

interface GetMeetingResponse {
  meetingId: number;
  meetingTitle: string;
  meetingDesc: string;
  meetingUrlKey: string;
  participants: [];
  availableDates: Date[];
  scheduleStart: Date;
  scheduleEnd: Date;
  timeRangeStart: Dayjs;
  timeRangeEnd: Dayjs;
}

export const getMeeting = async (
  params: GetMeetingRequestParams
): Promise<GetMeetingResponse> => {
  const response = await fetch(`/api/meetings/${params.meetingUrlKey}`);

  return response.json();
};
