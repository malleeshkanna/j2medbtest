
const express=require('express');
const app=express();
app.use(express.json());

app.get('/myname',function(req,res){
    res.download('name.txt');
})

app.listen(3000,()=>{
    console.log("J2ME Port is connected");
})



