import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import SelectionArea, { SelectionEvent } from "@viselect/react";
import { ChangeEvent, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useSwr from "swr";

import { getMeeting } from "../apis/meetings/getMeeting";
import DayColumn from "../components/DayColumn";
import SelectPerson from "../components/SelectPerson";
import { createInitialPersonMap } from "../utils/createInitialPersonMap";
import { splitAraryChunks } from "../utils/splitArrayChunks";

const names = ["Junsu", "Junki", "Sangeun"];

export interface Person {
  name: string;
  schedule: Set<string>;
}

export type PersonMap = Record<string, Person>;

export default function MeetingDetail() {
  const [people, setPeople] = useState<PersonMap>(
    createInitialPersonMap(names)
  );

  const [dayPageIndex, setDayPageIndex] = useState(0);
  // Use ref to prevent SelectionArea from being rerendered, which resets selection state
  const selectedPersonNameRef = useRef(names[0]);
  const { id } = useParams() as { id: string };
  const { data: meeting } = useSwr(`/api/meetings/${id}`, () =>
    getMeeting({ meetingUrlKey: id })
  );

  if (!meeting) return null;

  const days = meeting.availableDates.sort((a, b) => a.unix() - b.unix()) ?? [];
  const dayPages = splitAraryChunks(days, 5);
  const timeRangeStartHour = meeting.timeRangeStart.hour();
  const timeRangeEndHour = meeting.timeRangeEnd.hour();
  const timeRangeHourCount = timeRangeEndHour - timeRangeStartHour + 1;

  const hours =
    timeRangeHourCount > 0
      ? new Array(timeRangeHourCount)
          .fill(0)
          .map((_, index) => meeting.timeRangeStart.add(index, "hour"))
      : [];

  const extractIds = (els: Element[]): string[] =>
    els
      .map((v) => v.getAttribute("data-key"))
      .filter(Boolean)
      .map(String);

  const onStart = ({ event, selection }: SelectionEvent) => {
    if (!event?.ctrlKey && !event?.metaKey) {
      selection.clearSelection();
      setPeople((prev) => {
        const selectedPersonName = selectedPersonNameRef.current;
        const selectedPerson = prev[selectedPersonName];
        return {
          ...prev,
          [selectedPersonName]: { ...selectedPerson, schedule: new Set() },
        };
      });
    }
  };

  const onMove = ({
    store: {
      changed: { added, removed },
    },
  }: SelectionEvent) => {
    setPeople((prev) => {
      const selectedPersonName = selectedPersonNameRef.current;
      const selectedPerson = prev[selectedPersonName];
      const next = new Set(selectedPerson.schedule);
      extractIds(added).forEach((id) => next.add(id));
      extractIds(removed).forEach((id) => next.delete(id));
      return {
        ...prev,
        [selectedPersonName]: { ...selectedPerson, schedule: next },
      };
    });
  };

  const handlePersonChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    selectedPersonNameRef.current = name;
  };

  return (
    <div className="App">
      <Stack padding={2} spacing={2} alignItems="center">
        <SelectionArea
          onStart={onStart}
          onMove={onMove}
          className="timetable"
          selectables=".selectable"
        >
          <IconButton
            disabled={dayPageIndex === 0}
            onClick={() => setDayPageIndex((prev) => prev - 1)}
          >
            <KeyboardArrowLeft />
          </IconButton>
          <div className="grid-column">
            <div className="grid-cell" />
            {hours.map((hour) => (
              <div className="grid-cell" key={hour.hour()}>
                {hour.format("HH:mm")}
              </div>
            ))}
          </div>
          {dayPages[dayPageIndex].map((day) => (
            <DayColumn
              key={day.format("YYYY-MM-DD")}
              day={day}
              hours={hours}
              personMap={people}
            />
          ))}
          <IconButton
            disabled={dayPageIndex >= dayPages.length - 1}
            onClick={() => setDayPageIndex((prev) => prev + 1)}
          >
            <KeyboardArrowRight />
          </IconButton>
        </SelectionArea>
        <SelectPerson
          selectedName={selectedPersonNameRef.current}
          names={names}
          handleChange={handlePersonChange}
        />
      </Stack>
    </div>
  );
}
