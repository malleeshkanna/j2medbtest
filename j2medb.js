const fs=require('fs');
const express=require('express');
const app=express();
const cors=require('cors');
const request = require('request');
const dbUrl="https://ajfireservice-229a3-default-rtdb.firebaseio.com/";
const header= {'Content-Type': 'application/x-www-form-urlencoded'};
app.use(express.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/getstatecodes',function(req,res){
    request({url:dbUrl+"statecode.json"},function(err,response){
        if(!err){
            const statecodes=[...new Map(Object.entries(JSON.parse(response.body))).values()];
            res.send((statecodes[5].state_name_code).toString());
        }else{
            res.json({status:false,message:"State Code Details was failed to fetch !"});
        }
        
    })
})

app.listen(4000,()=>{
    console.log("Port is Connected");
})