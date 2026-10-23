
// TOMBOL KLIK SAYA
const tombolSalam = document.getElementById("tombolSalam");

tombolSalam.addEventListener("click", function() {
    alert("Halo! Selamat datang di website portofolio saya.");
});


// MENU NAVIGASI MOBILE
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function() {
    navLinks.classList.toggle("active");

    const terbuka = navLinks.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", terbuka);
    menuToggle.setAttribute(
        "aria-label",
        terbuka ? "Tutup menu" : "Buka menu"
    );
});


// TUTUP MENU SAAT LINK DIKLIK
const links = document.querySelectorAll(".nav-links a");

links.forEach(function(link) {
    link.addEventListener("click", function() {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Buka menu");
    });
});


// TAHUN OTOMATIS PADA FOOTER
const tahun = document.getElementById("tahun");

tahun.textContent = new Date().getFullYear();


// ===== VALIDASI CONTACT FORM =====

// Mengambil elemen formulir
const contactForm = document.getElementById("contactForm");

const namaInput = document.getElementById("nama");
const emailInput = document.getElementById("email");
const pesanInput = document.getElementById("pesan");
const formStatus = document.getElementById("formStatus");

// Fungsi menampilkan pesan kesalahan
function tampilkanError(input, pesanError) {
    const errorElement = document.getElementById(
        input.id + "Error"
    );

    errorElement.textContent = pesanError;
    input.setAttribute("aria-invalid", "true");
}

// Fungsi menghapus pesan kesalahan
function hapusError(input) {
    const errorElement = document.getElementById(
        input.id + "Error"
    );

    errorElement.textContent = "";
    input.removeAttribute("aria-invalid");
}

// Bersihkan error ketika pengguna mengetik
[namaInput, emailInput, pesanInput].forEach(function(input) {
    input.addEventListener("input", function() {
        hapusError(input);
        formStatus.textContent = "";
    });
});

// Pemeriksaan ketika formulir dikirim
contactForm.addEventListener("submit", function(event) {

    let valid = true;

    const nama = namaInput.value.trim();
    const email = emailInput.value.trim();
    const pesan = pesanInput.value.trim();

    // Reset pesan error
    hapusError(namaInput);
    hapusError(emailInput);
    hapusError(pesanInput);
    formStatus.textContent = "";

    // Validasi nama
    if (nama.length < 2) {
        tampilkanError(
            namaInput,
            "Nama minimal harus 2 karakter."
        );
        valid = false;
    }

    // Validasi email
    const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!polaEmail.test(email)) {
        tampilkanError(
            emailInput,
            "Masukkan alamat email yang valid."
        );
        valid = false;
    }

    // Validasi pesan
    if (pesan.length < 10) {
        tampilkanError(
            pesanInput,
            "Pesan minimal harus 10 karakter."
        );
        valid = false;
    }

    // Jika ada input yang salah
    if (!valid) {
        event.preventDefault();

        formStatus.textContent =
            "Periksa kembali formulir kamu.";

        const inputSalah = contactForm.querySelector(
            '[aria-invalid="true"]'
        );

        if (inputSalah) {
            inputSalah.focus();
        }

        return;
    }

    // Cegah pengiriman ke email contoh
    if (contactForm.action.includes("emailkamu@gmail.com")) {
        event.preventDefault();

        formStatus.textContent =
            "Ganti email contoh dengan email kamu terlebih dahulu.";

        return;
    }

    // Semua data valid, lanjutkan submit
    formStatus.textContent =
        "Data valid. Membuka layanan pengiriman...";

});
