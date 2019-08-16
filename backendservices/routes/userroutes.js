const exp=require('express');
//importing database object
const initdb=require('../DBConfig').initdb
const getdb=require('../DBConfig').getdb
const secret='secret'
const nodemailer=require('nodemailer')
//importing jwt
const jwt=require('jsonwebtoken')
//intailizing dbo
initdb();
//importing bcrypt
const bcrypt=require('bcrypt')
var userRoutes=exp.Router();

//userRoutes handler
userRoutes.post('/register',(req,res,next)=>{
    console.log(req.body)
    //hashing the password using 
    bcrypt.hash(req.body.password,5,(err,hashedPassword)=>{
        if(err)
        {
            next(err)
        }
        else{
            
            console.log(req.body)
            var dbo=getdb();
            if(req.body.usertype==='owner')
            {   
                let transporter=nodemailer.
                        createTransport({
                            service:"gmail",
                            auth:{
                                user:"saithota433@gmail.com",
                                pass:"venkat4321"
                            }
                        });
                        let info= transporter.sendMail({
                            //sender address
                            from:'"login details" <saithota433@gmail.com>',
                            //list of recivers
                            to:req.body.mail,
                            subject:"owner credentials",//subject line
                            text:`username: ${req.body.name},password: ${req.body.password}`,//plain text body
                            //html:"<b>hiii ra praveen</b>"//htmlbody
                        });
                req.body.password=hashedPassword
                dbo.collection("owner").find({name:{$eq:req.body.name}}).toArray((err,dataArray)=>{
                    if (dataArray.length==0)
                    {
                        dbo.collection("owner").insertOne(req.body,(err,success)=>{
                            if(err){
                               next(err)
                            }
                            else{
                                res.json({message:"registered successfully"})
                            }
                        })
                    }
                    else{
                        res.json({message:"name exists"})
                    }
                })
    
               
            }
            else{
                let transporter=nodemailer.
                        createTransport({
                            service:"gmail",
                            auth:{
                                user:"saithota433@gmail.com",
                                pass:"venkat4321"
                            }
                        });
                        let info= transporter.sendMail({
                            //sender address
                            from:'"login details" <saithota433@gmail.com>',
                            //list of recivers
                            to:req.body.mail,
                            subject:"vendor credentials",//subject line
                            text:`username: ${req.body.name},password: ${req.body.password}`,//plain text body
                            //html:"<b>hiii ra praveen</b>"//htmlbody
                        });
                req.body.password=hashedPassword
                dbo.collection("vendor").find({name:{$eq:req.body.name}}).toArray((err,dataArray)=>{
                    if (dataArray.length==0)
                    {
                        dbo.collection("vendor").insertOne(req.body,(err,success)=>{
                            if(err){
                               next(err)
                            }
                            else{
                                res.json({message:"registered successfully"})
                            }
                        })
                    }
                    else{
                        res.json({message:"name exists"})
                    }
                })
            }
        }
    })
   
        
})
//login validation user
userRoutes.post('/login',(req,res,next)=>{
    console.log(req.body)
    var dbo=getdb();
        if(req.body.usertype==='owner')
        {

            dbo.collection("owner").find({name:{$eq:req.body.name}}).toArray((err,data)=>{
                if(err){
                   next(err)
                }
                else{
                    if (data.length==0)
                    {
                        res.json({message:'owner name invalid'})
                    }
                
                   else {
                    bcrypt.compare(req.body.password,data[0].password,(err,result)=>{
                            if (result==true)
                            {
                                //intailizing varaible
                                currentUserName=data[0].name
                                //create and send JSON token
                                const signedToken=jwt.sign({name:data[0].name},secret,{expiresIn: "7d"})
                                res.json({message:'owner logged in successfully',userdata:data,token:signedToken})
                            }
                            else{
                                res.json({message:'owner password invalid'})
                            }
                    })
                      
                   }
                }
            })
        }
        else{
            dbo.collection("vendor").find({name:{$eq:req.body.name}}).toArray((err,data)=>{
                if(err){
                   next(err)
                }
                else{
                    if (data.length==0)
                    {
                        res.json({message:'vendor name invalid'})
                    }
                    
                   else {
                    bcrypt.compare(req.body.password,data[0].password,(err,result)=>{
                        if (result==true)
                        {
                            //intailizing varaible
                            currentUserName=data[0].name
                            //create and send JSON token
                            const signedToken=jwt.sign({name:data[0].name},secret,{expiresIn: "7d"})
                            res.json({message:'vendor logged in successfully',userdata:data,token:signedToken})
                        }
                        else{
                            res.json({message:'vendor password invalid'})
                        }
                    })
                      
                   }
                }
            })
        }
        
})

