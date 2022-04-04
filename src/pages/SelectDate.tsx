import "react-calendar/dist/Calendar.css";

import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import Calendar, { CalendarTileProperties } from "react-calendar";
import { useNavigate } from "react-router-dom";

import { BottomNavPaper } from "../components/BottomNavPaper";
import { DateSet } from "../utils/toggleSet";

export default function SelectDate() {
  const navigate = useNavigate();
  const [selectedDateSet, setSelectedDateSet] = useState(
    new DateSet([new Date()])
  );

  const onChange = (date: Date) => {
    setSelectedDateSet((prevSet) => {
      const newSet = new DateSet([...prevSet.values()]);
      newSet.toggle(date);
      return newSet;
    });
  };

  const setTileClassName = ({ date, view }: CalendarTileProperties) => {
    if (selectedDateSet.has(date)) {
      return "react-calendar__tile--hasActive";
    } else {
      return null;
    }
  };

  const handleNextButtonClick = () => {
    navigate("/create");
  };

  return (
    <Box>
      <Stack padding={2} spacing={2} alignItems="center">
        <Typography component="h1" variant="h4">
          어떤 날에 만나고 싶나요?
        </Typography>
        <Calendar
          onChange={onChange}
          value={null}
          tileClassName={setTileClassName}
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
