class Cliente {
    constructor(nombre,identificacion,contacto) {
        this.nombre = nombre;
        this.identificacion = identificacion;
        this.contacto = contacto;
    }
}

class GestorClientes {
    constructor() {
        this.clientes = JSON.parse(localStorage.getItem("clientes")) || [];
    }

    agregarCliente(cliente) {
        this.clientes.push(cliente);
        localStorage.setItem("clientes", JSON.stringify(this.clientes));
        console.log("Cliente agregado exitosamente");
    }

    mostrarClientes() {
        console.log("Clientes registrados:");
        this.clientes.forEach(cliente => {
            console.log(`- Nombre: ${cliente.nombre}, Identificación: ${cliente.identificacion}, Contacto: ${cliente.contacto}`);
        });
    }
}