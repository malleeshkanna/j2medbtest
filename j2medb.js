const cheerio=require("cheerio");
const axios=require("axios");
const express=require("express");
const cors=require("cors");
const app=express();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

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
        res.json({data:text});
    }catch(e){
        console.log(e);
    }
})

app.get("/openaiData/:ques",async function(req,res){
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




