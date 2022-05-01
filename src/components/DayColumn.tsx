import { Dayjs } from "dayjs";

import { Participant } from "../types/participant";
import TimeSlot from "./TimeSlot";

interface DayColumnProps {
  day: Dayjs;
  hours: Dayjs[];
  participants: Participant[];
}

export default function DayColumn({
  day,
  hours,
  participants,
}: DayColumnProps) {
  return (
    <div className="grid-column">
      <div className="grid-cell">{day.format("MM-DD ddd")}</div>
      {hours.map((hour) => {
        const dataKey = `${day}-${hour}`;
        const selectedRatio =
          participants.filter((person) => person.timeslots.has(dataKey))
            .length / participants.length;
        return (
          <TimeSlot opacity={selectedRatio} key={dataKey} dataKey={dataKey} />
        );
      })}
    </div>
  );
}
