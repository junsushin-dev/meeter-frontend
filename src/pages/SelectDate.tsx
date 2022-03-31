import { useState } from "react";
import Calendar, { CalendarTileProperties } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { DateSet } from "../utils/toggleSet";

export default function SelectDate() {
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

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={null}
        tileClassName={setTileClassName}
      />
    </div>
  );
}
