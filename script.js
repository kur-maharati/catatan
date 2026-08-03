let DATA = {};

async function loadData() {

    try {

        const response = await fetch(CONFIG.API_URL);

        if (!response.ok) {

            throw new Error("API Error");

        }

        DATA = await response.json();

        console.log(DATA);

        document.getElementById("status").innerHTML =
            "✅ Data berhasil dimuat";

        showSchoolName();

        showClasses();

    }

    catch (err) {

        console.log(err);

        document.getElementById("status").innerHTML =
            "❌ Gagal mengambil data";

    }

}
function showSchoolName(){

    if(!DATA.setting) return;

    document.getElementById("schoolName").innerHTML =
        DATA.setting.NAMA_SEKOLAH;

}
function showClasses(){

    const grid = document.getElementById("gridKelas");

    grid.innerHTML = "";

    DATA.kelas.forEach(kelas=>{

        if(kelas.Aktif!=true && kelas.Aktif!="TRUE")
            return;

        grid.innerHTML += `

        <div class="card">

            <div class="kelas">

                ${kelas.Kelas}

            </div>

            <div class="jadwal">

                Menunggu jadwal...

            </div>

        </div>

        `;

    });

}
loadData();

setInterval(loadData,CONFIG.REFRESH_INTERVAL);
