import { Dayjs } from "dayjs";

interface CreateMeetingRequestParams {
  meetingTitle: string;
  meetingDesc: string;
  availableDates: Date[];
  timeRangeStart: Dayjs;
  timeRangeEnd: Dayjs;
}

interface CreateMeetingResponse {
  meetingUrlKey: string;
}

export const createMeeting = async (
  params: CreateMeetingRequestParams
): Promise<CreateMeetingResponse> => {
  const response = await fetch("/api/meetings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  return response.json();
};
