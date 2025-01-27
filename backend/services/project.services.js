import Project from "../modals/project.model.js";


// when we create a project we need to add the user id to the project to check which user created the project

export const createProject = async ({ name, userId }) => {
  if (!name) {
    throw new Error('Name is required');
  }
  if (!userId) {
    throw new Error('User ID is required');
  }

 
    // Attempt to create the project
    const project = await Project.create({
      name,
      users: [userId],
    });
    return project;
  
};