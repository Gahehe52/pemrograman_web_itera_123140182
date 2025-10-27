class InventoryItem {
    constructor(id, name, category, quantity, minStock, price, lastUpdated = new Date().toISOString()) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.quantity = quantity;
        this.minStock = minStock;
        this.price = price;
        this.lastUpdated = lastUpdated;
    }

    isLowStock = () => this.quantity <= this.minStock;

    updateQuantity = (amount) => {
        this.quantity = Math.max(0, this.quantity + amount);
        this.lastUpdated = new Date().toISOString();
        return this;
    };

    getFormattedPrice = () => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(this.price);
    };

    getTotalValue = () => this.quantity * this.price;

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            category: this.category,
            quantity: this.quantity,
            minStock: this.minStock,
            price: this.price,
            lastUpdated: this.lastUpdated
        };
    }
}

class StorageManager {
    constructor(storageKey) {
        this.storageKey = storageKey;
    }

    loadData = async () => {
        return new Promise((resolve, reject) => {
            try {
                setTimeout(() => {
                    const data = localStorage.getItem(this.storageKey);
                    const items = data ? JSON.parse(data) : [];
                    resolve(items);
                }, 500);
            } catch (error) {
                reject(error);
            }
        });
    };

    saveData = async (data) => {
        return new Promise((resolve, reject) => {
            try {
                setTimeout(() => {
                    localStorage.setItem(this.storageKey, JSON.stringify(data));
                    resolve(true);
                }, 300); 
            } catch (error) {
                reject(error);
            }
        });
    };

    clearData = () => {
        localStorage.removeItem(this.storageKey);
    };
}

class InventoryApp {
    constructor() {
        this.items = [];
        this.filteredItems = [];
        this.storageManager = new StorageManager('inventoryItems');
        this.editingId = null;
        this.searchTerm = '';
        this.filterCategory = 'all';
        
        this.initializeElements();
        this.attachEventListeners();
        this.loadItems();
    }

    initializeElements() {
        this.elements = {
            btnTambah: document.getElementById('btnTambah'),
            btnBatal: document.getElementById('btnBatal'),
            formContainer: document.getElementById('formContainer'),
            formBarang: document.getElementById('formBarang'),
            formTitle: document.getElementById('formTitle'),
            inputNama: document.getElementById('inputNama'),
            inputKategori: document.getElementById('inputKategori'),
            inputJumlah: document.getElementById('inputJumlah'),
            inputMinStok: document.getElementById('inputMinStok'),
            inputHarga: document.getElementById('inputHarga'),
            inputCari: document.getElementById('inputCari'),
            selectKategori: document.getElementById('selectKategori'),
            daftarBarang: document.getElementById('daftarBarang'),
            loadingState: document.getElementById('loadingState'),
            emptyState: document.getElementById('emptyState'),
            statTotalBarang: document.getElementById('statTotalBarang'),
            statTotalNilai: document.getElementById('statTotalNilai'),
            statStokRendah: document.getElementById('statStokRendah')
        };
    }

    attachEventListeners() {
        this.elements.btnTambah.addEventListener('click', () => this.showAddForm());
        this.elements.btnBatal.addEventListener('click', () => this.hideForm());
        this.elements.formBarang.addEventListener('submit', (e) => this.handleSubmit(e));
        this.elements.inputCari.addEventListener('input', (e) => this.handleSearch(e));
        this.elements.selectKategori.addEventListener('change', (e) => this.handleFilterCategory(e));
    }

    loadItems = async () => {
        try {
            this.showLoading();
            const data = await this.storageManager.loadData();
            
            this.items = data.map(item => 
                new InventoryItem(
                    item.id,
                    item.name,
                    item.category,
                    item.quantity,
                    item.minStock,
                    item.price,
                    item.lastUpdated
                )
            );
            
            this.filteredItems = [...this.items];
            this.hideLoading();
            this.renderItems();
            this.updateStatistics();
        } catch (error) {
            console.error('Error loading items:', error);
            this.hideLoading();
            alert('Gagal memuat data!');
        }
    };

    saveItems = async () => {
        try {
            const data = this.items.map(item => item.toJSON());
            await this.storageManager.saveData(data);
            this.applyFilters();
            this.renderItems();
            this.updateStatistics();
        } catch (error) {
            console.error('Error saving items:', error);
            alert('Gagal menyimpan data!');
        }
    };

    showLoading() {
        this.elements.loadingState.classList.remove('hidden');
        this.elements.daftarBarang.classList.add('hidden');
        this.elements.emptyState.classList.add('hidden');
    }

    hideLoading() {
        this.elements.loadingState.classList.add('hidden');
    }

    showAddForm() {
        this.editingId = null;
        this.elements.formTitle.textContent = 'Tambah Barang Baru';
        this.elements.formContainer.classList.remove('hidden');
        this.resetForm();
    }

    showEditForm = (item) => {
        this.editingId = item.id;
        this.elements.formTitle.textContent = 'Edit Barang';
        this.elements.formContainer.classList.remove('hidden');
        
        this.elements.inputNama.value = item.name;
        this.elements.inputKategori.value = item.category;
        this.elements.inputJumlah.value = item.quantity;
        this.elements.inputMinStok.value = item.minStock;
        this.elements.inputHarga.value = item.price;
        
        this.elements.formContainer.scrollIntoView({ behavior: 'smooth' });
    };

    hideForm() {
        this.elements.formContainer.classList.add('hidden');
        this.resetForm();
        this.editingId = null;
    }

