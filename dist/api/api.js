const BASE_URL = "https://rickandmortyapi.com/api";
async function fetchFromApi(endpoint) {
    const res = await fetch(`${BASE_URL}${endpoint}`);
    return await res.json();
}
async function getFirst20Characters() {
    const data = await fetchFromApi("/character");
    console.log(data.results);
}
export { getFirst20Characters };
