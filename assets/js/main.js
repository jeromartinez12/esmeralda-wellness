/* =============================================================================
   Esmeralda Wellness
   ---------------------------------------------------------------------------
   ►► CONFIGURAR ANTES DE PUBLICAR ◄◄
   Reemplazar por los números reales de cada sede, en formato internacional
   sin "+", sin espacios y sin guiones.  Ej.: 5491123456789
============================================================================= */
const SEDES = {
  madero: { nombre: 'Puerto Madero',       whatsapp: '5491100000000' },
  leloir: { nombre: 'Thays Parque Leloir', whatsapp: '5491100000000' }
};
/* ========================================================================== */

const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const calma = !matchMedia('(prefers-reduced-motion: reduce)').matches;


/* ----------------------------------------------------------- disciplinas -- */

const FACETAS = [
  {
    id: 'reformer',
    nombre: 'Pilates Reformer',
    dur: '50 MIN',
    img: 'assets/img/d-reformer.webp',
    alt: 'Práctica de pilates reformer frente a los ventanales del estudio',
    copy: 'Para cuando buscás trabajar en profundidad, sumar resistencia y sentir el cuerpo más fuerte.',
    sede: 'Puerto Madero y Thays Parque Leloir'
  },
  {
    id: 'mat',
    nombre: 'Pilates Mat',
    dur: '50 MIN',
    img: 'assets/img/d-mat.webp',
    alt: 'Sala preparada para una clase de pilates mat',
    copy: 'Para días en los que querés conectar con tu cuerpo, activar el centro y moverte con control.',
    sede: 'Puerto Madero'
  },
  {
    id: 'vinyasa',
    nombre: 'Hatha Vinyasa',
    dur: '60 MIN',
    img: 'assets/img/d-vinyasa.webp',
    alt: 'Postura del guerrero en la sala de yoga',
    copy: 'Fluidez, energía y dinamismo. Para elevar el ritmo y liberar tensión.',
    sede: 'Puerto Madero'
  },
  {
    id: 'restaurativo',
    nombre: 'Yoga Restaurativo',
    dur: '60 MIN',
    img: 'assets/img/d-restaurativo.webp',
    alt: 'Postura del niño durante una clase de yoga restaurativo',
    copy: 'Calma, pausa y profundidad. Para soltar el cuerpo y volver al equilibrio.',
    sede: 'Puerto Madero'
  },
  {
    id: 'barre',
    nombre: 'Puro Barre',
    dur: '60 MIN',
    img: 'assets/img/d-barre.webp',
    alt: 'Flor y Ara, instructoras de Puro Barre, en el estudio',
    copy: 'Bajo impacto y consciente: lo mejor del pilates, la técnica de ballet y el trabajo funcional.',
    sede: 'Puerto Madero · Sala Jade'
  }
];

