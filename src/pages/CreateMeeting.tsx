import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

import { BottomNavPaper } from "../components/BottomNavPaper";

export default function CreateMeeting() {
  return (
    <Box>
      <Stack padding={2} spacing={2} alignItems="center">
        <Typography component="h1" variant="h4">
          일정 생성 페이지
        </Typography>
        <TextField id="meeting-title" label="Title" fullWidth />
        <TextField
          id="meeting-description"
          label="Description"
          multiline
          fullWidth
          rows={4}
        />
      </Stack>
      <BottomNavPaper elevation={3}>
        <Button>
          <Typography marginRight={1}>다음</Typography>
          <ArrowCircleRightIcon />
        </Button>
      </BottomNavPaper>
    </Box>
  );
}
