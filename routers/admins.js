const express = require('express');
const router = express.Router();
const Admins=require("../models/Admins");
const bcryptjs=require("bcryptjs");

// login Page
router.get('/', (req, res) => res.render("admineLogin"));
router.get("/=0542887840homeadmine11",(req, res) => res.render("homeadmine"));
router.post('/login',(req,res)=>{
    const{email,password}=req.body;
    if(!email||!password){
        res.render("login",{msg:"please fill fields"});
    };
 const name="user";
    let client=new Admins({
        name,
        email,
        password
    });
console.log(client);


    Admins.findOne({email:client.email})
    .then(user=>{
        if(user){
            bcryptjs.compare(client.password,user.password,(err,isMatch)=>{
                if(err){ console.log(err);}else{
                    if(isMatch){
                      res.redirect('/admineslimanelogin/=0542887840homeadmine11');
                    }else{
                        res.render("admineLogin",{msg:"email or password uncorrect!"});
                    }
                }
            })

        }else{
            res.render("admineLogin",{msg:"user not found!!"});;
        }
    })
    .catch(err=>{
        console.log(err);
    });
   
   
});
module.exports = router;