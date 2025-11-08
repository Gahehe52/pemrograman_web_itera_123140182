mahasiswa = [
    {"nama": "Abi", "nim": "123140192", "uts": float(80), "uas": float(85), "tugas": float(90.)},
    {"nama": "Taufik", "nim": "123140188", "uts": float(70), "uas": float(65), "tugas": float(73.33)},
    {"nama": "Sandi", "nim": "123140176", "uts": float(60), "uas": float(57.33), "tugas": float(65)},
    {"nama": "Hawari", "nim": "123140147", "uts": float(80), "uas": float(45), "tugas": float(66.66)},
    {"nama": "Ghama", "nim": "123140182", "uts": float(92.1), "uas": float(95), "tugas": float(85)},
]

def hitung_nilai_akhir(m):
    return m["uts"] * 0.3 + m["uas"] * 0.4 + m["tugas"] * 0.3

def tentukan_grade(nilai):
    if nilai >= 80:
        return "A"
    elif nilai >= 70:
        return "B"
    elif nilai >= 60:
        return "C"
    elif nilai >= 50:
        return "D"
    else:
        return "E"

def tampilkan_data(data):
    print(" Nama\t   NIM\t\t UTS\t UAS\tTugas\tAkhir\tGrade")
    for m in data:
        akhir = hitung_nilai_akhir(m)
        grade = tentukan_grade(akhir)
        print(f"{m['nama']}\t{m['nim']}\t{m['uts']}\t{m['uas']}\t{m['tugas']}\t{akhir:.2f}\t  {grade}")

def tambah_data():
    nama = input("Nama(pendek saja agar tabel konsisten): ")
    nim = input("NIM(standar itera): ")
    uts = float(input("Nilai UTS: "))
    uas = float(input("Nilai UAS: "))
    tugas = float(input("Nilai Tugas: "))
    mahasiswa.append({"nama": nama, "nim": nim, "uts": uts, "uas": uas, "tugas": tugas})

def tertinggi():
    return max(mahasiswa, key=lambda m: hitung_nilai_akhir(m))

def terendah():
    return min(mahasiswa, key=lambda m: hitung_nilai_akhir(m))

def filter_grade(g):
    hasil = []
    for m in mahasiswa:
        if tentukan_grade(hitung_nilai_akhir(m)) == g:
            hasil.append(m)
    return hasil

def rata_rata():
    return sum(hitung_nilai_akhir(m) for m in mahasiswa) / len(mahasiswa)

while True:
    print("\nMenu:")
    print("1. Tampilkan Data")
    print("2. Tambahkan Data Mahasiswa")
    print("3. Tampilkan Mahasiswa dengan Nilai Tertinggi")
    print("4. Tampilkan Mahasiswa dengan Nilai Terendah")
    print("5. Filter Data Berdasarkan Grade")
    print("6. Tampilkan Rata-rata Nilai Kelas")
    print("7. Keluar")

    pilih = input("Pilih menu: ")

    if pilih == "1":
        tampilkan_data(mahasiswa)
    elif pilih == "2":
        tambah_data()
    elif pilih == "3":
        m = tertinggi()
        print(f"Nilai tertinggi: {m['nama']} ({hitung_nilai_akhir(m):.2f})")
    elif pilih == "4":
        m = terendah()
        print(f"Nilai terendah: {m['nama']} ({hitung_nilai_akhir(m):.2f})")
    elif pilih == "5":
        g = input("Masukkan grade (A-E): ").upper()
        tampilkan_data(filter_grade(g))
    elif pilih == "6":
        print(f"Rata-rata nilai kelas: {rata_rata():.2f}")
    elif pilih == "7":
        break

