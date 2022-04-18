import SelectionArea, { SelectionEvent } from "@viselect/react";
import { ChangeEvent, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useSwr from "swr";

import { getMeeting } from "../apis/meetings/getMeeting";
import TimeSlot from "../components/TimeSlot";

const names = ["Junsu", "Junki", "Sangeun"];
const hours = new Array(24)
  .fill(0)
  .map((_, index) => index.toString().padStart(2, "0") + ":00");

interface Person {
  name: string;
  schedule: Set<string>;
}

export default function MeetingDetail() {
  const [people, setPeople] = useState<Person[]>(
    names.map((name) => ({ name, schedule: new Set() }))
  );
  const selectedPersonIndexRef = useRef(0);
  const { id } = useParams() as { id: string };
  const { data: meeting } = useSwr(`/api/meetings/${id}`, () =>
    getMeeting({ meetingUrlKey: id })
  );

  const days = meeting?.availableDates ?? [];

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
      console.log(prev);
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
        <div className="grid-column">
          <div className="grid-cell" />
          {hours.map((hour) => (
            <div className="grid-cell" key={hour}>
              {hour}
            </div>
          ))}
        </div>
        {days.map((day) => (
          <div key={day.format("YYYY-MM-DD")} className="grid-column">
            <div className="grid-cell">{day.format("MM-DD ddd")}</div>
            {hours.map((hour) => {
              const dataKey = `${day}-${hour}`;
              const selectedRatio =
                people.filter((person) => person.schedule.has(dataKey)).length /
                people.length;
              return (
                <TimeSlot
                  opacity={selectedRatio}
                  key={dataKey}
                  dataKey={dataKey}
                />
              );
            })}
          </div>
        ))}
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
