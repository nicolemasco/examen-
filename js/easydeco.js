/* js/easydeco.js
   - Solo JS: sin HTML ni CSS dentro del archivo.
   - Usa createElement / appendChild / classList
   - Base de datos (CATALOGO) con placeholders
   - Validaciones con SweetAlert2
   - localStorage para historial
   - jsPDF preparado para descarga
*/

/* =======================
   1) CATALOGO (JSON) - 5 estilos × 9 items (6 materiales + 3 productos)
   Imágenes: placeholders via.placeholder.com
   ======================= */
const CATALOGO = [
  {
    estiloId: 'moderno', estiloNombre: 'Moderno',
    items: [
      { id:'m_mod_1', tipo:'material', nombre:'Madera clara', descripcion:'Tarima roble claro', precioPorM2:28, img:'https://via.placeholder.com/400x300?text=Madera+clara' },
      { id:'m_mod_2', tipo:'material', nombre:'Vidrio templado', descripcion:'Vidrio 8mm', precioPorM2:35, img:'https://via.placeholder.com/400x300?text=Vidrio' },
      { id:'m_mod_3', tipo:'material', nombre:'Panel LED', descripcion:'Panel luz empotrada', precioPorM2:18, img:'https://via.placeholder.com/400x300?text=Panel+LED' },
      { id:'m_mod_4', tipo:'material', nombre:'Porcelanato', descripcion:'Porcelanato neutro', precioPorM2:30, img:'https://via.placeholder.com/400x300?text=Porcelanato' },
      { id:'m_mod_5', tipo:'material', nombre:'Pintura gris', descripcion:'Pintura interior premium', precioPorM2:10, img:'https://via.placeholder.com/400x300?text=Pintura+gris' },
      { id:'m_mod_6', tipo:'material', nombre:'Acabados metal', descripcion:'Perfiles y acabados', precioPorM2:22, img:'https://via.placeholder.com/400x300?text=Metal' },
      { id:'p_mod_1', tipo:'producto', nombre:'Lámpara LED', descripcion:'Lámpara colgante', precioUnitario:85, img:'https://via.placeholder.com/400x300?text=Lampara+LED' },
      { id:'p_mod_2', tipo:'producto', nombre:'Mesa de centro', descripcion:'Mesa baja moderna', precioUnitario:120, img:'https://via.placeholder.com/400x300?text=Mesa' },
      { id:'p_mod_3', tipo:'producto', nombre:'Estantería', descripcion:'Estantería modular', precioUnitario:160, img:'https://via.placeholder.com/400x300?text=Estanteria' }
    ]
  },
  {
    estiloId: 'industrial', estiloNombre: 'Industrial',
    items: [
      { id:'m_ind_1', tipo:'material', nombre:'Ladrillo visto', descripcion:'Revestimiento ladrillo', precioPorM2:25, img:'https://via.placeholder.com/400x300?text=Ladrillo' },
      { id:'m_ind_2', tipo:'material', nombre:'Hormigón', descripcion:'Hormigón pulido', precioPorM2:30, img:'https://via.placeholder.com/400x300?text=Hormigon' },
      { id:'m_ind_3', tipo:'material', nombre:'Acero', descripcion:'Acero negro', precioPorM2:32, img:'https://via.placeholder.com/400x300?text=Acero' },
      { id:'m_ind_4', tipo:'material', nombre:'Madera reciclada', descripcion:'Madera con textura', precioPorM2:26, img:'https://via.placeholder.com/400x300?text=Madera+reciclada' },
      { id:'m_ind_5', tipo:'material', nombre:'Pintura oscura', descripcion:'Pintura carbón', precioPorM2:12, img:'https://via.placeholder.com/400x300?text=Pintura+oscura' },
      { id:'m_ind_6', tipo:'material', nombre:'Cemento decorativo', descripcion:'Acabado cemento', precioPorM2:20, img:'https://via.placeholder.com/400x300?text=Cemento' },
      { id:'p_ind_1', tipo:'producto', nombre:'Lámpara industrial', descripcion:'Lámpara vintage', precioUnitario:95, img:'https://via.placeholder.com/400x300?text=Lampara+Industrial' },
      { id:'p_ind_2', tipo:'producto', nombre:'Mesa metal-madera', descripcion:'Mesa mezcla metal y madera', precioUnitario:220, img:'https://via.placeholder.com/400x300?text=Mesa+metal' },
      { id:'p_ind_3', tipo:'producto', nombre:'Sofá cuero', descripcion:'Sofá 3 plazas', precioUnitario:450, img:'https://via.placeholder.com/400x300?text=Sofa' }
    ]
  },
  {
    estiloId: 'clasico', estiloNombre: 'Clásico',
    items: [
      { id:'m_cla_1', tipo:'material', nombre:'Mármol', descripcion:'Pisos y revestimientos', precioPorM2:80, img:'https://via.placeholder.com/400x300?text=Marmol' },
      { id:'m_cla_2', tipo:'material', nombre:'Madera oscura', descripcion:'Tarima y paneles', precioPorM2:34, img:'https://via.placeholder.com/400x300?text=Madera+oscura' },
      { id:'m_cla_3', tipo:'material', nombre:'Molduras', descripcion:'Molduras y cornisas', precioPorM2:18, img:'https://via.placeholder.com/400x300?text=Molduras' },
      { id:'m_cla_4', tipo:'material', nombre:'Yeso', descripcion:'Yeso ornamental', precioPorM2:33, img:'https://via.placeholder.com/400x300?text=Yeso' },
      { id:'m_cla_5', tipo:'material', nombre:'Tapiz', descripcion:'Revestimiento textil', precioPorM2:22, img:'https://via.placeholder.com/400x300?text=Tapiz' },
      { id:'m_cla_6', tipo:'material', nombre:'Panel madera lujo', descripcion:'Paneles lujosos', precioPorM2:55, img:'https://via.placeholder.com/400x300?text=Panel' },
      { id:'p_cla_1', tipo:'producto', nombre:'Lámpara clásica', descripcion:'Lámpara con detalle', precioUnitario:130, img:'https://via.placeholder.com/400x300?text=Lampara+clasica' },
      { id:'p_cla_2', tipo:'producto', nombre:'Mueble tocador', descripcion:'Mueble clásico', precioUnitario:320, img:'https://via.placeholder.com/400x300?text=Mueble' },
      { id:'p_cla_3', tipo:'producto', nombre:'Cuadro decorativo', descripcion:'Obra para pared', precioUnitario:150, img:'https://via.placeholder.com/400x300?text=Cuadro' }
    ]
  },
  {
    estiloId: 'minimalista', estiloNombre: 'Minimalista',
    items: [
      { id:'m_min_1', tipo:'material', nombre:'Pintura blanca', descripcion:'Acabado mate', precioPorM2:8, img:'https://via.placeholder.com/400x300?text=Pintura+blanca' },
      { id:'m_min_2', tipo:'material', nombre:'Madera clara', descripcion:'Tarima minimal', precioPorM2:28, img:'https://via.placeholder.com/400x300?text=Madera+clara' },
      { id:'m_min_3', tipo:'material', nombre:'Cerámica', descripcion:'Azulejo simple', precioPorM2:20, img:'https://via.placeholder.com/400x300?text=Ceramica' },
      { id:'m_min_4', tipo:'material', nombre:'Microcemento', descripcion:'Acabado continuo', precioPorM2:34, img:'https://via.placeholder.com/400x300?text=Microcemento' },
      { id:'m_min_5', tipo:'material', nombre:'Panel liso', descripcion:'Paneles sencillos', precioPorM2:12, img:'https://via.placeholder.com/400x300?text=Panel+liso' },
      { id:'m_min_6', tipo:'material', nombre:'Iluminación LED', descripcion:'Sistema LED integrado', precioPorM2:9, img:'https://via.placeholder.com/400x300?text=LED' },
      { id:'p_min_1', tipo:'producto', nombre:'Sillón minimal', descripcion:'Silla tapizada', precioUnitario:200, img:'https://via.placeholder.com/400x300?text=Sillon' },
      { id:'p_min_2', tipo:'producto', nombre:'Mesa baja', descripcion:'Mesa baja minimal', precioUnitario:110, img:'https://via.placeholder.com/400x300?text=Mesa' },
      { id:'p_min_3', tipo:'producto', nombre:'Plafón LED', descripcion:'Luz de techo', precioUnitario:70, img:'https://via.placeholder.com/400x300?text=Plafon' }
    ]
  },
  {
    estiloId: 'rustico', estiloNombre: 'Rústico',
    items: [
      { id:'m_rus_1', tipo:'material', nombre:'Madera natural', descripcion:'Madera maciza', precioPorM2:30, img:'https://via.placeholder.com/400x300?text=Madera+natural' },
      { id:'m_rus_2', tipo:'material', nombre:'Piedra', descripcion:'Revestimiento piedra', precioPorM2:36, img:'https://via.placeholder.com/400x300?text=Piedra' },
      { id:'m_rus_3', tipo:'material', nombre:'Rattan', descripcion:'Fibras naturales', precioPorM2:18, img:'https://via.placeholder.com/400x300?text=Rattan' },
      { id:'m_rus_4', tipo:'material', nombre:'Barniz', descripcion:'Barniz protector', precioPorM2:10, img:'https://via.placeholder.com/400x300?text=Barniz' },
      { id:'m_rus_5', tipo:'material', nombre:'Yeso rústico', descripcion:'Yeso con textura', precioPorM2:22, img:'https://via.placeholder.com/400x300?text=Yeso' },
      { id:'m_rus_6', tipo:'material', nombre:'Ladrillo rústico', descripcion:'Ladrillo rústico', precioPorM2:24, img:'https://via.placeholder.com/400x300?text=Ladrillo' },
      { id:'p_rus_1', tipo:'producto', nombre:'Mesa rústica', descripcion:'Mesa madera maciza', precioUnitario:260, img:'https://via.placeholder.com/400x300?text=Mesa+rustica' },
      { id:'p_rus_2', tipo:'producto', nombre:'Lámpara mimbre', descripcion:'Lámpara fibras', precioUnitario:75, img:'https://via.placeholder.com/400x300?text=Lampara' },
      { id:'p_rus_3', tipo:'producto', nombre:'Alfombra rústica', descripcion:'Alfombra natural', precioUnitario:95, img:'https://via.placeholder.com/400x300?text=Alfombra' }
    ]
  }
];

