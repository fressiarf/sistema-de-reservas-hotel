class Habitacion {
    constructor(numero, tipo, precio, estado="disponible") {
        this.numero = numero;
        this.tipo = tipo;
        this.precio = precio;
        this.estado = estado;
    }
}

class GestorHabitaciones {
    constructor() {
        this.habitaciones = JSON.parse(localStorage.getItem("habitaciones")) || [];
    }

    agregarHabitacion(habitacion) {
        this.habitaciones.push(habitacion);
        localStorage.setItem("habitaciones", JSON.stringify(this.habitaciones));
        console.log("Habitación agregada exitosamente");
    }

    mostrarHabitaciones() {
        console.log("Habitaciones disponibles:");
        this.habitaciones.forEach(habitacion => {
            console.log(`- Número: ${habitacion.numero}, Tipo: ${habitacion.tipo}, Precio: ${habitacion.precio}, Estado: ${habitacion.estado}`);
        });
    }
}
