window.addEventListener('load', init, false);

function init() {   
    let emailInput = document.getElementById('inscriptionTxt');
    let btnEnviar = document.getElementById('btnSend2');
    let alerta = document.getElementById('mensajeAlert2');

    let expressionEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

    btnEnviar.onclick = function() {
        let email = emailInput.value;

        if (email === '') {
            alerta.textContent = 'El campo está vacío';
            alerta.classList.add('alertaRoja');
            alerta.classList.remove('alertaVerde');
        } else if (!expressionEmail.test(email)) {
            alerta.textContent = 'Email inválido';
            alerta.classList.add('alertaRoja');
            alerta.classList.remove('alertaVerde'); 
        } else {
            alerta.textContent = 'Su registro fue exitoso';
            alerta.classList.add('alertaVerde');
            alerta.classList.remove('alertaRoja');

            emailjs.sendForm('service_6qk362b', 'template_z42jas7', '#form2', 'AAoFUA_QhvnDBKIhP'); 
            emailInput.value = '';
        }
    }
}
