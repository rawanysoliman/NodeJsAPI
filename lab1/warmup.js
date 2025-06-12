const users = [
    { name: "John Doe", age: 28, role: "developer" },
    { name: "Jane Smith", age: 32, role: "admin" },
    { name: "Bob Johnson", age: 24, role: "developer" },
    { name: "Sarah Williams", age: 27, role: "manager" },
    { name: "Mike Brown", age: 35, role: "admin" },
  ];

  const filteredUsers = users.filter(user => user.age >30);
  console.log(filteredUsers);

  const nameOnly = users.map(user => user.name);
  console.log(nameOnly);


const firstAdmin = users.find(user => user.role === "admin");
console.log(firstAdmin);
