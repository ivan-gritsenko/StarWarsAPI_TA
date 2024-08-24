import * as React from "react";
import Box from "@mui/material/Box";
import { FixedSizeList } from "react-window";
import { Person } from "../../../types/Person";
import { VirtualizedListItem } from "../VirtualizedListItem/VirtualizedListItem";

const LIST_HEIGHT = 400;
const LIST_ITEM_HEIGHT = 46;

interface VirtualizedListProps {
  items: Person[];
  loadMoreItems: () => void;
}

export const VirtualizedList: React.FC<VirtualizedListProps> = ({
  items,
  loadMoreItems,
}) => {
  const itemCount = items.length;

  const handleScroll = ({ scrollOffset, scrollUpdateWasRequested }: { scrollOffset: number; scrollUpdateWasRequested: boolean }) => {
    if (!scrollUpdateWasRequested && scrollOffset != 0) {
      const bottomOffset = scrollOffset + LIST_HEIGHT;
      if (bottomOffset >= itemCount * LIST_ITEM_HEIGHT) {
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
        {VirtualizedListItem(items)}
      </FixedSizeList>
    </Box>
  );
};
