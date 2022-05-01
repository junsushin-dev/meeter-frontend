import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import SelectionArea, { SelectionEvent } from "@viselect/react";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useSwr from "swr";

import { getMeeting } from "../apis/meetings/getMeeting";
import DayColumn from "../components/DayColumn";
import SelectPerson from "../components/SelectPerson";
import SelectPersonDialog from "../components/SelectPersonDialog";
import { Participant } from "../types/participant";
import { splitAraryChunks } from "../utils/splitArrayChunks";

const names = ["Junsu", "Junki", "Sangeun"];

export default function MeetingDetail() {
  const [participants, setParticipants] = useState<Participant[]>(
    names.map((name) => ({ name, timeslots: new Set() }))
  );
  const [dayPageIndex, setDayPageIndex] = useState(0);
  const [selectPersonDialogOpen, setSelectPersonDialogOpen] = useState(false);
  // Use ref to prevent SelectionArea from being rerendered, which resets selection state
  const selectedPersonNameRef = useRef<string>();
  const [selectedPersonName, setSelectedPersonName] = useState<string>();
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
    const selectedPersonName = selectedPersonNameRef.current;
    if (selectedPersonName === undefined) {
      setSelectPersonDialogOpen(true);
      return;
    }

    if (!event?.ctrlKey && !event?.metaKey) {
      selection.clearSelection();
      setParticipants((prev) => {
        const selectedPersonIndex = prev.findIndex(
          (p) => p.name === selectedPersonName
        );
        const selectedPerson = prev[selectedPersonIndex];
        if (!selectedPerson) return prev;
        return [
          ...prev.slice(0, selectedPersonIndex),
          { ...selectedPerson, timeslots: new Set() },
          ...prev.slice(selectedPersonIndex + 1),
        ];
      });
    }
  };

  const onMove = ({
    store: {
      changed: { added, removed },
    },
  }: SelectionEvent) => {
    const selectedPersonName = selectedPersonNameRef.current;
    if (selectedPersonName === undefined) {
      setSelectPersonDialogOpen(true);
      return;
    }

    setParticipants((prev) => {
      const selectedPersonIndex = prev.findIndex(
        (p) => p.name === selectedPersonName
      );
      const selectedPerson = prev[selectedPersonIndex];
      if (!selectedPerson) return prev;
      const next = new Set(selectedPerson.timeslots);
      extractIds(added).forEach((id) => next.add(id));
      extractIds(removed).forEach((id) => next.delete(id));
      return [
        ...prev.slice(0, selectedPersonIndex),
        { ...selectedPerson, timeslots: next },
        ...prev.slice(selectedPersonIndex + 1),
      ];
    });
  };

  const handlePersonChange = (name: string) => {
    selectedPersonNameRef.current = name;
    setSelectedPersonName(name);
    setSelectPersonDialogOpen(false);
  };

  const handleAddPerson = (name: string) => {
    const newPerson = {
      name,
      timeslots: new Set<string>(),
    };

    setParticipants((prev) => [...prev, newPerson]);
    setSelectPersonDialogOpen(false);
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
              participants={participants}
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
          selectedName={selectedPersonName}
          names={participants.map((p) => p.name)}
          handleChange={handlePersonChange}
        />
        <SelectPersonDialog
          open={selectPersonDialogOpen}
          onChange={handlePersonChange}
          onAddPerson={handleAddPerson}
          selectedName={selectedPersonName}
          names={participants.map((p) => p.name)}
        />
      </Stack>
    </div>
  );
}
