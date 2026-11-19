// ====== PENGATURAN: ganti nomor WhatsApp Anda (format 62, tanpa + atau 0) ======
const NOMOR_WA = "6281287682125";

// ====== DATA SAPI: tambah/ubah sesuai stok Anda ======
const sapi = [
  {
    id: 1,
    nama: "Limousin Jantan Super",
    jenis: "Limousin",
    bobot: 720,
    umur: 36,
    harga: 38500000,
    kota: "Marche",
    stok: 2,
    warna: "#C9923F",
  },
  {
    id: 2,
    nama: "Simental Jantan Besar",
    jenis: "Simental",
    bobot: 680,
    umur: 34,
    harga: 35000000,
    kota: "Klaten",
    stok: 3,
    warna: "#B5651D",
  },
  {
    id: 3,
    nama: "Brahman Cross Standar",
    jenis: "Brahman",
    bobot: 520,
    umur: 30,
    harga: 24500000,
    kota: "Lampung",
    stok: 5,
    warna: "#9A9A94",
  },
  {
    id: 4,
    nama: "Sapi Pegon Super",
    jenis: "Pegon",
    bobot: 340,
    umur: 30,
    harga: 20000000,
    kota: "Madura",
    stok: 4,
    warna: "#8C4A2F",
  },
  {
    id: 5,
    nama: "Sapi Jersey Standar",
    jenis: "Jersey",
    bobot: 380,
    umur: 32,
    harga: 26000000,
    kota: "London",
    stok: 6,
    warna: "#E8E4D8",
  },
  {
    id: 6,
    nama: "Limousin Betina Bunting",
    jenis: "Limousin",
    bobot: 560,
    umur: 40,
    harga: 31000000,
    kota: "Semarang",
    stok: 1,
    warna: "#D4A35A",
  },
  {
    id: 7,
    nama: "Sapi Jersey Super",
    jenis: "Jersey",
    bobot: 450,
    umur: 28,
    harga: 40500000,
    kota: "London",
    stok: 0,
    warna: "#C07A3A",
  },
  {
    id: 8,
    nama: "Brahman Jantan Jumbo",
    jenis: "Brahman",
    bobot: 640,
    umur: 38,
    harga: 33000000,
    kota: "Lampung",
    stok: 2,
    warna: "#B0B0A8",
  },
  {
    id: 9,
    nama: "Sapi Pegon Kecil",
    jenis: "Pegon",
    bobot: 280,
    umur: 26,
    harga: 17000000,
    kota: "Madura",
    stok: 7,
    warna: "#7A3E26",
  },
];

const rupiah = (n) => "Rp " + n.toLocaleString("id-ID");
const $ = (id) => document.getElementById(id);

let filterJenis = "Semua";
let keranjang = [];
try {
  keranjang = JSON.parse(localStorage.getItem("keranjang-sapi")) || [];
} catch (e) {}

// ====== GAMBAR SAPI (SVG sederhana, warna mengikuti jenis) ======
function gambarSapi(w) {
  return `<svg viewBox="0 0 200 120" role="img" aria-label="Ilustrasi sapi">
    <rect x="40" y="35" width="105" height="50" rx="22" fill="${w}"/>
    <rect x="52" y="78" width="12" height="32" rx="5" fill="${w}"/><rect x="82" y="78" width="12" height="32" rx="5" fill="${w}"/>
    <rect x="102" y="78" width="12" height="32" rx="5" fill="${w}"/><rect x="128" y="78" width="12" height="32" rx="5" fill="${w}"/>
    <rect x="132" y="22" width="48" height="38" rx="16" fill="${w}"/>
    <path d="M140 24 q-6 -14 -14 -12 M172 24 q6 -14 14 -12" stroke="#E7E0CC" stroke-width="5" fill="none" stroke-linecap="round"/>
    <circle cx="165" cy="38" r="3" fill="#17211B"/><rect x="162" y="48" width="18" height="10" rx="5" fill="rgba(0,0,0,.2)"/>
    <path d="M42 48 q-18 6 -14 34" stroke="${w}" stroke-width="5" fill="none" stroke-linecap="round"/>
    <circle cx="70" cy="52" r="9" fill="rgba(0,0,0,.13)"/><circle cx="108" cy="62" r="11" fill="rgba(0,0,0,.13)"/>
  </svg>`;
}

// ====== DAFTAR PRODUK ======
function tampilProduk() {
  const kata = $("cari").value.toLowerCase().trim();
  let data = sapi.filter(
    (s) =>
      (filterJenis === "Semua" || s.jenis === filterJenis) &&
      (s.nama + s.jenis + s.kota).toLowerCase().includes(kata)
  );

  const urut = $("urut").value;
  if (urut === "murah") data.sort((a, b) => a.harga - b.harga);
  if (urut === "mahal") data.sort((a, b) => b.harga - a.harga);
  if (urut === "berat") data.sort((a, b) => b.bobot - a.bobot);

  $("hasil").textContent = `${data.length} sapi ditemukan`;
  $("grid").innerHTML = data.length
    ? data
        .map(
          (s) => `
    <article class="kartu">
      <div class="foto" style="background:${s.warna}22">
        ${gambarSapi(s.warna)}
        <span class="idtag">ID ${String(s.id).padStart(4, "0")}</span>
        ${s.stok === 0 ? '<div class="habis">Terjual</div>' : ""}
      </div>
      <div class="info">
        <h3>${s.nama}</h3>
        <p class="spek">${s.jenis} · ${s.bobot} kg · ${s.umur} bulan</p>
        <p class="spek">Lokasi kandang: ${s.kota}</p>
        <p class="harga">${rupiah(s.harga)}</p>
        <button data-id="${s.id}" ${s.stok === 0 ? "disabled" : ""}>${
            s.stok === 0 ? "Stok habis" : "Tambah ke keranjang"
          }</button>
      </div>
    </article>`
        )
        .join("")
    : '<p class="kosong">Tidak ada sapi yang cocok. Coba kata kunci atau jenis lain.</p>';
}

