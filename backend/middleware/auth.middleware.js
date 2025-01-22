import jwt from "jsonwebtoken"

export const authUser = async (req,res,next) =>{
  try {
    const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ]; 
    if(!token){
      console.log(" there is an error in Auth profile login middleWare ");
    res.status(401).send({
      error : 'please Authenticate'
    })}
    const decoded = jwt.verify(token, process.env.JWT_TOKEN); 

    req.user = decoded; 
    next(); 
  } catch (error) {
    console.log(" there is an error in Auth profile login middleWare ");
    res.status(401).send({
      error : 'please Authenticate'
    })
  }
}