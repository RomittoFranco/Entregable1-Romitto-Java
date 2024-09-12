

function verificarUsuario(nombre, contraseña, edad) {
    if (nombre === "franco" && contraseña === "hola" && edad >= 18) {
        console.log("Hola " + nombre + ", listo para hacer tus compras");
        return true;
    } else if (edad < 18) {
        alert("Eres menor de edad, no puedes acceder");
        console.log("Alguno de los datos no concuerda o eres menor");
        return false;
    } else {
        console.log("Alguno de los datos no concuerda");
        return false;
    }
}


function mostrarMenu() {
    return parseInt(prompt("Bienvenido, escriba el número correspondiente de cada plato para agregarlo al carrito \n" +
        "1-Milanesa de pollo: $4000 \n" +
        "2-Milanesa de carne: $5000 \n" +
        "3-Milanesa de ternera: $6000 \n" +
        "4-Milanesa napolitana: $5000 \n" +
        "5-Milanesa riojana: $4000 \n" +
        "6-Milanesa suiza: $6000"));
}


function seleccionarMilanesa(menu, milanesas, seleccionadas) {
    let seleccion;
    switch (menu) {
        case 1:
            seleccion = milanesas[0];
            console.log(`${seleccion.nombre}: $${seleccion.precio}`);
            seleccionadas.push(seleccion);
            return seleccion.precio;
        case 2:
            seleccion = milanesas[1];
            console.log(`${seleccion.nombre}: $${seleccion.precio}`);
            seleccionadas.push(seleccion);
            return seleccion.precio;
        case 3:
            seleccion = milanesas[2];
            console.log(`${seleccion.nombre}: $${seleccion.precio}`);
            seleccionadas.push(seleccion);
            return seleccion.precio;
        case 4:
            seleccion = milanesas[3];
            console.log(`${seleccion.nombre}: $${seleccion.precio}`);
            seleccionadas.push(seleccion);
            return seleccion.precio;
        case 5:
            seleccion = milanesas[4];
            console.log(`${seleccion.nombre}: $${seleccion.precio}`);
            seleccionadas.push(seleccion);
            return seleccion.precio;
        case 6:
            seleccion = milanesas[5];
            console.log(`${seleccion.nombre}: $${seleccion.precio}`);
            seleccionadas.push(seleccion);
            return seleccion.precio;
        default:
            console.log("Opción no válida");
            return 0;
    }
}


let milanesas = [
    { nombre: "Milanesa de pollo", precio: 4000 },
    { nombre: "Milanesa de carne", precio: 5000 },
    { nombre: "Milanesa de ternera", precio: 6000 },
    { nombre: "Milanesa napolitana", precio: 5000 },
    { nombre: "Milanesa riojana", precio: 4000 },
    { nombre: "Milanesa suiza", precio: 6000 }
];

let nombre = prompt("Bienvenido! Escriba su usuario");
let contraseña = prompt("Escriba su contraseña");
let edad = parseInt(prompt("Ponga su edad"));

if (verificarUsuario(nombre, contraseña, edad)) {
    let continuar = true;
    let total = 0;
    let seleccionadas = [];
    let PlatosDisponibles = [1, 2, 3, 4, 5, 6];

    while (continuar) {
        let menu = mostrarMenu();

        if (PlatosDisponibles.includes(menu)) {
            total += seleccionarMilanesa(menu, milanesas, seleccionadas);
        } else {
            console.log("Lo siento, el plato seleccionado no está en stock");
        }

        let confirmacion = prompt("¿Desea hacer otro pedido? (si/no)").toLowerCase();
        if (confirmacion === "no") {
            continuar = false;
            console.log("Gracias por su pedido! El total es: $" + total);
            console.log("Milanesas seleccionadas: ", seleccionadas);
        }
    }
}