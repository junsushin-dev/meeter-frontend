import { Dayjs } from "dayjs";

import { PersonMap } from "../pages/MeetingDetail";
import TimeSlot from "./TimeSlot";

interface DayColumnProps {
  day: Dayjs;
  hours: Dayjs[];
  personMap: PersonMap;
}

export default function DayColumn({ day, hours, personMap }: DayColumnProps) {
  const personArray = Object.values(personMap);

  return (
    <div className="grid-column">
      <div className="grid-cell">{day.format("MM-DD ddd")}</div>
      {hours.map((hour) => {
        const dataKey = `${day}-${hour}`;
        const selectedRatio =
          personArray.filter((person) => person.schedule.has(dataKey)).length /
          personArray.length;
        return (
          <TimeSlot opacity={selectedRatio} key={dataKey} dataKey={dataKey} />
        );
      })}
    </div>
  );
}
