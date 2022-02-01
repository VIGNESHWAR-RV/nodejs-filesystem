// importing fs,express,dotenv using require

const fs = require("fs");
const express = require("express");
require('dotenv').config();

//naming express functions as app
const app = express();

//setting up the port in .env , so that heroku sets its own port
const port = process.env.PORT;


//initial welcome page to confirm our app is working
app.get("/",(request, response)=>{
    response.send("hello, 🌍")
});






//route path to perform write file function
app.get("/getCurrentTimeInTextFile",(request, response)=>{

    // getting current timestamp
const timeStamp = Date.now();

//getting data,month,year,H(hour),M(minutes),S(seconds) from timestamp
const dateTime = new Date(timeStamp);
const date = dateTime.getDate();
const month = dateTime.getMonth();
const year = dateTime.getFullYear();
const H = dateTime.getHours();
const M = dateTime.getMinutes();
const S = dateTime.getSeconds();

//Adding individual values together to get required expression as (DD/MM/YYYY - H:M:S)
const DateAndTime = (("0"+date).slice(-2))+"/"+(("0"+month+1).slice(-2))+"/"+year+" - "+H+":"+M+":"+S;

//path to write the file
const path = `./backup/${timeStamp}.txt`;


    //writing file function
    fs.writeFile(path,(""+DateAndTime),(err)=>{

        //to show if there is error
        if(err){
            console.log(err);
        }
        //to show if the writing is completed successfully
        console.log("completed");
    })
        //sending response in return to show in document
    response.send(`<h1 style="padding:40vh;text-align:center">File name 
                        "<span style="color:red">${timeStamp}.txt</span>" with content 
                        "<span style="color:red">${""+DateAndTime}</span>" is written in directory 
                        "<span style="color:red">${path}</span>"</h1>`);
});

     //to make express listen to the port
app.listen(port,()=>console.log("server started at",port));