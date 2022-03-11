import { useState } from 'react';

export default function TimeSlot() {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div className={`grid-cell ${isSelected ? 'selected': ''}`} onClick={() => setIsSelected(prev => !prev)} />
  )
}