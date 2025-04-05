// Check authentication
if (!localStorage.getItem('userType') || localStorage.getItem('userType') !== 'parent') {
    window.location.href = 'index.html';
}

const studentId = localStorage.getItem('studentId');

// Load student information
function loadStudentInfo() {
    const studentData = JSON.parse(localStorage.getItem('studentData') || '[]');
    const student = studentData.find(s => s.id === studentId);
    
    if (student) {
        document.getElementById('student-info').innerHTML = `
            <h3>Student Information</h3>
            <p>Name: ${student.name}</p>
            <p>ID: ${student.id}</p>
            <p>Class: ${student.class}</p>
        `;
    }
}

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// Attendance Chart
function loadAttendanceData() {
    const attendanceData = JSON.parse(localStorage.getItem('attendanceData') || '[]');
    const studentAttendance = attendanceData.filter(a => a.studentId === studentId);
    
    // Group attendance by month
    const monthlyAttendance = {};
    studentAttendance.forEach(record => {
        const month = new Date(record.date).toLocaleString('default', { month: 'long' });
        if (!monthlyAttendance[month]) {
            monthlyAttendance[month] = { present: 0, absent: 0, total: 0 };
        }
        monthlyAttendance[month][record.status]++;
        monthlyAttendance[month].total++;
    });

    // Create attendance chart
    const ctx = document.getElementById('attendanceChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(monthlyAttendance),
            datasets: [{
                label: 'Present',
                data: Object.values(monthlyAttendance).map(m => m.present),
                backgroundColor: '#4CAF50'
            }, {
                label: 'Absent',
                data: Object.values(monthlyAttendance).map(m => m.absent),
                backgroundColor: '#f44336'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 30
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Monthly Attendance'
                }
            }
        }
    });

    // Update attendance stats
    const statsContainer = document.getElementById('attendance-stats');
    statsContainer.innerHTML = Object.entries(monthlyAttendance)
        .map(([month, data]) => `
            <div class="stat-card">
                <h3>${month}</h3>
                <p>Present: ${data.present} days</p>
                <p>Absent: ${data.absent} days</p>
                <p>Attendance: ${((data.present / data.total) * 100).toFixed(1)}%</p>
            </div>
        `).join('');
}

// Marks Chart and Status
function loadMarksData() {
    const marksData = JSON.parse(localStorage.getItem('marksData') || '[]');
    const studentMarks = marksData.filter(m => m.studentId === studentId);
    
    // Create marks chart
    const ctx = document.getElementById('marksChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: studentMarks.map(m => m.week),
            datasets: [{
                label: 'Marks',
                data: studentMarks.map(m => m.marks),
                borderColor: '#1a73e8',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Academic Progress'
                }
            }
        }
    });

    // Update marks status
    const latestMark = studentMarks[studentMarks.length - 1];
    if (latestMark) {
        const status = getStatus(latestMark.marks);
        document.getElementById('marks-status').innerHTML = `
            <h3>Current Status</h3>
            <div class="status-indicator status-${status}">
                ${status.toUpperCase()}
                <p>Latest Score: ${latestMark.marks}%</p>
            </div>
        `;
    }
}

function getStatus(marks) {
    if (marks >= 75) return 'mild';
    if (marks >= 50) return 'moderate';
    return 'severe';
}

// Load Videos
function loadVideos() {
    const videoData = JSON.parse(localStorage.getItem('videoData') || '[]');
    const videoList = document.getElementById('video-list');
    
    videoList.innerHTML = videoData.map(video => `
        <div class="video-card">
            <h3>${video.title}</h3>
            <a href="${video.link}" target="_blank">Watch Video</a>
        </div>
    `).join('');
}

function logout() {
    localStorage.removeItem('userType');
    localStorage.removeItem('studentId');
    window.location.href = 'index.html';
}

// Initialize dashboard
loadStudentInfo();
loadAttendanceData();
loadMarksData();
loadVideos(); 