let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

// Función para cargar productos usando fetch y mostrar errores con try-catch-finally
async function cargarProductos() {
    try {
        const response = await fetch('../javascript/productos.json');
        if (!response.ok) {
            throw new Error('No se pudo cargar el archivo JSON de productos');
        }
        const productos = await response.json();
        renderizarProductos(productos);
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}

// Función para renderizar productos en la página
function renderizarProductos(productos) {
    const contenedorProductos = document.querySelector(".main");
    contenedorProductos.innerHTML = "";
    productos.forEach((producto, index) => {
        const productoHTML = `
            <div class="contenedor__carta">
                <div class="carta">
                    <img class="imgmila" src="${producto.imagen}" alt="${producto.nombre}">
                    <div class="carta__contenido">
                        <h3>${producto.nombre}</h3>
                        <p>${producto.descripcion}</p>
                        <p class="carta__precio">Precio: $${producto.precio}</p>
                        <button class="btn" onclick="agregarAlCarrito(${index}, '${producto.nombre}', ${producto.precio})">Agregar al carrito</button>
                    </div>
                </div>
            </div>
        `;
        contenedorProductos.innerHTML += productoHTML;
    });
}

// Función para agregar un producto al carrito
function agregarAlCarrito(index, nombre, precio) {
    const productoEnCarrito = carrito.find(item => item.nombre === nombre);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }
    actualizarCarrito();
    mostrarToast(); // Mostrar el toast cuando se añade un producto
}

// Función para mostrar el toast cuando se añade un producto al carrito
function mostrarToast() {
    const toast = document.getElementById("toast");
    toast.className = "toast show";
    setTimeout(() => {
        toast.className = toast.className.replace("show", "");
    }, 3000); // El toast desaparecerá después de 3 segundos
}

