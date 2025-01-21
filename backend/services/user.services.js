import User from "../modals/user.modal.js";


 const createUser = async ({
  email , password
 }) => {
  if(!email || !password){
    throw new Error ("Email and password are required")
  }

  const hashedPassword = await User.hashPassword(password); 

  const user = await User.create({
    email, 
    password : hashedPassword
  })

  return user; 
}

export default createUser