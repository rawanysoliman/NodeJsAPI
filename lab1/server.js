const http = require("http");
const fs = require('fs');
const { readStudentsSync } = require('./fileOperations');

const server = http.createServer((req, res) => {
    
    if (req.url === "/students") {
        // Serve student data
        const students = readStudentsSync();
        res.writeHead(200, {"content-type": "application/json"});
        res.end(JSON.stringify(students));
    }
    else if (req.url === "/stats") {
        // Show total number of students
        const students = readStudentsSync();
        const stats = {
            totalStudents: students.length
        };
        res.writeHead(200, {"content-type": "application/json"});
        res.end(JSON.stringify(stats));
    }
    else if (req.url === "/courses") {
        // Show courses list
        const students = readStudentsSync();
        const courses = [...new Set(students.map(student => student.course))];
        res.writeHead(200, {"content-type": "application/json"});
        res.end(JSON.stringify(courses));
    }
    else {
        // Return 404 for undefined routes
        res.writeHead(404, {"content-type": "text/plain"});
        res.end("404 Not Found");
    }
});

const port = 4000;
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});