import axios from "axios";

export async function starshipFetcher(id: number) {
  try {
    const response = await axios.get("https://swapi.dev/api/starships/" + id);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}