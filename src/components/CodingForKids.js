import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react"; // Menggunakan QRCodeCanvas
import { v4 as uuidv4 } from "uuid"; // Import UUID untuk QR Code unik
import "./CodingKids.scss";
import logo from "../assets/Levelup.png";

const CodingForKids = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);
    const [hasLaptop, setHasLaptop] = useState(true);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [showReceipt, setShowReceipt] = useState(false);
    const [qrValue, setQrValue] = useState("");

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const classOptions = [
        { kelas: 1, harga: "Rp100.000" },
        { kelas: 2, harga: "Rp150.000" },
        { kelas: 3, harga: "Rp200.000" },
        { kelas: 4, harga: "Rp250.000" },
        { kelas: 5, harga: "Rp300.000" },
        { kelas: 6, harga: "Rp350.000" },
        { kelas: 7, harga: "Rp400.000" },
        { kelas: 8, harga: "Rp450.000" },
        { kelas: 9, harga: "Rp500.000" },
        { kelas: 10, harga: "Rp550.000" },
        { kelas: 11, harga: "Rp600.000" },
        { kelas: 12, harga: "Rp650.000" }
    ];

    const selectedClassData = classOptions.find(option => option.kelas === selectedClass);

    // Fungsi untuk menampilkan struk pembayaran dengan QR Code unik
    const handleShowReceipt = () => {
        if (selectedClassData) {
            const randomQRCode = `https://pembayaran.example.com?kelas=${selectedClassData.kelas}&harga=${selectedClassData.harga}&id=${uuidv4()}`;
            setQrValue(randomQRCode);
            setShowReceipt(true);
        }
    };

    return (
        <>
           <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="logo">
          <img src={logo} alt="LEVEL UP Logo" />
        </a>
        {/* Tombol Hamburger */}
        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
<button
          className={`menu-toggle ${isOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle Navigation"
        >
          {isOpen ? "✖" : "☰"}
        </button>
        {/* Menu Links */}
        <ul className={`nav-links ${isOpen ? "active" : ""}`}>
          <li><a href="/">Kurikulum</a></li>
          <li><a href="/">Komunitas</a></li>
          <li><a href="/">Guru-guru</a></li>
          <li><a href="/">FAQs</a></li>
          <li className="mobile-btn"><a href="/" className="btn">Pesan Sekarang</a></li>
        </ul>
      </div>
    </nav>
            <section className="image-section">
                <div className="content-wrapper">
                    <div className="text-content">
                        <h4>Kode Menyenangkan, Kode Masa Depan</h4>
                        <h1>Coding untuk Anak Anak</h1>
                        <p>Jadikan anak Anda pahlawan super teknologi 🚀 tahun ini</p>
                        <ul className="feature-list">
                            <li>✔️ Dapatkan sertifikasi ahli</li>
                            <li>✔️ Jadwal kelas yang fleksibel</li>
                            <li>✔️ Persiapan kompetisi sekolah</li>
                            <li>✔️ Untuk usia 6-16 tahun</li>
                        </ul>
                    </div>

                    {/* Formulir Pendaftaran */}
                    <div className="container-box">
                        <h2>Daftar Sekarang dan Dapatkan Sertifikatnya</h2>

                        {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
                        <label>Kode Negara</label>
                        <div className="phone-input">
                            <span className="flag">🇮🇩 +62</span>
                            <input 
                                type="tel" 
                                placeholder="Nomor handphone" 
                                value={phoneNumber} 
                                onChange={(e) => setPhoneNumber(e.target.value)} 
                            />
                        </div>

                        <p>Silakan bagikan nomor yang Anda gunakan untuk WhatsApp</p>

                        <label htmlFor="class-selection">Pilih Kelas Anak</label>
                        <div id="class-selection" className="class-selection">
                            {classOptions.map(({ kelas, harga }) => (
                                <button
                                    key={`kelas-${kelas}`}
                                    type="button"
                                    className={selectedClass === kelas ? "selected" : ""}
                                    onClick={() => setSelectedClass(kelas)}
                                >
                                    Kelas {kelas} <br /> <span className="price">{harga}</span>
                                </button>
                            ))}
                        </div>

                        {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
<label>Apakah Anda memiliki laptop atau komputer?</label>
                        <div className="radio-group">
                            <label>
                                <input 
                                    type="radio" 
                                    name="laptop" 
                                    checked={hasLaptop} 
                                    onChange={() => setHasLaptop(true)} 
                                />
                                Ya
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    name="laptop" 
                                    checked={!hasLaptop} 
                                    onChange={() => setHasLaptop(false)} 
                                />
                                Tidak
                            </label>
                        </div>

                        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
<button className="cta-button" onClick={handleShowReceipt}>Pesan Kelas Uji Coba Gratis</button>
                    </div>
                </div>
            </section>

            {/* Modal Struk Pembayaran dengan QR Code */}
            {showReceipt && selectedClassData && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Struk Pembayaran</h2>
                        <p><strong>Nomor WhatsApp:</strong> {phoneNumber}</p>
                        <p><strong>Kelas yang Dipilih:</strong> Kelas {selectedClassData.kelas}</p>
                        <p><strong>Harga:</strong> {selectedClassData.harga}</p>
                        <p><strong>Memiliki Laptop:</strong> {hasLaptop ? "Ya" : "Tidak"}</p>

                        {/* QR Code untuk Pembayaran */}
                        <div className="qr-code">
                            <h3>Scan QR Code untuk Pembayaran</h3>
                            <QRCodeCanvas value={qrValue} size={150} />
                        </div>

                        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
<button className="close-button" onClick={() => setShowReceipt(false)}>Tutup</button>
                    </div>
                </div>
            )}

            <section className="why-choose-us">
                <div className="why-content">
                    <div className="text-section">
                        <h2>Mengapa harus <span className="highlight">LevelUP?</span></h2>
                        <p>
                            Temukan keunggulan di LevelUP, di mana 1% guru global terbaik 
                            memberikan pengalaman belajar yang luar biasa. Kuasai keterampilan 
                            coding mutakhir seperti <span className="highlight-bold">
                            Kecerdasan Buatan, Pembelajaran Mesin, Pemodelan 3D, Python, Robotika, 
                            dan Desain Game</span>, membuka kemungkinan tak terbatas untuk masa depan anak Anda.
                        </p>
                        <a href="/" className="read-more">Baca selengkapnya</a>
                    </div>
                    <div className="section-image">
                        
                    </div>
                </div>
            </section>
        </>
    );
};

export default CodingForKids;
