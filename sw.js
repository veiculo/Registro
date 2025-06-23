// Adiciona armazenamento local
if (!localStorage.getItem('veiculos')) {
  localStorage.setItem('veiculos', JSON.stringify([
    { modelo: 'FIAT CRONOS', placa: 'TDT-6C28', km: 0, condutor: '', status: 'Disponível' },
    { modelo: 'FIAT CRONOS', placa: 'TDT-6C31', km: 0, condutor: '', status: 'Disponível' },
    { modelo: 'FIAT STRADA', placa: 'TJC-0H20', km: 0, condutor: '', status: 'Disponível' },
    { modelo: 'FIAT ARGO', placa: 'SYX-0065', km: 0, condutor: '', status: 'Disponível' }
  ]));
}

let veiculos = JSON.parse(localStorage.getItem('veiculos'));
let condutores = ["Castelo", "Lucas", "Fernanda"];

function renderVeiculos() {
  const app = document.getElementById('app');
  app.innerHTML = "";

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
      <div class="status ${v.status.toLowerCase()}">${v.status}</div>
      <p class="km-atual">KM Atual: ${v.km}</p>
      <form class="formulario saida">
        <label>Condutor</label>
        <select name="condutor" required></select>
        <label>Destino</label>
        <input name="destino" required />
        <label>Motivo</label>
        <textarea name="motivo" required></textarea>
        <label>Data</label>
        <input name="data" type="date" value="${dataAtual}" required />
        <label>Hora</label>
        <input name="hora" type="time" value="${horaAtual}" required />
        <button type="submit">Confirmar Saída</button>
      </form>
    `;

    const form = div.querySelector('form');
    preencherCondutores(form.querySelector('select'));

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      veiculos[i].condutor = formData.get('condutor');
      veiculos[i].status = 'Em Uso';
      localStorage.setItem('veiculos', JSON.stringify(veiculos));
      renderVeiculos(); // Atualiza a lista
    });

    div.addEventListener('click', (e) => {
      if (!e.target.closest('form')) {
        document.querySelectorAll('.formulario').forEach(f => f.style.display = 'none');
        form.style.display = 'flex';
      }
    });

    app.appendChild(div);
  });
}

function preencherCondutores(selectEl) {
  selectEl.innerHTML = "<option value=''>Selecione...</option>";
  condutores.forEach(nome => {
    const opt = document.createElement("option");
    opt.value = nome;
    opt.textContent = nome;
    selectEl.appendChild(opt);
  });
}

// Inicializa o app
document.addEventListener('DOMContentLoaded', renderVeiculos);
