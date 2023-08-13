document.addEventListener("DOMContentLoaded", () => {
    const contenedorCarrito = document.querySelector(".cart-container");
    const totalCarrito = document.querySelector(".cart-total");
    const botonesAgregar = document.querySelectorAll(".btn-primary");
    const botonVaciarCarrito = document.querySelector(".clear-cart");
    const entradaBusqueda = document.querySelector("input[type='search']");
    const productos = [{
        nombre: "Pomada Brillante",
        precio: 1100,
        categoria: "Cabello"
      },
      {
        nombre: "Pomada Opaca",
        precio: 1200,
        categoria: "Cabello"
      },
      {
        nombre: "Shampoo para Barba",
        precio: 1299,
        categoria: "Barba"
      },
    {
        nombre: "Fortalecedor",
        precio: 1500,
        categoria: "Barba"
    },
    
    {
        nombre: "After Shave",
        precio: 1300,
        categoria: "Barba"
    },

    {
        nombre: "Crema para Barbear",
        precio: 1250,
        categoria: "Barba"
    },

    {
        nombre: "Shave Oil Pure",
        precio: 1100,
        categoria: "Barba"
    }
     ];
  
    let elementosCarrito = cargarElementosCarrito();
  
    botonesAgregar.forEach((boton, indice) => {
      boton.addEventListener("click", () => {
        agregarAlCarrito(productos[indice]);
      });
    });
  
    botonVaciarCarrito.addEventListener("click", () => {
      vaciarCarrito();
    });
  
    entradaBusqueda.addEventListener("input", () => {
      filtrarProductos(entradaBusqueda.value.toLowerCase());
    });
  
    function cargarElementosCarrito() {
      const elementosCarritoGuardados = localStorage.getItem("elementosCarrito");
      return elementosCarritoGuardados ? JSON.parse(elementosCarritoGuardados) : [];
    }
  
    function actualizarInterfazCarrito() {
      contenedorCarrito.innerHTML = "";
      let total = 0;
  
      elementosCarrito.forEach((item) => {
        const elementoCarrito = crearElementoCarrito(item);
        contenedorCarrito.appendChild(elementoCarrito);
        total += item.precio;
      });
  
      totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
      guardarElementosCarrito();
    }
  
    function agregarAlCarrito(producto) {
      elementosCarrito.push(producto);
      actualizarInterfazCarrito();
    }
  
    function vaciarCarrito() {
      elementosCarrito = [];
      actualizarInterfazCarrito();
    }
  
    function filtrarProductos(terminoBusqueda) {
      botonesAgregar.forEach((boton, indice) => {
        const producto = productos[indice];
        const mostrar = producto.nombre.toLowerCase().includes(terminoBusqueda) ? "block" : "none";
        boton.style.display = mostrar;
      });
    }
  
    function guardarElementosCarrito() {
      localStorage.setItem("elementosCarrito", JSON.stringify(elementosCarrito));
    }
  
    function crearElementoCarrito(item) {
      const elementoCarrito = document.createElement("div");
      elementoCarrito.classList.add("elemento-carrito");
      elementoCarrito.innerHTML = `
        <span>${item.nombre}</span>
        <span>$${item.precio}</span>
      `;
      return elementoCarrito;
    }
  
    actualizarInterfazCarrito();
  });
  