const accountSid = 'ACa3e9c60556982ae09b34378553b1301d';
const authToken = '4fdb16eb0179e0f4b42804126a25d370';
const client = require('twilio')(accountSid, authToken);



userRoutes.post('/forgotpassword',(req,res,next)=>{
    console.log(req.body)
    var dbo=getdb();
    if(req.body.usertype=='owner'){
        dbname='owner'
    }
    else
    {
        dbname='vendor'
    }
    dbo.collection(dbname).find({name:req.body.name}).toArray((err,userArray)=>{
        if(err){
            next(err)
        }
        else{
            if(userArray.length===0){
                res.json({message:"user not found"})
            }
            else{

                jwt.sign({name:userArray[0].name},secret,{expiresIn:'7d'},(err,token)=>{
                    if(err){
                     next(err);
                    }
                    else{
                        var OTP=Math.floor(Math.random()*99999)+11111;
                        console.log(OTP)
                        
                        client.messages.create({
                            body: OTP,
                            from: '+12512502409', // From a valid Twilio number
                            to:'+91'+userArray[0].number,  // Text this number
  
                        })
                        .then((message) => {
                            dbo.collection('OTPCollection').insertOne({
                                OTP:OTP,
                                name:userArray[0].name,
                                OTPGeneratedTime:new Date().getTime()+30000
                        },(err,success)=>{
                            if(err){
                                next(err)
                            }
                            else{                                        
                                res.json({"message":"user found",
                                    "token":token,
                                    "OTP":OTP,
                                    "userName":userArray[0].name
                                })
                            }
                        })
                        });

                    }
                    
                })
            }
        }
    })
})

//verify OTP
userRoutes.post('/verifyotp',(req,res,next)=>{
    console.log(req.body)
    var dbo=getdb();
    console.log(new Date().getTime())
    var currentTime=new Date().getTime()
    dbo.collection('OTPCollection').find({"OTP":req.body.OTP}).toArray((err,OTPArray)=>{
        if(err){
            next(err)
        }
        else if(OTPArray.length===0){
            res.json({"message":"invalidOTP"})
        }
        else if(OTPArray[0].OTPGeneratedTime < currentTime){
            res.json({"message":"invalidOTP"})
        }
        else{
            
            dbo.collection('OTPCollection').deleteOne({OTP:req.body.OTP},(err,success)=>{
                if(err){
                    next(err);
                }
                else{
                    console.log(OTPArray)
                    res.json({"message":"verifiedOTP"})
                }
            })
        }
    })
})

//changing password
userRoutes.put('/changepassword',(req,res,next)=>{
    console.log(req.body)
    var dbo=getdb();
    if(req.body.usertype=='owner'){
        dbname='owner'
    }
    else
    {
        dbname='vendor'
    }
    bcrypt.hash(req.body.password,5,(err,hashedPassword)=>{
        if (err) {
            next(err)
        } else {
            console.log(hashedPassword)
            dbo.collection(dbname).updateOne({name:req.body.name},{$set:{
                password:hashedPassword
            }},(err,success)=>{
                if(err){
                    next(err)
                }
                else{
                    res.json({"message":"password changed"})
                }
            }) 
        }
    })
    
})











//error handling callback function
userRoutes.use((err,req,res,next)=>{
    console.log(err)
})
module.exports=userRoutes