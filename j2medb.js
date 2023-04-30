const cheerio=require("cheerio");
const axios=require("axios");
const express=require("express");
const cors=require("cors");
const app=express();
const { Configuration, OpenAIApi } = require("openai");
const request = require('request');
var apiKey='';

request({url:"https://thozhil-776ed-default-rtdb.firebaseio.com/openai.json"},(err,res)=>{
    const data=JSON.parse(res.body);
    console.log(data.apiKey);
    apiKey=data.apiKey;
})



app.use(express.json());
app.use(cors());


app.get('/gstdetails/:gstno',async function(req,res){
    var url="https://irisgst.com/gstin-filing-detail/?gstinno="+req.params.gstno;
    try{
        const response=await axios.get(url);
        const $=cheerio.load(response.data);
        const gstdetail=$('.form-control');
        var text='';
        var arrData=[];
        gstdetail.each(function(){
            arrData.push($(this).val());
        })
        text=`,${arrData[0]},${arrData[1]},${arrData[2]},${arrData[3]},${arrData[4]},${arrData[5]},${arrData[6]}`;
        console.log(arrData)
        res.json({data:text});
    }catch(e){
        console.log(e);
    }
})

app.get("/openaiData/:ques",async function(req,res){
    console.log(req.params.ques);
    const configuration = new Configuration({
        apiKey: apiKey,
    });
    const openai = new OpenAIApi(configuration);
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: req.params.ques,
        max_tokens:3000
      });
      res.json({data:completion.data.choices[0].text})
})


app.listen(5000,()=>{
    console.log("Port is connected")
})