// Función para actualizar el carrito
function actualizarCarrito() {
    const listaCarrito = document.getElementById("carrito-lista");
    const precioTotal = document.getElementById("precio-total");

    listaCarrito.innerHTML = "";
    carrito.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.nombre} - $${item.precio} x ${item.cantidad}
            <button class="btn-eliminar" onclick="eliminarDelCarrito(${index})">Eliminar</button>
            <button onclick="cambiarCantidad(${index}, -1)">-</button>
            <button onclick="cambiarCantidad(${index}, 1)">+</button>
        `;
        listaCarrito.appendChild(li);
    });

    total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    precioTotal.textContent = `Precio Total: $${total.toFixed(2)}`;

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

// Función para cambiar la cantidad de un producto
function cambiarCantidad(index, cantidad) {
    carrito[index].cantidad += cantidad;
    if (carrito[index].cantidad <= 0) {
        eliminarDelCarrito(index);
    } else {
        actualizarCarrito();
    }
}

// Vaciar el carrito
document.getElementById("vaciar-carrito").addEventListener("click", () => {
    carrito = [];
    actualizarCarrito();
});

// Renderizar productos y carrito al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();
    actualizarCarrito();
});

// Modal de login
const loginModal = document.getElementById('loginModal');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const btnLogin = document.getElementById('btnLogin');
const closeModal = document.querySelector('.close-modal');

// Mostrar modal de inicio de sesión
btnLogin.addEventListener('click', function(event) {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        event.preventDefault();
        loginModal.style.display = 'block';
    } else {
        cerrarSesion();
    }
});

// Cerrar el modal cuando se hace clic en la "x"
closeModal.onclick = function() {
    loginModal.style.display = 'none';
}

// Verificar si ya está logueado al cargar la página
if (localStorage.getItem('isLoggedIn') === 'true') {
    mostrarSesionIniciada();
}

// Manejo del formulario de inicio de sesión
loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === 'franco@gmail.com' && password === 'hola123') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        loginModal.style.display = 'none';
        mostrarSesionIniciada();
    } else {
        loginError.style.display = 'block';
    }
});

function mostrarSesionIniciada() {
    btnLogin.textContent = 'Cerrar Sesión';
}

function cerrarSesion() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    btnLogin.textContent = 'Iniciar Sesión';
    loginError.style.display = 'none';
}

// Cerrar el modal si se hace clic fuera del contenido del modal
window.onclick = function(event) {
    if (event.target === loginModal) {
        loginModal.style.display = 'none';
    }
}

// Enviar pedido - Verificar si está logueado
document.getElementById("enviarPedidoBtn").addEventListener("click", () => {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        loginModal.style.display = 'block';
    } else {
        mostrarConfirmacionPedido();
    }
});

// Función para mostrar el modal de confirmación de pedido
function mostrarConfirmacionPedido() {
    const confirmarPedidoModal = document.getElementById("confirmarPedidoModal");
    confirmarPedidoModal.style.display = 'block';
    document.getElementById('pedidoTotal').textContent = total.toFixed(2); // Actualizar total con 2 decimales
}

// Cerrar el modal de confirmación de pedido
const closeConfirmModal = document.querySelector(".close-confirm-modal");
closeConfirmModal.addEventListener("click", () => {
    const confirmarPedidoModal = document.getElementById("confirmarPedidoModal");
    confirmarPedidoModal.style.display = 'none';
});

// Modal de Resumen de Compra
const resumenCompraModal = document.getElementById("resumenCompraModal");
const closeResumenModal = document.querySelector(".close-resumen-modal");
const cerrarResumenBtn = document.getElementById("cerrarResumenBtn");

// Función para mostrar el resumen de compra
function mostrarResumenCompra() {
    const detalleCompra = document.getElementById("detalle-compra");

    
    total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    // Asegurarse de que hay productos en el carrito para mostrar
    if (carrito.length === 0) {
        detalleCompra.innerHTML = "<p>No hay productos en el carrito.</p>";
        return;
    }

    // Mostrar los productos del carrito antes de vaciarlo
    detalleCompra.innerHTML = `
        <h3>Datos del Cliente:</h3>
        <p><strong>Nombre:</strong> ${document.getElementById("nombre").value}</p>
        <p><strong>Dirección:</strong> ${document.getElementById("direccion").value}</p>
        <p><strong>Teléfono:</strong> ${document.getElementById("telefono").value}</p>
        <p><strong>Método de Pago:</strong> ${document.getElementById("metodoPago").value}</p>

        <h3>Productos:</h3>
        <ul>
            ${carrito.map(item => `<li>${item.nombre} - ${item.cantidad} x $${item.precio}</li>`).join('')}
        </ul>
        <p><strong>Total:</strong> $${total.toFixed(2)}</p>
    `;

    resumenCompraModal.style.display = "block";

    // Vaciar el carrito después de 10 segundos
    setTimeout(() => {
        carrito = [];
        actualizarCarrito();  // Actualiza el carrito en la UI y en localStorage
        console.log("Carrito vaciado después de 10 segundos.");
    }, 10000); // 10 segundos
}

// Cerrar el modal de resumen de compra
closeResumenModal.onclick = () => {
    resumenCompraModal.style.display = "none";
};

cerrarResumenBtn.onclick = () => {
    resumenCompraModal.style.display = "none";
};

// Al confirmar el pedido, mostrar el resumen y vaciar el carrito
document.getElementById("confirmarPedidoForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const confirmarPedidoModal = document.getElementById("confirmarPedidoModal");
    confirmarPedidoModal.style.display = 'none';
    
    // Mostrar el resumen de la compra antes de vaciar el carrito
    mostrarResumenCompra();  
});

// Selección del botón y del modal
const modal = document.getElementById("carritoModal");
const btnAbrirCarrito = document.getElementById("abrir-carrito");
const btnCerrarModal = document.querySelector(".close");

// Evento para abrir el carrito al hacer clic en "Ver Carrito"
btnAbrirCarrito.addEventListener("click", () => {
    modal.style.display = "block";
});

// Evento para cerrar el carrito al hacer clic en la 'X'
btnCerrarModal.addEventListener("click", () => {
    modal.style.display = "none";
});

// Cerrar el carrito al hacer clic fuera del contenido del carrito
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Variable para saber si hay un pedido en curso
let pedidoEnCurso = false;

// Selecciona los elementos necesarios
const tiempoRestanteElemento = document.getElementById("tiempoRestante");
const temporizadorDiv = document.getElementById("temporizador");
const enviarPedidoBtn = document.getElementById("enviarPedidoBtn");

// Función para generar tiempo aleatorio entre 5 minutos y 1 hora (en segundos)
function generarTiempoAleatorio() {
    const minTiempo = 5 * 60; 
    const maxTiempo = 60 * 60; 
    return Math.floor(Math.random() * (maxTiempo - minTiempo + 1)) + minTiempo;
}

// Función para iniciar el temporizador
function iniciarTemporizador(segundos) {
    let tiempoRestante = segundos;
    temporizadorDiv.style.display = "block"; // Muestra el temporizador
    pedidoEnCurso = true;  // Marca que un pedido está en curso
    enviarPedidoBtn.disabled = true;  // Desactiva el botón de enviar pedido

    const intervalo = setInterval(() => {
        const minutos = Math.floor(tiempoRestante / 60);
        const segundos = tiempoRestante % 60;

        // Actualiza el texto del temporizador
        tiempoRestanteElemento.textContent = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

        if (tiempoRestante <= 0) {
            clearInterval(intervalo);
            temporizadorDiv.style.display = "none";  // Oculta el temporizador
            pedidoEnCurso = false;  // Marca que ya no hay un pedido en curso
            enviarPedidoBtn.disabled = false;  // Vuelve a activar el botón de enviar pedido
        } else {
            tiempoRestante--;
        }
    }, 1000); // Actualiza cada segundo
}

// Función para mostrar el resumen y empezar el temporizador
document.getElementById("confirmarPedidoForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Verificar si ya hay un pedido en curso
    if (pedidoEnCurso) {
        alert("Ya tienes un pedido en curso. Espera a que se complete antes de realizar otro.");
        return;
    }

    confirmarPedidoModal.style.display = 'none';
    
    mostrarResumenCompra();  // Muestra el resumen de la compra

    // Iniciar temporizador con tiempo aleatorio
    const tiempoAleatorio = generarTiempoAleatorio();
    iniciarTemporizador(tiempoAleatorio);
});
