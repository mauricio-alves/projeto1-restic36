let result: Element | null = document.querySelector("#result");
let cards: Element | null = document.querySelector("#cards");
let response: [] | undefined = [];
let pagesList: Element | null = document.querySelector(".list ul");
let url: string = "https://rickandmortyapi.com/api/character";
let searchTerm: string = "";
let currentPage: number = 1;
let totalPages: number = 42;

interface Character {
  image: string;
  name: string;
  species: string;
  origin: { name: string };
  status: string;
}

// Função que renderiza os personagens da série Rick and Morty na tela.
async function getAllCharacters(url: string): Promise<void | string> {
  response = await fetch(url)
    .then((response) => response.json())
    .then((data) => data.results);

  // Caso não encontre nenhum personagem, exibe uma mensagem de erro.
  if (!response) {
    if (!result) return;
    return (result.innerHTML = `
      <div class="error-msg">
        <div class="error-img">
          <img src="/src/images/morty.png" alt="morty funny face" />
        </div>
        <div class="error-text">
          <p>Ops, não encontramos nenhum personagem, por favor tente novamente!</p>
        </div>
      </div>`);
  }

  response.map((character: Character) => {
    if (!cards) return;
    return (cards.innerHTML += `
      <div class="card">
        <div class="image">
          <img src="${character.image}" alt="${character.name}" />
        </div>
        <div class="text">
          <p class="name">Nome: ${character.name}</p>
          <p>Espécie: ${character.species}</p>
          <p>Origem: ${character.origin.name}</p>
          <p>Status: ${character.status}</p>
        </div>
      </div>`);
  });
}
getAllCharacters(url);

// Função que cria a paginação.
function createPagination(): void {
  if (!pagesList) return;
  for (let i = 1; i <= 42; i++) {
    pagesList.innerHTML += `<li class="page">${i}</li>`;
  }
  return;
}
createPagination();

// Evento de click para cada página.
let page: NodeListOf<Element> = document.querySelectorAll(".page");
page.forEach((page: Element, i: number) => {
  page.addEventListener("click", () => handlePagination(i + 1));
});

// Função que renderiza os personagens de acordo com a página clicada.
function handlePagination(i: number): void {
  if (!pagesList) return;
  if (!cards) return;
  cards.innerHTML = "";

  if (!result) return;
  result.innerHTML = "";
  getAllCharacters(url + `/?page=${i}`);
}

// Função que atualiza a paginação.
function updatePagination() {
  let startIndex: number = currentPage - 1;
  let endIndex: number = startIndex + 10;
  page.forEach((page: Element, i: number) => {
    if (i >= startIndex && i < endIndex) {
      page.classList.remove("hide");
    } else {
      page.classList.add("hide");
    }
  });
}
updatePagination();

// Evento de click para a página anterior.
function previousPage(): void {
  if (currentPage === 1) return;
  currentPage--;
  updatePagination();
}

// Evento de click para a próxima página.
function nextPage(): void {
  if (currentPage === totalPages - 9) return;
  currentPage++;
  updatePagination();
}

// Evento de input para capturar o nome que deve ser pesquisado.
function getInputValue(event: Event): string {
  const element = event.currentTarget as HTMLInputElement;
  searchTerm = element.value as string;
  return searchTerm;
}

// Evento de input para filtrar os personagens pelo nome.
function searchByName(event: Event | null): void {
  event?.preventDefault();
  let inputValue = document.querySelector("#search") as HTMLInputElement;
  if (!inputValue) return;
  inputValue.value = "";

  if (!cards) return;
  cards.innerHTML = "";

  if (!result) return;
  result.innerHTML = "";
  getAllCharacters(url + `/?name=${searchTerm}`);
}
