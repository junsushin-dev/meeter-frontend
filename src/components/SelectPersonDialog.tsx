import { PersonAdd as PersonAddIcon } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import SelectPerson from "./SelectPerson";

interface SelectPersonDialogProps {
  open: boolean;
  onChange: (name: string) => void;
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            paddingX: 2,
            paddingY: 1,
            columnGap: 2,
          }}
        >
          <Avatar>
            <PersonAddIcon />
          </Avatar>
          <TextField id="new-name" label="새로운 참가자 이름" />
        </Box>
      </DialogContent>
    </Dialog>
  );
}
