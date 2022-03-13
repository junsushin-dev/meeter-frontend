import { useState } from 'react';
import './App.css';
import TimeSlot from './TimeSlot';
import SelectionArea, { SelectionEvent } from "@viselect/react";

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
const hours = new Array(24).fill(0).map((_, index) => index.toString().padStart(2, '0') + ":00");

function App() {
  const [selected, setSelected] = useState<Set<string>>(() => new Set());
  const extractIds = (els: Element[]): string[] =>
  els
    .map((v) => v.getAttribute("data-key"))
    .filter(Boolean)
    .map(String);

  const onStart = ({ event, selection }: SelectionEvent) => {
    if (!event?.ctrlKey && !event?.metaKey) {
      selection.clearSelection();
      setSelected(() => new Set());
    }
  };

  const onMove = ({
    store: {
      changed: { added, removed }
    }
  }: SelectionEvent) => {
    setSelected((prev) => {
      const next = new Set(prev);
      extractIds(added).forEach((id) => next.add(id));
      extractIds(removed).forEach((id) => next.delete(id));
      return next;
    });
  };
  
  return (
    <div className="App">
      <SelectionArea onStart={onStart} onMove={onMove} className="timetable" selectables=".selectable">
        <div className='grid-column'>
          <div className='grid-cell' />
          {hours.map(hour => <div className='grid-cell' key={hour}>{hour}</div>)}
        </div>
        {days.map(dayName => (
          <div key={dayName} className='grid-column'>
            <div className='grid-cell'>{dayName}</div>
            {hours.map(hour => {
              const dataKey = `${dayName}-${hour}`;
              return <TimeSlot selected={selected.has(dataKey)} key={dataKey} dataKey={dataKey} />
            })}
          </div>
        ))}
      </SelectionArea>
    </div>
  )
}

export default App;
