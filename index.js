const express=require('express');
const {check,validationResult}=require('express-validator');
const bodyParser=require('body-parser');
const app=express();


const PORT=process.env.PORT || '8000';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.set('view engine','ejs');

app.get('/',(req,res)=>{
	res.render('home');
});

app.get('/register',(req,res)=>{
	res.render('register',{requestType:'get',errors:undefined,success:undefined,user:{}});
});

app.post('/register',[check('name','The name is required!').not().isEmpty(),
					  check('email','The given email is not valid!').isEmail(),
					  check('password','The password size must be at least equal to 4').isLength({min:4})],(req,res)=>{
	const errors=validationResult(req);
	console.log(JSON.stringify(req.body));
	if(errors.errors.length>0){
		res.render('register',{requestType:'post',errors:errors.mapped(),user:req.body});
	}else
		res.render('register',{requestType:'post',errors:undefined,success:'Your informations hava been registred successfully!',user:{}});
});

app.listen('8000',()=>{
	console.log('listening at port:'+PORT);
});