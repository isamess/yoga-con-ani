document.querySelector("#btn-send").addEventListener('click', function(){
    let nombre = document.querySelector("#nombre");
    let apellido = document.querySelector("#apellido");
    let email = document.querySelector("#email");
    let consulta = document.querySelector("#consulta");

    if(nombre.value.trim() === '' && nombre.required) {
        document.querySelector("#error-nombre").textContent = 'Debe completar el campo nombre';
    } else {
        document.querySelector("#error-nombre").textContent = '';
    }

    if(apellido.value.trim() === '' && apellido.required) {
        document.querySelector("#error-apellido").textContent = 'Debe completar el campo apellido';
    } else {
        document.querySelector("#error-apellido").textContent = '';
    }

    if(email.value.trim() === '' && email.required) {
        document.querySelector("#error-email").textContent = 'Debe completar el campo email';
    } else {
        document.querySelector("#error-email").textContent = '';
    }

    if(consulta.value.trim() === '' && consulta.required) {
        document.querySelector("#error-consulta").textContent = 'Debe completar el campo consulta';
    } else {
        document.querySelector("#error-consulta").textContent = '';
    }
});
