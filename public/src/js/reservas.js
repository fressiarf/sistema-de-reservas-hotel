const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const email = document.getElementById("email");
const telefono = document.getElementById("telefono");
const habitacion = document.getElementById("habitacion");
const fechaEntrada = document.getElementById("fechaEntrada");
const fechaSalida = document.getElementById("fechaSalida");
const formReserva = document.getElementById("reservaForm");

class Reserva {
    constructor(cliente, habitacion, fechaEntrada, fechaSalida, estado = "Disponible") {
        this.cliente = cliente;
        this.habitacion = habitacion;
        this.fechaEntrada = fechaEntrada;
        this.fechaSalida = fechaSalida;
        this.estado = estado;
    }
}

class GestorReservas {
    constructor() {
        this.reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    }

    agregarReserva(reserva) {
        const ocupada = this.reservas.some(r => r.habitacion === reserva.habitacion && r.estado === "Ocupada");
        if (ocupada) {
            console.log("La habitacion ya esta ocupada");
            return;
        }
        this.reservas.push(reserva);
        localStorage.setItem("reservas", JSON.stringify(this.reservas));
        console.log("Reserva agregada exitosamente");
    }

    mostrarReservas() {
        console.log("Reservas actuales:");
        this.reservas.forEach(reserva => {
            console.log(`- Cliente: ${reserva.cliente.nombre}, Habitación: ${reserva.habitacion}, Fecha Entrada: ${reserva.fechaEntrada}, Fecha Salida: ${reserva.fechaSalida}, Estado: ${reserva.estado}`);
        });
    }

    cancelarReserva(emailCliente) {
        const reserva = this.reservas.find(r => r.cliente.contacto === emailCliente);
        if (reserva) {
            reserva.estado = "Cancelada";
            localStorage.setItem("reservas", JSON.stringify(this.reservas));
            console.log(`%c Reserva Cancelada `, 'background: #e74c3c; color: white; font-weight: bold;');
            console.log(`La reserva de ${reserva.cliente.nombre} para la ${reserva.habitacion} ha sido cancelada.`);
        } else {
            console.log("No se encontró ninguna reserva con el email: " + emailCliente);
        }
    }
}

const gestorReservas = new GestorReservas();

function realizarReserva() {
    if (formReserva && !formReserva.checkValidity()) {
        formReserva.reportValidity();
        return;
    }

    const habitacionesData = JSON.parse(localStorage.getItem("habitaciones")) || [];
    
    const habSeleccionada = habitacionesData.find(h => {
        const info = infoExtra[h.tipo];
        return info && info.nombreUI === habitacion.value;
    }) || { precio: 0 };

    const clienteObj = new Cliente(nombre.value, apellido.value, email.value);
    const reservaObj = new Reserva(clienteObj, habitacion.value, fechaEntrada.value, fechaSalida.value, "Ocupada");

    gestorReservas.agregarReserva(reservaObj);

    const misReservas = gestorReservas.reservas.filter(r => r.cliente.contacto === email.value && r.estado === "Ocupada");
    const habitacionesLista = misReservas.map(r => r.habitacion).join(", ");

    console.log(`%c ¡Reserva Confirmada! `, 'background: #004b6b; color: white; font-weight: bold;');
    console.log(`${nombre.value} ahora tiene reservadas: [${habitacionesLista}]`);
    console.log(`Reserva actual: ${habitacion.value} (Costo: $${habSeleccionada.precio}/noche).`);

    Swal.fire({
        title: '¡Reserva Exitosa!',
        text: `Has reservado la habitación ${habitacion.value}. Tienes un total de ${misReservas.length} habitaciones a tu nombre.`,
        icon: 'success',
        confirmButtonColor: '#004b6b'
    });
    
    formReserva.reset();
    establecerFechaMinima();
}

function cancelarMiReserva() {
    Swal.fire({
        title: 'Cancelar Reserva',
        text: 'Por favor, ingresa el correo electrónico asociado a la reserva:',
        input: 'email',
        inputPlaceholder: 'tu-correo@ejemplo.com',
        showCancelButton: true,
        confirmButtonText: 'Confirmar Cancelación',
        cancelButtonText: 'Cerrar',
        confirmButtonColor: '#e74c3c',
        cancelButtonColor: '#aaa',
        inputValidator: (value) => {
            if (!value) {
                return '¡Necesitas escribir un correo!';
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const emailIngresado = result.value;
            gestorReservas.cancelarReserva(emailIngresado);
            
            Swal.fire({
                title: 'Solicitud Procesada',
                text: `Se ha gestionado la cancelación para ${emailIngresado}. Revisa la consola para más detalles.`,
                icon: 'success',
                confirmButtonColor: '#004b6b'
            });
        }
    });
}

function establecerFechaMinima() {
    if (!fechaEntrada || !fechaSalida) return;

    const hoy = new Date().toISOString().split('T')[0];
    const anioActual = new Date().getFullYear();
    const finDeAnio = `${anioActual}-12-31`;
    
    fechaEntrada.setAttribute('min', hoy);
    fechaSalida.setAttribute('min', hoy);

    fechaEntrada.setAttribute('max', finDeAnio);
    fechaSalida.setAttribute('max', finDeAnio);

    const validarAnio = (input) => {
        if (!input.value) return;
        const partes = input.value.split('-');
        const anioInput = parseInt(partes[0]);
        if (anioInput > anioActual || partes[0].length > 4) {
            input.value = `${anioActual}-${partes[1]}-${partes[2]}`;
        }
    };

    fechaEntrada.addEventListener('change', () => {
        validarAnio(fechaEntrada);
        fechaSalida.setAttribute('min', fechaEntrada.value);
        if (fechaSalida.value && fechaSalida.value < fechaEntrada.value) {
            fechaSalida.value = fechaEntrada.value;
        }
    });

    fechaSalida.addEventListener('change', () => {
        validarAnio(fechaSalida);
    });
}

document.addEventListener('DOMContentLoaded', establecerFechaMinima);
