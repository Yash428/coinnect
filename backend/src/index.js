import { connectDb } from "./db/index.js";
import { app } from "./app.js";

app.get('/',(req,res)=>{
    res.send("Heyy")
})
app.get('/testing',(req,res)=>{
    res.send("Heyy")
})
app.get('/api',(req,res)=>{
    res.send("Heyy")
})


connectDb()
.then(()=>{
    app.listen(process.env.PORT||8003,()=>{
        console.log("server on 8002");
    })
})
.catch((err)=>{
    console.log("Db err ",err);
})


console.log("Hello");

connectDb()
.then(()=>{
    console.log("Connected to Postgres database");
})
.catch((error) => {
    console.error("Error connecting to Postgres", error);
});