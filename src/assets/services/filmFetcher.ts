import axios from "axios";

export async function filmFetcher(id: number) {
  try {
    const response = await axios.get("https://swapi.dev/api/films/" + id);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}