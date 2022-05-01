interface CreateParticipantRequestParams {
  meetingUrlKey: string;
  name: string;
}

export const createParticipant = async ({
  meetingUrlKey,
  name,
}: CreateParticipantRequestParams): Promise<void> => {
  await fetch(`/api/meetings/${meetingUrlKey}/participants`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
};
