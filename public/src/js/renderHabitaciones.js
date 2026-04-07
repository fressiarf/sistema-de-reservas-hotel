const habitacionesGrid = document.getElementById('habitaciones-grid');

function renderizarHabitaciones() {
    const habitaciones = JSON.parse(localStorage.getItem("habitaciones")) || [];
    
    habitacionesGrid.innerHTML = "";

    habitaciones.forEach(hab => {
        const extra = infoExtra[hab.tipo] || infoExtra["estandar"];
        const estaOcupada = hab.estado.toLowerCase() === "ocupada";

        const card = document.createElement('div');
        card.className = `room-card is-visible ${estaOcupada ? 'room-occupied' : ''}`;
        
        card.innerHTML = `
            <div class="room-img" style="${estaOcupada ? 'filter: grayscale(1);' : ''}">
                <img src="${extra.img}" alt="${extra.nombreUI}">
                ${estaOcupada ? '<div class="occupied-tag">OCUPADA</div>' : ''}
            </div>
            <div class="room-info">
                <h3>${extra.nombreUI}</h3>
                <ul class="room-features">
                    <li><i class="fa-solid ${extra.iconos[0]}"></i> #${hab.numero}</li>
                    <li><i class="fa-solid ${extra.iconos[1]}"></i> ${hab.tipo.toUpperCase()}</li>
                </ul>
                <p>${extra.desc}</p>
                <p><strong>Precio: $${hab.precio} por noche</strong></p>
                ${estaOcupada 
                    ? `<button class="btn-secondary" style="color: #999; border-color: #ccc; cursor: not-allowed;" disabled>No disponible</button>`
                    : `<a href="/pages/formReserva.html?habitacion=${extra.nombreUI}" class="btn-secondary">Reservar Ahora</a>`
                }
            </div>
        `;
        habitacionesGrid.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', renderizarHabitaciones);