function montarFacetas () {
  const lista  = $('#facetList');
  const figura = $('#facetFig');
  const copy   = $('#facetCopy');
  if (!lista || !figura || !copy) return;

  FACETAS.forEach((f, i) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <button class="facet-btn" role="tab" id="tab-${f.id}"
              aria-selected="${i === 0}" aria-controls="facetFig"
              tabindex="${i === 0 ? 0 : -1}">
        <span class="facet-btn__edge"></span>
        <span class="facet-btn__name">${f.nombre}</span>
        <span class="facet-btn__meta">${f.dur}</span>
      </button>`;
    lista.appendChild(li);

    const img = document.createElement('img');
    img.src = f.img;
    img.alt = f.alt;
    img.loading = i === 0 ? 'eager' : 'lazy';
    img.dataset.for = f.id;
    if (i === 0) img.classList.add('is-live');
    figura.appendChild(img);
  });

  const botones = $$('.facet-btn', lista);
  const pintar = (f) => {
    $('h3', copy).textContent = f.nombre;
    $('p', copy).textContent  = f.copy;
    $('.facets__where', copy).textContent = f.sede;
  };
  pintar(FACETAS[0]);

  const elegir = (idx, foco = true) => {
    const f = FACETAS[idx];
    botones.forEach((b, i) => {
      b.setAttribute('aria-selected', i === idx);
      b.tabIndex = i === idx ? 0 : -1;
    });
    $$('img', figura).forEach(img =>
      img.classList.toggle('is-live', img.dataset.for === f.id));

    copy.classList.add('is-swapping');
    setTimeout(() => { pintar(f); copy.classList.remove('is-swapping'); }, calma ? 320 : 0);

    if (foco) botones[idx].focus();
  };

  botones.forEach((b, i) => {
    b.addEventListener('click', () => elegir(i, false));
    b.addEventListener('keydown', (e) => {
      const map = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
      if (map[e.key]) {
        e.preventDefault();
        elegir((i + map[e.key] + botones.length) % botones.length);
      }
      if (e.key === 'Home') { e.preventDefault(); elegir(0); }
      if (e.key === 'End')  { e.preventDefault(); elegir(botones.length - 1); }
    });
  });
}


/* -------------------------------------------------------------- horarios -- */

const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const G = (n, l, pre) => ({ n, l, pre: !!pre });

const HORARIOS = {
  madero: {
    etiqueta: 'Puerto Madero',
    tablas: [{
      titulo: 'Pilates en la sala principal',
      filas: [
        ['8:00',  [G('Dani','Ground'),  G('Ele','Ground'),  G('Ele','Progress'),  G('Dani','Ground'),   G('Flor','Ground'),   null]],
        ['9:00',  [G('Dani','Ground'),  G('Ele','Ground'),  G('Ele','Progress'),  G('Dani','Ground'),   G('Flor','Progress'), G('Flor','Progress')]],
        ['10:00', [G('Dani','Progress'),G('Ele','Ground'),  G('Ele','Progress'),  G('Dani','Progress'), G('Flor','Progress'), G('Flor','Progress')]],
        ['11:00', [G('Dani','Progress'),G('Ele','Ground'),  G('Ele','Ground'),    G('Dani','Ground'),   G('Flor','Progress'), G('Flor','Progress')]],
        ['12:00', [G('Dani','Prenatal',1), null, null, null, null, G('Flor','Progress')]],
        ['16:00', [null, null, null, G('Dani','Prenatal',1), null, null]],
        ['17:00', [G('Sol','Progress'), G('Ele','Progress'), G('Sol','Progress'), G('Ele','Progress'), G('Dani','Progress'), null]],
        ['18:00', [G('Sol','Ground'),   G('Ele','Ground'),   G('Sol','Ground'),   G('Ele','Ground'),   G('Dani','Ground'),   null]],
        ['19:00', [G('Sol','Progress'), G('Ele','Progress'), G('Sol','Progress'), G('Ele','Progress'), G('Dani','Progress'), null]]
      ]
    }, {
      titulo: 'Sala Jade: yoga y barre',
      filas: [
        ['10:00', [null, null, null, null, null, G('Puro Barre','Flor y Ara')]],
        ['17:00', [null, G('Ashtanga Vinyasa Yoga',''), null, null, null, null]],
        ['19:30', [G('Puro Barre','Flor y Ara'), null, G('Puro Barre','Flor y Ara'), null, null, null]]
      ]
    }]
  },

  leloir: {
    etiqueta: 'Thays Parque Leloir',
    tablas: [{
      titulo: 'Pilates',
      filas: [
        ['8:00',  [G('Belu','Avanzado'), G('Dani','Stott'),      G('Romi','Inicial'), G('Belu','Avanzado'),   G('Dani','Stott'),      G('Romi','Inicial')]],
        ['9:00',  [G('Belu','Avanzado'), G('Dani','Stott'),      G('Romi','Inicial'), G('Belu','Avanzado'),   G('Dani','Stott'),      G('Romi','Inicial')]],
        ['10:00', [G('Belu','Avanzado'), G('Dani','Prenatal',1), G('Romi','Inicial'), G('Belu','Avanzado'),   G('Dani','Stott'),      G('Romi','Inicial')]],
        ['11:00', [G('Belu','Avanzado'), G('Dani','Stott'),      G('Romi','Inicial'), G('Belu','Avanzado'),   G('Dani','Prenatal',1), G('Romi','Inicial')]],
        ['12:00', [G('Belu','Avanzado'), G('Dani','Prenatal',1), G('Romi','Inicial'), G('Belu','Avanzado'),   G('Dani','Stott'),      G('Romi','Inicial')]],
        ['16:00', [G('Dani','Stott'),    G('Romi','Inicial'),    G('Belu','Avanzado'),G('Dani','Prenatal',1), G('Romi','Inicial'),    null]],
        ['17:00', [G('Dani','Stott'),    G('Romi','Inicial'),    G('Belu','Avanzado'),G('Dani','Stott'),      G('Romi','Inicial'),    null]],
        ['18:00', [G('Dani','Stott'),    G('Romi','Inicial'),    G('Belu','Avanzado'),G('Dani','Stott'),      G('Romi','Inicial'),    null]],
        ['19:00', [G('Dani','Stott'),    G('Romi','Inicial'),    G('Belu','Avanzado'),G('Dani','Stott'),      G('Romi','Inicial'),    null]]
      ]
    }]
  }
};

function montarHorarios () {
  const tabs = $('#schedTabs');
  const paneles = $('#schedPanels');
  if (!tabs || !paneles) return;

  Object.entries(HORARIOS).forEach(([key, sede], i) => {
    const b = document.createElement('button');
    b.className = 'sched__tab';
    b.type = 'button';
    b.setAttribute('role', 'tab');
    b.id = `stab-${key}`;
    b.setAttribute('aria-controls', `spanel-${key}`);
    b.setAttribute('aria-selected', i === 0);
    b.tabIndex = i === 0 ? 0 : -1;
    b.textContent = sede.etiqueta;
    tabs.appendChild(b);

    const p = document.createElement('div');
    p.className = 'sched__panel';
    p.id = `spanel-${key}`;
    p.setAttribute('role', 'tabpanel');
    p.setAttribute('aria-labelledby', `stab-${key}`);
    p.tabIndex = 0;
    if (i !== 0) p.hidden = true;

    p.innerHTML = sede.tablas.map(t => `
      <div class="sched__scroll">
        <table class="grid">
          <caption>${t.titulo}</caption>
          <thead>
            <tr><th scope="col">Hora</th>${DIAS.map(d => `<th scope="col">${d}</th>`).join('')}</tr>
          </thead>
          <tbody>
            ${t.filas.map(([hora, celdas]) => `
              <tr>
                <th scope="row">${hora}</th>
                ${celdas.map(c => c
                  ? `<td><span class="slot${c.pre ? ' is-pre' : ''}"><b>${c.n}</b>${c.l ? `<i>${c.l}</i>` : ''}</span></td>`
                  : `<td class="off">—</td>`).join('')}
              </tr>`).join('')}
          </tbody>
        </table>
      </div>`).join('');

    paneles.appendChild(p);
  });

  const botones = $$('.sched__tab', tabs);
  const activar = (idx, foco = true) => {
    botones.forEach((b, i) => {
      const on = i === idx;
      b.setAttribute('aria-selected', on);
      b.tabIndex = on ? 0 : -1;
      $(`#${b.getAttribute('aria-controls')}`).hidden = !on;
    });
    if (foco) botones[idx].focus();
  };

  botones.forEach((b, i) => {
    b.addEventListener('click', () => activar(i, false));
    b.addEventListener('keydown', (e) => {
      const map = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
      if (map[e.key]) {
        e.preventDefault();
        activar((i + map[e.key] + botones.length) % botones.length);
      }
    });
  });
}


