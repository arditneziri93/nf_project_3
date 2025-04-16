import { Character } from "../models/character.js";

const BASE_URL = "https://rickandmortyapi.com/api";

async function fetchFromApi(endpoint: string) {
  const res = await fetch(`${BASE_URL}${endpoint}`);
  return await res.json();
}

async function getFirst20Characters(): Promise<Character[]> {
  const data = await fetchFromApi("/character");
  const characters = data.results.map((item: any) => Character.fromJson(item));
  return characters;
}

export { getFirst20Characters };
