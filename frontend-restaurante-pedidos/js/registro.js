// archivo: registro.js

document.querySelector('.btn-guardar').addEventListener('click', function () {
  // Capturar los datos del formulario
  const user = document.getElementById('user').value;
  const name = document.getElementById('name').value;
  const rol = document.getElementById('rol').value;
  const password = document.getElementById('password').value;

  // Validar que todos los campos están llenos
  if (!user || !name || !rol || !password) {
      alert('Por favor, completa todos los campos.');
      return;
  }

  // Crear el objeto con los datos del usuario
  const usuario = {
      user: user,
      name: name,
      rol: rol,
      password: password
  };

  // Enviar la solicitud POST al servidor
  fetch('http://localhost:3005/register', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuario)
  })
  .then(response => {
      if (response.ok) {
          alert('Usuario registrado con éxito.');
          // Redirigir a la página principal
          window.location.href = 'index.html';
      } else {
          alert('Error al registrar el usuario. Por favor, inténtalo de nuevo.');
      }
  })
  .catch(error => {
      console.error('Error:', error);
      alert('Hubo un problema al conectar con el servidor.');
  });
});