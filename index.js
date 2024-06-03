//console.log("Node is Running...")

const { default: mongoose } = require('mongoose');
const app = require('./app');
const port = 3001;
const host = '127.0.0.1';


const server = app.listen(port,host, ()=>{
    console.log(`Node Server is listening to ${server.address().port}`);
});



mongoose.connect("mongodb+srv://MrFernando:Aidora2024@aidora-web.rdpnbij.mongodb.net/?retryWrites=true&w=majority&appName=Aidora-Web")

.then(()=>{
    console.log("Database Connected");
})

.catch(err =>{
    console.log("Database not Connected"+err);
})