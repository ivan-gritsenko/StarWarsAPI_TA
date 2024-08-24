import ReactFlow, { MiniMap, Controls, Background } from "reactflow";
import "reactflow/dist/style.css";
import useStarWarsStore from "../../../store";
import { useEffect, useState } from "react";
import { Film } from "../../../types/Film";
import { Starship } from "../../../types/Starship";
import { filmFetcher } from "../../services/filmFetcher";
import { starshipFetcher } from "../../services/starshipFetcher";
import { FilmNodesCreator } from "../../helpers/FilmNodesCreator";
import { StarshipNodesCreator } from "../../helpers/StarshipNodesCreator";

function FlowChart() {
  const { currentPerson } = useStarWarsStore();
  const [films, setFilms] = useState<Film[]>([]);
  const [starships, setStarships] = useState<Starship[]>([]);
  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);

  useEffect(() => {
    if (currentPerson) {
      const fetchFilms = async () => {
        const filmPromises = currentPerson.films.map((url) => filmFetcher(url));
        const filmData = await Promise.all(filmPromises);
        setFilms(filmData);
      };

      fetchFilms();

      if (currentPerson.starships.length > 0) {
        const fetchStarships = async () => {
          const starshipPromises = currentPerson.starships.map((id) => starshipFetcher(id));
          const starshipData = await Promise.all(starshipPromises);
          setStarships(starshipData);
        };

        fetchStarships();
      }
    }
  }, [currentPerson]);

  useEffect(() => {
    if (currentPerson && films.length > 0) {
      const personNodeId = "1";
      const personNode = {
        id: personNodeId,
        type: "input",
        data: { label: currentPerson.name },
        position: { x: 250, y: 5 },
      };

      const { filmNodes, filmEdges } = FilmNodesCreator(films, personNodeId);
      setNodes([personNode, ...filmNodes]);
      setEdges([...filmEdges]);

      if (currentPerson.starships.length > 0) {
        const { starshipNodes, starshipEdges } = StarshipNodesCreator(starships, films);
        setNodes((nodes) => [...nodes, ...starshipNodes]);
        setEdges((edges) => [...edges, ...starshipEdges]);
      }
    }
  }, [films, currentPerson, starships]);

  return (
    <div style={{ height: 500 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        defaultViewport={{ x: 100, y: 0, zoom: 0.1 }}
        fitView
        style={{ backgroundColor: "#fafafa" }}
      >
        <MiniMap />
        <Controls />
        <Background color="#a9a9a9" />
      </ReactFlow>
    </div>
  );
}

export default FlowChart;
