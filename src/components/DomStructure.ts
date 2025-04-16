export default class DomStructure {
  static cardContainer = document.querySelector('[data-js="card-container"]');
  static searchBarContainer = document.querySelector(
    '[data-js="search-bar-container"]'
  );
  static searchBar = document.querySelector('[data-js="search-bar"]');
  static navigation = document.querySelector('[data-js="navigation"]');
  static prevButton = document.querySelector('[data-js="button-prev"]');
  static nextButton = document.querySelector('[data-js="button-next"]');
  static pagination = document.querySelector('[data-js="pagination"]');
}
