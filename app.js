npm install firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKYrqcbDrMcx90j3Fvswud7fQsBbQR0oE",
  authDomain: "curd-43abb.firebaseapp.com",
  projectId: "curd-43abb",
  storageBucket: "curd-43abb.firebasestorage.app",
  messagingSenderId: "221485674882",
  appId: "1:221485674882:web:f46df0f6368d9704ad5f9b",
  measurementId: "G-X86PKN6FVR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let editingId = null;

// Función para agregar o editar estudiante
document.getElementById('studentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('studentName').value;
    const email = document.getElementById('studentEmail').value;
    const age = document.getElementById('studentAge').value;
    const course = document.getElementById('studentCourse').value;
    const school = document.getElementById('studentSchool').value;
    const idCard = document.getElementById('studentIDCard').value;
    const readingLikes = document.getElementById('studentReadingLikes').value;

    if (editingId) {
        // Actualizar estudiante
        db.collection('students').doc(editingId).update({
            name: name,
            email: email,
            age: age,
            course: course,
            school: school,
            idCard: idCard,
            readingLikes: readingLikes
        }).then(() => {
            resetForm();
            loadStudents();
        });
    } else {
        // Agregar nuevo estudiante
        db.collection('students').add({
            name: name,
            email: email,
            age: age,
            course: course,
            school: school,
            idCard: idCard,
            readingLikes: readingLikes
        }).then(() => {
            resetForm();
            loadStudents();
        });
    }
});

// Función para cargar estudiantes
function loadStudents() {
    const studentList = document.getElementById('studentList');
    studentList.innerHTML = '';
    db.collection('students').get().then((snapshot) => {
        snapshot.forEach(doc => {
            const data = doc.data();
            const li = document.createElement('li');
            li.textContent = `${data.name} - ${data.email} - ${data.age} - ${data.course} - ${data.school} - ${data.idCard} - ${data.readingLikes}`;
            
            // Botón de editar
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.onclick = () => editStudent(doc.id, data);
 li.appendChild(editButton);
            
            // Botón de eliminar
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.onclick = () => deleteStudent(doc.id);
            li.appendChild(deleteButton);
            
            studentList.appendChild(li);
        });
    });
}

// Función para editar estudiante
function editStudent(id, data) {
    editingId = id;
    document.getElementById('studentName').value = data.name;
    document.getElementById('studentEmail').value = data.email;
    document.getElementById('studentAge').value = data.age;
    document.getElementById('studentCourse').value = data.course;
    document.getElementById('studentSchool').value = data.school;
    document.getElementById('studentIDCard').value = data.idCard;
    document.getElementById('studentReadingLikes').value = data.readingLikes;
}

// Función para eliminar estudiante
function deleteStudent(id) {
    db.collection('students').doc(id).delete().then(() => {
        loadStudents();
    });
}

// Función para reiniciar el formulario
function resetForm() {
    document.getElementById('studentForm').reset();
    editingId = null;
}

// Cargar estudiantes al iniciar
loadStudents();
