const express=require('express');
const serveindex=require('serve-index');
const app=express();


app.use('/ftp',express.static('public'),serveindex('public',{icons:true}))

app.listen(4000,()=>{
    console.log('port is connected');
})
