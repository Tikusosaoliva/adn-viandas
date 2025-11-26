// VARIABLES GLOBALES

// Array donde guardamos todos los pedidos
let pedidos = [];

// Contador para dar un ID único a cada pedido
let idContador = 1;

// Elementos del HTML que voy a usar (los busco una sola vez)
const form = document.querySelector("form");
const tbody = document.getElementById("tablaPedidos");



// CUANDO SE ENVÍA EL FORMULARIO
form.addEventListener("submit", function(e) {
    
    e.preventDefault(); // Evito que la página se recargue
    
    // Leo los valores de los campos
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const plan = document.getElementById("plan").value;
    const cantidad = document.getElementById("cantidad").value;
    const comentarios = document.getElementById("comentarios").value.trim();
    
    // VALIDACIÓN: verifico que los campos obligatorios no estén vacíos
    if (!nombre || !email || !telefono || !plan || !cantidad) {
        alert("Por favor, completá todos los campos obligatorios");
        return;
    }
    
    // Creo el objeto pedido y lo agrego al array
    pedidos.push({
        id: idContador++, // Le doy un ID y sumo 1 al contador para que el próximo id sea distinto
        nombre: nombre,
        email: email,
        telefono: telefono,
        direccion: direccion,
        plan: plan,
        cantidad: cantidad,
        comentarios: comentarios,
        atendido: false // Por defecto, el pedido no está atendido
    });
    
    form.reset(); // Limpio el formulario
    mostrarPedidos(); // Actualizo la tabla
    alert("¡Pedido cargado correctamente!");
});


// MOSTRAR PEDIDOS EN LA TABLA
function mostrarPedidos() {
    
    tbody.innerHTML = ""; // Limpio la tabla
    
    // Recorro cada pedido y creo una fila
    for (let i = 0; i < pedidos.length; i++) {
        const p = pedidos[i];
        
        // Creo la fila
        const fila = document.createElement("tr");
        
        // Si está atendido, le cambio el estilo
        if (p.atendido) {
            fila.style.backgroundColor = "#d4edda";
            fila.style.textDecoration = "line-through";
            fila.style.opacity = "0.7";
        }
        
        // Lleno la fila con los datos
        fila.innerHTML = `
            <td>${p.nombre}</td>
            <td>${p.plan}</td>
            <td>${p.cantidad}</td>
            <td>${p.telefono}</td>
            <td>
                <input type="checkbox" class="check-atendido" data-id="${p.id}" ${p.atendido ? "checked" : ""}>
                <label>Atendido</label>
                <button class="btn-eliminar" data-id="${p.id}">Eliminar</button>
            </td>
        `;
        
        tbody.appendChild(fila);
    }
    
    // Ahora agrego los eventos a todos los elementos nuevos
    agregarEventos();
}


// AGREGAR EVENTOS A CHECKBOXES Y BOTONES
function agregarEventos() {
    
    // EVENTO: Marcar como atendido
    const checks = document.querySelectorAll(".check-atendido");
    for (let i = 0; i < checks.length; i++) {
        checks[i].addEventListener("change", function() {
            const id = Number(this.getAttribute("data-id"));
            
            // Busco el pedido y cambio su estado
            for (let j = 0; j < pedidos.length; j++) {
                if (pedidos[j].id == id) {
                    pedidos[j].atendido = this.checked;
                    break;
                }
            }
            
            mostrarPedidos(); // Actualizo la vista
        });
    }
    
    // EVENTO: Eliminar pedido
    const botones = document.querySelectorAll(".btn-eliminar");
    for (let i = 0; i < botones.length; i++) {
        botones[i].addEventListener("click", function() {
            const id = Number(this.getAttribute("data-id"));
            
            // Busco el pedido y lo elimino del array
            for (let j = 0; j < pedidos.length; j++) {
                if (pedidos[j].id == id) {
                    pedidos.splice(j, 1);
                    break;
                }
            }
            
            mostrarPedidos(); // Actualizo la vista
        });
    }
}