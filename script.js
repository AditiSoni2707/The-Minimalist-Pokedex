const searchInput = document.getElementById('search');
const card = document.getElementById('pokemon-card');
const errorMessage = document.getElementById('error-message');

searchInput.addEventListener('keypress', async (e) => {
  if(e.key === 'Enter') {
    const query = searchInput.value.toLowerCase().trim();
    if(!query) return;

    card.classList.add('hidden');
    errorMessage.classList.add('hidden');

    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
      if(!res.ok) throw new Error('Not found');

      const data = await res.json();
      renderPokemon(data);

    } catch (err) {
      errorMessage.textContent = 'Pokémon not found!';
      errorMessage.classList.remove('hidden');
    }
  }
});

function renderPokemon(pokemon) {
  const stats = pokemon.stats.map(s => `<div>${s.stat.name}: ${s.base_stat}</div>`).join('');
  card.innerHTML = `
    <h2>${pokemon.name.toUpperCase()} (#${pokemon.id})</h2>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    <div class="stats">${stats}</div>
  `;
  card.classList.remove('hidden');
}
