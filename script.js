// =================================
// KONFIGURASI API
// =================================

const API_URL =
"https://script.google.com/macros/s/AKfycbxELqlsvsAs06NsLFoVCfvfwRRV2IqZnijioyMK6HsZxwJ2i9Pu-XM-iiT62mxALl11oA/exec";


const AUTO_REFRESH = 30000;


let waktuSelesai = "-";




// =================================
// JAM DIGITAL
// =================================

function updateClock(){


    const sekarang = new Date();



    document.getElementById("jamDigital")
    .innerHTML =
    sekarang.toLocaleTimeString(
        "id-ID",
        {
            hour12:false
        }
    );



    document.getElementById("tanggal")
    .innerHTML =
    sekarang.toLocaleDateString(
        "id-ID",
        {
            weekday:"long",
            day:"numeric",
            month:"long",
            year:"numeric"
        }
    );


}







// =================================
// AMBIL DATA API
// =================================

async function loadJadwal(){


    try{


        const response =
        await fetch(
            API_URL + "?t=" + Date.now()
        );



        const data =
        await response.json();



        console.log(data);



        tampilkanJadwal(data);



    }

    catch(error){


        console.error(
            "Gagal mengambil data",
            error
        );


    }



}








// =================================
// TAMPILKAN DATA
// =================================

function tampilkanJadwal(data){

function tampilkanJadwal(data){

    console.log("MASUK TAMPILKAN JADWAL");
    console.log(data);
    console.log(data.jadwal);


    if(!data)
    return;



    // =====================
    // SETTING
    // =====================


    if(data.setting){


        if(data.setting.NamaSekolah){


            document
            .getElementById("namaSekolah")
            .innerHTML =
            data.setting.NamaSekolah;


        }


    }






    // =====================
    // JAM
    // =====================


    if(data.jam){



        document
        .getElementById("jamKe")
        .innerHTML =
        data.jam.jamKe;



        document
        .getElementById("namaJam")
        .innerHTML =
        data.jam.namaJam;



        document
        .getElementById("jamSelesai")
        .innerHTML =
        data.jam.selesai;



        waktuSelesai =
        data.jam.selesai;



    }







    // =====================
    // JADWAL KELAS
    // =====================


    let html="";



    if(
data.jadwal
){


    data.jadwal.forEach(
    item=>{


            html +=
`
<tr>

<td class="kelas">
${item.kelas}
</td>


<td>
${item.sekarang.mapel}
</td>


<td>
${item.sekarang.guru}
</td>


<td>
${item.berikutnya.mapel}
</td>


<td>
${item.berikutnya.guru}
</td>


</tr>
`;



        });



    }



    document
    .getElementById("dataJadwal")
    .innerHTML =
    html;



}








// =================================
// COUNTDOWN
// =================================

function updateCountdown(){


    if(
    waktuSelesai=="-" ||
    waktuSelesai==""
    ){


        document
        .getElementById("countdown")
        .innerHTML =
        "00:00:00";


        return;


    }




    let sekarang =
    new Date();



    let target =
    new Date();



    let waktu =
    waktuSelesai.split(":");



    target.setHours(
        Number(waktu[0])
    );


    target.setMinutes(
        Number(waktu[1])
    );


    target.setSeconds(0);





    let selisih =
    target - sekarang;



    if(selisih<0){

        selisih=0;

    }





    let jam =
    Math.floor(
        selisih/
        (1000*60*60)
    );



    let menit =
    Math.floor(
        (selisih%(1000*60*60))/
        (1000*60)
    );



    let detik =
    Math.floor(
        (selisih%(1000*60))/
        1000
    );




    document
    .getElementById("countdown")
    .innerHTML =

    String(jam).padStart(2,"0")
    +":"
    +
    String(menit).padStart(2,"0")
    +":"
    +
    String(detik).padStart(2,"0");



}







// =================================
// FULLSCREEN
// =================================

document
.getElementById("btnFullscreen")
.onclick=function(){


    if(
    !document.fullscreenElement
    ){


        document
        .documentElement
        .requestFullscreen();



    }

    else{


        document
        .exitFullscreen();


    }



};









// =================================
// START APLIKASI
// =================================

document.addEventListener(
"DOMContentLoaded",
function(){


    updateClock();


    loadJadwal();



    setInterval(
        updateClock,
        1000
    );



    setInterval(
        updateCountdown,
        1000
    );



    setInterval(
        loadJadwal,
        AUTO_REFRESH
    );
});
