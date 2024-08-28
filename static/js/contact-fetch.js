const BASEURL = 'http://127.0.0.1:5000';

/**
 * Función para realizar una petición fetch con JSON.
 * @param {string} url - La URL a la que se realizará la petición.
 * @param {string} method - El método HTTP a usar (GET, POST, PUT, DELETE, etc.).
 * @param {Object} [data=null] - Los datos a enviar en el cuerpo de la petición.
 * @returns {Promise<Object>} - Una promesa que resuelve con la respuesta en formato JSON.
 */
async function fetchData(url, method, data = null) {
  const options = {
      method: method,
      headers: {
          'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,  // Si hay datos, los convierte a JSON y los incluye en el cuerpo
  };
  try {
    const response = await fetch(url, options);  // Realiza la petición fetch
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();  // Devuelve la respuesta en formato JSON
  } catch (error) {
    console.error('Fetch error:', error);
    alert('An error occurred while fetching data. Please try again.');
  }
}

/**
 * Funcion que permite crear un elemento <tr> para la tabla de peliculas
 * por medio del uso de template string de JS.
 */
async function showUsers(){
    let users =  await fetchData(BASEURL+'/api/users/', 'GET');
    const tableUsers = document.querySelector('#list-table-users tbody');
    tableUsers.innerHTML='';
    users.forEach((user, index) => {
      let tr = `<tr>
                    <td>${user.nombre}</td>
                    <td>${user.apellido}</td>
                    <td>${user.email}</td>
                    <td>${user.consulta}</td>
                    <td>
                        <button class="btn-cac" onclick='updateUser(${user.id})'><i class="fa fa-pencil" ></button></i>
                        <button class="btn-cac" onclick='deleteUser(${user.id})'><i class="fa fa-trash" ></button></i>
                    </td>
                  </tr>`;
      tableUsers.insertAdjacentHTML("beforeend",tr);
    });
}

/**
 * Función para comunicarse con el servidor para poder Crear o Actualizar
 * un registro de un cliente
 * @returns 
 */
async function saveCliente(){
    const id = document.querySelector('#id').value;
    const nombre = document.querySelector('#nombre').value;
    const apellido = document.querySelector('#apellido').value;
    const email = document.querySelector('#email').value;
    const consulta = document.querySelector('#consulta').value;
    //VALIDACION DE FORMULARIO
    if (!nombre || !apellido || !email || !consulta) {
      Swal.fire({
          title: 'Error!',
          text: 'Por favor completa todos los campos.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
      });
      return;
    }
    // Crea un objeto con los datos de un cliente
    const clienteData = {
        nombre: nombre,
        apellido: apellido,
        email: email,
        consulta: consulta,
    };
  let result = null;
  // Si hay un id, realiza una petición PUT para actualizar la cliente existente
  if(id!==""){
    result = await fetchData(`${BASEURL}/api/clientes/${id}`, 'PUT', clienteData);
  }else{
    // Si no hay id, realiza una petición POST para crear una nueva cliente
    result = await fetchData(`${BASEURL}/api/clientes/`, 'POST', clienteData);
  }
  
  const formCliente = document.querySelector('#form-cliente');
  formCliente.reset();
  Swal.fire({
    title: 'Exito!',
    text: result.message,
    icon: 'success',
    confirmButtonText: 'Cerrar'
  })
  showClientes();
}


/**
 * Function que permite eliminar una cliente de la base de datos
 * de acedo al indice del mismo
 * @param {number} id posición del array que se va a eliminar
 */
async function deleteCliente(id){
    Swal.fire({
        title: "Esta seguro de eliminar el cliente?",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
    }).then(async (result) => {
        if (result.isConfirmed) {
          let response = await fetchData(`${BASEURL}/api/clientes/${id}`, 'DELETE');
          showClientes();
          Swal.fire(response.message, "", "success");
        }
    });
    
}

/**
 * Function que permite cargar el formulario con los datos del cliente 
 * para su edición
 * @param {number} id Id de la cliente que se quiere editar
 */
async function updateCliente(id){
    //Buscamos en el servidor el cliente de acuerdo al id
    let response = await fetchData(`${BASEURL}/api/clientes/${id}`, 'GET');
    const idField = document.querySelector('#id');
    const nombre = document.querySelector('#nombre');
    const apellido = document.querySelector('#apellido');
    const email = document.querySelector('#email');
    const consulta = document.querySelector('#consulta');
    
    idField.value = response.id;
    nombre.value = response.nombre;
    apellido.value = response.apellido;
    email.value = response.email;
    consulta.value = response.consulta;
}

// Escuchar el evento 'DOMContentLoaded' que se dispara cuando el 
// contenido del DOM ha sido completamente cargado y parseado.
document.addEventListener('DOMContentLoaded',function(){
    const btnSaveCliente = document.querySelector('#btn-save-cliente');
    // //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
    btnSaveCliente.addEventListener('click',saveCliente);
    showClientes();
});
  