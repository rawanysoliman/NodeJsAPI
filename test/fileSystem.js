
const fs=require("fs");
// const { json } = require("stream/consumers");

const content=fs.readFileSync("file1.txt","utf-8");
console.log(content);
console.log(typeof(content));


const content2=fs.readFileSync("data.json","utf-8");
const mydata=JSON.parse(content2)
console.log(mydata);
console.log(typeof(mydata));

mydata.push({
    "name":"Row",
    "age":26,
    "city":"Cairo"
})

fs.writeFileSync("newFile.json",JSON.stringify(mydata))


