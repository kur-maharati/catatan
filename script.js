// =================================
// KONFIGURASI API
// =================================

const API_URL =
"https://script.google.com/macros/s/AKfycbwnHcUsBzP4Xj5A_5FzzmkMS_5-58-AmdvmwLsao974YP8oJeywcYR5OppK2ShsWxY7VA/exec";




// =================================
// JAM DIGITAL
// =================================

function updateClock(){

    const sekarang = new Date();


    let jam = String(
        sekarang.getHours()
    ).padStart(2,"0");


    let menit = String(
        sekarang.getMinutes()
    ).padStart(2,"0");


    let detik = String(
        sekarang.getSeconds()
    ).padStart(2,"0");


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
// AMBIL DATA DARI APPS SCRIPT API
// =================================

function loadJadwal(){


fetch(API_URL)


.then(response => response.json())


.then(data => {


    console.log(data);


    tampilkanJadwal(data);


})


.catch(error => {

    console.log(
        "Gagal mengambil data",
        error
    );

});


}






// =================================
// MENAMPILKAN DATA JADWAL
// =================================

function tampilkanJadwal(data){



// Jam Ke

document
.getElementById("jamKe")
.innerHTML =
data.jamKe;



// Jam selesai

document
.getElementById("jamSelesai")
.innerHTML =
data.selesai;




let tabel = "";




// semua kelas

data.data.forEach(
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
// COUNTDOWN
// =================================

function updateCountdown(){



let selesai =
document
.getElementById("jamSelesai")
.innerHTML;




if(
selesai === "-" ||
selesai === ""
){

return;

}





let sekarang =
new Date();



let target =
new Date();



let waktu =
selesai.split(":");



target.setHours(
parseInt(waktu[0])
);


target.setMinutes(
parseInt(waktu[1])
);


target.setSeconds(0);





let selisih =
target - sekarang;




if(selisih < 0){

selisih = 0;

}




let jam =
Math.floor(
selisih /
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
// AUTO LOAD DATA
// =================================


// pertama kali buka

loadJadwal();



// update setiap 30 detik

setInterval(
loadJadwal,
30000
);
