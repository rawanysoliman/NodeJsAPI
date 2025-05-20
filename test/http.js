
const data=[{name:"rawan",age:26,city:"alex"},{name:"mhmd",age:26,city:"alex"},{name:"ahmd",age:26,city:"alex"}]
const http =require("http");

const server=http.createServer((req,res)=>{
    if(req.url==="/")
    {
        res.writeHead(200,{"content-type":"application/json"});
        res.end(JSON.stringify(data));
    }
    else
    {
        res.writeHead(400,{"content-type":"text/html"});
        res.end(`<h1>GOOOO OUTTTTTTT</h1>`);
    }
})


const port=4000;
server.listen(port,()=>
{    console.log("server is listening")
    

})