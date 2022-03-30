const authuser = (req,res,next)=>{
    if(req.session.emailID && req.session.isLogged === true){
        next()
    }else{
        res.send('you are not signup please signup')
    }
}

module.exports = {
    authuser
}