import AsyncHandler from '../utils/AsyncHandler.js';
import { User } from '../models/user.models.js';
import Apireponse from '../utils/ApiResponse.utils.js';
import ApiError from '../utils/ApiError.utils.js';
import uploadToCloudinary from '../utils/Cloudinary.util.js';
import { Teacher } from '../models/teacher.models.js';
import { Student } from '../models/student.models.js';
import { Parent } from '../models/parent.models.js';
const generateToken = async (userid) => {
  const user = await User.findById(userid);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  const accessToken = user.generateaccessToken();
  const refreshToken = user.generaterefreshToken();

  user.refreshToken = refreshToken;

  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

const createUser = AsyncHandler(async (req, res) => {
  const { name, email, role, googleId } = req.body;
  if (!name || !email || !role || !googleId) {
    throw new ApiError(400, 'All fields are required');
  }

  const existingUser = await User.findOne({ email, googleId });

  if (existingUser) {
    throw new ApiError(400, 'User already exists');
  }

  const avatar = req.file?.path;
  console.log(avatar);

  if (avatar) {
    const avataruplode = await uploadToCloudinary(avatar);
    console.log(avataruplode);
    const user = await User.create({
      name,
      email,
      role,
      googleId,
      avatar: avataruplode?.url || null,
    });

    const { refreshToken, accessToken } = await generateToken(user._id);

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000,
    };

    return res
      .status(200)
      .cookie('refreshToken', refreshToken, options)
      .cookie('accessToken', accessToken, options)
      .json(new Apireponse(200, 'User Created Sucessfully', user));
  } else {
    const user = await User.create({
      name,
      email,
      role,
      googleId,
    });

    const { refreshToken, accessToken } = await generateToken(user._id);

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000,
    };

    return res
      .status(200)
      .cookie('refreshToken', refreshToken, options)
      .cookie('accessToken', accessToken, options)
      .json(new Apireponse(200, 'User Created Sucessfully', user));
  }
});

const loginUser = AsyncHandler(async (req, res) => {
  const { name, email, role, googleId } = req.body;

  const user = await User.findOne({ email, googleId });

  if (!user) {
    const Newuser = await User.create({
      name,
      email,
      role,
      googleId,
    });

    const { refreshToken, accessToken } = await generateToken(Newuser._id);

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000,
    };

    return res
      .status(200)
      .cookie('refreshToken', refreshToken, options)
      .cookie('accessToken', accessToken, options)
      .json(new Apireponse(200, 'User Created Sucessfully', Newuser));
  } else {
    const { refreshToken, accessToken } = await generateToken(user._id);

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000,
    };

    return res
      .status(200)
      .cookie('refreshToken', refreshToken, options)
      .cookie('accessToken', accessToken, options)
      .json(new Apireponse(200, 'User Login Sucessfully', user));
  }
});

const teacherRegistration = AsyncHandler(async (req, res) => {
  const {
    subjects,
    classes,
    hourelyfee,
    location,
    bio,
    mode,
    education,
    experienceDetails,
  } = req.body;

  if (!Array.isArray(subjects) || subjects.length === 0) {
    throw new ApiError(400, 'Subjects must be a non-empty array');
  }

  if (!classes || !hourelyfee || !location || !mode) {
    throw new ApiError(400, 'All Fields are Required');
  }

  if (!Array.isArray(experienceDetails) || experienceDetails.length === 0) {
    throw new ApiError(400, 'Experience details are required');
  }

  if (!Array.isArray(education) || education.length === 0) {
    throw new ApiError(400, 'Education details are required');
  }

  const user = await Teacher.findOne({ userid: req.user._id });

  if (user) {
    throw new ApiError(404, 'Teacher Already Exist');
  }

  const teacher = await Teacher.create({
    userid: req.user._id,
    subjects,
    classes,
    hourelyfee,
    location,
    bio,
    mode,
    education,
    experienceDetails,
  });

  if (!teacher) {
    throw new ApiError(401, 'Internal Server Error While Registring Teacher ');
  }

  return res
    .status(201)
    .json(new Apireponse(201, 'Teacher Registered Sucessfully', teacher));
});

const studentRegistration = AsyncHandler(async (req, res) => {
  const { studentClass, subjects, location } = req.body;

  const user = await Student.findOne({ userid: req.user._id });

  if (user) {
    throw new ApiError(404, 'Student Already Exist');
  }

  if (!Array.isArray(subjects) || subjects.length === 0) {
    throw new ApiError(400, 'Subjects must be a non-empty array');
  }

  if (!studentClass || !location) {
    throw new ApiError(400, 'StudentClass and Location are Required');
  }

  const student = await Student.create({
    userid: req.user._id,
    subjects,
    studentClass,
    location,
  });

  if (!student) {
    throw new ApiError(404, 'Internal Server Error While Registring Student');
  }

  return res
    .status(201)
    .json(new Apireponse(201, 'Student Registered Sucessfully', student));
});

const RegisterParent = AsyncHandler(async (req, res) => {
  const { children, location } = req.body;

  if (!Array.isArray(children) || children.length === 0) {
    throw new ApiError(400, 'Children must be a non-empty array');
  }

  if (!location) {
    throw new ApiError(400, 'Location is required');
  }

  const user = await Parent.findOne({ userid: req.user._id });

  if (user) {
    throw new ApiError(409, 'Parent already exists');
  }

  const parent = await Parent.create({
    children,
    location,
    userid: req.user._id,
  });

  return res
    .status(201)
    .json(new Apireponse(201, 'Parent Registered Successfully', parent));
});
export {
  createUser,
  loginUser,
  teacherRegistration,
  studentRegistration,
  RegisterParent,
};
