// Check authentication
if (!localStorage.getItem('userType') || localStorage.getItem('userType') !== 'faculty') {
    window.location.href = 'index.html';
}

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// Faculty Profile Management
function loadFacultyProfile() {
    const username = localStorage.getItem('username');
    const facultyList = JSON.parse(localStorage.getItem('facultyData') || '[]');
    const faculty = facultyList.find(f => f.id === username);
    
    if (faculty) {
        document.getElementById('faculty-info').innerHTML = `
            <div class="data-item">
                <p>Name: <span id="profile-name">${faculty.name}</span></p>
                <p>ID: <span id="profile-id">${faculty.id}</span></p>
                <p>Subject: <span id="profile-subject">${faculty.subject}</span></p>
                <p>Class: <span id="profile-class">${faculty.class}</span></p>
            </div>
        `;
    }
}

function enableEdit() {
    const profileFields = ['name', 'subject', 'class'];
    profileFields.forEach(field => {
        const element = document.getElementById(`profile-${field}`);
        const value = element.textContent;
        element.innerHTML = `<input type="text" value="${value}">`;
    });
    document.querySelector('button').style.display = 'none';
    document.getElementById('save-profile').style.display = 'inline-block';
}

function saveProfile() {
    const username = localStorage.getItem('username');
    let facultyList = JSON.parse(localStorage.getItem('facultyData') || '[]');
    const index = facultyList.findIndex(f => f.id === username);
    
    if (index !== -1) {
        facultyList[index] = {
            name: document.querySelector('#profile-name input').value,
            id: username,
            subject: document.querySelector('#profile-subject input').value,
            class: document.querySelector('#profile-class input').value
        };
        localStorage.setItem('facultyData', JSON.stringify(facultyList));
        loadFacultyProfile();
    }
    
    document.querySelector('button').style.display = 'inline-block';
    document.getElementById('save-profile').style.display = 'none';
}

// Attendance Management
document.getElementById('attendance-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const attendanceData = {
        date: document.getElementById('attendance-date').value,
        studentId: document.getElementById('student-select').value,
        status: document.getElementById('attendance-status').value
    };

    let attendanceList = JSON.parse(localStorage.getItem('attendanceData') || '[]');
    attendanceList.push(attendanceData);
    localStorage.setItem('attendanceData', JSON.stringify(attendanceList));
    
    updateAttendanceList();
    this.reset();
});

function updateAttendanceList() {
    const attendanceList = JSON.parse(localStorage.getItem('attendanceData') || '[]');
    const listElement = document.getElementById('attendance-list');
    listElement.innerHTML = '';
    
    attendanceList.forEach(attendance => {
        const div = document.createElement('div');
        div.className = 'data-item';
        div.innerHTML = `
            <p>Date: ${attendance.date}</p>
            <p>Student ID: ${attendance.studentId}</p>
            <p>Status: ${attendance.status}</p>
        `;
        listElement.appendChild(div);
    });
}

// Marks Management
document.getElementById('marks-entry-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const marksData = {
        studentId: document.getElementById('marks-student-select').value,
        week: document.getElementById('week-select').value,
        marks: parseInt(document.getElementById('marks-value').value),
        status: getStatus(parseInt(document.getElementById('marks-value').value))
    };

    let marksList = JSON.parse(localStorage.getItem('marksData') || '[]');
    marksList.push(marksData);
    localStorage.setItem('marksData', JSON.stringify(marksList));
    
    updateMarksList();
    this.reset();
});

function getStatus(marks) {
    if (marks >= 75) return 'mild';
    if (marks >= 50) return 'moderate';
    return 'severe';
}

function updateMarksList() {
    const marksList = JSON.parse(localStorage.getItem('marksData') || '[]');
    const listElement = document.getElementById('marks-list');
    listElement.innerHTML = '';
    
    marksList.forEach(marks => {
        const div = document.createElement('div');
        div.className = `data-item ${marks.status}`;
        div.innerHTML = `
            <p>Student ID: ${marks.studentId}</p>
            <p>Week: ${marks.week}</p>
            <p>Marks: ${marks.marks}</p>
            <p>Status: ${marks.status}</p>
        `;
        listElement.appendChild(div);
    });
}

// Video Resources Management
document.getElementById('video-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const videoData = {
        title: document.getElementById('video-title').value,
        link: document.getElementById('video-link').value
    };

    let videoList = JSON.parse(localStorage.getItem('videoData') || '[]');
    videoList.push(videoData);
    localStorage.setItem('videoData', JSON.stringify(videoList));
    
    updateVideoList();
    this.reset();
});

function updateVideoList() {
    const videoList = JSON.parse(localStorage.getItem('videoData') || '[]');
    const listElement = document.getElementById('video-list');
    listElement.innerHTML = '';
    
    videoList.forEach(video => {
        const div = document.createElement('div');
        div.className = 'data-item';
        div.innerHTML = `
            <p>Title: ${video.title}</p>
            <p><a href="${video.link}" target="_blank">Open Video</a></p>
        `;
        listElement.appendChild(div);
    });
}

function logout() {
    localStorage.removeItem('userType');
    localStorage.removeItem('username');
    window.location.href = 'index.html';
}

// Initialize page
loadFacultyProfile();
updateAttendanceList();
updateMarksList();
updateVideoList();

// Load students in dropdowns
function loadStudents() {
    const studentList = JSON.parse(localStorage.getItem('studentData') || '[]');
    const attendanceSelect = document.getElementById('student-select');
    const marksSelect = document.getElementById('marks-student-select');
    
    studentList.forEach(student => {
        const option = `<option value="${student.id}">${student.name} (${student.id})</option>`;
        attendanceSelect.innerHTML += option;
        marksSelect.innerHTML += option;
    });
}

loadStudents(); 