"use strict";

const villas = [
    {
        id: "standard",
        name: "Vila Standard",
        price: 300000,
        badge: "Nyaman & praktis",
        description: "Pilihan nyaman untuk waktu berkualitas bersama keluarga kecil.",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=80",
        imageAlt: "Teras vila yang dikelilingi pepohonan hijau"
    },
    {
        id: "deluxe",
        name: "Vila Deluxe",
        price: 500000,
        badge: "Favorit tamu",
        description: "Ruang lebih lega dengan suasana alam untuk liburan istimewa.",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
        imageAlt: "Ruang vila deluxe dengan jendela menghadap alam"
    },
    {
        id: "premium",
        name: "Vila Premium",
        price: 750000,
        badge: "Ruang ekstra",
        description: "Kenyamanan ekstra dan fasilitas lengkap untuk seluruh keluarga.",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",
        imageAlt: "Vila premium dengan desain modern dan nyaman"
    }
];

const facilities = [
    { id: "pool", name: "Kolam renang", price: 100000 },
    { id: "breakfast", name: "Sarapan", price: 50000 },
    { id: "bbq", name: "Paket BBQ", price: 75000 }
];

const bookingForm = document.querySelector("#bookingForm");
const villaList = document.querySelector("#villaList");
const villaSelect = document.querySelector("#tipeVila");
const facilityOptions = document.querySelector("#facilityOptions");
const resultBox = document.querySelector("#hasilPesanan");
const guestNote = document.querySelector("#guestNote");
const checkinInput = document.querySelector("#checkin");
const checkoutInput = document.querySelector("#checkout");
const rupiahFormatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
});

function formatRupiah(amount) {
    return rupiahFormatter.format(amount).replace(/\u00a0/g, " ");
}

function buatElemen(tag, className, text) {
    const element = document.createElement(tag);
    if (className) {
        element.className = className;
    }
    if (text !== undefined) {
        element.textContent = text;
    }
    return element;
}

function renderVillas() {
    villas.forEach((villa) => {
        const card = buatElemen("article", "villa-card");
        const image = buatElemen("img", "villa-card__image");
        image.src = villa.image;
        image.alt = villa.imageAlt;
        image.loading = "lazy";

        const body = buatElemen("div", "villa-card__body");
        const topline = buatElemen("div", "villa-card__topline");
        const title = buatElemen("h3", "", villa.name);
        const badge = buatElemen("span", "villa-card__badge", villa.badge);
        topline.appendChild(title);
        topline.appendChild(badge);

        const description = buatElemen("p", "villa-card__description", villa.description);
        const bottom = buatElemen("div", "villa-card__bottom");
        const price = buatElemen("p", "villa-card__price");
        price.appendChild(document.createTextNode(formatRupiah(villa.price)));
        price.appendChild(buatElemen("span", "", "per kamar / malam"));

        const selectLink = buatElemen("a", "villa-card__select", "Pilih vila →");
        selectLink.href = "#pemesanan";
        selectLink.dataset.villaId = villa.id;
        selectLink.setAttribute("aria-label", `Pilih ${villa.name}`);
        bottom.appendChild(price);
        bottom.appendChild(selectLink);

        body.appendChild(topline);
        body.appendChild(description);
        body.appendChild(bottom);
        card.appendChild(image);
        card.appendChild(body);
        villaList.appendChild(card);
    });
}

function renderPilihanForm() {
    villas.forEach((villa) => {
        const option = document.createElement("option");
        option.value = villa.id;
        option.textContent = `${villa.name} — ${formatRupiah(villa.price)} / malam`;
        villaSelect.appendChild(option);
    });
    villaSelect.value = "deluxe";

    facilities.forEach((facility) => {
        const label = buatElemen("label", "facility-option");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "fasilitas";
        checkbox.value = facility.id;
        checkbox.setAttribute("aria-label", `${facility.name}, tambahan ${formatRupiah(facility.price)} per kamar per malam`);
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(`${facility.name} (+${formatRupiah(facility.price)})`));
        facilityOptions.appendChild(label);
    });
}

