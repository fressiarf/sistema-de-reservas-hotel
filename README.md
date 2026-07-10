# Sistema de Reservas — Hotel Azul

Aplicación web para la gestión de reservas hoteleras: catálogo de habitaciones, formulario de reserva con validaciones y cancelación de reservas por correo electrónico.

**Stack:** HTML · CSS · JavaScript (Vanilla) · Node.js · Express · LocalStorage · SweetAlert2 · Font Awesome

---

## Estructura

```
sistema-de-reservas-hotel/
├── server.js              # Servidor Express (sirve el frontend estático)
├── package.json
└── public/
    ├── pages/
    │   ├── home.html          # Página principal (hero + comodidades)
    │   ├── reservas.html      # Catálogo de habitaciones disponibles
    │   └── formReserva.html   # Formulario de reserva y cancelación
    └── src/
        ├── css/
        │   ├── home.css           # Estilos globales, navbar, hero, footer
        │   ├── reservas.css       # Estilos del catálogo de habitaciones
        │   └── formReservas.css   # Estilos del formulario de reserva
        └── js/
            ├── cliente.js           # Clase Cliente + GestorClientes (localStorage)
            ├── habitación.js        # Clase Habitacion + GestorHabitaciones (localStorage)
            ├── hotel.js             # Clase Hotel + inicialización de datos de ejemplo
            ├── habitacionesData.js  # Datos visuales (imágenes, descripciones, íconos)
            ├── renderHabitaciones.js # Renderiza tarjetas de habitaciones dinámicamente
            ├── reservas.js          # Clase Reserva + GestorReservas + lógica del formulario
            └── home.js              # Navbar sticky + animaciones fade-in con IntersectionObserver
```

---

## Requisitos

- Node.js 18+

---

## Puesta en marcha

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar el servidor
npm start
# → http://localhost:3001
```

> El servidor sirve los archivos estáticos desde `/public`. No hay base de datos: la persistencia se maneja con **localStorage** en el navegador del usuario.

---

## Scripts

| Script        | Acción                        |
|---------------|-------------------------------|
| `npm start`   | Arranca el servidor Express   |
| `npm run dev` | Igual que `start` (alias)     |

---

## Páginas

| Ruta                       | Descripción                                                 |
|----------------------------|-------------------------------------------------------------|
| `/`                        | Landing page: hero, bienvenida y sección de comodidades     |
| `/pages/reservas.html`     | Catálogo de habitaciones (tarjetas generadas dinámicamente) |
| `/pages/formReserva.html`  | Formulario para reservar o cancelar una habitación          |

---

## Habitaciones disponibles

| Tipo interno | Nombre en UI             | Precio / noche |
|--------------|--------------------------|----------------|
| `estandar`   | Standard Ocean View      | $100           |
| `suite`      | Suite Mar Abierto        | $200           |
| `doble`      | Habitación Doble Confort | $150           |

Las habitaciones se registran en `localStorage` la primera vez que se carga `hotel.js`.

---

## Modelos de datos (frontend)

### `Cliente`
```js
{ nombre, identificacion, contacto }
```
Persistido en `localStorage["clientes"]`.

### `Habitacion`
```js
{ numero, tipo, precio, estado }  // estado: "disponible" | "ocupada"
```
Persistido en `localStorage["habitaciones"]`.

### `Reserva`
```js
{ cliente, habitacion, fechaEntrada, fechaSalida, estado }
// estado: "Disponible" | "Ocupada" | "Cancelada"
```
Persistido en `localStorage["reservas"]`.

---

## Flujo de reserva

1. El usuario navega a **Habitaciones** y selecciona una disponible.
2. Se redirige a **Formulario de Reserva** con la habitación preseleccionada via query param (`?habitacion=...`).
3. El usuario completa nombre, apellido, email, teléfono y fechas de entrada/salida.
4. Al confirmar, se crea un objeto `Reserva` y se guarda en `localStorage`. SweetAlert2 muestra la confirmación.
5. Para **cancelar**, el usuario ingresa su email; el gestor localiza la reserva y cambia su estado a `"Cancelada"`.

---

## Tecnologías

| Tecnología           | Uso                                               |
|----------------------|---------------------------------------------------|
| Express 4            | Servidor HTTP para servir los archivos estáticos  |
| LocalStorage         | Persistencia de clientes, habitaciones y reservas |
| SweetAlert2          | Modales de confirmación y cancelación             |
| Font Awesome 6       | Iconografía en comodidades, footer y tarjetas     |
| IntersectionObserver | Animaciones fade-in al hacer scroll               |

---

## Contacto (datos del hotel de demostración)

- 📍 Costa Pacífico, San José, Costa Rica
- 📞 +506 8888-0000
- ✉️ info@hotelazul.com
