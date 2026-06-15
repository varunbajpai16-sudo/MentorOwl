import Router from 'express';
import {
  createUser,
  loginUser,
  teacherRegistration,
  studentRegistration,
  RegisterParent,
} from '../controller/User.controller.js';
import { upload } from '../middleware/Multer.middlewares.js';
import { VerifyJwt } from '../middleware/Authentication.middlewares.js';
const router = Router();

router.post('/createuser', upload.single('avatar'), createUser);
router.post('/login', loginUser);
router.post('/registerteacher', VerifyJwt, teacherRegistration);
router.post('/registerstudent', VerifyJwt, studentRegistration);
router.post('/registerparent', VerifyJwt, RegisterParent);
export default router;
