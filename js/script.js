console.log("Hola");

function saludar(nombre, edad) {
    console.log(`Bienvenido a JavaScript, ${nombre}. Tenes ${edad} años verdad?`)
}

saludar("Juan", 18);

let edad = 12
let apellido = prompt("Cual es su apellido?");
console.log("Su apellido es: ", apellido)

function entrarPagina() {
    if (edad >= 18) {
        console.log("Podes entrar a esta pagina")
    } else (
        console.log("Volve a probar el año que viene amigo")
    )
}

entrarPagina();



