const express = require('express')
const router = express.Router()
const {strategy, passportMiddle, signUpMiddle, isLoggedIn} = require('../local_strategy')

// middleware that is specific to this router
router.get('/auth',isLoggedIn, function(req, res) {
    res.json({message: 'you are authorized'});
  });
  
router.post('/signUp',signUpMiddle,passportMiddle, function(req, res) {
    console.log('hit sign up page')
    console.log(req.body)
    try{
        console.log(req.user)
        res.json(req.user);
    }catch(err){
        console.log(err)
    }
});

router.post('/logout', function(req, res){ 
    req.logout(function(err) {
        console.log('logout')
        if (err) { 
        console.log(err)
        return next(err); 
        }
    });
    res.json({message: "you have been logged out"})
});

router.post('/login',passportMiddle,
function(req, res) {
    console.log(req.body)
    try{
    console.log(req.user)
    res.json(req.user);
    }catch(err){
    console.log(err)
    }
}
);
router.get('/getProfileInfo', function(req,res){
if(req.user){
    res.json(req.user)
}else{
    res.send("u are not auth")
}
res.end
})

module.exports = router
