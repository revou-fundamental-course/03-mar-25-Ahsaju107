
// Fungsi untuk menampilkan menu mobile
function setupMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });

        // Menutup menu saat link diklik
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                navLinks.classList.remove('active');
            });
        });
    }
}

// Fungsi untuk menyapa pengunjung dengan nama
function setupWelcomeMessage() {
        const nameInput = document.getElementById('name-input');
        const setNameBtn = document.getElementById('set-name-btn');
        const visitorNameElement = document.getElementById('visitor-name');

        // Cek apakah elemen-elemen yang diperlukan ada
        if (nameInput && setNameBtn && visitorNameElement) {
            // Muat nama dari localStorage jika ada
            const savedName = localStorage.getItem('visitorName');
            if (savedName) {
                visitorNameElement.textContent = savedName;
            }

            // Event listener untuk tombol "Ganti Nama"
            setNameBtn.addEventListener('click', function() {
                const name = nameInput.value.trim();
                if (name) {
                    visitorNameElement.textContent = name;
                    localStorage.setItem('visitorName', name);
                    nameInput.value = '';
                    
                    // Tampilkan pesan
                    alert(`Selamat datang, ${name}!`);
                } else {
                    alert('Silakan masukkan nama Anda terlebih dahulu.');
                }
            });

            // Juga izinkan pengguna menekan Enter
            nameInput.addEventListener('keyup', function(event) {
                if (event.key === 'Enter') {
                    setNameBtn.click();
                }
            });
        }
}

// Fungsi untuk validasi form kontak
function setupContactForm() {
    const messageForm = document.getElementById('messageForm');
    
    if (messageForm) {
        messageForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Mendapatkan semua nilai input
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const subject = document.getElementById('subject')?.value.trim() || ''; // Subject mungkin tidak ada di semua form
            const message = document.getElementById('message').value.trim();
            
            // Reset pesan error sebelumnya
            const errorElements = document.querySelectorAll('.error-message');
            errorElements.forEach(element => {
                element.textContent = '';
            });
            
            // Flag untuk melacak validasi
            let isValid = true;
            
            // Validasi nama
            if (name === '') {
                document.getElementById('nameError').textContent = 'Nama tidak boleh kosong';
                isValid = false;
            } else if (name.length < 3) {
                document.getElementById('nameError').textContent = 'Nama minimal 3 karakter';
                isValid = false;
            }
            
            // Validasi email
            if (email === '') {
                document.getElementById('emailError').textContent = 'Email tidak boleh kosong';
                isValid = false;
            } else {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    document.getElementById('emailError').textContent = 'Format email tidak valid';
                    isValid = false;
                }
            }
            
            // Validasi nomor telepon
            if (phone === '') {
                document.getElementById('phoneError').textContent = 'Nomor telepon tidak boleh kosong';
                isValid = false;
            } else {
                const phoneRegex = /^\d{10,}$/;
                if (!phoneRegex.test(phone)) {
                    document.getElementById('phoneError').textContent = 'Nomor telepon harus berisi minimal 10 digit angka';
                    isValid = false;
                }
            }
            
            // Validasi subjek jika ada
            if (document.getElementById('subject') && subject === '') {
                document.getElementById('subjectError').textContent = 'Subjek tidak boleh kosong';
                isValid = false;
            }
            
            // Validasi pesan
            if (message === '') {
                document.getElementById('messageError').textContent = 'Pesan tidak boleh kosong';
                isValid = false;
            } else if (message.length < 10) {
                document.getElementById('messageError').textContent = 'Pesan terlalu pendek (minimal 10 karakter)';
                isValid = false;
            }
            
            // Jika validasi berhasil, tampilkan hasil
            if (isValid) {
                displayFormResult(name, email, phone, subject, message);
            }
        });
        
        // handler untuk tombol tutup pada hasil form
        const closeResultButton = document.getElementById('closeResult');
        if (closeResultButton) {
            closeResultButton.addEventListener('click', function() {
                document.getElementById('formResult').style.display = 'none';
            });
        }
    }
}

// Fungsi untuk menampilkan hasil form setelah submit
function displayFormResult(name, email, phone, subject, message) {
    const formResult = document.getElementById('formResult');
    const resultContent = document.getElementById('resultContent');
    
    if (formResult && resultContent) {
        let resultHTML = `
            <p><strong>Nama:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Nomor Telepon:</strong> ${phone}</p>
        `;
        
        if (subject) {
            resultHTML += `<p><strong>Subjek:</strong> ${subject}</p>`;
        }
        
        resultHTML += `<p><strong>Pesan:</strong> ${message}</p>`;
        
        resultContent.innerHTML = resultHTML;
        formResult.style.display = 'block';
        
        // Scroll ke hasil
        formResult.scrollIntoView({ behavior: 'smooth' });
        
        // Reset form
        document.getElementById('messageForm').reset();
    }
}

// Inisialisasi semua fungsi saat dokumen dimuat
document.addEventListener('DOMContentLoaded', function() {
    setupMobileMenu();
    setupWelcomeMessage();
    setupContactForm();
});