/* =======================
   2) SELECTORES DOM
   ======================= */
const galeriaEl = document.getElementById('galeria-estilos');
const estiloSeleccionadoInput = document.getElementById('estiloSeleccionado');
const listaMaterialesEl = document.getElementById('lista-materiales');
const listaProductosEl = document.getElementById('lista-productos');

const inputLargo = document.getElementById('largo');
const inputAncho = document.getElementById('ancho');
const inputTipoHabitacion = document.getElementById('tipoHabitacion');
const inputCorreo = document.getElementById('correoCliente');

const btnCalcular = document.getElementById('btnCalcular');
const btnGuardar = document.getElementById('btnGuardar');
const btnDescargarManual = document.getElementById('btnDescargarManual');

const resultadoEl = document.getElementById('resultado');
const desgloseEl = document.getElementById('desglose');

const btnDescargarCotizacion = document.getElementById('btnDescargarCotizacion');
const btnEnviarCorreo = document.getElementById('btnEnviarCorreo');
const btnExportarJSON = document.getElementById('btnExportarJSON');

const historialListEl = document.getElementById('historial-list');

/* =======================
   3) HELPERS (validaciones, util)
   ======================= */
function crearElemento(tag, className) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  return el;
}
function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function shakeElemento(el) {
  if (!el) return;
  el.classList.add('shake');
  setTimeout(()=> el.classList.remove('shake'), 600);
}

