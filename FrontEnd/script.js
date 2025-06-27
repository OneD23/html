AOS.init();

// ✅ Cambia aquí entre local y producción
const API_BASE_URL = 'https://portafolio-backend-c4t8.onrender.com/api';
// const API_BASE_URL = 'https://tudominio.com/api';

// Cargar perfil profesional
fetch(`${API_BASE_URL}/profile`)
  .then(res => res.json())
  .then(profile => {
    document.querySelector('header h1').textContent = profile.name;
    document.querySelector('header p.lead').textContent = profile.title;
    document.querySelector('#perfil-texto').textContent = profile.description;
  })
  .catch(err => console.error('Error cargando perfil:', err));

// Cargar educación
fetch(`${API_BASE_URL}/education`)
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('educacion-container');
    container.innerHTML = '';

    data.forEach(edu => {
      const div = document.createElement('div');
      div.className = 'info-card';
      div.innerHTML = `<strong>${edu.title}</strong><br>${edu.institution} (${edu.years})`;
      container.appendChild(div);
    });
  })
  .catch(err => console.error('Error cargando educación:', err));

// Cargar certificados
fetch(`${API_BASE_URL}/certificates`)
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('certificados-container');
    const modales = document.getElementById('modales-certificados');
    container.innerHTML = '';
    modales.innerHTML = '';

    data.forEach(cert => {
      const modalId = `modal-${cert._id}`;

      const div = document.createElement('div');
      div.className = 'info-card';
      div.innerHTML = `
        <a href="#" data-bs-toggle="modal" data-bs-target="#${modalId}">
          ${cert.title}
        </a>
      `;
      container.appendChild(div);

      const modal = document.createElement('div');
      modal.innerHTML = `
        <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="${modalId}Label" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="${modalId}Label">${cert.title}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
              </div>
              <div class="modal-body text-center">
                <img src="${API_BASE_URL.replace('/api', '')}${cert.image}" alt="${cert.title}" class="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      `;
      modales.appendChild(modal);
    });
  })
  .catch(err => console.error('Error cargando certificados:', err));

// Cargar proyectos
fetch(`${API_BASE_URL}/project`)
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('project-container');
    container.innerHTML = '';

    data.forEach(proj => {
      const col = document.createElement('div');
      col.className = 'col';
      col.innerHTML = `
        <div class="card project-card h-100">
          <img src="${API_BASE_URL.replace('/api', '')}${proj.image}" class="card-img-top" alt="${proj.title}">
          <div class="card-body">
            <h5 class="card-title">${proj.title}</h5>
            <p class="card-text">${proj.description || ''}</p>
            <a href="${proj.url}" class="btn btn-outline-primary" target="_blank">Visitar</a>
          </div>
        </div>
      `;
      container.appendChild(col);
    });
  })
  .catch(err => console.error('Error cargando proyectos:', err));
