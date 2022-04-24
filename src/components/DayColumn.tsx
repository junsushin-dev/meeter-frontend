import { Dayjs } from "dayjs";

import { Person } from "../pages/MeetingDetail";
import TimeSlot from "./TimeSlot";

interface DayColumnProps {
  day: Dayjs;
  hours: Dayjs[];
  people: Person[];
}

export default function DayColumn({ day, hours, people }: DayColumnProps) {
  return (
    <div className="grid-column">
      <div className="grid-cell">{day.format("MM-DD ddd")}</div>
      {hours.map((hour) => {
        const dataKey = `${day}-${hour}`;
        const selectedRatio =
          people.filter((person) => person.schedule.has(dataKey)).length /
          people.length;
        return (
          <TimeSlot opacity={selectedRatio} key={dataKey} dataKey={dataKey} />
        );
      })}
    </div>
  );
}
