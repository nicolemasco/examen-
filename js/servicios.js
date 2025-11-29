window.onload = function() {
    const inputBusqueda = document.getElementById('searchInput');
    inputBusqueda.addEventListener('keypress', validarEnter);
    document.getElementById('btnBuscar').addEventListener('click', searchServices);

    displayServices(servicios);
};

function validarEnter(event) {
    if (event.key === 'Enter') {
        searchServices();
    }
}

const servicios = [
    {
        nombre: "Diseño de Interiores",
        descripcion: "Creamos ambientes únicos y personalizados para tu hogar o negocio.",
        imagen: "imagenes/servicio1.jpg"
    },
    {
        nombre: "Decoración de Eventos",
        descripcion: "Transformamos tu espacio para bodas, fiestas y eventos corporativos.",
        imagen: "imagenes/servicio2.jpg"
    },
    {
        nombre: "Asesoría en Materiales",
        descripcion: "Te ayudamos a elegir materiales y estilos que se adapten a tu presupuesto.",
        imagen: "imagenes/servicio3.jpg"
    },
    {
        nombre: "Renovación de Espacios",
        descripcion: "Damos nueva vida a tus espacios con soluciones modernas y prácticas.",
        imagen: "imagenes/servicio4.jpg"
    }
];

function searchServices() {
    let searchInput = document.getElementById("searchInput").value.toLowerCase().trim();
    const resultsContainer = document.getElementById("pResult");
    resultsContainer.innerHTML = ""; 

    if (searchInput === "") {
        displayServices(servicios);
        return;
    }

    const filteredServices = servicios.filter(serv => 
        serv.nombre.toLowerCase().includes(searchInput) ||
        serv.descripcion.toLowerCase().includes(searchInput)
    );

    if (filteredServices.length === 0) {
        resultsContainer.innerHTML = "<p>No se encontraron servicios para tu búsqueda.</p>";
    } else {
        displayServices(filteredServices);
    }
}

function displayServices(servicesArray) {
    const resultsContainer = document.getElementById("pResult");
    resultsContainer.innerHTML = ""; 

    servicesArray.forEach(serv => {
        const card = document.createElement("div");
        card.className = "card-servicio";

        card.innerHTML = `
            <img src="${serv.imagen}" alt="${serv.nombre}" class="card-img">
            <h3>${serv.nombre}</h3>
            <p class="card-text">${serv.descripcion}</p>
        `;
        resultsContainer.appendChild(card);
    });
}
