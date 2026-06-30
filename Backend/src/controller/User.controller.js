import AsyncHandler from '../utils/AsyncHandler.js';
import { User } from '../models/user.models.js';
import Apireponse from '../utils/ApiResponse.utils.js';
import ApiError from '../utils/ApiError.utils.js';
import uploadToCloudinary from '../utils/Cloudinary.util.js';
import { Teacher } from '../models/teacher.models.js';
import { Student } from '../models/student.models.js';
import { Parent } from '../models/parent.models.js';
import { json } from 'stream/consumers';

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
  const { accessToken, role } = req.body;

  // Fetch user data from Google
  const response = await fetch(
    'https://www.googleapis.com/oauth2/v3/userinfo',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new ApiError(401, 'Invalid Google access token');
  }

  const { name, email, sub } = await response.json();

  if (!name || !email || !role || !sub) {
    throw new ApiError(400, 'All fields are required');
  }

  // Check if user already exists
  const existingUser = await User.findOne({
    $or: [{ email }, { googleId: sub }],
  });

  if (existingUser) {
    throw new ApiError(400, 'User already exists');
  }

  // Upload avatar if provided
  let avatarUrl = null;

  if (req.file?.path) {
    const uploadedAvatar = await uploadToCloudinary(req.file.path);
    avatarUrl = uploadedAvatar?.url || null;
  }

  // Create user
  const user = await User.create({
    name,
    email,
    role,
    googleId: sub,
    avatar: avatarUrl,
  });

  // Generate JWT tokens
  const { refreshToken, accessToken: jwtAccessToken } = await generateToken(
    user._id,
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 24 * 60 * 60 * 1000,
  };

  return res
    .status(201)
    .cookie('refreshToken', refreshToken, options)
    .cookie('accessToken', jwtAccessToken, options)
    .json(new Apireponse(201, 'User Created Successfully', user));
});

const loginUser = AsyncHandler(async (req, res) => {
  const { accessToken } = req.body;
  // Fetch user data from Google
  const response = await fetch(
    'https://www.googleapis.com/oauth2/v3/userinfo',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new ApiError(401, 'Invalid Google access token');
  }

  const { name, email, sub } = await response.json();

  if (!name || !email || !sub) {
    throw new ApiError(400, 'All fields are required');
  }
  console.log('login controller');
  // Check if user already exists
  const existingUser = await User.findOne({
    $or: [{ email }, { googleId: sub }],
  });

  if (!existingUser) {
    return res.status(200).json(
      new Apireponse(200, 'New User', {
        newuser: true,
      }),
    );
  }
  const { refreshToken, accessToken: jwtAccessToken } = await generateToken(
    existingUser._id,
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 24 * 60 * 60 * 1000,
  };

  return res
    .status(200)
    .cookie('refreshToken', refreshToken, options)
    .cookie('accessToken', jwtAccessToken, options)
    .json(
      new Apireponse(200, 'User Login Sucessfully', {
        existingUser,
        newuser: false,
      }),
    );
});

const teacherRegistration = AsyncHandler(async (req, res) => {
  const { hourelyfee, location, bio } = req.body;

  const subjects = JSON.parse(req.body.subjects);
  const classes = JSON.parse(req.body.classes);
  const mode = JSON.parse(req.body.mode);
  const education = JSON.parse(req.body.education);
  const experienceDetails = JSON.parse(req.body.experienceDetails);
  const coordinates = JSON.parse(req.body.coordinates);

  const rawDocuments = req.files?.documents || [];

  const uploadedDocuments = await Promise.all(
    rawDocuments.map(async (doc) => {
      const result = await uploadToCloudinary(doc.path);
      return result.secure_url;
    }),
  );

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
    coordinates,
    documents: uploadedDocuments,
  });

  if (!teacher) {
    throw new ApiError(401, 'Internal Server Error While Registring Teacher ');
  }

  return res
    .status(201)
    .json(new Apireponse(201, 'Teacher Registered Sucessfully', teacher));
});

const studentRegistration = AsyncHandler(async (req, res) => {
  const { studentClass, subjects, location, coordinates } = req.body;

  const user = await Student.findOne({ googleId: req.user.googleId });

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
    coordinates,
  });

  if (!student) {
    throw new ApiError(404, 'Internal Server Error While Registring Student');
  }

  return res
    .status(201)
    .json(new Apireponse(201, 'Student Registered Sucessfully', student));
});

const RegisterParent = AsyncHandler(async (req, res) => {
  console.log(req.body);
  const { children, location, coordinates } = req.body;

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
  console.log('there');
  const parent = await Parent.create({
    children,
    location,
    userid: req.user._id,
    coordinates,
  });
  console.log(parent);
  return res
    .status(201)
    .json(new Apireponse(201, 'Parent Registered Successfully', parent));
});

const getNearbyTeachers = async (req, res) => {
  try {
     
    const { latitude, longitude } = req.body || {};
    console.log(latitude,longitude)
    if (latitude == null || longitude == null) {
      const teachers = await Teacher.find().populate("userid");
      return res
        .status(200)
        .json(new Apireponse(200, 'All Teachers', teachers));
    }

    const teachers = await Teacher.aggregate([
  {
    $geoNear: {
      near: {
        type: "Point",
        coordinates: [Number(longitude), Number(latitude)],
      },
      distanceField: "distance",
      maxDistance: 10000, // 10 km
      spherical: true,
      key: "coordinates",
    },
  },
  {
    $lookup: {
      from: "users", // MongoDB collection name
      localField: "userid",
      foreignField: "_id",
      as: "userid",
    },
  },
  {
    $unwind: "$userid",
  },
]);

    return res
      .status(200)
      .json(new Apireponse(200, 'The nearest 10 km teachers are', teachers));
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const GetRoledUser = AsyncHandler(async (req, res) => {
  const role = req.user.role;
  let RoledUser;
  if (role === 'teacher') {
    RoledUser = await Teacher.findOne({ userid: req.user._id });
  }
  if (role === 'parent') {
    RoledUser = await Parent.findOne({ userid: req.user._id });
  }
  if (role === 'student') {
    RoledUser = await Student.findOne({ userid: req.user._id });
  }

  if (!RoledUser) {
    throw new ApiError(404, 'Roled User not Found');
  }

  return res
    .status(200)
    .json(new Apireponse(200, 'Roled User Found', RoledUser));
});

const changeavatar = AsyncHandler(async(req,res)=>{
  
})

export {
  createUser,
  loginUser,
  teacherRegistration,
  studentRegistration,
  RegisterParent,
  getNearbyTeachers,
  GetRoledUser,
};
