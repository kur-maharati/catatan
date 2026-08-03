document.getElementById("status").textContent =
"Website berhasil dimuat.";

document.getElementById("fullscreenBtn").onclick = () => {

    if(!document.fullscreenElement){

        document.documentElement.requestFullscreen();

    }else{

        document.exitFullscreen();

    }

};

for(let i=1;i<=9;i++){

    document.getElementById("gridKelas").innerHTML += `

        <div class="card">

            <div class="namaKelas">

                Kelas ${i}

            </div>

            <div>

                Menunggu data...

            </div>

        </div>

    `;

}
