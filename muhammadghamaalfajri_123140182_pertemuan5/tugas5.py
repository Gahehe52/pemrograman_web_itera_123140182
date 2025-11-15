from abc import ABC, abstractmethod

class LibraryItem(ABC):
   
    def __init__(self, item_id, title):
        self._item_id = item_id        
        self.__title = title           

    @property
    def title(self):
        return self.__title

    @abstractmethod
    def display_info(self):
        pass

    def matches(self, keyword):
        return keyword.lower() in self.title.lower() or keyword == self._item_id


class Book(LibraryItem):

    def __init__(self, item_id, title, author):
        super().__init__(item_id, title)
        self.author = author

    def display_info(self):
        print(f"[Book] ID: {self._item_id}, Title: {self.title}, Author: {self.author}")


class Magazine(LibraryItem):

    def __init__(self, item_id, title, issue):
        super().__init__(item_id, title)
        self.issue = issue

    def display_info(self):
        print(f"[Magazine] ID: {self._item_id}, Title: {self.title}, Issue: {self.issue}")


class Journal(LibraryItem):

    def __init__(self, item_id, title, volume, year):
        super().__init__(item_id, title)
        self.volume = volume
        self.year = year

    def display_info(self):
        print(f"[Journal] ID: {self._item_id}, Title: {self.title}, Volume: {self.volume}, Year: {self.year}")


class Library:

    def __init__(self):
        self.__items = []  

    def add_item(self, item):
        self.__items.append(item)
        print(f"Item '{item.title}' berhasil ditambahkan!")

    def display_all_items(self):
        print("\nDaftar Seluruh Item: ")
        if not self.__items:
            print("Belum ada item.")
            return

        for item in self.__items:
            item.display_info()

    def search(self, keyword):
        print(f"\nHasil Pencarian '{keyword}': ")
        found = False
        for item in self.__items:
            if item.matches(keyword):
                item.display_info()
                found = True
        if not found:
            print("Item tidak ditemukan.")

    def delete_item(self, keyword):
        for item in self.__items:
            if item.matches(keyword):
                self.__items.remove(item)
                print(f"Item '{item.title}' berhasil dihapus!")
                return

        print("Item tidak ditemukan, tidak bisa dihapus.")


def main():
    library = Library()

    while True:
        print("\nMENU PERPUSTAKAAN")
        print("1. Tambah Item")
        print("2. Tampilkan Semua Item")
        print("3. Cari Item")
        print("4. Hapus Item")
        print("5. Keluar")

        choice = input("Pilih menu: ")

        if choice == "1":
            print("\nPilih jenis item:")
            print("1. Book")
            print("2. Magazine")
            print("3. Journal")

            type_choice = input("Jenis item: ")

            item_id = input("Masukkan ID: ")
            title = input("Masukkan Title: ")

            if type_choice == "1":
                author = input("Masukkan Author: ")
                library.add_item(Book(item_id, title, author))

            elif type_choice == "2":
                issue = input("Masukkan Issue: ")
                library.add_item(Magazine(item_id, title, issue))

            elif type_choice == "3":
                volume = input("Masukkan Volume: ")
                year = input("Masukkan Tahun: ")
                library.add_item(Journal(item_id, title, volume, year))

            else:
                print("Jenis item tidak valid.")

        elif choice == "2":
            library.display_all_items()

        elif choice == "3":
            keyword = input("Masukkan judul atau ID: ")
            library.search(keyword)

        elif choice == "4":
            keyword = input("Masukkan judul atau ID untuk dihapus: ")
            library.delete_item(keyword)

        elif choice == "5":
            print("Program selesai.")
            break

        else:
            print("Pilihan tidak valid.")


if __name__ == "__main__":
    main()
