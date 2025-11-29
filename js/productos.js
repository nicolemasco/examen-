document.addEventListener("DOMContentLoaded", () => {
  const btnBuscar = document.getElementById("buscar");

  cargarYMostrarTodos();

  btnBuscar.addEventListener("click", filtrarProductos);
});

async function cargarYMostrarTodos() {
  try {
    const resp = await fetch("./js/productos.json");
    if (!resp.ok) throw new Error("No se pudo cargar productos.json — revisa la ruta");
    const datos = await resp.json();
    // mostrar todos por defecto
    mostrarResultados(datos.productos);
  } catch (err) {
    console.error(err);
    document.getElementById("resultados").innerHTML = `<p class="error-msg">Error cargando productos. Revisa la consola.</p>`;
  }
}

async function filtrarProductos() {
  try {
    const categoria = document.getElementById("categoria").value;
    const estilo = document.getElementById("estilo").value;
    const presupuesto = document.getElementById("presupuesto").value;

    const respuesta = await fetch("./js/productos.json");
    if (!respuesta.ok) throw new Error("No se pudo cargar productos.json — revisa la ruta");
    const datos = await respuesta.json();

    let resultados = datos.productos.filter(p =>
      (categoria === "" || p.categoria === categoria) &&
      (estilo === "" || p.estilo === estilo) &&
      (presupuesto === "" || p.presupuesto === presupuesto)
    );

    mostrarResultados(resultados);
  } catch (err) {
    console.error("Error en filtrarProductos:", err);
    const cont = document.getElementById("resultados");
    cont.innerHTML = `<p class="error-msg">Ocurrió un error (ver consola).</p>`;
  }
}

function mostrarResultados(lista) {
  const contenedor = document.getElementById("resultados");
  contenedor.innerHTML = "";

  if (!Array.isArray(lista) || lista.length === 0) {
    contenedor.innerHTML = "<p>No se encontraron resultados.</p>";
    return;
  }

  lista.forEach(p => {
    // arreglar ruta de imagen si algún producto tiene ruta inconsistente
    let imgSrc = p.imagen || "imagenes/productos/placeholder.jpg";

    contenedor.innerHTML += `
      <div class="card-producto">
        <div class="wrap-img"><img src="${imgSrc}" alt="${p.nombre}" onerror="this.src='imagenes/productos/placeholder.jpg'"></div>
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
        <span class="precio">$${p.precio}</span>
      </div>
    `;
  });
}
