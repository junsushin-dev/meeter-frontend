interface TimeSlotProps {
  dataKey: string;
  selected?: boolean;
  opacity: number;
}

export default function TimeSlot({
  selected,
  dataKey,
  opacity,
}: TimeSlotProps) {
  const backgroundColor = `rgba(173, 255, 47, ${opacity})`;

  return (
    <div
      className={`grid-cell selectable`}
      style={{ backgroundColor }}
      data-key={dataKey}
    />
  );
}
