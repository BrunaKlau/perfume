const backendUrl = 'http://localhost:3001/perfumes';

const perfumeList = document.getElementById('perfume-list');
const perfumeForm = document.getElementById('perfume-form');

// Buscar e listar perfumes
async function fetchPerfumes() {
  const res = await fetch(backendUrl);
  const perfumes = await res.json();
  perfumeList.innerHTML = '';

  perfumes.forEach(perfume => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>
        <strong>${perfume.nome}</strong> | ${perfume.marca} | ${perfume.categoria} | ${perfume.notas ?? ''}
      </span>
      <button onclick="deletePerfume(${perfume.id})">Excluir</button>
    `;
    perfumeList.appendChild(li);
  });
}

// Adicionar novo perfume
perfumeForm.onsubmit = async (e) => {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  const marca = document.getElementById('marca').value;
  const categoria = document.getElementById('categoria').value;
  const notas = document.getElementById('notas').value.split(',').map(s => s.trim());

  await fetch(backendUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, marca, categoria, notas })
  });

  perfumeForm.reset();
  fetchPerfumes();
};

// Excluir perfume
window.deletePerfume = async (id) => {
  await fetch(`${backendUrl}/${id}`, { method: 'DELETE' });
  fetchPerfumes();
};

// Inicializar listagem ao carregar a página
fetchPerfumes();
