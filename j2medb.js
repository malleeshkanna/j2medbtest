const cheerio=require("cheerio");
const axios=require("axios");
const express=require("express");
const cors=require("cors");
const app=express();
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

app.listen("4000",()=>{
    console.log("Port is connected");
})
