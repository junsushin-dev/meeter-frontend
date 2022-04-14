import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { BottomNavPaper } from "../components/BottomNavPaper";
import { useStore } from "../stores";

export default function CreateMeeting() {
  const navigate = useNavigate();
  const { title, description, setTitle, setDescription } = useStore();

  const handleNextButtonClick = () => {
    // TODO: Apply meetingId path param
    navigate("/meeting/path-param-temp");
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
