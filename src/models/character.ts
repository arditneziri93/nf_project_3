type LocationInfo = {
  name: string;
  url: string;
};

export class Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: LocationInfo;
  location: LocationInfo;
  image: string;
  episode: string[];
  url: string;
  created: string;

  constructor(data: {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: LocationInfo;
    location: LocationInfo;
    image: string;
    episode: string[];
    url: string;
    created: string;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.status = data.status;
    this.species = data.species;
    this.type = data.type;
    this.gender = data.gender;
    this.origin = data.origin;
    this.location = data.location;
    this.image = data.image;
    this.episode = data.episode;
    this.url = data.url;
    this.created = data.created;
  }

  static fromJson(data: any): Character {
    return new Character(data);
  }

  getEpisodeCount(): number {
    return this.episode.length;
  }

  getShortDescription(): string {
    const hasSpecies = this.species.trim() !== "";
    const hasType = this.type.trim() !== "";

    if (!hasSpecies && !hasType) {
      return "Unknown";
    }

    if (!hasSpecies && hasType) {
      return this.type;
    }

    if (hasSpecies && !hasType) {
      return this.species;
    }

    // Both exist
    const speciesLower = this.species.toLowerCase();
    const typeLower = this.type.toLowerCase();

    if (typeLower.includes(speciesLower)) {
      return this.type;
    }

    return `${this.species} / ${this.type}`;
  }
}
