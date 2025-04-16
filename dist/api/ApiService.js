import Character from "../models/character.js";
export default class ApiService {
    static BASE_URL = "https://rickandmortyapi.com/api/character/";
    static async fetchFromApi(endpoint = "") {
        const res = await fetch(`${this.BASE_URL}${endpoint}`);
        return await res.json();
    }
    static async getFirst20Characters() {
        const data = await this.fetchFromApi();
        const characters = data.results.map((item) => Character.fromJson(item));
        return characters;
    }
    static async getPage(page) {
        const data = await this.fetchFromApi(`/?page=${page}`);
        return data;
    }
    static async searchCharacters(searchQuery) {
        const data = await this.fetchFromApi(`/?name=${searchQuery}`);
        return data;
    }
}
