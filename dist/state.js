import Api from "./api/ApiService.js";
import CharacterCard from "./components/CharacterCard.js";
import Dom from "./components/DomStructure.js";
export default class PageState {
    maxPage = 0;
    pageIndex = 0;
    searchQuery = "";
    page;
    constructor() {
        console.log("PageState initialized");
        this.initialize();
        this.addEventListeners();
    }
    addEventListeners() {
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
            const form = event.currentTarget;
            const formData = new FormData(form);
            const inputValue = formData.get("query");
            this.searchQuery = inputValue ?? "";
            console.log(this.searchQuery);
            this.pageIndex = 1;
            this.fetchDataForSearchQuery();
        });
    }
    async initialize() {
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
    updateUI() {
        Dom.cardContainer?.replaceChildren();
        const characterList = this.page?.results;
        if (Dom.pagination) {
            Dom.pagination.innerHTML = `${this.pageIndex} / ${this.maxPage}`;
        }
        characterList.forEach((character) => {
            Dom.cardContainer?.appendChild(CharacterCard(character));
        });
    }
    async goToPage(index) {
        if (index > this.maxPage)
            index = 1;
        if (index < 1)
            index = this.maxPage;
        this.pageIndex = index;
        this.page = await Api.getPage(index);
        this.updateUI();
    }
}
