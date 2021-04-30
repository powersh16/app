const express = require('express');
const nodemailer=require('nodemailer');
const router = express.Router();
const bcryptjs=require("bcryptjs");
//-------------------------------------------
 



// table for the simple users
const User=require("../models/User");

//---------------------------------------

// user Page
router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));



//what we do if we get ?
router.post("/register",(req,res)=>{
    const {name,email,password,password2}=req.body;
    let err=[];
    if(!name||!email||!password||!password2){
        err.push({msg:"please fill fields"});
    }
    if(password!==password2){
        err.push({msg:"passwords do not mutch"});
    }
    if(password.length<6){
        err.push({msg:"passwords must be at least 6 caractere long"});
    }
   
    
    if(err.length>0){
        res.render("register",{
            err,name,email,password,password2
        });
    }else{
    
    User.findOne({email:email})
    .then(user =>{
        if(user){
            err.push({msg:"email exist!! try another one"});
            res.render("register",{
                err,name,email,password,password2
            });
        }else{
            //object client
            let client=new User({
                name,
                email,
                password
            });
            //crypting password
            bcryptjs.genSalt(10,(err,salt)=>{bcryptjs.hash(client.password,salt,(err,hash)=>{
                if(err){console.error(err);}else{
                    client.password=hash;
                    client.save()
                    .then(user=>{res.redirect("/users/login");})
                    .catch(err =>{console.log(err);});
                   
                    
                }
            })})
        }

    })
    .catch(err=>{console.error(err);});

   
    }

});


//-----------------------------
router.post("/login",(req,res)=>{
    
    const{email,password}=req.body;
    if(!email||!password){
        res.render("login",{msg:"please fill fields"});
    };
  const name="aymane";
    let client=new User({
        name,
        email,
        password
    });
    User.findOne({email:client.email})
    .then(user=>{
        if(user){
            bcryptjs.compare(client.password,user.password,(err,isMatch)=>{
                if(err){ console.log(err);}else{
                    if(isMatch){
                        res.redirect("/");
                    }else{
                        res.render("login",{msg:"email or password uncorrect!"});
                    }
                }
            })

        }else{
            res.render("login",{msg:"user not found"});
        }
    })
    .catch(err=>{
        console.log(err);
    });
   
   
});

//--------------------------------------------------

module.exports = router;