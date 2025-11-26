import argparse
import sys

from pyramid.paster import bootstrap, setup_logging
from sqlalchemy.exc import OperationalError

# Perhatikan titik dua (..) ini penting untuk import dari folder atasnya
from .. import models

def setup_models(dbsession):
    """
    Fungsi ini bertugas mengisi data awal.
    """
    print("--- MULAI PROSES SEEDING DATA ---")
    
    # Cek apakah Matakuliah IF101 sudah ada?
    existing = dbsession.query(models.Matakuliah).filter_by(kode_mk='IF101').first()
    
    if existing:
        print("Data IF101 sudah ada, melewati proses insert.")
    else:
        # Data belum ada, mari kita buat
        print("Menambahkan data IF101...")
        model1 = models.Matakuliah(
            kode_mk='IF101', 
            nama_mk='Algoritma dan Pemrograman', 
            sks=3, 
            semester=1
        )
        dbsession.add(model1)
        
        print("Menambahkan data IF102...")
        model2 = models.Matakuliah(
            kode_mk='IF102', 
            nama_mk='Basis Data', 
            sks=3, 
            semester=4
        )
        dbsession.add(model2)

        print("Menambahkan data IF103...")
        model3 = models.Matakuliah(
            kode_mk='IF103', 
            nama_mk='Pengembangan Aplikasi Web', 
            sks=3, 
            semester=5
        )
        dbsession.add(model3)
        
        # PENTING: flush() agar ID ter-generate
        dbsession.flush()
        print("Data berhasil ditambahkan ke sesi!")

def parse_args(argv):
    parser = argparse.ArgumentParser()
    parser.add_argument(
        'config_uri',
        help='Configuration file, e.g., development.ini',
    )
    return parser.parse_args(argv[1:])

def main(argv=sys.argv):
    args = parse_args(argv)
    setup_logging(args.config_uri)
    env = bootstrap(args.config_uri)

    try:
        with env['request'].tm:
            dbsession = env['request'].dbsession
            setup_models(dbsession)
            print("--- PROSES SELESAI SUKSES ---")
    except OperationalError:
        print("ERROR: Database belum siap atau koneksi gagal.")
    except Exception as e:
        print(f"ERROR LAIN: {e}")

if __name__ == '__main__':
    main()