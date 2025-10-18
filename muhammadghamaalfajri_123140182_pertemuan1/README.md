# 📚 Aplikasi Manajemen Tugas Mahasiswa

> Aplikasi web interaktif untuk membantu mahasiswa mengelola tugas dan aktivitas akademik dengan mudah dan efisien.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## 📖 Deskripsi

**Aplikasi Manajemen Tugas Mahasiswa** adalah web application sederhana namun powerful yang dirancang khusus untuk membantu mahasiswa mengorganisir tugas-tugas kuliah mereka. Aplikasi ini menggunakan teknologi web modern dan menyimpan data secara lokal menggunakan localStorage, sehingga data tugas tetap tersimpan meskipun browser ditutup.

### 🎯 Tujuan Aplikasi

- Memudahkan mahasiswa melacak deadline tugas
- Mengorganisir tugas berdasarkan mata kuliah
- Menampilkan statistik tugas yang perlu diselesaikan
- Memberikan peringatan untuk tugas yang mendekati deadline
- Menyediakan interface yang intuitif dan user-friendly

---

## ✨ Fitur Utama

### 1. **Manajemen Tugas (CRUD Operations)**
- ➕ **Create**: Tambah tugas baru dengan detail lengkap
- 📖 **Read**: Tampilkan semua tugas dalam daftar terorganisir
- ✏️ **Update**: Tandai tugas sebagai selesai atau belum selesai
- 🗑️ **Delete**: Hapus tugas yang sudah tidak diperlukan

### 2. **Sistem Penyimpanan Lokal**
- 💾 Data disimpan menggunakan **localStorage**
- 🔄 Data otomatis dimuat saat aplikasi dibuka
- 📊 Data tetap tersimpan meskipun browser ditutup
- ⚡ Update real-time setiap ada perubahan

### 3. **Validasi Form Komprehensif**
- ✅ Validasi nama tugas (minimal 3 karakter)
- ✅ Validasi mata kuliah (minimal 3 karakter)
- ✅ Validasi deadline (tidak boleh di masa lalu)
- ⚡ Validasi real-time saat mengetik
- 🎯 Pesan error yang jelas dan informatif

### 4. **Fitur Pencarian & Filter**
- 🔍 **Pencarian**: Cari tugas berdasarkan nama atau mata kuliah
- 📊 **Filter Status**: Tampilkan semua/selesai/belum selesai
- 📚 **Filter Mata Kuliah**: Filter berdasarkan mata kuliah spesifik
- 🎯 Kombinasi multiple filter untuk hasil lebih spesifik

### 5. **Statistik & Dashboard**
- 📈 Total jumlah tugas
- ⏳ Jumlah tugas yang belum selesai
- ✅ Jumlah tugas yang sudah selesai
- 🔥 Label urgency (Deadline Hari Ini, Deadline Dekat, Terlambat)

### 6. **User Interface Modern**
- 🎨 Design modern dengan gradient color
- 📱 Fully responsive (Desktop, Tablet, Mobile)
- 🌈 Smooth animations dan transitions
- 💡 Visual feedback untuk setiap aksi
- 🎯 Empty state yang informatif

---

## 📸 Screenshots

