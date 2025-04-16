import Character from "./character.js";
export default class Page {
    info;
    results;
    constructor(data) {
        this.info = data.info;
        this.results = data.results.map((item) => Character.fromJson(item)); // 👈 use fromJson here
    }
    static fromJson(data) {
        return new Page(data);
    }
}
