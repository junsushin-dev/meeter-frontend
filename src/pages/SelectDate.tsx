import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function SelectDate() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div>
      <Calendar onChange={setSelectedDate} value={selectedDate} />
    </div>
  );
}
