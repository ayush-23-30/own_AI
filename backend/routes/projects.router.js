import {Router } from 'express'
import {body} from 'express-validator'; 
import { createProjectController } from '../controllers/project.controller.js';
import { authUser } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/create',
  authUser,
  body('name').isString().withMessage('Name is required'), createProjectController
 )

 export default router;