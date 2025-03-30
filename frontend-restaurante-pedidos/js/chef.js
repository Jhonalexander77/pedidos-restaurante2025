document.addEventListener('DOMContentLoaded', () => {
  const tablaPorPreparar = document.querySelector('#Pizza tbody');
  const tablaPreparando = document.querySelector('#Pasta tbody');

  // Cargar los pedidos al iniciar la página
  cargarPedidos();

  function cargarPedidos() {
      fetch('http://localhost:3005/pedidos')
          .then(response => {
              if (!response.ok) {
                  throw new Error('Error al obtener los pedidos');
              }
              return response.json();
          })
          .then(pedidos => {
              tablaPorPreparar.innerHTML = ''; // Limpiar tabla "Por Preparar"
              tablaPreparando.innerHTML = '';

              pedidos.forEach(pedido => {
                  if (pedido.estado === 'Por preparar') {
                      agregarFilaPedido(tablaPorPreparar, pedido, 'Preparando');
                  } else if (pedido.estado === 'Preparando') {
                      agregarFilaPedido(tablaPreparando, pedido, 'Por entregar');
                  }
              });
          })
          .catch(error => {
              console.error('Error al cargar los pedidos:', error);
          });
  }

  function agregarFilaPedido(tabla, pedido, nuevoEstado) {
      const fila = document.createElement('tr');
      fila.innerHTML = `
          <td>${pedido.id}</td>
          <td>${pedido.platillo}</td>
          <td>${pedido.cantidad}</td>
          <td>${pedido.cliente}</td>
          <td>${pedido.observaciones}</td>
          <td>${nuevoEstado ? `<button class="btn btn-success btn-cambiar-estado" data-id="${pedido.id}" data-estado="${nuevoEstado}">${nuevoEstado}</button>` : ''}</td>
      `;

      if (nuevoEstado) {
          const botonEstado = fila.querySelector('.btn-cambiar-estado');
          botonEstado.addEventListener('click', () => cambiarEstadoPedido(pedido.id, nuevoEstado));
      }

      tabla.appendChild(fila);
  }

  function cambiarEstadoPedido(id, nuevoEstado) {
      fetch('http://localhost:3005/pedido', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id,
            platillo: pedido.platillo,
            cantidad: pedido.cantidad,
            observaciones: pedido.observaciones,
            precio: pedido.precio,
            cliente: pedido.cliente,
            fecha: pedido.fecha,
            estado: nuevoEstado
        })

      })
          .then(response => {
              if (!response.ok) {
                  throw new Error('Error al actualizar el estado del pedido');
              }
              return response.json();
          })
          .then(() => {
              console.log(`Pedido con id ${id} cambiado a estado ${nuevoEstado}`);
              cargarPedidos(); // Recargar las tablas
          })
          .catch(error => {
              console.error('Error al cambiar el estado del pedido:', error);
          });
  }
});