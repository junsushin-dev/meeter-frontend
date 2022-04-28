import { Person as PersonIcon } from "@mui/icons-material";
import {
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { blue } from "@mui/material/colors";

interface SelectPersonProps {
  selectedName?: string;
  names: string[];
  handleChange: (name: string) => void;
}

export default function SelectPerson({
  selectedName,
  names,
  handleChange,
}: SelectPersonProps) {
  return (
    <List>
      {names.map((name, index) => (
        <ListItem key={name} disablePadding>
          <ListItemButton
            onClick={() => handleChange(name)}
            selected={selectedName === name}
          >
            <ListItemIcon>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon />
              </Avatar>
            </ListItemIcon>
            <ListItemText>{name}</ListItemText>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
