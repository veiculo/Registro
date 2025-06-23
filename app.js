// Armazenamento e dados iniciais
function initStorage() {
  if (!localStorage.getItem('veiculos')) {
    localStorage.setItem('veiculos', JSON.stringify([
      { modelo: 'FIAT CRONOS', placa: 'TDT-6C28', km: 0, condutor: '', status: 'Disponível' },
      { modelo: 'FIAT CRONOS', placa: 'TDT-6C31', km: 0, condutor: '', status: 'Disponível' },
      { modelo: 'FIAT STRADA', placa: 'TJC-0H20', km: 0, condutor: '', status: 'Disponível' },
      { modelo: 'FIAT ARGO', placa: 'SYX-0065', km: 0, condutor: '', status: 'Disponível' }
    ]));
  }
  
  if (!localStorage.getItem('condutores')) {
    localStorage.setItem('condutores', JSON.stringify(["Castelo", "Lucas", "Fernanda"]));
  }
}

// Renderização dos veículos
function renderVeiculos() {
  const app = document.getElementById('app');
  app.innerHTML = '';
  const veiculos = JSON.parse(localStorage.getItem('veiculos'));

  veiculos.forEach((v, i) => {
    const card = document.createElement('div');
    card.className = `vehicle-card ${v.status.toLowerCase().replace(' ', '-')}`;
    card.innerHTML = `
      <h3>${v.modelo}</h3>
      <p><strong>Placa:</strong> ${v.placa}</p>
      <div class="status">${v.status}</div>
      ${v.condutor ? `<p><strong>Condutor:</strong> ${v.condutor}</p>` : ''}
      <form class="vehicle-form">
        <!-- Campos do formulário -->
      </form>
    `;
    app.appendChild(card);
  });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  initStorage();
  renderVeiculos();
  
  // Atualiza a cada hora para sincronização
  setInterval(() => {
    const now = new Date();
    document.querySelectorAll('.current-time').forEach(el => {
      el.textContent = now.toLocaleTimeString();
    });
  }, 1000);
});