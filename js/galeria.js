/* menu-galeria.js - controla el select y muestra la galería correspondiente */

document.getElementById('menuOpciones').addEventListener('change', galeria);

function galeria() {
    var opciones = document.getElementById('menuOpciones').value;

    switch (opciones) {
        case "salas":
            document.querySelector('.galeriaSalas').style.display = "block";
            document.querySelector('.galeriaCocinas').style.display = "none";
            document.querySelector('.galeriaDormitorios').style.display = "none";
            document.querySelector('.galeriaOficinas').style.display = "none";
            break;

        case "cocinas":
            document.querySelector('.galeriaSalas').style.display = "none";
            document.querySelector('.galeriaCocinas').style.display = "block";
            document.querySelector('.galeriaDormitorios').style.display = "none";
            document.querySelector('.galeriaOficinas').style.display = "none";
            break;

        case "dormitorios":
            document.querySelector('.galeriaSalas').style.display = "none";
            document.querySelector('.galeriaCocinas').style.display = "none";
            document.querySelector('.galeriaDormitorios').style.display = "block";
            document.querySelector('.galeriaOficinas').style.display = "none";
            break;

        case "oficinas":
            document.querySelector('.galeriaSalas').style.display = "none";
            document.querySelector('.galeriaCocinas').style.display = "none";
            document.querySelector('.galeriaDormitorios').style.display = "none";
            document.querySelector('.galeriaOficinas').style.display = "block";
            break;

        default:
            // ocultar todas si no seleccionan nada
            document.querySelector('.galeriaSalas').style.display = "none";
            document.querySelector('.galeriaCocinas').style.display = "none";
            document.querySelector('.galeriaDormitorios').style.display = "none";
            document.querySelector('.galeriaOficinas').style.display = "none";
            break;
    }
}
