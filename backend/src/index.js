import { connectDb } from "./db/index.js";

console.log("Hello");

connectDb()
.then(()=>{
    console.log("Connected to Postgres database");
})
.catch((error) => {
    console.error("Error connecting to Postgres", error);
});