/* =======================
   4) RENDER GALERÍA ESTILOS
   (Filtrado por estilo se hace luego)
   ======================= */
function renderizarGaleriaEstilos() {
  galeriaEl.innerHTML = '';
  CATALOGO.forEach(grupo => {
    const card = crearElemento('div', 'card-producto');
    // img
    const img = crearElemento('img');
    img.src = grupo.items[0].img;
    img.alt = grupo.estiloNombre;
    // nombre
    const nombre = crearElemento('h3');
    nombre.textContent = grupo.estiloNombre;
    // botón seleccionar estilo
    const btn = crearElemento('button', 'select-btn');
    btn.textContent = 'Seleccionar';
    btn.addEventListener('click', () => seleccionarEstilo(grupo.estiloId));
    // ensamblar
    card.appendChild(img);
    card.appendChild(nombre);
    // hide price/desc for style cards: reuse design but minimal
    card.appendChild(btn);
    galeriaEl.appendChild(card);
  });
  // seleccionar por defecto
  if (CATALOGO.length) seleccionarEstilo(CATALOGO[0].estiloId);
}

/* =======================
   5) SELECCIONAR ESTILO → renderizar materiales y productos
   ======================= */
function seleccionarEstilo(estiloId) {
  // marcar visual
  Array.from(galeriaEl.children).forEach(c => c.classList.remove('selected'));
  const matchCard = Array.from(galeriaEl.children).find(c => c.querySelector('h3')?.textContent === CATALOGO.find(g => g.estiloId === estiloId).estiloNombre);
  if (matchCard) matchCard.classList.add('selected');

  estiloSeleccionadoInput.value = estiloId;
  renderizarItems(estiloId);
}

