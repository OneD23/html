const API_BASE_URL = 'https://portafolio-backend-c4t8.onrender.com/api'; // Cambiar en producción

// === PERFIL ===
const formPerfil = document.getElementById('formPerfil');

fetch(`${API_BASE_URL}/profile`)
  .then(res => res.json())
  .then(data => {
    for (const campo in data) {
      if (formPerfil[campo]) formPerfil[campo].value = data[campo];
    }
  });

formPerfil.addEventListener('submit', e => {
  e.preventDefault();
  const datos = Object.fromEntries(new FormData(formPerfil));
  fetch(`${API_BASE_URL}/profile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  })
    .then(res => res.json())
    .then(() => alert('Perfil actualizado correctamente'));
});

// === PROYECTOS ===
const formProyecto = document.getElementById('formProyecto');
const listaProyectos = document.getElementById('lista-proyectos');

const cargarProyectos = () => {
  listaProyectos.innerHTML = '';
  fetch(`${API_BASE_URL}/project`)
    .then(res => res.json())
    .then(data => {
      data.forEach(p => {
        const div = document.createElement('div');
        div.className = 'mb-2';
        div.innerHTML = `
          <strong>${p.title}</strong> -
          <a href="${p.url}" target="_blank">Ver</a>
          <button onclick="eliminarProyecto('${p._id}')" class="btn btn-sm btn-danger ms-2">Eliminar</button>
        `;
        listaProyectos.appendChild(div);
      });
    });
};
cargarProyectos();

formProyecto.addEventListener('submit', e => {
  e.preventDefault();
  const datos = new FormData(formProyecto);
  fetch(`${API_BASE_URL}/project`, {
    method: 'POST',
    body: datos
  })
    .then(res => res.json())
    .then(() => {
      formProyecto.reset();
      cargarProyectos();
    });
});

window.eliminarProyecto = id => {
  fetch(`${API_BASE_URL}/project/${id}`, { method: 'DELETE' })
    .then(() => cargarProyectos());
};

// === EDUCACIÓN ===
const formEducacion = document.getElementById('formEducacion');
const listaEducacion = document.getElementById('lista-educacion');

const cargarEducacion = () => {
  listaEducacion.innerHTML = '';
  fetch(`${API_BASE_URL}/education`)
    .then(res => res.json())
    .then(data => {
      data.forEach(e => {
        const div = document.createElement('div');
        div.className = 'mb-2';
        div.innerHTML = `
          <strong>${e.title}</strong> - ${e.institution} (${e.years})
          <button onclick="eliminarEducacion('${e._id}')" class="btn btn-sm btn-danger ms-2">Eliminar</button>
        `;
        listaEducacion.appendChild(div);
      });
    });
};
cargarEducacion();

formEducacion.addEventListener('submit', e => {
  e.preventDefault();
  const datos = Object.fromEntries(new FormData(formEducacion));
  fetch(`${API_BASE_URL}/education`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  })
    .then(res => res.json())
    .then(() => {
      formEducacion.reset();
      cargarEducacion();
    });
});

window.eliminarEducacion = id => {
  fetch(`${API_BASE_URL}/education/${id}`, { method: 'DELETE' })
    .then(() => cargarEducacion());
};

// === CERTIFICADOS ===
const formCertificado = document.getElementById('formCertificado');
const listaCertificados = document.getElementById('lista-certificados');

const cargarCertificados = () => {
  listaCertificados.innerHTML = '';
  const contenedorModales = document.getElementById('modales-certificados');
  contenedorModales.innerHTML = '';

  fetch(`${API_BASE_URL}/certificates`)
    .then(res => res.json())
    .then(data => {
      data.forEach(cert => {
        const modalId = `modal-cert-${cert._id}`;

        const card = document.createElement('div');
        card.className = 'mb-3';
        card.innerHTML = `
          <button class="btn btn-outline-primary w-100 text-start" data-bs-toggle="modal" data-bs-target="#${modalId}">
            ${cert.title}
          </button>
        `;
        listaCertificados.appendChild(card);

        const modalWrapper = document.createElement('div');
        modalWrapper.innerHTML = `
          <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="${modalId}Label" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="${modalId}Label">${cert.title}</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body text-center">
                  <img src="${API_BASE_URL.replace('/api', '')}${cert.image}" class="img-fluid rounded" alt="${cert.title}" />
                </div>
                <div class="modal-footer">
                  <button class="btn btn-danger" onclick="eliminarCertificado('${cert._id}')">Eliminar</button>
                  <button class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
              </div>
            </div>
          </div>
        `;
        contenedorModales.appendChild(modalWrapper);
      });
    });
};

cargarCertificados();

formCertificado.addEventListener('submit', e => {
  e.preventDefault();
  const datos = new FormData(formCertificado);
  fetch(`${API_BASE_URL}/certificates`, {
    method: 'POST',
    body: datos
  })
    .then(res => res.json())
    .then(() => {
      formCertificado.reset();
      cargarCertificados();
    });
});

window.eliminarCertificado = id => {
  fetch(`${API_BASE_URL}/certificates/${id}`, { method: 'DELETE' })
    .then(() => cargarCertificados());
};
