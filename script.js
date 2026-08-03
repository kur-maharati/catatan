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
