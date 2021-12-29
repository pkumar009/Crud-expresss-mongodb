const express = require("express");
//const student = require("./employees");
const db = require("./connection");
app = express();
app.use(express.json());

app.listen("3001",()=>{
    console.log("Server is listening on Port 3001");
})

app.get("/api/employee",async (req,res)=>{
    const dbconnect = await db();
    const result = await dbconnect.find({}).toArray();
    if(result.length>0)
    {
        res.json(result);
    }
    else{
        res.json("Data Not Found");
    }

})

app.post("/api/employee/add",async (req,res)=>{
    const dbconnect = await db();
    const data = {
        first_name :req.body.first_name,  
        last_name : req.body.last_name, 
        email : req.body.email         
    };

    let result = await dbconnect.insertOne(
        data
    )
    if(result.acknowledged)
    {
        res.json("Data Inserted");
    }
    else{
        res.json(["Something Went Wrong","code:0"]);
    }
    
})

app.put("/api/employee/:id",async (req,res)=>{

    const dbconnect = await db();
    
 // Record updating by emailId

    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let email = req.body.email;
    let id = req.params.id;

    let myquery = { email:  email};
    let newvalues = { $set: {first_name: first_name, last_name: last_name } };
    const result = await dbconnect.updateOne(myquery,newvalues);

    console.warn(result);
    if(result.acknowledged == true && result.modifiedCount>0)
    {
        res.json(["Record Updated Succesfully",'code:10']);
    }
   else if(result.acknowledged == true && result.modifiedCount==0)
    {
        res.json(["Already  Updated ",'code:10']);
    }
    else{
        res.json(["Something Went Wrong","code:0"]);
    }

 
})
app.delete("/api/employee/:id",async (req,res)=>{

    const dbconnect = await db();
    
    // Record deleting by emailId
    let id = req.params.id;
    let email = req.body.email;
    let result = await dbconnect.deleteOne({email:email});
    //console.warn(result);
    if(result.acknowledged==true && result.deletedCount>0)
    {
        res.json(["Record Deleted Successfully","code:10"]);
    }
    else
    {
        res.json(["Something Went Wrong","code:0"]);
    }
    

    
})