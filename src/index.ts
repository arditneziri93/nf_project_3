import { getFirst20Characters } from "./api/api.js";
import { CharacterCard, Character } from "./components/CharacterCard.js";

// Define components

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
const maxPage = 1;
const page = 1;
const searchQuery = "";

// Initialize

async function initialize() {
  const characterList = await getFirst20Characters();
  const morty: Character = characterList[1];
  cardContainer?.append(CharacterCard(morty));
}

initialize();
