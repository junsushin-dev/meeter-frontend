
interface TimeSlotProps {
  dataKey: string; 
  selected?: boolean;
}

export default function TimeSlot({ selected, dataKey }: TimeSlotProps) {
  return (
    <div className={`grid-cell selectable ${selected ? 'selected': ''}`} data-key={dataKey} />
  )
}