function formatTanggal(dateValue) {
    const [year, month, day] = dateValue.split("-").map(Number);
    return new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(new Date(year, month - 1, day));
}

function jumlahMalam(checkin, checkout) {
    const toUtcDay = (value) => {
        const [year, month, day] = value.split("-").map(Number);
        return Date.UTC(year, month - 1, day);
    };
    return (toUtcDay(checkout) - toUtcDay(checkin)) / 86400000;
}

function tanggalHariIni() {
    const today = new Date();
    return [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0")
    ].join("-");
}

function setTanggalMinimum() {
    const todayValue = tanggalHariIni();
    checkinInput.min = todayValue;
    checkoutInput.min = checkinInput.value
        ? tambahSatuHari(checkinInput.value)
        : tambahSatuHari(todayValue);
}

function tambahSatuHari(dateValue) {
    const [year, month, day] = dateValue.split("-").map(Number);
    const nextDay = new Date(year, month - 1, day + 1);
    return [
        nextDay.getFullYear(),
        String(nextDay.getMonth() + 1).padStart(2, "0"),
        String(nextDay.getDate()).padStart(2, "0")
    ].join("-");
}

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(`${fieldId}Error`);
    field.setAttribute("aria-invalid", message ? "true" : "false");
    error.textContent = message;
}

function validasiForm() {
    const nama = document.querySelector("#nama").value.trim();
    const email = document.querySelector("#email");
    const checkin = checkinInput.value;
    const checkout = checkoutInput.value;
    const jumlahKamar = Number(document.querySelector("#jumlahKamar").value);
    const todayValue = tanggalHariIni();

    const errors = {
        nama: nama ? "" : "Nama pemesan wajib diisi.",
        email: !email.value.trim()
            ? "Email wajib diisi."
            : (!email.validity.valid ? "Masukkan alamat email yang valid." : ""),
        checkin: !checkin
            ? "Tanggal check-in wajib dipilih."
            : (checkin < todayValue ? "Tanggal check-in tidak boleh di masa lalu." : ""),
        checkout: !checkout
            ? "Tanggal check-out wajib dipilih."
            : (checkin && checkout <= checkin ? "Check-out harus setelah tanggal check-in." : ""),
        jumlahKamar: !Number.isInteger(jumlahKamar) || jumlahKamar < 1 || jumlahKamar > 10
            ? "Jumlah kamar harus berupa angka 1 sampai 10."
            : ""
    };

    Object.entries(errors).forEach(([fieldId, message]) => showFieldError(fieldId, message));
    const firstInvalidField = Object.keys(errors).find((fieldId) => errors[fieldId]);
    if (firstInvalidField) {
        document.getElementById(firstInvalidField).focus();
        return false;
    }
    return true;
}

function hitungTotalHarga() {
    const villa = villas.find((item) => item.id === villaSelect.value);
    const selectedFacilities = facilities.filter((facility) =>
        bookingForm.querySelector(`input[name="fasilitas"][value="${facility.id}"]`).checked
    );
    const nights = jumlahMalam(checkinInput.value, checkoutInput.value);
    const rooms = Number(document.querySelector("#jumlahKamar").value);
    const nightlyRoomRate = villa.price + selectedFacilities.reduce((total, item) => total + item.price, 0);

    return {
        villa,
        selectedFacilities,
        nights,
        rooms,
        nightlyRoomRate,
        total: nightlyRoomRate * nights * rooms
    };
}

function appendSummaryRow(rows, label, value) {
    const row = buatElemen("div", "summary__row");
    row.appendChild(buatElemen("span", "", label));
    row.appendChild(buatElemen("strong", "", value));
    rows.appendChild(row);
}

