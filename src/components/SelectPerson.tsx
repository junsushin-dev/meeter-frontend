import { ChangeEventHandler } from "react";

interface SelectPersonProps {
  selectedName: string;
  names: string[];
  handleChange: ChangeEventHandler<HTMLInputElement>;
}

export default function SelectPerson({
  selectedName,
  names,
  handleChange,
}: SelectPersonProps) {
  return (
    <div>
      {names.map((name, index) => (
        <div key={name}>
          <input
            type="radio"
            id={`name-${name}`}
            name="name"
            value={name}
            defaultChecked={name === selectedName}
            onChange={handleChange}
          />
          <label htmlFor={`name-${name}`}>{name}</label>
        </div>
      ))}
    </div>
  );
}
