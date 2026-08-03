async function loadData() {

    const status = document.getElementById("status");

    try {

        status.innerHTML = "Mengambil data...";

        const response = await fetch(CONFIG.API_URL);

        const data = await response.json();

        console.log(data);

        status.innerHTML = "Berhasil";

    } catch (e) {

        console.error(e);

        status.innerHTML = e.message;

    }

}

loadData();