function tampilChip() {
  const jenis = ["Semua", ...new Set(sapi.map((s) => s.jenis))];
  $("chips").innerHTML = jenis
    .map(
      (j) =>
        `<button class="chip ${
          j === filterJenis ? "aktif" : ""
        }" data-j="${j}">${j}</button>`
    )
    .join("");
}

// ====== KERANJANG ======
function simpan() {
  localStorage.setItem("keranjang-sapi", JSON.stringify(keranjang));
}

function tambah(id) {
  const s = sapi.find((x) => x.id === id);
  const ada = keranjang.find((k) => k.id === id);
  if (ada) {
    if (ada.qty < s.stok) ada.qty++;
  } else keranjang.push({ id, qty: 1 });
  simpan();
  tampilKeranjang();
  bukaLaci();
}

function ubahQty(id, delta) {
  const s = sapi.find((x) => x.id === id);
  const k = keranjang.find((x) => x.id === id);
  k.qty = Math.min(s.stok, k.qty + delta);
  if (k.qty <= 0) keranjang = keranjang.filter((x) => x.id !== id);
  simpan();
  tampilKeranjang();
}

function hapus(id) {
  keranjang = keranjang.filter((x) => x.id !== id);
  simpan();
  tampilKeranjang();
}

function totalHarga() {
  return keranjang.reduce(
    (t, k) => t + sapi.find((s) => s.id === k.id).harga * k.qty,
    0
  );
}

function tampilKeranjang() {
  $("jumlah").textContent = keranjang.reduce((t, k) => t + k.qty, 0);
  $("total").textContent = rupiah(totalHarga());
  $("isi").innerHTML = keranjang.length
    ? keranjang
        .map((k) => {
          const s = sapi.find((x) => x.id === k.id);
          return `<div class="item">
      <div><b>${s.nama}</b><br><small>${s.jenis} · ${s.bobot} kg</small></div>
      <b>${rupiah(s.harga * k.qty)}</b>
      <div class="qty">
        <button data-aksi="kurang" data-id="${
          s.id
        }" aria-label="Kurangi">−</button>
        <span>${k.qty}</span>
        <button data-aksi="tambah" data-id="${s.id}" aria-label="Tambah" ${
            k.qty >= s.stok ? "disabled" : ""
          }>+</button>
        <button class="hapus" data-aksi="hapus" data-id="${s.id}">Hapus</button>
      </div></div>`;
        })
        .join("")
    : '<p class="kosong">Keranjang masih kosong. Pilih sapi dari daftar untuk memulai.</p>';
}

function bukaLaci() {
  $("laci").classList.add("buka");
  $("overlay").classList.add("buka");
}
function tutupLaci() {
  $("laci").classList.remove("buka");
  $("overlay").classList.remove("buka");
}

// ====== CHECKOUT LEWAT WHATSAPP ======
function checkout() {
  const nama = $("nama").value.trim(),
    alamat = $("alamat").value.trim();
  if (!keranjang.length) {
    $("pesanError").textContent = "Keranjang masih kosong.";
    return;
  }
  if (!nama || !alamat) {
    $("pesanError").textContent = "Isi nama dan alamat pengiriman dulu.";
    return;
  }
  $("pesanError").textContent = "";
  const baris = keranjang
    .map((k) => {
      const s = sapi.find((x) => x.id === k.id);
      return `- ${s.nama} (ID ${String(s.id).padStart(4, "0")}) x${
        k.qty
      } = ${rupiah(s.harga * k.qty)}`;
    })
    .join("\n");
  const pesan = `Halo, saya ingin memesan:\n${baris}\n\nTotal: ${rupiah(
    totalHarga()
  )}\nNama: ${nama}\nAlamat: ${alamat}`;
  window.open(
    `https://wa.me/${NOMOR_WA}?text=${encodeURIComponent(pesan)}`,
    "_blank"
  );
}

// ====== EVENT ======
$("grid").addEventListener("click", (e) => {
  const b = e.target.closest("button[data-id]");
  if (b) tambah(+b.dataset.id);
});
$("chips").addEventListener("click", (e) => {
  const b = e.target.closest("[data-j]");
  if (b) {
    filterJenis = b.dataset.j;
    tampilChip();
    tampilProduk();
  }
});
$("isi").addEventListener("click", (e) => {
  const b = e.target.closest("[data-aksi]");
  if (!b) return;
  const id = +b.dataset.id;
  if (b.dataset.aksi === "tambah") ubahQty(id, 1);
  if (b.dataset.aksi === "kurang") ubahQty(id, -1);
  if (b.dataset.aksi === "hapus") hapus(id);
});
$("cari").addEventListener("input", tampilProduk);
$("urut").addEventListener("change", tampilProduk);
$("btnKeranjang").addEventListener("click", bukaLaci);
$("tutup").addEventListener("click", tutupLaci);
$("overlay").addEventListener("click", tutupLaci);
$("checkout").addEventListener("click", checkout);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") tutupLaci();
});

tampilChip();
tampilProduk();
tampilKeranjang();
