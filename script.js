async function obtenerHoraCiudad() {
    const inputCiudad = document.getElementById('cityInput');
    const resultadoDiv = document.getElementById('result');

    let nombreCiudad = inputCiudad.value.trim();

    if (!nombreCiudad) {
        alert('Por favor, ingrese el nombre de la ciudad.');
        return;
    }

    const apiKey = '8f46b02ec861cb89422b6096325b337f';

    async function actualizarHora(ciudad) {
        try {
            const urlApiHoraCiudad = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}`;
            const respuesta = await fetch(urlApiHoraCiudad);
            const datos = await respuesta.json();

            if (respuesta.ok) {
                const zonaHorariaCiudad = datos.timezone / 3600;
                const offset = (zonaHorariaCiudad > 0 ? '+' : '') + zonaHorariaCiudad;

                const fechaUTC = new Date();
                fechaUTC.setUTCHours(fechaUTC.getUTCHours() + zonaHorariaCiudad);

                const formattedDate = `${fechaUTC.getUTCFullYear()}-${String(fechaUTC.getUTCMonth() + 1).padStart(2, '0')}-${String(fechaUTC.getUTCDate()).padStart(2, '0')} ${String(fechaUTC.getUTCHours()).padStart(2, '0')}:${String(fechaUTC.getUTCMinutes()).padStart(2, '0')}:${String(fechaUTC.getUTCSeconds()).padStart(2, '0')}`;

                resultadoDiv.innerHTML = '';

                resultadoDiv.innerHTML = `${ciudad}: ${formattedDate}`;
            } else {
                resultadoDiv.innerHTML = `Error al obtener datos para ${ciudad}: ${datos.message}`;
            }
        } catch (error) {
            console.error(`Error al obtener datos para ${ciudad}:`, error);
        }
    }

    if (window.intervaloCiudad) {
        clearInterval(window.intervaloCiudad);
    }

    window.intervaloCiudad = setInterval(() => actualizarHora(nombreCiudad), 1000);

    actualizarHora(nombreCiudad);
}




function verReloj() {
    document.getElementById('relojContainer').style.display = 'block';
    document.getElementById('cronometroContainer').style.display = 'none';
}

function verCronometro() {
    document.getElementById('relojContainer').style.display = 'none';
    document.getElementById('cronometroContainer').style.display = 'block';
}

let cronometro;
let tiempo = 0;

function iniciarCronometro() {
    if (!cronometro) {
        cronometro = setInterval(() => {
            const segundos = tiempo % 60;
            const minutos = Math.floor(tiempo / 60) % 60;
            const horas = Math.floor(tiempo / 3600);

            const formattedTime = `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;

            document.getElementById('cronometroResultado').innerHTML = `Tiempo: ${formattedTime}`;

            tiempo++;
        }, 1000);
    }
}

function detenerCronometro() {
    clearInterval(cronometro);
    cronometro = null;
}

function borrarCronometro() {
    detenerCronometro();
    tiempo = 0;
    document.getElementById('cronometroResultado').innerHTML = 'Tiempo: 00:00:00';
}
