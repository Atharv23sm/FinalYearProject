const jwt = require("jsonwebtoken");

const candidateAuthenticate = (req,res,next) =>{
    const token = req.headers.authorization?.split(' ')[1];
    try{
    // console.log('Authorization Header:', token);
    if(!token){
        console.log("Token not present ");
        return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }

        const decoded = jwt.verify(token,'secret123');
        req.candidateId = decoded.user._id;
        req.candidateName = decoded.user.name;
        req.candidateEmail = decoded.user.email;
        // console.log(decoded.user._id);
        next();
    }catch(error){
        console.log(token);
        res.status(401).json({ status: 'error', message: 'Invalid token' });
    }
}
module.exports = candidateAuthenticate;
