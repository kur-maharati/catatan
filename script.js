// =================================
// KONFIGURASI API
// =================================

const API_URL =
"https://script.google.com/macros/s/AKfycbyZ6PYYJD1-Rrd8JrL17y3Wws5FWxGqKoNutAtvFuy7YM5EiBhaPeNMdvJ_46qI4xC2-g/exec";



let waktuSelesai = "-";




// =================================
// JAM DIGITAL
// =================================

function updateClock(){


    const sekarang = new Date();



    let jam =
    String(sekarang.getHours())
    .padStart(2,"0");



    let menit =
    String(sekarang.getMinutes())
    .padStart(2,"0");



    let detik =
    String(sekarang.getSeconds())
    .padStart(2,"0");



    document
    .getElementById("jamDigital")
    .innerHTML =
    `${jam}:${menit}:${detik}`;




    let tanggal =
    sekarang.toLocaleDateString(
        "id-ID",
        {
            weekday:"long",
            day:"numeric",
            month:"long",
            year:"numeric"
        }
    );



    document
    .getElementById("tanggal")
    .innerHTML =
    tanggal;


}



setInterval(
updateClock,
1000
);


updateClock();






// =================================
// AMBIL DATA API
// =================================

function loadJadwal(){


fetch(API_URL)


.then(response=>response.json())


.then(data=>{


console.log(data);



tampilkanJadwal(data);



})


.catch(error=>{


console.log(
"Gagal mengambil API",
error
);


});


}







// =================================
// MENAMPILKAN JADWAL
// =================================

function tampilkanJadwal(data){



// ==========================
// JAM INFORMASI
// ==========================


document
.getElementById("jamKe")
.innerHTML =
data.jam.namaJam;



document
.getElementById("jamSelesai")
.innerHTML =
data.jam.selesai;



// simpan untuk countdown

waktuSelesai =
data.jam.selesai;






// ==========================
// TABEL SEMUA KELAS
// ==========================


let tabel="";



data.jadwal.data.forEach(
(item)=>{


tabel += `


<tr>


<td>
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





document
.getElementById("dataJadwal")
.innerHTML =
tabel;



}









// =================================
// COUNTDOWN OTOMATIS
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
parseInt(waktu[0])
);


target.setMinutes(
parseInt(waktu[1])
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
(selisih %
(1000*60*60))
/
(1000*60)
);



let detik =
Math.floor(
(selisih %
(1000*60))
/
1000
);





document
.getElementById("countdown")
.innerHTML =


String(jam)
.padStart(2,"0")

+

":"

+

String(menit)
.padStart(2,"0")

+

":"

+

String(detik)
.padStart(2,"0");



}



setInterval(
updateCountdown,
1000
);









// =================================
// FULLSCREEN
// =================================


document
.getElementById("btnFullscreen")
.onclick =
function(){



let layar =
document.documentElement;



if(
layar.requestFullscreen
){

layar.requestFullscreen();


}

else if(
layar.webkitRequestFullscreen
){

layar.webkitRequestFullscreen();


}


};










// =================================
// LOAD PERTAMA
// =================================


loadJadwal();




// =================================
// REFRESH DATA
// =================================


setInterval(
loadJadwal,
30000
);
