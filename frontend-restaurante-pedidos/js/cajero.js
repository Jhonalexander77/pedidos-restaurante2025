document.addEventListener('DOMContentLoaded', () => {
  const botonesPedido = document.querySelectorAll('.btn-pedido');
  let con = 0;

  botonesPedido.forEach((boton) => {
      boton.addEventListener('click', () => {
          const form = boton.closest('form');

          // Recoger datos del formulario
          const platillo = form.querySelector('.platillo').value;
          const cliente = form.querySelector('.cliente').value;
          const cantidad = form.querySelector('.cantidad').value;
          const fecha = form.querySelector('.fecha').value;
          const observaciones = form.querySelector('.observaciones').value;

          // Obtener precio del platillo
          const precioElement = form.querySelector('.precios');
          const precio = parseFloat(precioElement ? precioElement.textContent.replace('$', '').replace('.', '') : 0);

          // Crear el objeto del pedido
          const pedido = {
              platillo,
              cantidad: parseInt(cantidad),
              observaciones,
              precio,
              cliente,
              fecha,
              estado: "Por preparar"
          };

          // Llamar a la API para guardar el pedido
          crearPedidoEnBaseDeDatos(pedido);
      });
  });
});

function crearPedidoEnBaseDeDatos(pedido) {
  fetch('http://localhost:3005/pedido', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(pedido)
  })
  .then(response => {
      if (response.ok) {
          alert('Pedido registrado exitosamente:', pedido);
      } else {
          alert('Error al registrar el pedido:');
      }
      return response.json();
  })
  .catch(error => {
      console.error('Error de red:', error);
  });
}