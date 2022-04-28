import { PersonAdd as PersonAddIcon } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { useState } from "react";

import SelectPerson from "./SelectPerson";

interface SelectPersonDialogProps {
  open: boolean;
  onChange: (name: string) => void;
  onAddPerson: (name: string) => void;
  selectedName?: string;
  names: string[];
}

export default function SelectPersonDialog({
  open,
  onChange,
  onAddPerson,
  selectedName,
  names,
}: SelectPersonDialogProps) {
  const [newPersonNameInputValue, setNewPersonNameInputValue] = useState("");

  const handleAddButtonClick = () => {
    onAddPerson(newPersonNameInputValue);
  };

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
            paddingX: 1,
            paddingY: 0,
            columnGap: 1,
          }}
        >
          <IconButton onClick={handleAddButtonClick}>
            <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
              <PersonAddIcon />
            </Avatar>
          </IconButton>
          <TextField
            id="new-person-name"
            label="새로운 참가자 이름"
            onChange={(event) => setNewPersonNameInputValue(event.target.value)}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
}
