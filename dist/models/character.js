export default class Character {
    id;
    name;
    status;
    species;
    type;
    gender;
    origin;
    location;
    image;
    episode;
    url;
    created;
    constructor(data) {
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
    static fromJson(data) {
        return new Character(data);
    }
    getEpisodeCount() {
        return this.episode.length;
    }
    getShortDescription() {
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
