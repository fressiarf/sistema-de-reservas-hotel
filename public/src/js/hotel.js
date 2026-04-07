class Hotel {
    constructor(nombre, direccion,habitaciones=[]) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.habitaciones = JSON.parse(localStorage.getItem("habitaciones")) || habitaciones;
    
        this.clientes = [];
    }

    agregarHabitacion(habitacion) {
        this.habitaciones.push(habitacion);
        localStorage.setItem("habitaciones",JSON.stringify(this.habitaciones));
        console.log("La habitacion ha sido agregada con exito");
        
    }
    
    registrarCliente(cliente) {
      
        this.clientes.push(cliente);
        localStorage.setItem("clientes",JSON.stringify(this.clientes));
        console.log("El ciente se registro correctamente");
        
    }
    mostrarClientes() {
        console.log("Clientes registrados en el hotel:");
        this.clientes.forEach(cliente => {
            console.log(`- ${cliente.nombre} (${cliente.identificacion})`);
        });
    }
    mostrarHabitaciones() {
        console.log("Habitaciones disponibles en el hotel:");
        this.habitaciones.forEach(habitacion => {
            console.log(`- ${habitacion.numero} (${habitacion.tipo})`);
        });
    }


}



const hotel =new Hotel ("Hotel Azul","San Jose, Costa Rica")
const cliente1 = new Cliente("Naho", "123456789","naho@gmail.com")
const cliente2 = new Cliente("Fressia", "987654321","fressia@gmail.com")

hotel.registrarCliente(cliente1);
hotel.registrarCliente(cliente2);

hotel.mostrarClientes();

const habitacionStandar = new Habitacion(101, "estandar", 100,"disponible");
const habitacionSuite = new Habitacion(102, "suite", 200,"disponible");
const habitacionDoble = new Habitacion(103, "doble", 150,"ocupada");

hotel.agregarHabitacion(habitacionStandar);
hotel.agregarHabitacion(habitacionSuite);
hotel.agregarHabitacion(habitacionDoble);

hotel.mostrarHabitaciones();