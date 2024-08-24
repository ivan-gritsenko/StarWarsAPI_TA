import * as React from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { Person } from "../../../types/Person";
import useStarWarsStore, { useModalStore } from "../../../store";
import { ListItemIcon } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

interface VirtualizedListProps {
  items: Person[];
  loadMoreItems: () => void;
}

const renderRow = (items: Person[]) => (props: ListChildComponentProps) => {
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

export const VirtualizedList: React.FC<VirtualizedListProps> = ({
  items,
  loadMoreItems,
}) => {
  const itemCount = items.length;

  const handleScroll = ({ scrollOffset, scrollUpdateWasRequested }: any) => {
    if (!scrollUpdateWasRequested && scrollOffset != 0) {
      const bottomOffset = scrollOffset + 400;
      if (bottomOffset >= itemCount * 46) {
        loadMoreItems();
      }
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: 400,
        maxWidth: 360,
        backgroundColor: "#001021",
        color: "white",
      }}
    >
      <FixedSizeList
        height={400}
        width={360}
        itemSize={46}
        itemCount={items.length}
        overscanCount={5}
        onScroll={handleScroll}
      >
        {renderRow(items)}
      </FixedSizeList>
    </Box>
  );
};
