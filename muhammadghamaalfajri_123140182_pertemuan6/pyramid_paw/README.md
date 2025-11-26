
# Aplikasi Manajemen Matakuliah

Aplikasi ini adalah RESTful API sederhana yang dibangun menggunakan framework **Pyramid** dan database **PostgreSQL**. Aplikasi ini menyediakan layanan pengelolaan data matakuliah yang memungkinkan pengguna untuk melakukan operasi CRUD (Create, Read, Update, Delete).

## Deskripsi Proyek

Proyek ini dibuat untuk memenuhi Tugas Praktikum pembuatan API. Sistem ini menggunakan:
* **Framework:** Pyramid
* **Database:** PostgreSQL
* **ORM:** SQLAlchemy
* **Migration Tool:** Alembic
* **Template:** Cookiecutter (Starter)

---

## Cara Instalasi

Ikuti langkah-langkah berikut untuk menyiapkan lingkungan pengembangan (environment) dari nol.

### 1. Membuat Virtual Environment

Pastikan Anda berada di direktori root proyek.

```bash
# Membuat virtual environment
python -m venv venv

# Mengaktifkan virtual environment
# Untuk Windows:
venv\Scripts\activate
# Untuk macOS/Linux:
source venv/bin/activate
````

### 2\. Instalasi Dependensi

Install paket Pyramid dan dependensi lainnya dalam mode *editable*.

```bash
pip install --upgrade pip setuptools
pip install -e ".[testing]"
pip install psycopg2-binary
```

### 3\. Konfigurasi Database

1.  Pastikan PostgreSQL sudah berjalan.
2.  Buat database dan user baru (jalankan di pgAdmin atau terminal `psql`):

<!-- end list -->

```sql
CREATE USER pyramid_user WITH ENCRYPTED PASSWORD 'password123';
CREATE DATABASE pyramid_matakuliah;
GRANT ALL PRIVILEGES ON DATABASE pyramid_matakuliah TO pyramid_user;
```

3.  Edit file `development.ini` di root proyek. Ubah baris `sqlalchemy.url` menjadi:

<!-- end list -->

```ini
sqlalchemy.url = postgresql://pyramid_user:password123@localhost:5432/pyramid_matakuliah
```

-----

## Cara Menjalankan Aplikasi

### 1\. Menjalankan Migrasi Database

Jalankan perintah berikut untuk membuat tabel `matakuliah` di database:

```bash
# Membuat file revisi migrasi
alembic -c development.ini revision --autogenerate -m "init matakuliah"

# Menerapkan migrasi (membuat tabel)
alembic -c development.ini upgrade head
```

### 2\. Mengisi Data Awal (Seeding)

Untuk mengisi database dengan 3 data awal:

```bash
python -m pyramid_paw.scripts.initialize_db development.ini
```

*(Catatan: Ganti `pyramid_paw` dengan nama folder package Anda jika berbeda)*

### 3\. Menjalankan Server

Jalankan server development:

```bash
pserve development.ini --reload
```

Server akan berjalan di: `http://localhost:6543`

-----

## API Endpoints & Testing

Berikut adalah dokumentasi endpoint yang tersedia beserta contoh pengujian menggunakan `curl`.

### 1\. Get All Matakuliah

Mendapatkan daftar seluruh matakuliah.

  * **URL:** `/api/matakuliah`
  * **Method:** `GET`

**Request:**

```bash
curl -X GET http://localhost:6543/api/matakuliah
```

**Response:**

```json
{
  "matakuliahs": [
    {
      "id": 1,
      "kode_mk": "IF101",
      "nama_mk": "Algoritma dan Pemrograman",
      "sks": 3,
      "semester": 1
    },
    {
      "id": 2,
      "kode_mk": "IF102",
      "nama_mk": "Basis Data",
      "sks": 3,
      "semester": 4
    },
    {
      "id": 3,
      "kode_mk": "IF103",
      "nama_mk": "Pengembangan Aplikasi Web",
      "sks": 3,
      "semester": 5
    }
  ]
}
```

### 2\. Get Detail Matakuliah

Mendapatkan detail satu matakuliah berdasarkan ID.

  * **URL:** `/api/matakuliah/{id}`
  * **Method:** `GET`

**Request:**

```bash
curl -X GET http://localhost:6543/api/matakuliah/1
```

**Response:**

```json
{
  "matakuliah": {
    "id": 1,
    "kode_mk": "IF101",
    "nama_mk": "Algoritma dan Pemrograman",
    "sks": 3,
    "semester": 1
  }
}
```

### 3\. Add Matakuliah

Menambahkan data matakuliah baru.

  * **URL:** `/api/matakuliah`
  * **Method:** `POST`
  * **Body:** JSON

**Request:**

```bash
curl -X POST http://localhost:6543/api/matakuliah \
-H "Content-Type: application/json" \
-d '{"kode_mk": "IF200", "nama_mk": "Kecerdasan Buatan", "sks": 3, "semester": 5}'
```

**Response:**

```json
{
  "success": true,
  "matakuliah": {
    "id": 4,
    "kode_mk": "IF200",
    "nama_mk": "Kecerdasan Buatan",
    "sks": 3,
    "semester": 5
  }
}
```

### 4\. Update Matakuliah

Mengubah data matakuliah yang sudah ada.

  * **URL:** `/api/matakuliah/{id}`
  * **Method:** `PUT`
  * **Body:** JSON (Field yang ingin diubah)

**Request:**

```bash
curl -X PUT http://localhost:6543/api/matakuliah/1 \
-H "Content-Type: application/json" \
-d '{"sks": 4, "nama_mk": "Algoritma Lanjut"}'
```

**Response:**

```json
{
  "success": true,
  "matakuliah": {
    "id": 1,
    "kode_mk": "IF101",
    "nama_mk": "Algoritma Lanjut",
    "sks": 4,
    "semester": 1
  }
}
```

### 5\. Delete Matakuliah

Menghapus data matakuliah.

  * **URL:** `/api/matakuliah/{id}`
  * **Method:** `DELETE`

**Request:**

```bash
curl -X DELETE http://localhost:6543/api/matakuliah/1
```

**Response:**

```json
{
  "success": true,
  "message": "Matakuliah dengan id 1 berhasil dihapus"
}
```
