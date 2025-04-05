// Update credentials object to include parent login
const credentials = {
    admin: {
        username: 'admin',
        password: 'admin123'
    },
    faculty: {
        username: 'faculty',
        password: 'faculty123'
    }
};

function login() {
    const loginType = document.getElementById('loginType').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    if (loginType === 'parent') {
        // For parent login, verify against student data
        const studentData = JSON.parse(localStorage.getItem('studentData') || '[]');
        const student = studentData.find(s => s.id === username);
        
        if (student && student.id === password) { // Using student ID as password for simplicity
            localStorage.setItem('userType', 'parent');
            localStorage.setItem('studentId', username);
            window.location.href = 'parent-dashboard.html';
        } else {
            errorMessage.textContent = 'Invalid Student ID or password';
        }
    } else if (credentials[loginType].username === username && 
               credentials[loginType].password === password) {
        localStorage.setItem('userType', loginType);
        localStorage.setItem('username', username);
        window.location.href = loginType === 'admin' ? 'admin-dashboard.html' : 'faculty-dashboard.html';
    } else {
        errorMessage.textContent = 'Invalid username or password';
    }
}

// Initialize data storage if not exists
if (!localStorage.getItem('facultyData')) {
    localStorage.setItem('facultyData', JSON.stringify([]));
}
if (!localStorage.getItem('studentData')) {
    localStorage.setItem('studentData', JSON.stringify([]));
}
if (!localStorage.getItem('marksData')) {
    localStorage.setItem('marksData', JSON.stringify([]));
}
if (!localStorage.getItem('attendanceData')) {
    localStorage.setItem('attendanceData', JSON.stringify([]));
}
if (!localStorage.getItem('videoData')) {
    localStorage.setItem('videoData', JSON.stringify([]));
} 