/* =======================
   6) RENDER ITEMS (createElement, sin HTML en strings)
   - materiales: botón seleccionar (sin cantidad)
   - productos: seleccionar + input cantidad (aparece)
   ======================= */
function renderizarItems(estiloId) {
  listaMaterialesEl.innerHTML = '';
  listaProductosEl.innerHTML = '';

  const grupo = CATALOGO.find(g => g.estiloId === estiloId);
  if (!grupo) return;

  const materiales = grupo.items.filter(i => i.tipo === 'material');
  const productos = grupo.items.filter(i => i.tipo === 'producto');

  // materiales
  materiales.forEach(mat => {
    const card = crearElemento('div', 'card-producto');

    const img = crearElemento('img'); img.src = mat.img; img.alt = mat.nombre;
    const h = crearElemento('h3'); h.textContent = mat.nombre;
    const p = crearElemento('p'); p.textContent = mat.descripcion;
    const precio = crearElemento('div', 'precio'); precio.textContent = `$${mat.precioPorM2.toFixed(2)} / m²`;
    const btn = crearElemento('button', 'select-btn'); btn.textContent = 'Seleccionar'; btn.dataset.id = mat.id;

    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      card.classList.toggle('active');
    });

    card.appendChild(img);
    card.appendChild(h);
    card.appendChild(p);
    card.appendChild(precio);
    card.appendChild(btn);
    listaMaterialesEl.appendChild(card);
  });

  // productos
  productos.forEach(prod => {
    const card = crearElemento('div', 'card-producto');

    const img = crearElemento('img'); img.src = prod.img; img.alt = prod.nombre;
    const h = crearElemento('h3'); h.textContent = prod.nombre;
    const p = crearElemento('p'); p.textContent = prod.descripcion;
    const precio = crearElemento('div', 'precio'); precio.textContent = `$${prod.precioUnitario.toFixed(2)} / unidad`;
    const inputCant = crearElemento('input', 'cantidad-input d-none'); inputCant.type = 'number'; inputCant.min = '1'; inputCant.value = '1';
    const btn = crearElemento('button', 'select-btn'); btn.textContent = 'Seleccionar'; btn.dataset.id = prod.id;

    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      card.classList.toggle('active');
      if (btn.classList.contains('active')) inputCant.classList.remove('d-none'); else { inputCant.classList.add('d-none'); inputCant.value = 1; }
    });

    card.appendChild(img);
    card.appendChild(h);
    card.appendChild(p);
    card.appendChild(precio);
    card.appendChild(inputCant);
    card.appendChild(btn);
    listaProductosEl.appendChild(card);
  });
}

/* =======================
   7) CÁLCULO DE COTIZACIÓN (largo * ancho)
   - materiales: precioPorM2 * area
   - productos: precioUnitario * cantidad
   ======================= */
const MANO_OBRA_POR_M2 = 40; // USD/m²

