let btnSend = document.querySelector("#btn-send");

btnSend.addEventListener('click', function(){
    let firstname = document.querySelector("#firstname");
    let lastname = document.querySelector("#lastname");
    let email = document.querySelector("#email");
    
    if(firstname.value.trim()==='' && firstname.required ){
        let errorFirstname = document.querySelector("#error-firstname");
        errorFirstname.textContent='Debe completar el campo nombre';
        // alert('Error, debe completar el campo nombre');
    }

    if(!lastname.value.trim() && lastname.required ){
        document.querySelector("#error-lastname").textContent = 'Debe completar el campo apellido';
        // alert('Error, debe completar el campo apellido');
    }

    if(!email.value.trim() && email.required ){
        document.querySelector("#error-email").textContent = 'Debe completar el campo email';
        // alert('Error, debe completar el campo email');
    }
});

// if(firstname.value.trim() && lastname.value.trim() && email.value.trim()){
//     function newFunction(){
//         var element = document.getElementById("formRegister");
//         element.reset();
//     }
// };

// let output = document.getElementById('output');
// const formToReset = document.getElementById('formRegister');
// formToReset.addEventListener('submit', (e) => {
//    e.preventDefault();
//    formToReset.reset();
//    output.innerHTML += "The form is resetted successfully!"
// });
    
    
    
    // alert('Enviando datos...'+firstname.value);
