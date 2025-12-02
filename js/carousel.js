(function () {
  const micarrusel = [
    { imagenurl: "imagenes/car1.jpg", titulo: "Sala Minimalista" },
    { imagenurl: "imagenes/car2.webp", titulo: "Cocina Moderna" },
    { imagenurl: "imagenes/car3.webp", titulo: "Dormitorio Elegante" },
    { imagenurl: "imagenes/car4.webp", titulo: "Oficina Creativa" },
    { imagenurl: "imagenes/car5.jpg", titulo: "Estilo Contemporáneo" }
  ];

  let indice = 0;
  const total = micarrusel.length;

  function actualizar() {
    const img = document.getElementById('serv-thumb');
    const t = document.getElementById('titulo-carrusel');
    if (!img || !t) return;
    img.src = micarrusel[indice].imagenurl;
    img.alt = micarrusel[indice].titulo;
    t.textContent = micarrusel[indice].titulo;
  }

  function cambiar(delta) {
    indice = (indice + delta + total) % total;
    actualizar();
  }

  document.addEventListener('DOMContentLoaded', function () {
    const prev = document.getElementById('prev-carrusel');
    const next = document.getElementById('next-carrusel');
    if (prev) prev.addEventListener('click', () => cambiar(-1));
    if (next) next.addEventListener('click', () => cambiar(1));

    if (micarrusel.length > 0) actualizar();
  });

  window.__carouselServicios = { cambiar };
})();
