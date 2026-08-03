let DATA = {};

async function loadData() {

    try {

        document.getElementById("status").innerHTML = "Mengambil data...";

        const response = await fetch(CONFIG.API_URL + "?t=" + new Date().getTime(), {
            method: "GET",
            cache: "no-cache"
        });

        console.log("Status:", response.status);

        if (!response.ok) {
            throw new Error("HTTP " + response.status);
        }

        DATA = await response.json();

        console.log("DATA:", DATA);

        showSchoolName();
        showClasses();

        document.getElementById("status").innerHTML = "✅ Data berhasil dimuat";

    } catch (err) {

        console.error("ERROR:", err);

        document.getElementById("status").innerHTML =
            "❌ " + err.message;

    }

}

function showSchoolName() {

    if (!DATA.setting) return;

    document.getElementById("schoolName").textContent =
        DATA.setting.NAMA_SEKOLAH;

}

function showClasses() {

    const grid = document.getElementById("gridKelas");

    grid.innerHTML = "";

    if (!DATA.kelas) return;

    DATA.kelas.forEach(kelas => {

        if (!kelas.Aktif) return;

        grid.innerHTML += `
        <div class="card">
            <div class="kelas">${kelas.Kelas}</div>
            <div class="jadwal">Menunggu jadwal...</div>
        </div>`;
    });

}

loadData();

setInterval(loadData, CONFIG.REFRESH_INTERVAL);
