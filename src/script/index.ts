let result: Element | null = document.querySelector("#result");
let response: [] = [];

interface Character {
  image: string;
  name: string;
  species: string;
  origin: { name: string };
  status: string;
}

// Função que busca todos os personagens da série Rick and Morty e exibe na tela.
async function getAllCharacters(): Promise<void> {
  response = await fetch("https://rickandmortyapi.com/api/character")
    .then((response) => response.json())
    .then((data) => data.results);

  response.map((character: Character) => {
    if (!result) return;
    return result.innerHTML += `
      <div class="card">
        <img src="${character.image}" alt="${character.name}" />
        <p>Nome: ${character.name}</p>
        <p>Espécie: ${character.species}</p>
        <p>Origem: ${character.origin.name}</p>
        <p>Status: ${character.status}</p>
        </div>`;
  });
}

getAllCharacters();
