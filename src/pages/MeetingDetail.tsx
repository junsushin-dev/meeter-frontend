import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import SelectionArea, { SelectionEvent } from "@viselect/react";
import { ChangeEvent, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useSwr from "swr";

import { getMeeting } from "../apis/meetings/getMeeting";
import DayColumn from "../components/DayColumn";
import { splitAraryChunks } from "../utils/splitArrayChunks";

const names = ["Junsu", "Junki", "Sangeun"];

export interface Person {
  name: string;
  schedule: Set<string>;
}

export default function MeetingDetail() {
  const [people, setPeople] = useState<Person[]>(
    names.map((name) => ({ name, schedule: new Set() }))
  );
  const [dayPageIndex, setDayPageIndex] = useState(0);
  const selectedPersonIndexRef = useRef(0);
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
        const selectedPersonIndex = selectedPersonIndexRef.current;
        const selectedPerson = prev[selectedPersonIndex];
        return [
          ...prev.slice(0, selectedPersonIndex),
          { ...selectedPerson, schedule: new Set() },
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
    setPeople((prev) => {
      const selectedPersonIndex = selectedPersonIndexRef.current;
      const selectedPerson = prev[selectedPersonIndex];
      const next = new Set(selectedPerson.schedule);
      extractIds(added).forEach((id) => next.add(id));
      extractIds(removed).forEach((id) => next.delete(id));
      return [
        ...prev.slice(0, selectedPersonIndex),
        { ...selectedPerson, schedule: next },
        ...prev.slice(selectedPersonIndex + 1),
      ];
    });
  };

  const handlePersonChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedIndex = parseInt(event.target.value);
    selectedPersonIndexRef.current = selectedIndex;
  };

  return (
    <div className="App">
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
              {hour.format("hh:mm")}
            </div>
          ))}
        </div>
        {dayPages[dayPageIndex].map((day) => (
          <DayColumn
            key={day.format("YYYY-MM-DD")}
            day={day}
            hours={hours}
            people={people}
          />
        ))}
        <IconButton
          disabled={dayPageIndex >= dayPages.length - 1}
          onClick={() => setDayPageIndex((prev) => prev + 1)}
        >
          <KeyboardArrowRight />
        </IconButton>
      </SelectionArea>
      <div>
        {names.map((name, index) => (
          <div key={name}>
            <input
              type="radio"
              id={`name-${name}`}
              name="name"
              value={index}
              defaultChecked={index === selectedPersonIndexRef.current}
              onChange={handlePersonChange}
            />
            <label htmlFor={`name-${name}`}>{name}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
