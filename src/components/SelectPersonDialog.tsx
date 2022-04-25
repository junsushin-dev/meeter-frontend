import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { ChangeEventHandler } from "react";

import SelectPerson from "./SelectPerson";

interface SelectPersonDialogProps {
  open: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  selectedName?: string;
  names: string[];
}

export default function SelectPersonDialog({
  open,
  onChange,
  selectedName,
  names,
}: SelectPersonDialogProps) {
  return (
    <Dialog open={open}>
      <DialogTitle>참여자 선택 또는 생성</DialogTitle>
      <DialogContent>
        <SelectPerson
          selectedName={selectedName}
          names={names}
          handleChange={onChange}
        />
      </DialogContent>
    </Dialog>
  );
}
