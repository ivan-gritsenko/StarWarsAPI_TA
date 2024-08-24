import { ListChildComponentProps } from "react-window";
import { Person } from "../../../types/Person";
import useStarWarsStore, { useModalStore } from "../../../store";
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

export const VirtualizedListItem = (items: Person[]) => (props: ListChildComponentProps) => {
  const { index, style } = props;
  const person = items[index];

  const { setPerson } = useStarWarsStore();
  const { onOpen } = useModalStore();

  const handleClick = (person: Person) => {
    setPerson(person);
  };

  return (
    <ListItem style={style} key={person.id} component="div" disablePadding sx={{
      p: 0, transition: "all 0.3s ease",
      '&:hover': {
        bgcolor: '#042548',
      },
    }}>
      <ListItemButton onClick={() => {
        onOpen();
        handleClick(person);
      }}>
        <ListItemIcon>
          <PersonIcon sx={{ color: "white" }} />
        </ListItemIcon>
        <ListItemText primary={person.name} />
      </ListItemButton>
    </ListItem>
  );
};