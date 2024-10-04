
const productos = [
    { nombre: "Milanesa de Pollo", precio: 300, imagen: "../img/milanesaDePollo.jpeg", descripcion: "Milanesa jugosa y crujiente, preparada con pechuga de pollo de la mejor calidad." },
    { nombre: "Milanesa de Carne", precio: 350, imagen: "../img/milanesa de carne2.webp", descripcion: "Clásica milanesa hecha con cortes seleccionados de carne vacuna." },
    { nombre: "Milanesa de Ternera", precio: 400, imagen: "../img/milanesaDeTernera.jpg", descripcion: "Una opción premium, preparada con ternera de primera calidad, suave y deliciosa." },
    { nombre: "Milanesa Napolitana", precio: 450, imagen: "../img/milanesaNapoli.jpg", descripcion: "Con queso derretido y salsa de tomate, un clásico irresistible." },
    { nombre: "Milanesa Riojana", precio: 380, imagen: "../img/milanesaRiojana.jpeg", descripcion: "Milanesa con jamón, pimientos y huevo frito, al estilo riojano." },
    { nombre: "Milanesa de Cerdo", precio: 320, imagen: "../img/milanesa de cerdo.jpg", descripcion: "Milanesa de cerdo, con un sabor intenso y una textura crujiente única." },
    { nombre: "Milanesa Suiza", precio: 500, imagen: "../img/milanesaSuiza.jpg", descripcion: "Con un toque de queso suizo y especias, nuestra especialidad más solicitada." },
];


let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);


function renderizarProductos() {
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
                        <button class="btn" onclick="agregarAlCarrito(${index})">Agregar al carrito</button>
                    </div>
                </div>
            </div>
        `;
        contenedorProductos.innerHTML += productoHTML;
    });
}


const modal = document.getElementById("carritoModal");
const btnAbrirCarrito = document.getElementById("abrir-carrito");
const btnCerrarModal = document.querySelector(".close");
const confirmarPedidoModal = document.getElementById("confirmarPedidoModal");
const closeConfirmModal = document.querySelector(".close-confirm-modal");

// Abrir el carrito al hacer clic en "Ver Carrito"
btnAbrirCarrito.addEventListener("click", () => {
    modal.style.display = "block";
});

// Cerrar el carrito al hacer clic en la 'X'
btnCerrarModal.addEventListener("click", () => {
    modal.style.display = "none";
});

// Cerrar el carrito al hacer clic fuera del contenido del carrito
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Funcion para agregar un producto al carrito
function agregarAlCarrito(index) {
    const producto = productos[index];
    const productoEnCarrito = carrito.find(item => item.nombre === producto.nombre);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    actualizarCarrito();
}

// Funcion para actualizar el carrito
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
    precioTotal.textContent = `Precio Total: $${total}`;

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Funcion para eliminar un producto del carrito
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

// Renderizar productos y carrito al cargar la pagina
document.addEventListener("DOMContentLoaded", () => {
    renderizarProductos();
    actualizarCarrito();
});


const loginModal = document.getElementById('loginModal');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const btnLogin = document.getElementById('btnLogin');
const closeModal = document.querySelector('.close-modal');

// Mostrar modal de inicio de sesion
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

// Verificar si ya esta logueado al cargar la pagina
if (localStorage.getItem('isLoggedIn') === 'true') {
    mostrarSesionIniciada();
}

// Manejo del formulario de inicio de sesion
loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === 'franco@gmail.com' && password === 'hola123') {
        // Guardar el estado de inicio de sesión en localstorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);

        // Ocultar el modal y actualizar el boton
        loginModal.style.display = 'none';
        mostrarSesionIniciada();
    } else {
        // Mostrar el mensaje de error si las credenciales son incorrectas
        loginError.style.display = 'block';
    }
});

// Función para mostrar que la sesión esta iniciada
function mostrarSesionIniciada() {
    btnLogin.textContent = 'Cerrar Sesión';
}

// Funcion para cerrar la sesion
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

// Funcion para mostrar el modal de confirmación de pedido
function mostrarConfirmacionPedido() {
    confirmarPedidoModal.style.display = 'block';
    document.getElementById('pedidoTotal').textContent = total;
}

// Cerrar el modal de confirmacion de pedido
closeConfirmModal.addEventListener("click", () => {
    confirmarPedidoModal.style.display = 'none';
});

// Manejo del formulario de confirmacion de pedido
document.getElementById("confirmarPedidoForm").addEventListener("submit", function(event) {
    event.preventDefault();
    confirmarPedidoModal.style.display = 'none';
    mostrarTiempoLlegada();
});




// Función para mostrar el tiempo de llegada aleatorio
function mostrarTiempoLlegada() {
    const tiempoAleatorio = generarTiempoAleatorio();
    
    // Mostrar el modal con el tiempo de llegada
    const modalTiempo = document.getElementById("tiempoLlegadaModal");
    const tiempoLlegadaTexto = document.getElementById("tiempoLlegadaTexto");
    
    tiempoLlegadaTexto.textContent = `Tiempo aproximado de llegada: ${tiempoAleatorio}`;
    modalTiempo.style.display = "block";
}

// Funcion para generar un tiempo de llegada aleatorio entre 15 y 60 minutos
function generarTiempoAleatorio() {
    const minutos = Math.floor(Math.random() * (60 - 15 + 1)) + 15;
    const horas = Math.floor(minutos / 60);
    const minutosRestantes = minutos % 60;

    return `${horas.toString().padStart(2, '0')}:${minutosRestantes.toString().padStart(2, '0')}:00`;
}

// Cerrar el modal de tiempo de llegada
const closeTiempoModal = document.querySelector(".close-tiempo-modal");
closeTiempoModal.addEventListener("click", () => {
    const modalTiempo = document.getElementById("tiempoLlegadaModal");
    modalTiempo.style.display = "none";
});

// Cerrar el modal si se hace clic fuera del contenido del modal
window.onclick = function(event) {
    const modalTiempo = document.getElementById("tiempoLlegadaModal");
    if (event.target === modalTiempo) {
        modalTiempo.style.display = 'none';
    }
}