import Character from "../models/character.js";
import Page from "../models/page.js";

export default class ApiService {
  private static BASE_URL = "https://rickandmortyapi.com/api/character/";

  private static async fetchFromApi(endpoint: string = "") {
    const res = await fetch(`${this.BASE_URL}${endpoint}`);
    return await res.json();
  }

  static async getFirst20Characters(): Promise<Character[]> {
    const data = await this.fetchFromApi();
    const characters = data.results.map((item: any) =>
      Character.fromJson(item)
    );
    return characters;
  }

  static async getPage(page: number): Promise<Page> {
    const data = await this.fetchFromApi(`/?page=${page}`);
    return data;
  }

  static async searchCharacters(searchQuery: string) {
    const data = await this.fetchFromApi(`/?name=${searchQuery}`);
    return data;
  }
}