function tampilkanRingkasan(order, storageWarning) {
    const summary = buatElemen("div", "summary");
    const header = buatElemen("div", "summary__header");
    const heading = buatElemen("div");
    heading.appendChild(buatElemen("h3", "", "Ringkasan pesanan"));
    heading.appendChild(buatElemen("p", "", `${order.nama} · ${order.email}`));
    header.appendChild(heading);
    header.appendChild(buatElemen("span", "villa-card__badge", `${order.nights} malam`));

    const rows = buatElemen("div", "summary__rows");
    appendSummaryRow(rows, "Tipe vila", order.villa.name);
    appendSummaryRow(rows, "Tanggal", `${formatTanggal(order.checkin)} – ${formatTanggal(order.checkout)}`);
    appendSummaryRow(rows, "Jumlah kamar", `${order.rooms} kamar`);
    appendSummaryRow(rows, "Harga vila", `${formatRupiah(order.villa.price)} × ${order.nights} malam × ${order.rooms} kamar`);
    if (order.selectedFacilities.length > 0) {
        const facilityText = order.selectedFacilities
            .map((facility) => `${facility.name} (${formatRupiah(facility.price)})`)
            .join(", ");
        appendSummaryRow(rows, "Fasilitas", facilityText);
    } else {
        appendSummaryRow(rows, "Fasilitas", "Tidak ada");
    }

    const total = buatElemen("div", "summary__total");
    total.appendChild(buatElemen("span", "", "Estimasi total"));
    total.appendChild(buatElemen("strong", "", formatRupiah(order.total)));
    summary.appendChild(header);
    summary.appendChild(rows);
    summary.appendChild(total);
    summary.appendChild(buatElemen("p", "summary__notice",
        `Perhitungan: vila dan fasilitas per kamar per malam × ${order.nights} malam × ${order.rooms} kamar. Ini adalah estimasi; belum ada pembayaran atau pengiriman pesanan.`));
    if (storageWarning) {
        summary.appendChild(buatElemen("p", "result-box__error", storageWarning));
    }

    resultBox.replaceChildren(summary);
}

function muatNamaTerakhir() {
    try {
        const lastName = localStorage.getItem("vilaPermaiNamaTerakhir");
        if (lastName) {
            guestNote.textContent = `Selamat datang kembali, ${lastName}.`;
        }
    } catch (error) {
        console.warn("Nama tamu terakhir tidak dapat dimuat dari penyimpanan lokal.", error);
    }
}

function simpanNamaTerakhir(name) {
    try {
        localStorage.setItem("vilaPermaiNamaTerakhir", name);
        guestNote.textContent = `Nama pemesan terakhir tersimpan di perangkat ini: ${name}.`;
        return "";
    } catch (error) {
        console.error("Nama tamu terakhir tidak dapat disimpan ke penyimpanan lokal.", error);
        return "Ringkasan berhasil dihitung, tetapi nama terakhir tidak dapat disimpan di perangkat ini.";
    }
}

villaList.addEventListener("click", (event) => {
    const link = event.target.closest("[data-villa-id]");
    if (link) {
        villaSelect.value = link.dataset.villaId;
    }
});

checkinInput.addEventListener("change", () => {
    checkoutInput.min = checkinInput.value
        ? tambahSatuHari(checkinInput.value)
        : tambahSatuHari(checkinInput.min);
});

bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validasiForm()) {
        resultBox.replaceChildren(buatElemen("p", "result-box__error", "Periksa kembali data pemesanan yang ditandai sebelum melanjutkan."));
        return;
    }

    const order = {
        nama: document.querySelector("#nama").value.trim(),
        email: document.querySelector("#email").value.trim(),
        checkin: checkinInput.value,
        checkout: checkoutInput.value,
        ...hitungTotalHarga()
    };
    const storageWarning = simpanNamaTerakhir(order.nama);
    tampilkanRingkasan(order, storageWarning);
});

renderVillas();
renderPilihanForm();
setTanggalMinimum();
muatNamaTerakhir();
