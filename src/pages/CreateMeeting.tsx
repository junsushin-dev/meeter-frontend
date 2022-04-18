import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import { useNavigate } from "react-router-dom";

import { createMeeting } from "../apis/meetings/createMeeting";
import { BottomNavPaper } from "../components/BottomNavPaper";
import { useStore } from "../stores";

export default function CreateMeeting() {
  const navigate = useNavigate();
  const {
    title,
    description,
    timeRangeStart,
    timeRangeEnd,
    dates,
    setTitle,
    setDescription,
    setTimeRangeStart,
    setTimeRangeEnd,
  } = useStore();

  const handleNextButtonClick = async () => {
    if (!title || dates.length === 0 || !timeRangeStart || !timeRangeEnd)
      return;

    try {
      const { meetingUrlKey } = await createMeeting({
        meetingTitle: title,
        meetingDesc: description,
        availableDates: dates,
        timeRangeStart,
        timeRangeEnd,
      });
      navigate(`/meeting/${meetingUrlKey}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Stack padding={2} spacing={2} alignItems="center">
        <Typography component="h1" variant="h4">
          일정 생성 페이지
        </Typography>
        <TextField
          id="meeting-title"
          label="Title"
          fullWidth
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <TextField
          id="meeting-description"
          label="Description"
          multiline
          fullWidth
          rows={4}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <TimePicker
          label="시간 시작"
          value={timeRangeStart}
          onChange={setTimeRangeStart}
          renderInput={(params) => <TextField fullWidth {...params} />}
        />
        <TimePicker
          label="시간 종료"
          value={timeRangeEnd}
          onChange={setTimeRangeEnd}
          renderInput={(params) => <TextField fullWidth {...params} />}
        />
      </Stack>
      <BottomNavPaper elevation={3}>
        <Button onClick={handleNextButtonClick}>
          <Typography marginRight={1}>다음</Typography>
          <ArrowCircleRightIcon />
        </Button>
      </BottomNavPaper>
    </Box>
  );
}
