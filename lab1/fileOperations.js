

module.exports = {
  readStudentsSync,
  writeStudentsSync,
  writeStudentsAsync,
  readStudentsAsync,
  addStudent,
  deleteStudent,
  updateStudent
};

const fs = require('fs');

const studentData = [
    {
      id: 1,
      name: "Alice Johnson",
      age: 20,
      course: "Computer Science",
      grades: {
        math: 90,
        programming: 95,
      },
    },
    {
      id: 2,
      name: "Bob Smith",
      age: 22,
      course: "Data Science",
      grades: {
        statistics: 88,
        machine_learning: 92,
      },
    },
    {
      id: 3,
      name: "Carol Williams",
      age: 21,
      course: "Web Development",
      grades: {
        html: 95,
        javascript: 89,
      },
    },
  ];
  
  const filePath = 'students.json';
  //write sync
  function writeStudentsSync() {
    try {
      fs.writeFileSync(filePath, JSON.stringify(studentData, null, 2));
      console.log("Data written synchronously.");
    } catch (err) {
      console.error("Sync write error:", err);
    }
  }

//   writeStudentsSync();

  const filePath2 = 'studentsAsync.json';

  //write async
  function writeStudentsAsync() {
    fs.writeFile(filePath2, JSON.stringify(studentData, null, 2), (err) => {
      if (err) {
        console.error("Async write error:", err);
      } else {
        console.log("Data written asynchronously.");
      }
    });
  }

//   writeStudentsAsync();

  // Sync read
function readStudentsSync() {
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      console.error("Sync read error:", err);
      
    }
  }
  const data = readStudentsSync();
  console.log(data);
  
  // Async read
  async function readStudentsAsync() {
    try {
      const data = await fsPromises.readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      console.error("Async read error:", err);
    }
  }

  //add new student
  function addStudent(student) {
    studentData.push(student);
    fs.writeFileSync(filePath, JSON.stringify(studentData, null, 2));
  }

  addStudent({
    id: 4,
    name: "Rawaaaaaaaaaaaaaaaaaaan",
    age: 23,
    course: "Artificial Intelligence",
  });
  
  
  //delete student
  function deleteStudent(id) {
    const index = studentData.findIndex(student => student.id === id);
    if (index !== -1) {
      studentData.splice(index, 1);
      fs.writeFileSync(filePath, JSON.stringify(studentData, null, 2));
    } else {
      console.log("Student not found");
    }
  }

//   deleteStudent(4);

  //update student
  function updateStudent(id, student) {
    const index = studentData.findIndex(student => student.id === id);
    if (index !== -1) {
      studentData[index] = student;
      fs.writeFileSync(filePath, JSON.stringify(studentData, null, 2)); 
    } else {
      console.log("Student not found");
    }
  }

  updateStudent(1, {
    name: "RaW",
    age: 23,
    course: "Artificial Intelligence",
  });
  
  
  
  
