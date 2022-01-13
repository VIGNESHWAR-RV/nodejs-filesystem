const fs = require("fs");
const express = require("express");

require('dotenv').config();


const app = express();
const port = process.env.PORT;


app.get("/",(request, response)=>{
    response.send("hello, 🌍")
});

const timeStamp = Date.now();
const dateTime = new Date(timeStamp);
const date = dateTime.getDate();
const month = dateTime.getMonth();
const year = dateTime.getFullYear();
const H = dateTime.getHours();
const M = dateTime.getMinutes();
const S = dateTime.getSeconds();


const DateAndTime = (("0"+date).slice(-2))+"/"+(("0"+month+1).slice(-2))+"/"+year+"-"+H+":"+M+":"+S;

const path = `./backup/${timeStamp}.txt`;
app.get("/getCurrentTimeInTextFile",(request, response)=>{
    fs.writeFile(path,(""+DateAndTime),(err)=>{
        if(err){
            console.log(err);
        }
        console.log("completed");
    })
    response.send(`<h1 style="padding:40vh;text-align:center">File name 
                        "<span style="color:red">${timeStamp}.txt</span>" with content 
                        "<span style="color:red">${""+DateAndTime}</span>" is written in directory 
                        "<span style="color:red">${path}</span>"</h1>`);
});


app.listen(port,()=>console.log("server started at",port));