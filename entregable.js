

document.addEventListener("DOMContentLoaded", () => {
    const toggleThemeBtn = document.createElement("button");
    toggleThemeBtn.className = "toggle-theme-btn";
    toggleThemeBtn.textContent = "Cambiar Tema";

    document.body.appendChild(toggleThemeBtn);

    toggleThemeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        if (document.body.classList.contains("dark-theme")) {
            toggleThemeBtn.textContent = "Modo Claro";
        } else {
            toggleThemeBtn.textContent = "Modo Oscuro";
        }
    });
});


// Variables globales
let carrito = [];
let total = 0;


const productos = [
    { nombre: "Milanesa de Pollo", precio: 300, valoracion: 4.5 },
    { nombre: "Milanesa de Carne", precio: 350, valoracion: 4.7 },
    { nombre: "Milanesa de Ternera", precio: 400, valoracion: 4.8 },
    { nombre: "Milanesa Napolitana", precio: 450, valoracion: 4.9 },
    { nombre: "Milanesa Riojana", precio: 380, valoracion: 4.6 },
    { nombre: "Milanesa de Cerdo", precio: 320, valoracion: 4.4 },
    { nombre: "Milanesa más pedida: Suiza", precio: 500, valoracion: 4.9 },
];

document.addEventListener("DOMContentLoaded", () => {
    const botonesAgregarCarrito = document.querySelectorAll(".btn");
    const carritoModal = document.getElementById("carritoModal");
    const abrirCarritoBtn = document.getElementById("abrir-carrito");
    const closeBtn = document.querySelector(".modal .close");
    const listaCarrito = document.getElementById("carrito-lista");
    const precioTotal = document.getElementById("precio-total");
    const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

    // Función para abrir el carrito 
    abrirCarritoBtn.addEventListener("click", () => {
        carritoModal.style.display = "flex";
    });

    // Función para cerrar el carrito 
    closeBtn.addEventListener("click", () => {
        carritoModal.style.display = "none";
    });

    // Función para agregar un plato al carrito
    botonesAgregarCarrito.forEach(boton => {
        boton.addEventListener("click", (evento) => {
            evento.preventDefault();
            const productoNombre = boton.closest(".carta__contenido").querySelector("h3").textContent;
            const producto = productos.find(item => item.nombre === productoNombre);
            if (producto) {
                agregarAlCarrito(producto);
            }
        });
    });

    // Función para agregar platos al carrito
    function agregarAlCarrito(producto) {
        carrito.push(producto);
        total += producto.precio;
        actualizarCarrito();
    }

    // Función para actualizar la lista del carrito y el precio total
    function actualizarCarrito() {
        listaCarrito.innerHTML = "";
        carrito.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `${item.nombre} - $${item.precio} <button class="btn-eliminar" data-index="${index}">Eliminar</button>`;
            listaCarrito.appendChild(li);
        });

        precioTotal.textContent = `Precio Total: $${total}`;

        // Función para eliminar un plato del carrito
        document.querySelectorAll(".btn-eliminar").forEach(boton => {
            boton.addEventListener("click", (evento) => {
                const index = evento.target.getAttribute("data-index");
                eliminarDelCarrito(index);
            });
        });
    }

    // Función para eliminar un plato del carrito
    function eliminarDelCarrito(index) {
        total -= carrito[index].precio;
        carrito.splice(index, 1);
        actualizarCarrito();
    }

    // Función para vaciar todo el carrito
    vaciarCarritoBtn.addEventListener("click", () => {
        carrito = [];
        total = 0;
        actualizarCarrito();
    });

    // Cerrar el carrito si se hace clic fuera de él
    window.onclick = function (event) {
        if (event.target == carritoModal) {
            carritoModal.style.display = "none";
        }
    };
});


document.addEventListener('DOMContentLoaded', function() {
    // Obtener el formulario
    const loginForm = document.getElementById('loginForm');

    // Añadir un evento al enviar el formulario
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenir el envío del formulario por defecto
        
        // Obtener los valores de email y contraseña
        const email = document.getElementById('email').value;
        const password = document.getElementById('contrasena').value;

        
        // Ejemplo básico (puedes reemplazar con una validación real)
        if (email === "usuario@gmail.com" && password === "1234") {
            // Redireccionar a la página de inicio si las credenciales son correctas
            alert("Inicio de sesión exitoso");
            window.location.href = "/index.html"; // Redirigir a la página de inicio
        } else {
            
            alert("Email o contraseña incorrectos");
        }
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const carritoModal = document.getElementById('carritoModal');
    const abrirCarritoBtn = document.getElementById('abrir-carrito');
    const cerrarCarritoBtn = document.querySelector('.close');
    const enviarPedidoBtn = document.getElementById('enviarPedidoBtn');
    const cronometroCuadro = document.getElementById('cronometro-cuadro');
    const cronometroTiempo = document.getElementById('cronometro-tiempo');

    // Abrir carrito
    abrirCarritoBtn.addEventListener('click', function() {
        carritoModal.style.display = 'flex';
    });

    // Cerrar carrito
    cerrarCarritoBtn.addEventListener('click', function() {
        carritoModal.style.display = 'none';
    });

    // Cerrar el carrito cuando se haga clic fuera de él
    window.addEventListener('click', function(event) {
        if (event.target == carritoModal) {
            carritoModal.style.display = 'none';
        }
    });

    // Enviar pedido y mostrar el cronómetro
    enviarPedidoBtn.addEventListener('click', function() {
        // Generar un tiempo aleatorio entre 1 y 3 minutos en milisegundos
        const tiempoEntregaMinutos = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
        const tiempoEntregaMilisegundos = tiempoEntregaMinutos * 60 * 1000;

        // Mostrar el cuadro del cronómetro
        cronometroCuadro.style.display = 'block';

        // Iniciar cronómetro de cuenta regresiva
        const tiempoFin = new Date().getTime() + tiempoEntregaMilisegundos;

        const intervalo = setInterval(function() {
            const ahora = new Date().getTime();
            const distancia = tiempoFin - ahora;

            // Calcular minutos y segundos
            const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
            const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

            // Actualizar el cronómetro en pantalla
            cronometroTiempo.textContent = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

            // Cuando el cronómetro llega a 0
            if (distancia < 0) {
                clearInterval(intervalo);
                cronometroTiempo.textContent = '¡Su pedido ya llegó!';
            }
        }, 1000); // Actualizar cada segundo
    });
});