require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const Record = require('../../Models/Record.js');

const MiddleWare = require('../../MiddleWare/JWTtoUser.js')



router.get('/' , (req,res)=>{
    res.send("this is her e")
})

router.post('/add' ,MiddleWare ,async(req,res)=>{
        try {
            const userid = req.user.id 
            const {totalStudents , Present , date} = req.body
            var dateObject = new Date(date);
            var isoDateString = dateObject.toISOString();
            const record =  await Record.create({
                userid  : userid , 
                totalStudents : totalStudents , 
                Present : Present , 
                recordDate : ConvertStringToDate(date)
            })
           
            
          

            const records =  await Record.find({userid : req.user.id })
            res.status(201).json({ data : records , success : true  })
            
        } catch (error) {
            console.log(error);
            res.status(500).json({error : error , success : false })
        }
})


router.post('/update/:id'  , async(req,res)=>{
    try {

        const id = req.params.id 

        const updateRecord = await Record.findByIdAndUpdate(
			id,
			req.body)
        res.json({success : true , data : updateRecord })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error : error , success : false })
    }
})

router.get('/delete/:id'  , async(req,res)=>{
    try{
        await Record.findByIdAndDelete(req.params.id)
        res.json({success : true })


    }catch(error){
        console.log(error);
        res.status(500).json({error : error , success : false })
    }
})

router.get('/data/:date' , MiddleWare , async(req,res)=>{
    try{
            const date = req.params.date 

            const record =  await Record.findOne({recordDate : ConvertStringToDate(date) , userid : req.user.id })
             res.status(200).json({ data : record , success : true  })

    }catch(error){
        console.log(error);
        res.status(500).json({error : error , success : false })
    }
})

router.get('/record/:id'  , MiddleWare , async(req,res)=>{
    try{
        const id = req.params.id 
        const record =  await Record.findById(id)
         res.status(200).json({ data : record , success : true  })

    }catch(error){
        console.log(error);
        res.status(500).json({error : error , success : false })
    }
})

router.get('/alldata'  , MiddleWare , async(req,res)=>{
    try{
        const date = req.params.date 

        const record =  await Record.find({userid : req.user.id })
         res.status(200).json({ data : record , success : true  })

    }catch(error){
        console.log(error);
        res.status(500).json({error : error , success : false })
    }
})

function ConvertStringToDate(dateString){

        var dateObject = new Date(dateString);

        // Extract year, month, and day from the date object
        var year = dateObject.getFullYear();
        var month = dateObject.getMonth() + 1; // Adding 1 because months are zero-indexed
        var day = dateObject.getDate();

        // Create a new date object with only year, month, and day
        var newDateObject = new Date(year, month - 1, day); // Subtracting 1 because months are zero-indexed

        // Print the new date object
        return newDateObject; 
}


module.exports = router; 
