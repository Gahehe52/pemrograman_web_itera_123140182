let tasks = [];
let taskIdCounter = 1;

const taskForm = document.getElementById('taskForm');
const taskNameInput = document.getElementById('taskName');
const courseNameInput = document.getElementById('courseName');
const deadlineInput = document.getElementById('deadline');
const taskList = document.getElementById('taskList');
const searchInput = document.getElementById('searchInput');
const filterStatus = document.getElementById('filterStatus');
const filterCourse = document.getElementById('filterCourse');

const taskNameError = document.getElementById('taskNameError');
const courseNameError = document.getElementById('courseNameError');
const deadlineError = document.getElementById('deadlineError');

const totalTasksEl = document.getElementById('totalTasks');
const pendingTasksEl = document.getElementById('pendingTasks');
const completedTasksEl = document.getElementById('completedTasks');

function loadFromLocalStorage() {
    try {
        const storedTasks = localStorage.getItem('tasks');
        const storedCounter = localStorage.getItem('taskIdCounter');
        
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
        }
        
        if (storedCounter) {
            taskIdCounter = parseInt(storedCounter);
        }
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        tasks = [];
        taskIdCounter = 1;
    }
}

function saveToLocalStorage() {
    try {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('taskIdCounter', taskIdCounter.toString());
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        alert('Gagal menyimpan data. Pastikan browser Anda mendukung localStorage.');
    }
}

function init() {
    loadFromLocalStorage();
    renderTasks();
    updateStats();
    updateCourseFilter();
}

function validateForm() {
    let isValid = true;

    taskNameError.style.display = 'none';
    courseNameError.style.display = 'none';
    deadlineError.style.display = 'none';

    const taskName = taskNameInput.value.trim();
    if (taskName === '') {
        taskNameError.style.display = 'block';
        taskNameError.textContent = 'Nama tugas tidak boleh kosong';
        isValid = false;
    } else if (taskName.length < 3) {
        taskNameError.style.display = 'block';
        taskNameError.textContent = 'Nama tugas minimal 3 karakter';
        isValid = false;
    }

    const courseName = courseNameInput.value.trim();
    if (courseName === '') {
        courseNameError.style.display = 'block';
        courseNameError.textContent = 'Mata kuliah tidak boleh kosong';
        isValid = false;
    } else if (courseName.length < 3) {
        courseNameError.style.display = 'block';
        courseNameError.textContent = 'Nama mata kuliah minimal 3 karakter';
        isValid = false;
    }

    if (deadlineInput.value === '') {
        deadlineError.style.display = 'block';
        deadlineError.textContent = 'Deadline harus diisi';
        isValid = false;
    } else {
        const selectedDate = new Date(deadlineInput.value);
        const now = new Date();
        
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const deadlineDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
        
        if (selectedDate < now) {
            deadlineError.style.display = 'block';
            deadlineError.textContent = 'Deadline tidak boleh di masa lalu';
            isValid = false;
        }
    }

    return isValid;
}

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

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
    
    taskForm.reset();

    renderTasks();
    updateStats();
    updateCourseFilter();

    showNotification('Tugas berhasil ditambahkan!');
});

function renderTasks() {
    const searchTerm = searchInput.value.toLowerCase();
    const statusFilter = filterStatus.value;
    const courseFilter = filterCourse.value;

    let filteredTasks = tasks.filter(task => {
        const matchesSearch = task.name.toLowerCase().includes(searchTerm) || 
                             task.course.toLowerCase().includes(searchTerm);
        const matchesStatus = statusFilter === 'all' || 
                             (statusFilter === 'completed' && task.completed) ||
                             (statusFilter === 'pending' && !task.completed);
        const matchesCourse = courseFilter === 'all' || task.course === courseFilter;

        return matchesSearch && matchesStatus && matchesCourse;
    });

    filteredTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

    if (filteredTasks.length === 0) {
        taskList.innerHTML = `
            <div class="empty-state">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <h3>Tidak ada tugas</h3>
                <p>${tasks.length === 0 ? 'Tambahkan tugas baru untuk memulai' : 'Tidak ada tugas yang cocok dengan filter'}</p>
            </div>
        `;
        return;
    }

    taskList.innerHTML = filteredTasks.map(task => {
        const deadline = new Date(task.deadline);
        const now = new Date();
        const isOverdue = deadline < now && !task.completed;
        const daysUntilDeadline = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
        
        let urgencyLabel = '';
        if (!task.completed) {
            if (isOverdue) {
                urgencyLabel = '<span style="color: #ef4444; font-weight: 600;">⚠️ Terlambat</span>';
            } else if (daysUntilDeadline <= 1) {
                urgencyLabel = '<span style="color: #f59e0b; font-weight: 600;">🔥 Deadline Hari Ini!</span>';
            } else if (daysUntilDeadline <= 3) {
                urgencyLabel = '<span style="color: #f59e0b; font-weight: 600;">⏰ Deadline Dekat</span>';
            }
        }
        
        return `
            <div class="task-item ${task.completed ? 'completed' : ''}" data-task-id="${task.id}">
                <div class="task-info">
                    <div class="task-title">${escapeHtml(task.name)}</div>
                    <div class="task-meta">
                        <span class="badge">${escapeHtml(task.course)}</span>
                        <span>📅 ${formatDate(deadline)}</span>
                        ${urgencyLabel}
                    </div>
                </div>
                <div class="task-actions">
                    <button class="btn-small btn-complete" onclick="toggleTask(${task.id})">
                        ${task.completed ? '↩️ Batal' : '✓ Selesai'}
                    </button>
                    <button class="btn-small btn-delete" onclick="deleteTask(${task.id})">
                        🗑️ Hapus
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveToLocalStorage();
        renderTasks();
        updateStats();
        
        showNotification(task.completed ? 'Tugas ditandai selesai!' : 'Status tugas diubah');
    }
}

function deleteTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    
    if (confirm(`Apakah Anda yakin ingin menghapus tugas "${task.name}"?`)) {
        tasks = tasks.filter(t => t.id !== id);
        saveToLocalStorage();
        renderTasks();
        updateStats();
        updateCourseFilter();
        
        showNotification('Tugas berhasil dihapus');
    }
}

function updateStats() {
    const total = tasks.length;
    const pending = tasks.filter(t => !t.completed).length;
    const completed = tasks.filter(t => t.completed).length;

    totalTasksEl.textContent = total;
    pendingTasksEl.textContent = pending;
    completedTasksEl.textContent = completed;
}

function updateCourseFilter() {
    const courses = [...new Set(tasks.map(t => t.course))].sort();
    const currentValue = filterCourse.value;
    
    filterCourse.innerHTML = '<option value="all">Semua Mata Kuliah</option>';
    courses.forEach(course => {
        const option = document.createElement('option');
        option.value = course;
        option.textContent = course;
        filterCourse.appendChild(option);
    });
    
    if (courses.includes(currentValue)) {
        filterCourse.value = currentValue;
    }
}

function formatDate(date) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('id-ID', options);
}

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

function showNotification(message) {
    console.log('Notifikasi:', message);
}

searchInput.addEventListener('input', renderTasks);
filterStatus.addEventListener('change', renderTasks);
filterCourse.addEventListener('change', renderTasks);

taskNameInput.addEventListener('input', () => {
    if (taskNameInput.value.trim() !== '') {
        taskNameError.style.display = 'none';
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

document.addEventListener('DOMContentLoaded', init);