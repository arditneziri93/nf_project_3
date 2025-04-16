import Character from "./character.js";

export default class Page {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];

  constructor(data: any) {
    this.info = data.info;
    this.results = data.results.map((item: any) => Character.fromJson(item)); // 👈 use fromJson here
  }

  static fromJson(data: any): Page {
    return new Page(data);
  }
}
