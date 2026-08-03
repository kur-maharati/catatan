let DATA = {};

async function loadData(){

    try{

        const response = await fetch(CONFIG.API_URL);

        DATA = await response.json();

        console.log(DATA);

        document.getElementById("status").innerHTML =
            "Data berhasil dimuat";

    }

    catch(err){

        console.log(err);

        document.getElementById("status").innerHTML =
            "Tidak dapat mengambil data";

    }

}

loadData();
