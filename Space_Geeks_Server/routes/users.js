var express = require('express');
const bodyParser=require('body-parser');
var User=require('../models/user');
var passport=require('passport');
const authenticate = require('../authenticate');
const cors=require('./cors');

var router = express.Router();
router.options('*',cors.corsWithOptions,(req,res)=>{res.sendStatus(200);});
router.use(bodyParser.json());
router.get('/',cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin, function(req, res, next) {
  User.find(req.require)
    .then((us)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(us);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

router.post('/signup',cors.corsWithOptions,function(req,res,next){
  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {
    if(err) {
      err=new Error(err.message)
      err.status = 500;
      return next(err);
    }
    else {
        if(req.body.firstname)
          user.firstname=req.body.firstname;
        if(req.body.lastname)
          user.lastname=req.body.lastname;
        user.save((err,user)=>{
            if(err) {
              err=new Error(err.message)
              err.status = 500;
              return next(err);
            }
            passport.authenticate('local')(req, res, () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, status: 'Registration Successful!'});
        });
      });
    }
  },(err)=>next(err));
},(err)=>next(err));

router.post('/login',cors.cors,(req,res,next)=>{
  passport.authenticate('local',(err,user,info)=>{
    if(err)
    return next(err);
    if(!user)
    {
      res.statusCode=401;
      res.setHeader('Content-Type','application/json');
      res.json({success:false,status:'Login Unsuccessful!',err:info});
    }
    req.logIn(user,(err)=>{
      if(err)
      {
        res.statusCode=401;
        res.setHeader('Content-Type','application/json');
        res.json({success:false,status:'Login Unsuccessful!',err:'Could not login user'});
      }
      var token=authenticate.getToken({_id:req.user._id});
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json({success:true,token:token,status:'You are successfully logged In'});
    })
  })(req,res,next);
});


router.post('/changeUsername',authenticate.verifyUser,cors.corsWithOptions,function(req,res,next){
  User.findById(req.user._id)
  .then((user)=>{
    var OldUsername=req.user.username,newUsername=req.body.username;
    user.username="";
    User.findOne({username:newUsername})
    .then((userFound)=>{
      if(userFound==null)
      {
        user.username=newUsername;
        user.save()
        .then((resp)=>{
          res.statusCode=200;
          res.setHeader('Content-Type','application/json');
          res.json({'statusValue':'Username changed succesfully'});
        },(err)=>next(err))
        .catch((err)=>next(err));
      }
      else
      {
        user.username=oldUsername;
        user.save();
        err=new Error('Username already taken by someone');
        err.status=400;
        return next(err);
      }
    },(err)=>next(err))
  },(err)=>next(err))
  .catch((err)=>next(err));
},(err)=>next(err));

router.post('/login',cors.corsWithOptions,(req,res,next)=>{
  passport.authenticate('local',(err,user,info)=>{
    if(err)
    return next(err);
    if(!user)
    {
      res.statusCode=401;
      res.setHeader('Content-Type','application/json');
      res.json({success:false,status:'Login Unsuccessful!',err:info});
    }
    req.logIn(user,(err)=>{
      if(err)
      {
        res.statusCode=401;
        res.setHeader('Content-Type','application/json');
        res.json({success:false,status:'Login Unsuccessful!',err:'Could not login user'});
      }
      var token=authenticate.getToken({_id:req.user._id});
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json({success:true,token:token,status:'You are successfully logged In'});
    })
  })(req,res,next);
});

router.get('/logout',cors.corsWithOptions,(req,res,next)=>{
  if(req.user){
    res.redirect('/');
  }
  else{
    var err =new Error('You are not logged in!');
    err.status=403;
    next(err);
  }
});

router.get('/checkJWTToken',cors.corsWithOptions,(req,res)=>{
  passport.authenticate('jwt',{session:false},(err,user,info)=>{
    if(err)
    return next(err);
    if(!user)
    {
      res.statusCode=401;
      res.setHeader('Content-Type','application/json');
      return res.json({status:'JWT invalid!',success:false,err:info});
    }
    else{
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      return res.json({status:'JWT valid!',success:true,user:user});
    }
  })(req,res);
})
module.exports = router;