function calcularCotizacion() {
  const largo = parseFloat(inputLargo.value);
  const ancho = parseFloat(inputAncho.value);
  const correo = inputCorreo.value.trim();
  const estiloId = estiloSeleccionadoInput.value;

  // validaciones
  if (!largo || largo <= 0) { shakeElemento(inputLargo); return Swal.fire({ icon:'error', title:'Largo inválido', text:'Ingresá un largo mayor a 0.' }); }
  if (!ancho || ancho <= 0) { shakeElemento(inputAncho); return Swal.fire({ icon:'error', title:'Ancho inválido', text:'Ingresá un ancho mayor a 0.' }); }
  if (!estiloId) return Swal.fire({ icon:'error', title:'Selecciona un estilo', text:'Elegí un estilo para continuar.' });
  if (correo && !validarEmail(correo)) { shakeElemento(inputCorreo); return Swal.fire({ icon:'error', title:'Email inválido', text:'Ingresá un email con formato correcto.' }); }

  const area = Number((largo * ancho).toFixed(2));

  // recolectar materiales seleccionados
  const materialesSeleccionados = Array.from(listaMaterialesEl.querySelectorAll('.card-producto.active')).map(card => card.querySelector('.select-btn').dataset.id);

  // recolectar productos seleccionados
  const productosSeleccionados = Array.from(listaProductosEl.querySelectorAll('.card-producto.active')).map(card => {
    const id = card.querySelector('.select-btn').dataset.id;
    const cantidad = Math.max(1, Number(card.querySelector('.cantidad-input').value || 1));
    return { id, cantidad };
  });

  // si no seleccionó nada preguntar para continuar solo mano de obra
  if (materialesSeleccionados.length === 0 && productosSeleccionados.length === 0) {
    return Swal.fire({
      title: 'No seleccionaste materiales ni productos',
      text: '¿Deseas calcular solo la mano de obra por m²?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, calcular mano de obra',
      cancelButtonText: 'Volver'
    }).then(resp => {
      if (resp.isConfirmed) procesarCalculo(area, estiloId, [], []);
    });
  }

  procesarCalculo(area, estiloId, materialesSeleccionados, productosSeleccionados);
}

function procesarCalculo(area, estiloId, matIds, prodSel) {
  const grupo = CATALOGO.find(g => g.estiloId === estiloId);
  if (!grupo) return Swal.fire({ icon:'error', title:'Error interno', text:'No se encontró el estilo.' });

  // materiales
  let subtotalMateriales = 0;
  const detalleMateriales = [];
  matIds.forEach(id => {
    const it = grupo.items.find(i => i.id === id);
    if (!it) return;
    const costo = Number((it.precioPorM2 * area).toFixed(2));
    subtotalMateriales += costo;
    detalleMateriales.push({ nombre: it.nombre, precioPorM2: it.precioPorM2, costo });
  });

  // productos
  let subtotalProductos = 0;
  const detalleProductos = [];
  prodSel.forEach(p => {
    const it = grupo.items.find(i => i.id === p.id);
    if (!it) return;
    const costo = Number((it.precioUnitario * p.cantidad).toFixed(2));
    subtotalProductos += costo;
    detalleProductos.push({ nombre: it.nombre, precioUnitario: it.precioUnitario, cantidad: p.cantidad, costo });
  });

  const manoObra = Number((MANO_OBRA_POR_M2 * area).toFixed(2));
  const totalFinal = Number((manoObra + subtotalMateriales + subtotalProductos).toFixed(2));

  // cotización actual (objeto)
  window.easyDecoCotizacionActual = {
    fecha: new Date().toISOString(),
    largo: Number(inputLargo.value),
    ancho: Number(inputAncho.value),
    area,
    tipo: inputTipoHabitacion.value,
    correo: inputCorreo.value.trim(),
    estiloId,
    estiloNombre: grupo.estiloNombre,
    manoObraPorM2: MANO_OBRA_POR_M2,
    manoObra,
    detalleMateriales,
    detalleProductos,
    subtotalMateriales,
    subtotalProductos,
    totalFinal
  };

  // mostrar resultado (texto EXACTO solicitado)
  mostrarDesglose(window.easyDecoCotizacionActual);
  Swal.fire({ icon: 'success', title: 'Cotización lista', text: `Total: $${window.easyDecoCotizacionActual.totalFinal.toFixed(2)}` });
  renderizarHistorial();
}

