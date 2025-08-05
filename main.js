//menu
const navbarNav = document.querySelector('.navigation');
const menu = document.querySelector('#menu');
const icon = menu.querySelector('i');

menu.onclick = () => {
  navbarNav.classList.toggle('active');

  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-xmark');
};

document.addEventListener('click', function(e) {
  if (!menu.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove('active');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-xmark');
  }
});

//jadwal sholat
function updateJadwalSholat() {
  const now = new Date();
  const totalMenitSekarang = now.getHours() * 60 + now.getMinutes();

  const jadwalDivs = document.querySelectorAll(".jadwal div");
  let aktifIndex = -1;

  jadwalDivs.forEach((div, index) => {
    const timeText = div.querySelector("span").innerText;
    const [jam, menit] = timeText.split(":").map(Number);
    const totalMenitJadwal = jam * 60 + menit;

    if (
      totalMenitSekarang >= totalMenitJadwal &&
      totalMenitSekarang < totalMenitJadwal + 60
    ) {
      aktifIndex = index;
    }
  });

  jadwalDivs.forEach((div, index) => {
    div.classList.remove("now");
    
    const existingNote = div.querySelector("span.keterangan");
    if (existingNote) {
      existingNote.remove();
    }

    if (index === aktifIndex) {
      div.classList.add("now");

      const note = document.createElement("span");
      note.innerText = " Sedang Sholat";
      note.classList.add("keterangan");
      note.style.marginLeft = "10px";
      note.style.fontStyle = "italic";
      note.style.fontSize = "0.9em";
      note.style.color = "#004030";

      div.appendChild(note);
    }
  });
}

updateJadwalSholat();
setInterval(updateJadwalSholat, 60000);

//email kontak

emailjs.init("Iqqz1KZ4CELkF1XPr");

document.getElementById("formKontak").addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const pesan = document.getElementById("pesan").value;
  emailjs.send("service_2cte4b6", "template_59f3v8a", {
    title: "Pesan dari Website", 
    name: email.split("@")[0],
    email: email,
    message: pesan,
    time: new Date().toLocaleString()
  })
  .then(() => {
    showPopup("Pesan berhasil dikirim! Silakan cek email Anda atau folder spam.");
    document.getElementById("formKontak").reset();
  }, (error) => {
    alert("Gagal mengirim pesan: " + JSON.stringify(error));
  });
});

function showPopup(message) {
  const popup = document.getElementById("popupAlert");
  document.getElementById("popupMessage").textContent = message;
  popup.classList.remove("hidden");
  setTimeout(() => popup.classList.add("hidden"), 10000);
}

function closePopup() {
  const popup = document.getElementById("popupAlert");
  popup.classList.add("hidden");
}

