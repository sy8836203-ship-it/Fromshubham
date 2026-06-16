// ===== PASSWORD & AUTH =====
const CORRECT_PASSWORD = "shubham123";
let isUnlocked = false;

// ===== INITIAL POINTS DATA =====
const initialPoints = [
    {
        id: 1,
        title: "Web Developer & Editing",
        description: "Building beautiful, functional web experiences with modern technologies. Passionate about clean code aur innovative solutions."
    },
    {
        id: 2,
        title: "My Studies",
        description: "I passed class 10th with 85%, class 12th with 60%. I am a NEET aspirant and continuing BSC. Love tackling complex challenges aur finding elegant solutions."
    },
    {
        id: 3,
        title: "Digital Creator",
        description: "Exploring AI tools, design, content creation, video editing, coding and web development. Interested in making tools that matter aur solve real problems."
    },
    {
        id: 4,
        title: "Exploring AI & Tools",
        description: "I really like to explore new things like ChatGPT, Claude, Gemini, Copilot. I have explored many types of AI and tools. Always discovering what's new!"
    }
];

const colors = ['amber', 'rose', 'cyan', 'emerald'];
let points = [...initialPoints];
let nextId = 5;

// ===== MODAL FUNCTIONS =====
function openAuthModal() {
    document.getElementById('authModal').classList.add('show');
    document.getElementById('passwordInput').focus();
}

function closeAuthModal() {
    document.getElementById('authModal').classList.remove('show');
    document.getElementById('passwordInput').value = '';
}

function unlockEdit() {
    const password = document.getElementById('passwordInput').value;
    
    if (password === CORRECT_PASSWORD) {
        isUnlocked = true;
        updateAuthUI();
        closeAuthModal();
        alert('✅ Unlocked! Aap ab edit kar sakte ho!');
    } else {
        alert('❌ Wrong password!');
        document.getElementById('passwordInput').value = '';
    }
}

function updateAuthUI() {
    const lockBtn = document.getElementById('lockBtn');
    const editBtn = document.getElementById('editIntroBtn');
    const addBtn = document.getElementById('addButton');
    const deleteButtons = document.querySelectorAll('.delete-btn');

    if (isUnlocked) {
        lockBtn.classList.remove('locked');
        lockBtn.textContent = '🔓';
        lockBtn.title = 'Unlocked - You can edit now';
        editBtn.classList.remove('disabled');
        addBtn.classList.remove('disabled');
        deleteButtons.forEach(btn => btn.classList.remove('disabled'));
    }
}

// ===== INTRO BOX FUNCTIONS =====
function toggleEditIntro() {
    if (!isUnlocked) {
        alert('🔒 Pehle password unlock kar!');
        return;
    }
    
    const form = document.getElementById('introForm');
    form.classList.toggle('show');
    
    if (form.classList.contains('show')) {
        document.getElementById('introInput').value = document.getElementById('introText').textContent;
        document.getElementById('introInput').focus();
    }
}

function saveIntro() {
    const newIntro = document.getElementById('introInput').value.trim();
    
    if (!newIntro) {
        alert('Please write something!');
        return;
    }
    
    document.getElementById('introText').textContent = newIntro;
    document.getElementById('introForm').classList.remove('show');
}

// ===== POINTS RENDERING =====
function renderPoints() {
    const grid = document.getElementById('pointsGrid');
    grid.innerHTML = '';

    points.forEach((point, index) => {
        const color = colors[index % colors.length];
        const card = document.createElement('div');
        card.className = 'point-card ' + color;
        card.innerHTML = `
            <div class="point-header">
                <h3 class="title">${point.title}</h3>
                <button class="delete-btn ${isUnlocked ? '' : 'disabled'}" onclick="deletePoint(${point.id})" title="Remove">×</button>
            </div>
            <p class="description">${point.description}</p>
        `;
        grid.appendChild(card);
    });
}

// ===== FORM FUNCTIONS =====
function toggleForm() {
    if (!isUnlocked) {
        alert('🔒 Pehle password unlock kar!');
        return;
    }

    const form = document.getElementById('formContainer');
    form.classList.toggle('show');
    
    if (form.classList.contains('show')) {
        document.getElementById('titleInput').focus();
    } else {
        document.getElementById('titleInput').value = '';
        document.getElementById('descriptionInput').value = '';
    }
}

function addPoint() {
    if (!isUnlocked) {
        alert('🔒 Pehle password unlock kar!');
        return;
    }

    const title = document.getElementById('titleInput').value.trim();
    const description = document.getElementById('descriptionInput').value.trim();

    if (!title || !description) {
        alert('Please fill in both title and description!');
        return;
    }

    points.push({
        id: nextId++,
        title: title,
        description: description
    });

    renderPoints();
    toggleForm();
}

function deletePoint(id) {
    if (!isUnlocked) {
        alert('🔒 Pehle password unlock kar!');
        return;
    }

    if (confirm('Remove this point?')) {
        points = points.filter(p => p.id !== id);
        renderPoints();
    }
}

// ===== INITIALIZE =====
renderPoints();