    resetForm() {
        this.elements.formBarang.reset();
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        
        const itemData = {
            name: this.elements.inputNama.value.trim(),
            category: this.elements.inputKategori.value,
            quantity: parseInt(this.elements.inputJumlah.value),
            minStock: parseInt(this.elements.inputMinStok.value),
            price: parseFloat(this.elements.inputHarga.value)
        };

        if (this.editingId) {
            await this.updateItem(this.editingId, itemData);
        } else {
            await this.addItem(itemData);
        }
        
        this.hideForm();
    };

    addItem = async (itemData) => {
        const newItem = new InventoryItem(
            Date.now().toString(),
            itemData.name,
            itemData.category,
            itemData.quantity,
            itemData.minStock,
            itemData.price
        );
        
        this.items.push(newItem);
        await this.saveItems();
        
        this.showNotification('Barang berhasil ditambahkan!', 'success');
    };

    updateItem = async (id, itemData) => {
        const index = this.items.findIndex(item => item.id === id);
        
        if (index !== -1) {
            this.items[index] = new InventoryItem(
                id,
                itemData.name,
                itemData.category,
                itemData.quantity,
                itemData.minStock,
                itemData.price,
                this.items[index].lastUpdated
            );
            
            await this.saveItems();
            this.showNotification('Barang berhasil diupdate!', 'success');
        }
    };

    deleteItem = async (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus item ini?')) {
            this.items = this.items.filter(item => item.id !== id);
            await this.saveItems();
            this.showNotification('Barang berhasil dihapus!', 'success');
        }
    };

    adjustStock = async (id, amount) => {
        const item = this.items.find(item => item.id === id);
        
        if (item) {
            item.updateQuantity(amount);
            await this.saveItems();
            
            const action = amount > 0 ? 'ditambah' : 'dikurangi';
            this.showNotification(`Stok berhasil ${action}!`, 'success');
        }
    };

    handleSearch = (e) => {
        this.searchTerm = e.target.value.toLowerCase();
        this.applyFilters();
        this.renderItems();
    };

    handleFilterCategory = (e) => {
        this.filterCategory = e.target.value;
        this.applyFilters();
        this.renderItems();
    };

    applyFilters = () => {
        this.filteredItems = this.items.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(this.searchTerm);
            const matchesCategory = this.filterCategory === 'all' || item.category === this.filterCategory;
            return matchesSearch && matchesCategory;
        });
    };

    updateStatistics = () => {
        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
        const totalValue = this.items.reduce((sum, item) => sum + item.getTotalValue(), 0);
        const lowStockItems = this.items.filter(item => item.isLowStock()).length;

        this.elements.statTotalBarang.textContent = totalItems;
        this.elements.statTotalNilai.textContent = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(totalValue);
        this.elements.statStokRendah.textContent = lowStockItems;
    };

    renderItems() {
        if (this.filteredItems.length === 0) {
            this.elements.daftarBarang.classList.add('hidden');
            this.elements.emptyState.classList.remove('hidden');
            return;
        }

        this.elements.daftarBarang.classList.remove('hidden');
        this.elements.emptyState.classList.add('hidden');

        this.elements.daftarBarang.innerHTML = this.filteredItems.map(item => `
            <div class="item-card ${item.isLowStock() ? 'low-stock' : ''}" data-id="${item.id}">
                <div class="item-header">
                    <div class="item-title-section">
                        <h3>${item.name}</h3>
                        <span class="category-badge">${item.category}</span>
                    </div>
                    <div class="item-actions">
                        <button class="btn btn-warning btn-sm btn-edit" data-id="${item.id}">
                            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                            Edit
                        </button>
                        <button class="btn btn-danger btn-sm btn-delete" data-id="${item.id}">
                            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                            Hapus
                        </button>
                    </div>
                </div>

                <div class="item-stats">
                    <div class="item-stat">
                        <p class="item-stat-label">Stok Tersedia</p>
                        <p class="item-stat-value">${item.quantity}</p>
                    </div>
                    <div class="item-stat">
                        <p class="item-stat-label">Min. Stok</p>
                        <p class="item-stat-value">${item.minStock}</p>
                    </div>
                    <div class="item-stat">
                        <p class="item-stat-label">Harga Satuan</p>
                        <p class="item-stat-value">${item.getFormattedPrice()}</p>
                    </div>
                    <div class="item-stat">
                        <p class="item-stat-label">Total Nilai</p>
                        <p class="item-stat-value">${new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                            minimumFractionDigits: 0
                        }).format(item.getTotalValue())}</p>
                    </div>
                </div>

                ${item.isLowStock() ? `
                    <div class="low-stock-warning">
                        <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                        </svg>
                        <span><strong>Peringatan:</strong> Stok rendah! Segera lakukan restock.</span>
                    </div>
                ` : ''}

                <div class="stock-controls">
                    <button class="btn btn-danger btn-decrease" data-id="${item.id}">
                        <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path>
                        </svg>
                        Kurangi Stok
                    </button>
                    <button class="btn btn-success btn-increase" data-id="${item.id}">
                        <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                        </svg>
                        Tambah Stok
                    </button>
                </div>

                <div class="item-footer">
                    Terakhir diperbarui: ${new Date(item.lastUpdated).toLocaleString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </div>
            </div>
        `).join('');

        this.attachItemEventListeners();
    }

    attachItemEventListeners() {
        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                const item = this.items.find(item => item.id === id);
                if (item) this.showEditForm(item);
            });
        });

        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                this.deleteItem(id);
            });
        });

        document.querySelectorAll('.btn-decrease').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                this.adjustStock(id, -1);
            });
        });

        document.querySelectorAll('.btn-increase').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                this.adjustStock(id, 1);
            });
        });
    }

    showNotification(message, type) {
        console.log(`[${type.toUpperCase()}] ${message}`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new InventoryApp();

});