/* --------------------------------------------- apariciones al hacer scroll */
/* Lentas y escalonadas: la página respira en vez de aparecer de golpe.       */

function montarApariciones () {
  const objetivos = $$('[data-reveal], [data-reveal-img], [data-reveal-group]');
  if (!objetivos.length) return;

  if (!('IntersectionObserver' in window) || !calma) {
    objetivos.forEach(el => el.classList.add('is-in'));
    return;
  }

  // escalona los hijos de cada grupo
  $$('[data-reveal-group]').forEach(g => {
    [...g.children].forEach((hijo, i) => {
      hijo.style.transitionDelay = `${i * 110}ms`;
    });
  });

  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      obs.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

  objetivos.forEach(el => obs.observe(el));
}


/* ------------------------------------------------------------- WhatsApp --- */

function enlazarWhatsApp () {
  $$('[data-wa]').forEach(el => {
    const sede = SEDES[el.dataset.wa];
    if (!sede) return;
    const msg = el.dataset.waMsg || '¡Hola! Quiero reservar una clase en Esmeralda.';
    el.href = `https://wa.me/${sede.whatsapp}?text=${encodeURIComponent(msg)}`;
    el.target = '_blank';
    el.rel = 'noopener';
  });
}


/* ------------------------------------------------------------ navegación -- */

function montarNav () {
  const nav = $('#nav');
  const burger = $('#burger');
  const drawer = $('#drawer');
  if (!nav || !burger || !drawer) return;

  const onScroll = () => nav.classList.toggle('is-stuck', window.scrollY > 24);
  onScroll();
  addEventListener('scroll', onScroll, { passive: true });

  const cerrar = () => {
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Abrir menú');
    drawer.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  burger.addEventListener('click', () => {
    if (burger.getAttribute('aria-expanded') === 'true') return cerrar();
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Cerrar menú');
    drawer.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  });

  $$('a', drawer).forEach(a => a.addEventListener('click', cerrar));
  addEventListener('keydown', e => { if (e.key === 'Escape') cerrar(); });
}


/* --------------------------------------------------------------- ticker --- */

function montarTicker () {
  const track = $('#ticker');
  if (track) track.innerHTML += track.innerHTML;
}


/* ------------------------------------------------------------------ init -- */

document.addEventListener('DOMContentLoaded', () => {
  window.__esmeraldaOK = true;
  montarNav();
  montarTicker();
  montarFacetas();
  montarHorarios();
  enlazarWhatsApp();
  montarApariciones();
  const y = $('#year');
  if (y) y.textContent = new Date().getFullYear();
});
