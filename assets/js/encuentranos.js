document.addEventListener("DOMContentLoaded", () => {

    const contenedor = document.getElementById("contenedorSucursales");
    const buscador = document.getElementById("buscador");
    const totalCiudades = document.getElementById("totalCiudades");
    const totalLocales = document.getElementById("totalLocales");

    const ciudadesOrdenadas = [...redComercial].sort((a, b) =>
        a.ciudad.localeCompare(b.ciudad)
    );

    function render(filtro = "") {

        contenedor.innerHTML = "";

        let ciudadesVisibles = 0;
        let localesVisibles = 0;

        ciudadesOrdenadas.forEach(ciudad => {

            const establecimientos = ciudad.establecimientos.filter(local => {

                const texto = (
                    ciudad.ciudad +
                    " " +
                    local.nombre
                ).toLowerCase();

                return texto.includes(filtro.toLowerCase());

            });

            if (establecimientos.length === 0) return;

            ciudadesVisibles++;
            localesVisibles += establecimientos.length;

            const card = document.createElement("div");

            card.className =
                "bg-white/55 backdrop-blur-xl rounded-3xl border border-white shadow-xl p-6 hover:shadow-2xl transition duration-300";

            card.innerHTML = `

                <div class="flex justify-between items-center mb-5">

                    <h2 class="text-2xl font-bold text-emerald-700">

                        <i class="fas fa-location-dot mr-2"></i>

                        ${ciudad.ciudad}

                    </h2>

                    <span class="bg-emerald-100 text-emerald-700 text-sm font-semibold px-3 py-1 rounded-full">

                        ${establecimientos.length}

                    </span>

                </div>

                <div class="grid gap-3">

                    ${establecimientos.map(local => `

                        <div class="bg-white rounded-xl border border-stone-200 px-4 py-3 flex items-center gap-3 hover:bg-emerald-50 transition">

                            <i class="fas fa-store text-emerald-600"></i>

                            <span class="font-medium text-stone-700">

                                ${local.nombre}

                            </span>

                        </div>

                    `).join("")}

                </div>

            `;

            contenedor.appendChild(card);

        });

        totalCiudades.textContent = ciudadesVisibles;
        totalLocales.textContent = localesVisibles;

    }

    buscador.addEventListener("input", e => {

        render(e.target.value);

    });

    render();

});