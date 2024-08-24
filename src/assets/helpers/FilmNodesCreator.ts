import { Film } from "../../types/Film";

export function FilmNodesCreator(films: Film[], personNodeId: string) {
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