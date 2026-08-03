// =================================
// KONFIGURASI API
// =================================

const API_URL =
"https://script.google.com/macros/s/AKfycbyZ6PYYJD1-Rrd8JrL17y3Wws5FWxGqKoNutAtvFuy7YM5EiBhaPeNMdvJ_46qI4xC2-g/exec";

const AUTO_REFRESH = 30000;

let waktuSelesai = "-";



// =================================
// JAM DIGITAL
// =================================

function updateClock(){

    const sekarang = new Date();

    document.getElementById("jamDigital").innerHTML =
        sekarang.toLocaleTimeString("id-ID",{
            hour12:false
        });

    document.getElementById("tanggal").innerHTML =
        sekarang.toLocaleDateString("id-ID",{
            weekday:"long",
            day:"numeric",
            month:"long",
            year:"numeric"
        });

}

setInterval(updateClock,1000);
updateClock();




// =================================
// AMBIL DATA API
// =================================

async function loadJadwal(){

    try{

        const response = await fetch(API_URL + "?t=" + Date.now());

        const data = await response.json();

        console.log(data);

        if(data.status === false){

            console.error(data.message);

            return;

        }

        tampilkanJadwal(data);

    }catch(error){

        console.error(error);

    }

}






// =================================
// MENAMPILKAN DATA
// =================================

function tampilkanJadwal(data){

    if(!data) return;



    // =====================
    // Setting
    // =====================

    if(data.setting){

        if(data.setting.NamaSekolah){

            document.getElementById("namaSekolah").innerHTML =
            data.setting.NamaSekolah;

        }

    }



    // =====================
    // Jam
    // =====================

    if(data.jam){

        document.getElementById("jamKe").innerHTML =
        data.jam.namaJam || "-";


        document.getElementById("jamSelesai").innerHTML =
        data.jam.selesai || "-";


        waktuSelesai =
        data.jam.selesai || "-";

    }



    // =====================
    // Jadwal
    // =====================

    let html = "";

    if(data.jadwal && data.jadwal.data){

        data.jadwal.data.forEach(item=>{

            html += `
            <tr>

                <td class="kelas">
                    ${item.kelas}
                </td>

                <td class="mapel">
                    ${item.sekarang?.mapel ?? "-"}
                </td>

                <td class="guru">
                    ${item.sekarang?.guru ?? "-"}
                </td>

                <td class="mapel-next">
                    ${item.berikutnya?.mapel ?? "-"}
                </td>

                <td class="guru-next">
                    ${item.berikutnya?.guru ?? "-"}
                </td>

            </tr>
            `;

        });

    }

    document.getElementById("dataJadwal").innerHTML = html;

}






// =================================
// COUNTDOWN
// =================================

function updateCountdown(){

    if(waktuSelesai=="-" || waktuSelesai==""){

        document.getElementById("countdown").innerHTML =
        "00:00:00";

        return;

    }

    const sekarang = new Date();

    const target = new Date();

    const waktu = waktuSelesai.split(":");

    target.setHours(parseInt(waktu[0]));
    target.setMinutes(parseInt(waktu[1]));
    target.setSeconds(0);

    let selisih = target - sekarang;

    if(selisih<=0){

    document.getElementById("countdown").innerHTML =
    "00:00:00";

    return;

}

    const jam =
    Math.floor(selisih/3600000);

    const menit =
    Math.floor((selisih%3600000)/60000);

    const detik =
    Math.floor((selisih%60000)/1000);

    document.getElementById("countdown").innerHTML =
        String(jam).padStart(2,"0") + ":" +
        String(menit).padStart(2,"0") + ":" +
        String(detik).padStart(2,"0");

}

setInterval(updateCountdown,1000);






// =================================
// FULLSCREEN
// =================================

document.getElementById("btnFullscreen").onclick=function(){

    if(!document.fullscreenElement){

        document.documentElement.requestFullscreen();

    }else{

        document.exitFullscreen();

    }

};






// =================================
// START APLIKASI
// =================================

document.addEventListener("DOMContentLoaded", async () => {

    updateClock();

    await loadJadwal();

    updateCountdown();

    setInterval(updateClock,1000);

    setInterval(updateCountdown,1000);

    setInterval(loadJadwal,AUTO_REFRESH);

});
