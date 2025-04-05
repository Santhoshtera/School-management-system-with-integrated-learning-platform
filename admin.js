// Check authentication
if (!localStorage.getItem('userType') || localStorage.getItem('userType') !== 'admin') {
    window.location.href = 'index.html';
}

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// Faculty Management
document.getElementById('faculty-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const facultyData = {
        name: document.getElementById('faculty-name').value,
        id: document.getElementById('faculty-id').value,
        subject: document.getElementById('subject').value,
        class: document.getElementById('class').value
    };

    let facultyList = JSON.parse(localStorage.getItem('facultyData') || '[]');
    facultyList.push(facultyData);
    localStorage.setItem('facultyData', JSON.stringify(facultyList));
    
    updateFacultyList();
    this.reset();
});

function deleteFaculty() {
    const facultyId = document.getElementById('faculty-id').value;
    let facultyList = JSON.parse(localStorage.getItem('facultyData') || '[]');
    facultyList = facultyList.filter(f => f.id !== facultyId);
    localStorage.setItem('facultyData', JSON.stringify(facultyList));
    updateFacultyList();
}

function updateFacultyList() {
    const facultyList = JSON.parse(localStorage.getItem('facultyData') || '[]');
    const listElement = document.getElementById('faculty-list');
    listElement.innerHTML = '';
    
    facultyList.forEach(faculty => {
        const div = document.createElement('div');
        div.className = 'data-item';
        div.innerHTML = `
            <p>Name: ${faculty.name}</p>
            <p>ID: ${faculty.id}</p>
            <p>Subject: ${faculty.subject}</p>
            <p>Class: ${faculty.class}</p>
        `;
        listElement.appendChild(div);
    });
}

// Student Management
document.getElementById('student-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const studentData = {
        name: document.getElementById('student-name').value,
        gender: document.getElementById('gender').value,
        id: document.getElementById('student-id').value,
        dob: document.getElementById('dob').value,
        parentName: document.getElementById('parent-name').value,
        mobile: document.getElementById('mobile').value
    };

    let studentList = JSON.parse(localStorage.getItem('studentData') || '[]');
    studentList.push(studentData);
    localStorage.setItem('studentData', JSON.stringify(studentList));
    
    updateStudentList();
    this.reset();
});

function deleteStudent() {
    const studentId = document.getElementById('student-id').value;
    let studentList = JSON.parse(localStorage.getItem('studentData') || '[]');
    studentList = studentList.filter(s => s.id !== studentId);
    localStorage.setItem('studentData', JSON.stringify(studentList));
    updateStudentList();
}

function updateStudentList() {
    const studentList = JSON.parse(localStorage.getItem('studentData') || '[]');
    const listElement = document.getElementById('student-list');
    listElement.innerHTML = '';
    
    studentList.forEach(student => {
        const div = document.createElement('div');
        div.className = 'data-item';
        div.innerHTML = `
            <p>Name: ${student.name}</p>
            <p>ID: ${student.id}</p>
            <p>Gender: ${student.gender}</p>
            <p>Date of Birth: ${student.dob}</p>
            <p>Parent Name: ${student.parentName}</p>
            <p>Mobile: ${student.mobile}</p>
        `;
        listElement.appendChild(div);
    });
}

// Marks Management
document.getElementById('marks-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const marksData = {
        studentId: document.getElementById('marks-student-id').value,
        month: document.getElementById('marks-month').value,
        marks: parseInt(document.getElementById('marks').value),
        status: getStatus(parseInt(document.getElementById('marks').value))
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

function deleteMarks() {
    const studentId = document.getElementById('marks-student-id').value;
    const month = document.getElementById('marks-month').value;
    let marksList = JSON.parse(localStorage.getItem('marksData') || '[]');
    marksList = marksList.filter(m => !(m.studentId === studentId && m.month === month));
    localStorage.setItem('marksData', JSON.stringify(marksList));
    updateMarksList();
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
            <p>Month: ${marks.month}</p>
            <p>Marks: ${marks.marks}</p>
            <p>Status: ${marks.status}</p>
        `;
        listElement.appendChild(div);
    });
}

function logout() {
    localStorage.removeItem('userType');
    localStorage.removeItem('username');
    window.location.href = 'index.html';
}

// Initial load
updateFacultyList();
updateStudentList();
updateMarksList(); 