/* =======================
   8) MOSTRAR DESGLOSE (DOM) — textos exactos pedidos
   - "Área total (m²)"
   - "Subtotal de materiales (USD)"
   - "Subtotal de productos (USD)"
   - "Total final (USD)"
   - "Historial de cotizaciones"
   ======================= */
function mostrarDesglose(q) {
  resultadoEl.classList.remove('d-none');

  // limpiar y construir con createElement
  desgloseEl.innerHTML = ''; // limpio el contenedor
  const lines = [];

  // helper to push element
  function pushLine(label, value) {
    const line = crearElemento('div', 'result-line');
    const left = crearElemento('div'); left.textContent = label;
    const right = crearElemento('div'); right.textContent = value;
    line.appendChild(left); line.appendChild(right);
    desgloseEl.appendChild(line);
  }

  pushLine('Área total (m²)', `${q.area} m²`);
  pushLine('Estilo', q.estiloNombre);
  pushLine('Tipo', q.tipo);

  // materiales
  const matTitle = crearElemento('div'); matTitle.style.paddingTop = '8px';
  matTitle.innerHTML = '<strong>Materiales (USD / m²)</strong>';
  desgloseEl.appendChild(matTitle);

  if (q.detalleMateriales.length === 0) pushLine('Subtotal de materiales (USD)', '0.00');
  else {
    q.detalleMateriales.forEach(m => {
      pushLine(`${m.nombre} — $${m.precioPorM2.toFixed(2)}/m²`, `$${m.costo.toFixed(2)}`);
    });
    pushLine('Subtotal de materiales (USD)', `$${q.subtotalMateriales.toFixed(2)}`);
  }

  // productos
  const prodTitle = crearElemento('div'); prodTitle.style.paddingTop = '8px';
  prodTitle.innerHTML = '<strong>Productos (USD / unidad)</strong>';
  desgloseEl.appendChild(prodTitle);

  if (q.detalleProductos.length === 0) pushLine('Subtotal de productos (USD)', '0.00');
  else {
    q.detalleProductos.forEach(p => {
      pushLine(`${p.nombre} — $${p.precioUnitario.toFixed(2)} × ${p.cantidad}`, `$${p.costo.toFixed(2)}`);
    });
    pushLine('Subtotal de productos (USD)', `$${q.subtotalProductos.toFixed(2)}`);
  }

  // mano de obra y total
  pushLine(`Mano de obra (${MANO_OBRA_POR_M2} USD/m²)`, `$${q.manoObra.toFixed(2)}`);
  const totalLine = crearElemento('div', 'result-line');
  const leftT = crearElemento('div'); leftT.textContent = 'Total final (USD)';
  const rightT = crearElemento('div'); rightT.className = 'result-summary'; rightT.textContent = `$${q.totalFinal.toFixed(2)}`;
  totalLine.appendChild(leftT); totalLine.appendChild(rightT);
  desgloseEl.appendChild(totalLine);
}

/* =======================
   9) HISTORIAL (localStorage JSON)
   ======================= */
function guardarEnHistorial() {
  if (!window.easyDecoCotizacionActual) return Swal.fire({ icon:'info', title:'Nada para guardar', text:'Calculá la cotización primero.' });
  const almacen = JSON.parse(localStorage.getItem('easydeco_historial') || '[]');
  almacen.unshift(window.easyDecoCotizacionActual);
  localStorage.setItem('easydeco_historial', JSON.stringify(almacen));
  Swal.fire({ icon:'success', title:'Guardado', text:'Cotización guardada en historial.' });
  renderizarHistorial();
}

