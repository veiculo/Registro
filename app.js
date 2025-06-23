const veiculos = [
  { modelo: 'FIAT CRONOS', placa: 'TDT-6C28', km: 0, condutor: '', status: 'Disponível' },
  { modelo: 'FIAT CRONOS', placa: 'TDT-6C31', km: 0, condutor: '', status: 'Disponível' },
  { modelo: 'FIAT STRADA', placa: 'TJC-0H20', km: 0, condutor: '', status: 'Disponível' },
  { modelo: 'FIAT ARGO', placa: 'SYX-0065', km: 0, condutor: '', status: 'Disponível' }
];

let condutores = ["Castelo", "Lucas", "Fernanda"];
const app = document.getElementById('app');

function preencherCondutores(selectEl) {
  selectEl.innerHTML = "";
  condutores.forEach(nome => {
    const opt = document.createElement("option");
    opt.value = nome;
    opt.textContent = nome;
    selectEl.appendChild(opt);
  });
}

veiculos.forEach((v, i) => {
  const div = document.createElement('div');
  div.className = 'vehicle-card';
  div.dataset.index = i;

  const now = new Date();
  const dataAtual = now.toISOString().split('T')[0];
  const horaAtual = now.toTimeString().substring(0, 5);

  div.innerHTML = `
    <h3>${v.modelo}</h3>
    <p><strong>Placa:</strong> ${v.placa}</p>
    <div class="status">${v.status}</div>
    <p class="km-atual">KM Atual: ${v.km}</p>
    <form class="formulario saida">
      <label>Condutor</label>
      <select name="condutor"></select>
      <label>Destino</label>
      <input name="destino" />
      <label>Motivo</label>
      <textarea name="motivo"></textarea>
      <label>Data</label>
      <input name="data" type="date" value="${dataAtual}" />
      <label>Hora</label>
      <input name="hora" type="time" value="${horaAtual}" />
      <button type="button">Confirmar Saída</button>
    </form>
  `;

  div.addEventListener('click', (e) => {
    if (!e.target.closest('form') && !e.target.closest('button')) {
      document.querySelectorAll('.formulario').forEach(f => f.style.display = 'none');
      const saidaForm = div.querySelector('.formulario.saida');
      preencherCondutores(saidaForm.querySelector('select[name="condutor"]'));
      saidaForm.querySelector('input[name="data"]').value = new Date().toISOString().split('T')[0];
      saidaForm.querySelector('input[name="hora"]').value = new Date().toTimeString().substring(0, 5);
      saidaForm.style.display = 'flex';
    }
  });

  app.appendChild(div);
});
