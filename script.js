const studentForm = document.getElementById('studentForm');
const studentList = document.getElementById('studentList');
const errorDiv = document.getElementById('error');
const students = [];

studentForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const studentId = document.getElementById('studentID').value.trim();
    const studentName = document.getElementById('studentName').value.trim();
    const studentAge = document.getElementById('studentAge').value.trim();
    
    try {
        addStudent(studentId, studentName, studentAge);
        displayStudent();
        errorDiv.textContent = '';
    } catch (error) {
        errorDiv.textContent = error.message;
    }

    studentForm.reset();
});

function addStudent(id, name, age) {
    if (!id || !name || !age) {
        throw new Error('All fields are required');        
    }

    if (isNaN(age) || age <= 0) {
        throw new Error('Age must be a positive number');
    }

    const studentExists = students.some(student => student.id === id);
    if (studentExists) {
        throw new Error('Student ID already exists');
    }

    const student = {
        id,
        name,   
        age: parseInt(age, 10)
    };

    students.push(student);
}

function displayStudent() {
    studentList.innerHTML = '';
    students.forEach(student => {
        const li = document.createElement('li');
        li.textContent = `ID: ${student.id}, Name: ${student.name}, Age: ${student.age}`; 
        studentList.appendChild(li);
    });
}
