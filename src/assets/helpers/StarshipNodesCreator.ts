import { Film } from "../../types/Film";
import { Starship } from "../../types/Starship";

export function StarshipNodesCreator(starships: Starship[], films: Film[]) {
  const starshipNodes = starships.map((starship, index) => {
    return ({
      id: `s${index}`,
      data: { label: starship.name },
      position: { x: 200 * index, y: 200 },
    })
  });

  const starshipEdges = films.flatMap((film) => {
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