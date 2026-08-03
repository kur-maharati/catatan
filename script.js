// =================================
// KONFIGURASI
// =================================


const API_URL =
"https://script.google.com/macros/s/AKfycbwnHcUsBzP4Xj5A_5FzzmkMS_5-58-AmdvmwLsao974YP8oJeywcYR5OppK2ShsWxY7VA/exec";




// =================================
// JAM DIGITAL
// =================================


function updateClock(){


let now = new Date();


let jam =
String(now.getHours())
.padStart(2,"0");


let menit =
String(now.getMinutes())
.padStart(2,"0");


let detik =
String(now.getSeconds())
.padStart(2,"0");



document
.getElementById("jamDigital")
.innerHTML =
`${jam}:${menit}:${detik}`;



let hari =
now.toLocaleDateString(
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
hari;


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



tampilkanData(data);



})



.catch(error=>{


console.log(error);


});



}







// =================================
// TAMPILKAN DATA
// =================================


function tampilkanData(data){



// jam ke


document
.getElementById("jamKe")
.innerHTML =
data.jamKe;



document
.getElementById("jamSelesai")
.innerHTML =
data.selesai;





let tabel="";





data.data.forEach(item=>{


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


function countdown(){



let selesai =
document
.getElementById("jamSelesai")
.innerHTML;



if(
selesai=="-" ||
selesai==""
){

return;

}



let sekarang =
new Date();



let target =
new Date();



let bagian =
selesai.split(":");



target.setHours(
bagian[0]
);

target.setMinutes(
bagian[1]
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
countdown,
1000
);









// =================================
// FULLSCREEN
// =================================


document
.getElementById("btnFullscreen")
.onclick=function(){


let elem =
document.documentElement;



if(
elem.requestFullscreen
){

elem.requestFullscreen();

}


};








// =================================
// AUTO REFRESH DATA
// =================================



loadJadwal();



setInterval(
loadJadwal,
30000
);
