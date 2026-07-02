import Router from 'express';
import {
  createUser,
  loginUser,
  teacherRegistration,
  studentRegistration,
  RegisterParent,
  getNearbyTeachers,
  GetRoledUser,
  chatWithGrok,
  changeAvatar,
} from '../controller/User.controller.js';
import { upload } from '../middleware/Multer.middlewares.js';
import { VerifyJwt } from '../middleware/Authentication.middlewares.js';
const router = Router();

router.post('/createuser', upload.single('avatar'), createUser);
router.post('/login', loginUser);
router.post(
  '/registerteacher',
  upload.fields([{ name: 'documents', maxCount: 5 }]),
  VerifyJwt,
  teacherRegistration,
);
router.post('/registerstudent', VerifyJwt, studentRegistration);
router.post('/registerparent', VerifyJwt, RegisterParent);
router.post('/getteacher', getNearbyTeachers);
router.get('/roleduser', VerifyJwt, GetRoledUser);
router.post('/chat', chatWithGrok);
router.post('/changeavatar', upload.single('avatar'),VerifyJwt, changeAvatar);
export default router;