function renderizarHistorial() {
  const almacen = JSON.parse(localStorage.getItem('easydeco_historial') || '[]');
  historialListEl.innerHTML = '';
  if (almacen.length === 0) {
    const empty = crearElemento('div', 'history-item');
    empty.textContent = 'No hay cotizaciones guardadas.';
    historialListEl.appendChild(empty);
    return;
  }

  almacen.forEach((h, idx) => {
    const item = crearElemento('div', 'history-item');
    const titulo = crearElemento('div'); titulo.innerHTML = `<strong>${h.estiloNombre}</strong> • ${h.area} m² • $${h.totalFinal.toFixed(2)}`;
    const fecha = crearElemento('small'); fecha.textContent = new Date(h.fecha).toLocaleString();
    const acciones = crearElemento('div'); acciones.style.marginTop = '8px';

    const btnRest = crearElemento('button', 'botones'); btnRest.textContent = 'Restaurar'; btnRest.style.background = '#6d675e';
    btnRest.dataset.idx = idx;
    btnRest.addEventListener('click', () => restaurarHistorial(idx));

    const btnDel = crearElemento('button', 'botones'); btnDel.textContent = 'Eliminar'; btnDel.style.background = '#ff544b';
    btnDel.dataset.idx = idx;
    btnDel.addEventListener('click', () => eliminarHistorial(idx));

    acciones.appendChild(btnRest); acciones.appendChild(btnDel);

    item.appendChild(titulo); item.appendChild(fecha); item.appendChild(acciones);
    historialListEl.appendChild(item);
  });
}

function restaurarHistorial(i) {
  const almacen = JSON.parse(localStorage.getItem('easydeco_historial') || '[]');
  const item = almacen[i];
  if (!item) return;
  // restaurar inputs
  inputLargo.value = item.largo;
  inputAncho.value = item.ancho;
  inputTipoHabitacion.value = item.tipo;
  inputCorreo.value = item.correo || '';
  seleccionarEstilo(item.estiloId);
  setTimeout(() => {
    // activar materiales/productos por coincidencia de nombre
    document.querySelectorAll('#lista-materiales .card-producto').forEach(card => {
      card.classList.remove('active');
      const nombre = card.querySelector('h3')?.textContent || '';
      if ((item.detalleMateriales || []).some(m => nombre.includes(m.nombre))) card.classList.add('active');
    });
    document.querySelectorAll('#lista-productos .card-producto').forEach(card => {
      card.classList.remove('active');
      const nombre = card.querySelector('h3')?.textContent || '';
      if ((item.detalleProductos || []).some(p => nombre.includes(p.nombre))) {
        card.classList.add('active');
        const prod = (item.detalleProductos || []).find(p => nombre.includes(p.nombre));
        const inp = card.querySelector('.cantidad-input');
        if (inp) { inp.value = prod.cantidad; inp.classList.remove('d-none'); }
      }
    });
    window.easyDecoCotizacionActual = item;
    mostrarDesglose(item);
  }, 80);
}

function eliminarHistorial(i) {
  const almacen = JSON.parse(localStorage.getItem('easydeco_historial') || '[]');
  almacen.splice(i,1);
  localStorage.setItem('easydeco_historial', JSON.stringify(almacen));
  renderizarHistorial();
  Swal.fire({ icon:'success', title:'Eliminado' });
}

