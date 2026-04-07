class Hotel {
    constructor(nombre, direccion, habitaciones = []) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.habitaciones = JSON.parse(localStorage.getItem("habitaciones")) || habitaciones;
        this.clientes = JSON.parse(localStorage.getItem("clientes")) || [];
    }

    agregarHabitacion(habitacion) {
        if (!this.habitaciones.some(h => h.numero === habitacion.numero)) {
            this.habitaciones.push(habitacion);
            localStorage.setItem("habitaciones", JSON.stringify(this.habitaciones));
        }
    }

    registrarCliente(cliente) {
        if (!this.clientes.some(c => c.contacto === cliente.contacto)) {
            this.clientes.push(cliente);
            localStorage.setItem("clientes", JSON.stringify(this.clientes));
        }
    }

    mostrarInformacion() {
        console.log(`%c 🏨 BIENVENIDO A ${this.nombre.toUpperCase()} `, 'background: #004b6b; color: white; font-weight: bold; font-size: 1.2rem; padding: 5px;');
        console.log(`📍 Ubicación: ${this.direccion}`);
        console.log(`🛏️ Habitaciones disponibles: ${this.habitaciones.filter(h => h.estado === "disponible").length}`);
        console.log(`👥 Clientes registrados: ${this.clientes.length}`);
        console.log("-----------------------------------------");
    }
}

const hotel = new Hotel("Hotel Azul", "San José, Costa Rica");

const hab1 = new Habitacion(101, "estandar", 100, "disponible");
const hab2 = new Habitacion(102, "suite", 200, "disponible");
const hab3 = new Habitacion(103, "doble", 150, "ocupada");

hotel.agregarHabitacion(hab1);
hotel.agregarHabitacion(hab2);
hotel.agregarHabitacion(hab3);

hotel.mostrarInformacion();