### 1. Dashboard Utama
![Dashboard](https://via.placeholder.com/800x450/667eea/ffffff?text=Dashboard+Utama+-+Statistik+dan+Form+Input)
*Tampilan dashboard dengan statistik real-time dan form input tugas baru*

### 2. Daftar Tugas & Filter
![Daftar Tugas](https://via.placeholder.com/800x450/764ba2/ffffff?text=Daftar+Tugas+-+Filter+dan+Pencarian)
*Fitur filter berdasarkan status dan mata kuliah, dengan pencarian tugas*

### 3. Manajemen Tugas
![Manajemen Tugas](https://via.placeholder.com/800x450/667eea/ffffff?text=Manajemen+Tugas+-+Edit+dan+Delete)
*Tampilan tugas dengan status selesai/belum, tombol aksi, dan label urgency*

### 4. Validasi Form
![Validasi Form](https://via.placeholder.com/800x450/e74c3c/ffffff?text=Validasi+Form+-+Error+Messages)
*Sistem validasi form dengan pesan error yang jelas*

### 5. Responsive Mobile
![Mobile View](https://via.placeholder.com/400x600/667eea/ffffff?text=Mobile+Responsive+View)
*Tampilan responsive untuk perangkat mobile*

> **Catatan**: Silakan ganti placeholder images di atas dengan screenshot aplikasi yang sebenarnya setelah aplikasi berjalan.

---

## 🚀 Cara Menjalankan Aplikasi

### Prasyarat
- Web browser modern (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code, Sublime Text, dll) - opsional untuk modifikasi

### Langkah Instalasi

1. **Clone Repository**
   ```bash
   git clone https://github.com/username/manajemen-tugas-mahasiswa.git
   cd manajemen-tugas-mahasiswa
   ```

2. **Struktur File**
   Pastikan struktur folder seperti berikut:
   ```
   manajemen-tugas-mahasiswa/
   ├── index.html
   ├── style.css
   ├── app.js
   └── README.md
   ```

3. **Jalankan Aplikasi**
   
   **Opsi 1: Langsung di Browser**
   - Double click file `index.html`
   - Atau klik kanan → Open with → Browser pilihan Anda

   **Opsi 2: Menggunakan Live Server (Recommended)**
   - Install extension "Live Server" di VS Code
   - Klik kanan pada `index.html` → "Open with Live Server"
   - Aplikasi akan terbuka di `http://localhost:5500`

   **Opsi 3: Menggunakan Python HTTP Server**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Buka browser dan akses http://localhost:8000
   ```

4. **Mulai Menggunakan**
   - Isi form untuk menambah tugas baru
   - Gunakan filter dan pencarian untuk mengelola tugas
   - Data akan tersimpan otomatis di localStorage

---

## 🛠️ Teknologi yang Digunakan

| Teknologi | Versi | Kegunaan |
|-----------|-------|----------|
| HTML5 | - | Struktur aplikasi |
| CSS3 | - | Styling dan layout responsive |
| JavaScript (ES6+) | - | Logic dan interaktivity |
| localStorage API | - | Penyimpanan data lokal |

---

## 📋 Daftar Fitur Lengkap

### Fitur Utama ✅

- [x] Tambah tugas baru dengan informasi lengkap
- [x] Edit status tugas (selesai/belum selesai)
- [x] Hapus tugas dengan konfirmasi
- [x] Validasi form input real-time
- [x] Pencarian tugas by keyword
- [x] Filter berdasarkan status
- [x] Filter berdasarkan mata kuliah
- [x] Statistik tugas real-time
- [x] Sorting tugas berdasarkan deadline
- [x] Label urgency untuk deadline
- [x] Penyimpanan data dengan localStorage
- [x] Responsive design untuk semua device
- [x] Empty state yang informatif
- [x] Smooth animations dan transitions

### Fitur Keamanan 🔒

- [x] XSS Prevention (escape HTML)
- [x] Input validation di client-side
- [x] Error handling untuk localStorage
- [x] Konfirmasi sebelum menghapus data

---

## 🔧 Penjelasan Teknis

### 1. **Implementasi localStorage**

localStorage adalah Web Storage API yang memungkinkan aplikasi menyimpan data di browser secara persisten.

#### Cara Kerja:

```javascript
// 1. Menyimpan data ke localStorage
function saveToLocalStorage() {
    try {
        // Convert array tasks menjadi JSON string
        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('taskIdCounter', taskIdCounter.toString());
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        alert('Gagal menyimpan data.');
    }
}

// 2. Mengambil data dari localStorage
function loadFromLocalStorage() {
    try {
        // Ambil data dan parse JSON string menjadi array
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
        }
        
        const storedCounter = localStorage.getItem('taskIdCounter');
        if (storedCounter) {
            taskIdCounter = parseInt(storedCounter);
        }
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        tasks = [];
        taskIdCounter = 1;
    }
}

// 3. Data dimuat saat halaman pertama kali dibuka
document.addEventListener('DOMContentLoaded', init);

function init() {
    loadFromLocalStorage();  // Load data dari storage
    renderTasks();           // Render ke UI
    updateStats();           // Update statistik
}

// 4. Data diperbarui setiap kali ada perubahan
function addTask(taskData) {
    tasks.push(taskData);
    saveToLocalStorage();  // ← Auto-save
    renderTasks();
}
```

#### Keuntungan localStorage:
- ✅ Data persisten (tidak hilang saat browser ditutup)
- ✅ Akses cepat (synchronous)
- ✅ Kapasitas 5-10MB per domain
- ✅ Mudah digunakan (key-value storage)

#### Limitasi:
- ⚠️ Hanya menyimpan string (perlu JSON.stringify/parse)
- ⚠️ Synchronous (dapat block UI jika data besar)
- ⚠️ Tidak terenkripsi (jangan simpan data sensitif)
- ⚠️ Per-domain (tidak shared antar domain)

---

### 2. **Sistem Validasi Form**

Aplikasi menggunakan validasi multi-layer untuk memastikan data yang diinput valid.

#### A. Validasi Real-time (Live Validation)

```javascript
// Validasi saat user mengetik
taskNameInput.addEventListener('input', () => {
    if (taskNameInput.value.trim() !== '') {
        taskNameError.style.display = 'none';  // Hide error
    }
});

courseNameInput.addEventListener('input', () => {
    if (courseNameInput.value.trim() !== '') {
        courseNameError.style.display = 'none';
    }
});

deadlineInput.addEventListener('change', () => {
    if (deadlineInput.value !== '') {
        deadlineError.style.display = 'none';
    }
});
```

#### B. Validasi Comprehensive Saat Submit

```javascript
function validateForm() {
    let isValid = true;

    // 1. Validasi Nama Tugas
    const taskName = taskNameInput.value.trim();
    if (taskName === '') {
        taskNameError.textContent = 'Nama tugas tidak boleh kosong';
        taskNameError.style.display = 'block';
        isValid = false;
    } else if (taskName.length < 3) {
        taskNameError.textContent = 'Nama tugas minimal 3 karakter';
        taskNameError.style.display = 'block';
        isValid = false;
    }

    // 2. Validasi Mata Kuliah
    const courseName = courseNameInput.value.trim();
    if (courseName === '') {
        courseNameError.textContent = 'Mata kuliah tidak boleh kosong';
        courseNameError.style.display = 'block';
        isValid = false;
    } else if (courseName.length < 3) {
        courseNameError.textContent = 'Nama mata kuliah minimal 3 karakter';
        courseNameError.style.display = 'block';
        isValid = false;
    }

    // 3. Validasi Deadline
    if (deadlineInput.value === '') {
        deadlineError.textContent = 'Deadline harus diisi';
        deadlineError.style.display = 'block';
        isValid = false;
    } else {
        const selectedDate = new Date(deadlineInput.value);
        const now = new Date();
        
        // Validasi: deadline tidak boleh di masa lalu
        if (selectedDate < now) {
            deadlineError.textContent = 'Deadline tidak boleh di masa lalu';
            deadlineError.style.display = 'block';
            isValid = false;
        }
    }

    return isValid;
}
```

#### C. Validasi di Event Handler

```javascript
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();  // Prevent default form submission

    // Jalankan validasi
    if (!validateForm()) {
        return;  // Stop jika validasi gagal
    }

    // Lanjutkan jika validasi berhasil
    const newTask = {
        id: taskIdCounter++,
        name: taskNameInput.value.trim(),
        course: courseNameInput.value.trim(),
        deadline: deadlineInput.value,
        completed: false,
        createdAt: new Date().toISOString()
    };

    tasks.push(newTask);
    saveToLocalStorage();
    renderTasks();
});
```

#### Jenis Validasi yang Diimplementasikan:

| Field | Validasi | Deskripsi |
|-------|----------|-----------|
| **Nama Tugas** | Required | Tidak boleh kosong |
| | Min Length | Minimal 3 karakter |
| | Trim | Whitespace dihilangkan |
| **Mata Kuliah** | Required | Tidak boleh kosong |
| | Min Length | Minimal 3 karakter |
| | Trim | Whitespace dihilangkan |
| **Deadline** | Required | Harus diisi |
| | Date Validation | Harus format datetime-local yang valid |
| | Past Date Check | Tidak boleh di masa lalu |

#### Keuntungan Sistem Validasi:

- ✅ **User Experience**: Feedback langsung saat input
- ✅ **Data Integrity**: Memastikan data valid sebelum disimpan
- ✅ **Error Prevention**: Mencegah error di runtime
- ✅ **Accessibility**: Pesan error yang jelas dan mudah dipahami

---

### 3. **Fitur Filter & Pencarian**

```javascript
function renderTasks() {
    const searchTerm = searchInput.value.toLowerCase();
    const statusFilter = filterStatus.value;
    const courseFilter = filterCourse.value;

    // Multiple filter combination
    let filteredTasks = tasks.filter(task => {
        const matchesSearch = 
            task.name.toLowerCase().includes(searchTerm) || 
            task.course.toLowerCase().includes(searchTerm);
        
        const matchesStatus = 
            statusFilter === 'all' || 
            (statusFilter === 'completed' && task.completed) ||
            (statusFilter === 'pending' && !task.completed);
        
        const matchesCourse = 
            courseFilter === 'all' || 
            task.course === courseFilter;

        return matchesSearch && matchesStatus && matchesCourse;
    });

    // Sort by deadline (ascending)
    filteredTasks.sort((a, b) => 
        new Date(a.deadline) - new Date(b.deadline)
    );

    // Render to DOM
    renderTaskList(filteredTasks);
}
```

---

### 4. **Security: XSS Prevention**

```javascript
// Escape HTML untuk mencegah XSS attacks
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Digunakan saat render
taskList.innerHTML = `
    <div class="task-title">${escapeHtml(task.name)}</div>
    <span class="badge">${escapeHtml(task.course)}</span>
`;
```

---

## 📊 Struktur Data

### Task Object Structure

```javascript
{
    id: 1,                              // Unique identifier
    name: "Laporan Praktikum",          // Nama tugas
    course: "Pemrograman Web",          // Mata kuliah
    deadline: "2024-12-31T23:59",       // ISO datetime string
    completed: false,                    // Status completion
    createdAt: "2024-10-18T10:30:00Z"   // Timestamp created
}
```

### localStorage Keys

```javascript
localStorage.setItem('tasks', '[{...}, {...}]');     // Array of tasks
localStorage.setItem('taskIdCounter', '5');          // Next available ID
```

---

## 🎯 Best Practices yang Diterapkan

### 1. **Code Organization**
- ✅ Separation of concerns (HTML/CSS/JS terpisah)
- ✅ Modular functions dengan single responsibility
- ✅ Descriptive variable dan function names
- ✅ JSDoc comments untuk dokumentasi

### 2. **Error Handling**
- ✅ Try-catch blocks untuk localStorage operations
- ✅ Fallback values jika data corrupt
- ✅ User-friendly error messages
- ✅ Console logging untuk debugging

### 3. **User Experience**
- ✅ Real-time validation feedback
- ✅ Smooth animations dan transitions
- ✅ Loading states (jika diperlukan)
- ✅ Confirmation dialogs untuk destructive actions
- ✅ Empty states yang informatif

### 4. **Performance**
- ✅ Efficient DOM manipulation
- ✅ Event delegation where appropriate
- ✅ Minimal reflows dan repaints
- ✅ Debouncing untuk search input (bisa ditambahkan)

### 5. **Accessibility**
- ✅ Semantic HTML elements
- ✅ Proper form labels
- ✅ Keyboard navigation support
- ✅ ARIA attributes (bisa ditingkatkan)