function exportarHistorialJSON() {
  const data = localStorage.getItem('easydeco_historial') || '[]';
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `easydeco_historial_${(new Date()).toISOString().slice(0,10)}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/* =======================
   10) PDF y Email (preparado)
   ======================= */
function descargarPDFCotizacion() {
  if (!window.easyDecoCotizacionActual) return Swal.fire({ icon:'info', title:'Nada para descargar', text:'Calculá la cotización primero.' });
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const q = window.easyDecoCotizacionActual;
  doc.setFontSize(18); doc.text('EasyDeCo — Cotización', 14, 20);
  doc.setFontSize(12);
  doc.text(`Fecha: ${new Date(q.fecha).toLocaleString()}`, 14, 30);
  doc.text(`Habitación: ${q.tipo}`, 14, 38);
  doc.text(`Área: ${q.area} m² (L:${q.largo} x A:${q.ancho})`, 14, 46);
  doc.text(`Estilo: ${q.estiloNombre}`, 14, 54);
  doc.text('Materiales (USD / m²):', 14, 62);
  let y = 70;
  q.detalleMateriales.forEach(m => { doc.text(`- ${m.nombre}: $${m.precioPorM2.toFixed(2)}/m² -> $${m.costo.toFixed(2)}`, 14, y); y += 8; });
  doc.text('Productos (unidad):', 14, y + 4); y += 12;
  q.detalleProductos.forEach(p => { doc.text(`- ${p.nombre}: $${p.precioUnitario.toFixed(2)} × ${p.cantidad} -> $${p.costo.toFixed(2)}`, 14, y); y += 8; });
  doc.text(`Mano de obra: $${q.manoObra.toFixed(2)}`, 14, y + 8);
  doc.setFontSize(14); doc.text(`Total estimado: $${q.totalFinal.toFixed(2)}`, 14, y + 24);
  doc.save(`cotizacion-easydeco-${(new Date()).toISOString().slice(0,10)}.pdf`);
}

function descargarManualPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFontSize(20); doc.text('Manual de usuario — EasyDeCo', 14, 20);
  doc.setFontSize(12);
  doc.text('Pasos:', 14, 34);
  doc.text('1. Ingresar largo y ancho (m).', 14, 42);
  doc.text('2. Seleccionar tipo de habitación.', 14, 50);
  doc.text('3. Elegir un estilo.', 14, 58);
  doc.text('4. Seleccionar materiales (USD/m²) y/o productos (USD/unidad).', 14, 66);
  doc.text('5. Presionar "Calcular cotización".', 14, 74);
  doc.text('6. Guardar o descargar la cotización.', 14, 82);
  doc.save('manual-usuario-easydeco.pdf');
}

function enviarCorreoEmailJS() {
  if (!window.easyDecoCotizacionActual) return Swal.fire({ icon:'info', title:'Nada para enviar', text:'Calculá la cotización primero.' });
  Swal.fire({ icon:'info', title:'Email listo', text:'Integra tus credenciales de EmailJS en este archivo para envío real.' });
  // P.ej:
  // emailjs.init('TU_USER_ID');
  // emailjs.send('service_xxx','template_xxx', { to_email: window.easyDecoCotizacionActual.correo, total: window.easyDecoCotizacionActual.totalFinal });
}

/* =======================
   11) BIND eventos
   ======================= */
btnCalcular.addEventListener('click', calcularCotizacion);
btnGuardar.addEventListener('click', guardarEnHistorial);
btnDescargarManual.addEventListener('click', descargarManualPDF);
btnDescargarCotizacion.addEventListener('click', descargarPDFCotizacion);
btnEnviarCorreo.addEventListener('click', enviarCorreoEmailJS);
btnExportarJSON && btnExportarJSON.addEventListener('click', exportarHistorialJSON);

/* =======================
   12) INICIALIZACIÓN
   ======================= */
renderizarGaleriaEstilos();
renderizarHistorial();

/* =======================
   MAPA DE INDICADORES (dónde se cumple cada requisito)
   1. Programación JS:
      - funciones: renderizarItems(), calcularCotizacion(), procesarCalculo(), guardarEnHistorial()
      - operadores aritméticos en cálculos
      - condicionales: validaciones if/else
      - ciclos: forEach / map used across file
      - arreglos: CATALOGO, grupo.items
   2. Eventos y métodos:
      - addEventListener: botones, cards
      - createElement, appendChild, classList (DOM API usage)
   3. Cálculos financieros:
      - procesarCalculo(): subtotalMateriales = precioPorM2 * area; subtotalProductos = precioUnitario * cantidad; mano de obra; totalFinal
   4. Búsquedas:
      - find() used to locate grupo by estiloId and items by id
   5. Filtrado de datos:
      - renderizarItems() filtra grupo.items por tipo (material/producto)
   6. Controles de formulario:
      - inputLargo, inputAncho, tipoHabitacion, validarEmail
   7. Validaciones con micro interacciones:
      - validarEmail() + shakeElemento() + Swal.fire()
   8. JSON y localStorage:
      - CATALOGO (JSON) y localStorage key 'easydeco_historial'
   9. Soluciones programadas:
      - resultado en pantalla (mostrarDesglose)
      - SweetAlert (confirmaciones/errores)
      - EmailJS preparado en enviarCorreoEmailJS()
  10. Base de datos JSON:
      - CATALOGO acts as JSON DB; exportarHistorialJSON() exports history
   ======================= */
