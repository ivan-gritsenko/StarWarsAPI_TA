import { useEffect, useState } from "react";
import "./App.css";
import { VirtualizedList } from "./assets/components/VirtulizedList/VirtulizedList";
import axios from "axios";
import { Person } from "./types/Person";
import FlowChart from "./assets/components/FlowChart/FlowChart";
import Modal from "./assets/components/Portal/Modal";
import { Box } from "@mui/material";

function App() {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [nextPage, setNextPage] = useState<string>(
    "https://sw-api.starnavi.io/people"
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchPeoples = async () => {
    try {
      setIsLoading(true);

      if (!nextPage) return;

      console.log(nextPage);
      const response = await axios.get(nextPage);

      setPeoples((prevPeoples) => [...prevPeoples, ...response.data.results]);
      setNextPage(response.data.next);

      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPeoples();
  }, []);

  const loadMoreItems = () => {
    if (!isLoading) {
      fetchPeoples();
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%", opacity: 0.9 }}>
        <Box sx={{ border: "2px solid white" }}>
          <VirtualizedList items={peoples} loadMoreItems={loadMoreItems} />
        </Box>
      </Box>

      <Modal>
        <div>
          <FlowChart />
        </div>
      </Modal>
    </>
  );
}

export default App;
