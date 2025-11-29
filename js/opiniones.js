document.getElementById('btnCalcular').addEventListener('click', evaluacion);
document.getElementById('btnLimpiar').addEventListener('click', btnLimpiar);

function evaluacion() {
    const servicio = document.getElementById('servicioSelect').value;
    if (servicio === "") {
        Swal.fire('Atención', 'Selecciona un servicio', 'warning');
        return;
    }

    const preguntas = ['pregunta1', 'pregunta2', 'pregunta3'];
    let total = 0;
    let error = false;

    preguntas.forEach(preg => {
        const sel = document.querySelector(`input[name=${preg}]:checked`);
        if (!sel) error = true;
        else total += parseInt(sel.value);
    });

    if (error) {
        Swal.fire('Atención', 'Contesta todas las preguntas', 'warning');
        return;
    }

    // Calcular porcentaje
    const porcFinal = (total / (preguntas.length * 3)) * 100;

    Swal.fire({
        title: `Evaluación obtenida: ${porcFinal}%`,
        html: `<p>Servicio evaluado: <strong>${servicio}</strong></p>`,
        icon: 'info'
    });

    btnLimpiar();
}

function btnLimpiar() {
    document.getElementById('servicioSelect').value = "";
    const radios = document.querySelectorAll('input[type=radio]');
    radios.forEach(r => r.checked = false);
}
