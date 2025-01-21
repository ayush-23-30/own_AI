import * as userModal from '../modals/user.modal.js'
// import * as userService from '../services/user.services.js'
import createUser from '../services/user.services.js';

import { validationResult} from 'express-validator';

export const createUserController = async (req, res) => {
  const errors = validationResult(req); 
  if(!errors.isEmpty()){
    return res.status(400).json({
      errors: errors.array()
    })
  }

try{

  const user = await createUser(req.body);
  res.status(201).send(user); 

  const token = await user.generateJWT();

  console.log("user Created");
  return ( 
    res.status(201).json({ user, token })
)

}
catch(err) {
  console.log("error in creating user " , err);
  
res.status(400).send(err.message); 
}
}
