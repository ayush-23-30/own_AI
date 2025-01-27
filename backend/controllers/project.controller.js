import Project from "../modals/project.model.js";
import User from "../modals/user.modal.js";
import { createProject } from "../services/project.services.js";
import {validationResult} from 'express-validator';

export const createProjectController = async (req, res) => {
try {
  const result = validationResult(req);
  
  if(!result.isEmpty()){
    return res.status(400).json({errors : result.array()})
  }
  
  const {name} = req.body;
  
  const loggedIN = await User.findOne({email : req.user.email});
   // we are finding the email because we take email in the user router then from the email we find the user id
  
  const userId = loggedIN._id; // we are getting the user id from the logged in user
  
  const newProject = await createProject({name, userId});
  console.log("Project is created ");
  
  res.status(201).json(newProject);
} catch (error) {
  console.log("Error is not created project", error.message);
  
  res.status(500).json({message : error.message})
}




}