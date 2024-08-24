import ReactFlow, { MiniMap, Controls, Background } from "reactflow";
import "reactflow/dist/style.css";
import useStarWarsStore from "../../../store";
import { useEffect, useState } from "react";
import axios from "axios";
import { Film } from "../../../types/Film";
import { Starship } from "../../../types/Starship";


async function filmFetcher(id: number) {
  try {
    const response = await axios.get("https://swapi.dev/api/films/" + id);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}


async function starshipFetcher(id: number) {
  try {
    const response = await axios.get("https://swapi.dev/api/starships/" + id);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

function FilmNodesCreator(films: Film[], personNodeId: string) {
  const filmNodes = films.map((film, index) => ({
    id: `f${film.episode_id}`,
    data: { label: film.title },
    position: { x: 200 * index, y: 100 },
  }));

  const filmEdges = films.map((film) => ({
    id: `e${personNodeId}-f${film.episode_id}`,
    source: personNodeId,
    target: `f${film.episode_id}`,
  }));

  return { filmNodes, filmEdges };
}

function StarshipNodesCreator(starships: Starship[], films: Film[]) {
  const starshipNodes = starships.map((starship, index) => {
    return ({
      id: `s${index}`,
      data: { label: starship.name },
      position: { x: 200 * index, y: 200 },
    })
  });

  const starshipEdges = films.map((film) => {
    return starships.reduce((acc: { id: string; source: string; target: string }[], starship, index) => {
      if (film.starships.includes(starship.url)) {
        acc.push({
          id: `f${film.episode_id}-s${index}`,
          source: `f${film.episode_id}`,
          target: `s${index}`,
        });
      }
      return acc;
    }, []);
  });

  return { starshipNodes, starshipEdges };
}


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
