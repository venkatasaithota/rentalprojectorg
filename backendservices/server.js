const exp=require('express')
const app=exp();
//installing and importing path
const path=require('path')
//connecting angular app with server
app.use(exp.static(path.join(__dirname,'../dist/rental')));
//installing and importing body-parser
const bodyParser=require('body-parser')
//using body-parser
app.use(bodyParser.json())
//importing userRoutes
const userRoutes=require('./routes/userroutes');
//using userRoutes
app.use('/nav',userRoutes)
//importing ownerdashboardroutes
const ownerdashboardroutes=require('./routes/ownerdashbordroutes');
//using ownerdashboardroutes
app.use('/ownerdashboard',ownerdashboardroutes)
//importing vendordashboardroutes
const vendordashboardroutes=require('./routes/vendordashboardroutes');
//using vendordashboardroutes
app.use('/vendordashboard',vendordashboardroutes)
//importing adminroutes
const adminroutes=require('./routes/adminroutes');
//using vendordashboardroutes
app.use('/admin',adminroutes)
//using jwtwebtoken
const jwt=require('jsonwebtoken');

app.listen(process.env.PORT || 8080 ,()=>{
    console.log('server started')
    })