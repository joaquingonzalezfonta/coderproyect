let productosEnCarrito = JSON.parse(localStorage.getItem("productoCarrito")) || [];

// const nombreUsuario = document.getElementById('nombreUsuario');
const nombreGuardado = localStorage.getItem("Nombre");
if (nombreGuardado) {
    nombreUsuario.textContent = nombreGuardado;
}

function actualizarContador() {
    const total = productosEnCarrito.reduce((sum, prod) => sum + prod.cantidad, 0);
    document.getElementById('contadorCarrito').textContent = total;
}

function renderizarProductoEnCarrito(producto) {
    const listaCarrito = document.querySelector("#lista-carrito");
    let li = document.querySelector(`#lista-carrito li[data-product="${producto.nombre}"]`);

    if (!li) {
        li = document.createElement("li");
        li.setAttribute('data-product', producto.nombre);

        li.innerHTML = `
            <div>${producto.nombre} x<span class="cantidad">${producto.cantidad}</span></div>
            <button class="buttonCart">Borrar</button>
        `;

        li.querySelector('.buttonCart').addEventListener('click', () => eliminarProductoCarrito(producto.nombre, li));
        listaCarrito.appendChild(li);
    } else {
        li.querySelector('.cantidad').textContent = producto.cantidad;
    }
}

function eliminarProductoCarrito(nombreProducto, liElement) {
    productosEnCarrito = productosEnCarrito.filter(p => p.nombre !== nombreProducto);
    localStorage.setItem('productoCarrito', JSON.stringify(productosEnCarrito));
    liElement.remove();
    actualizarContador();

    Swal.fire({ title: "Paquete eliminado", icon: "success" });
}

function eliminarTodosLosProductosCarrito() {
    productosEnCarrito = [];
    localStorage.setItem('productoCarrito', JSON.stringify(productosEnCarrito));

    const listaCarrito = document.querySelector('#lista-carrito');
    if (listaCarrito) {
        listaCarrito.innerHTML = '';
    }

    actualizarContador();
}

productosEnCarrito.forEach(producto => renderizarProductoEnCarrito(producto));
actualizarContador();

const btnCarrito = document.getElementById('btn-carrito');
const carrito = document.getElementById('carrito');
const overlay = document.getElementById('overlay');
const cerrarCarrito = document.getElementById('cerrar-carrito');
const finzalizarButton = document.getElementById('finalizar-compra')
const compraContenedor = document.getElementById('compra')
const cerrarOrden = document.getElementById('cerrar-orden')
const overlayCompra = document.getElementById('overlayCompra')
const pagoDefinitivo = document.getElementById('pagoDefinitivo')


btnCarrito.addEventListener('click', () => {
    carrito.classList.remove('oculto');
    overlay.classList.remove('oculto');
});

cerrarCarrito.addEventListener('click', cerrarCarritoOverlay);
overlay.addEventListener('click', cerrarCarritoOverlay);

function cerrarCarritoOverlay() {
    carrito.classList.add('oculto');
    overlay.classList.add('oculto');
}

finzalizarButton.addEventListener('click', () => {
    compraContenedor.classList.remove('oculto');
    overlayCompra.classList.remove('oculto');
});

cerrarOrden.addEventListener('click', cerrarCompraOverlay);
overlay.addEventListener('click', cerrarCompraOverlay);

function cerrarCompraOverlay() {
    compraContenedor.classList.add('oculto');
    overlayCompra.classList.add('oculto');
}

pagoDefinitivo.addEventListener('click', () => {
    eliminarTodosLosProductosCarrito()
    cerrarCompraOverlay()
    cerrarCarritoOverlay()

    Swal.fire({
        title: "Compra exitosa",
        icon: "success",
        draggable: true
    });
})


const nameInput = document.getElementById('name')
const mail = document.getElementById('mail')
const number = document.getElementById('number')

function validarInputsCompra() {
    pagoDefinitivo.disabled = !(
        nameInput.value.trim() &&
        mail.value.trim() &&
        number.value.trim()
    );
}

[nameInput, mail, number].forEach(input => {
    input.addEventListener('input', validarInputsCompra);
});

function activarBotonesAgregar() {
    document.querySelectorAll('.buttonCard').forEach(boton => {
        boton.addEventListener('click', () => {

            // const nombreProducto = contenedor.querySelector('.nombreProducto').textContent.trim();
            const nombreProducto = boton.closest('.bodyCardContainer').querySelector('.nombreProducto').textContent.trim();

            if (nombreProducto) {
                const productoExistente = productosEnCarrito.find(p => p.nombre === nombreProducto);

                if (productoExistente) {
                    productoExistente.cantidad++;
                    renderizarProductoEnCarrito(productoExistente);
                } else {
                    const nuevoProducto = {
                        nombre: nombreProducto,
                        cantidad: 1
                    };
                    productosEnCarrito.push(nuevoProducto);
                    renderizarProductoEnCarrito(nuevoProducto);
                }

                localStorage.setItem('productoCarrito', JSON.stringify(productosEnCarrito));
                actualizarContador();

                Toastify({
                    text: "Producto agregado!",
                    gravity: "bottom",
                    position: "right",
                    duration: 1500,
                    style: {
                        background: "linear-gradient(to right, #8eb69b, #235347)"
                    }
                }).showToast();
            }
        });
    });
}