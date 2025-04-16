import Api from "./api/ApiService.js";
import CharacterCard from "./components/CharacterCard.js";
import Character from "./models/character.js";
import Page from "./models/page.js";
import Dom from "./components/DomStructure.js";

export default class PageState {
  private maxPage: number = 0;
  private pageIndex: number = 0;
  private searchQuery: string = "";
  private page!: Page;

  constructor() {
    console.log("PageState initialized");
    this.initialize();
    this.addEventListeners();
  }

  private addEventListeners() {
    Dom.prevButton?.addEventListener("click", (event) => {
      event.preventDefault();
      this.goToPage(this.pageIndex - 1);
    });

    Dom.nextButton?.addEventListener("click", (event) => {
      event.preventDefault();
      this.goToPage(this.pageIndex + 1);
    });

    Dom.searchBar?.addEventListener("submit", (event) => {
      event.preventDefault();

      const form = event.currentTarget as HTMLFormElement;
      const formData = new FormData(form);
      const inputValue = formData.get("query") as string;

      this.searchQuery = inputValue ?? "";
      console.log(this.searchQuery);
      this.pageIndex = 1;
      this.fetchDataForSearchQuery();
    });
  }

  private async initialize() {
    this.pageIndex = 1;
    this.fetchDataForPage();
  }

  async fetchDataForPage() {
    this.page = await Api.getPage(this.pageIndex);
    this.maxPage = this.page.info.pages;
    this.updateUI();
  }

  async fetchDataForSearchQuery() {
    this.page = await Api.searchCharacters(this.searchQuery);
    this.maxPage = this.page.info.pages;
    this.updateUI();
  }

  private updateUI() {
    Dom.cardContainer?.replaceChildren();
    const characterList: Character[] = this.page?.results;

    if (Dom.pagination) {
      Dom.pagination.innerHTML = `${this.pageIndex} / ${this.maxPage}`;
    }

    characterList.forEach((character) => {
      Dom.cardContainer?.appendChild(CharacterCard(character));
    });
  }

  public async goToPage(index: number) {
    if (index > this.maxPage) index = 1;
    if (index < 1) index = this.maxPage;
    this.pageIndex = index;
    this.page = await Api.getPage(index);
    this.updateUI();
  }
}
