import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { Teacher } from '../src/models/teacher.models.js';
import { User } from '../src/models/user.models.js';

dotenv.config({ path: '../.env' });

console.log(process.env.MONGODB_URI);
await mongoose.connect(`${process.env.DB_KEY}/${process.env.DATABASE_NAME}`);

const teacherData = [
  {
    name: "Aman Yadav",
    email: "amanyadav26@gmail.com",
    location: "Civil Lines, Meerut",
    coordinates: [77.7198, 28.9874],
    subjects: ["Mathematics"],
    classes: ["9", "10"],
    fee: 550,
  },
  {
    name: "Shivani Goyal",
    email: "shivanigoyal27@gmail.com",
    location: "Rohta Road, Meerut",
    coordinates: [77.6768, 28.9594],
    subjects: ["English"],
    classes: ["6", "7", "8", "9"],
    fee: 450,
  },
  {
    name: "Rajat Chauhan",
    email: "rajatchauhan28@gmail.com",
    location: "Kanker Khera, Meerut",
    coordinates: [77.7035, 29.0324],
    subjects: ["Physics"],
    classes: ["11", "12"],
    fee: 850,
  },
  {
    name: "Pooja Tyagi",
    email: "poojatyagi29@gmail.com",
    location: "Medical College Road, Meerut",
    coordinates: [77.7391, 29.0164],
    subjects: ["Biology"],
    classes: ["11", "12"],
    fee: 700,
  },
  {
    name: "Akash Jain",
    email: "akashjain30@gmail.com",
    location: "Delhi Road, Meerut",
    coordinates: [77.6704, 28.9728],
    subjects: ["Chemistry"],
    classes: ["11", "12"],
    fee: 750,
  },

  {
    name: "Sakshi Sharma",
    email: "sakshisharma31@gmail.com",
    location: "Sector 34, Noida",
    coordinates: [77.3634, 28.5808],
    subjects: ["Science"],
    classes: ["6", "7", "8"],
    fee: 500,
  },
  {
    name: "Yash Bhatia",
    email: "yashbhatia32@gmail.com",
    location: "Sector 44, Noida",
    coordinates: [77.3514, 28.5557],
    subjects: ["Computer Science"],
    classes: ["11", "12"],
    fee: 900,
  },
  {
    name: "Neha Bansal",
    email: "nehabansal33@gmail.com",
    location: "Sector 93, Noida",
    coordinates: [77.3992, 28.5185],
    subjects: ["Mathematics"],
    classes: ["9", "10", "11", "12"],
    fee: 800,
  },
  {
    name: "Gaurav Saini",
    email: "gauravsaini34@gmail.com",
    location: "Sector 122, Noida",
    coordinates: [77.4011, 28.6038],
    subjects: ["Physics"],
    classes: ["11", "12"],
    fee: 850,
  },
  {
    name: "Priyanka Singh",
    email: "priyankasingh35@gmail.com",
    location: "Sector 104, Noida",
    coordinates: [77.3804, 28.5361],
    subjects: ["Chemistry"],
    classes: ["11", "12"],
    fee: 750,
  },
  {
    name: "Anuj Verma",
    email: "anujverma36@gmail.com",
    location: "Sector 61, Noida",
    coordinates: [77.3657, 28.6298],
    subjects: ["English"],
    classes: ["8", "9", "10"],
    fee: 500,
  },
  {
    name: "Kritika Arora",
    email: "kritikaarora37@gmail.com",
    location: "Sector 15, Noida",
    coordinates: [77.3129, 28.5848],
    subjects: ["Economics"],
    classes: ["11", "12"],
    fee: 650,
  },

  {
    name: "Abhishek Gupta",
    email: "abhishekgupta38@gmail.com",
    location: "Indirapuram, Ghaziabad",
    coordinates: [77.3698, 28.6356],
    subjects: ["Computer Science"],
    classes: ["11", "12"],
    fee: 900,
  },
  {
    name: "Komal Arora",
    email: "komalarora39@gmail.com",
    location: "Vaishali, Ghaziabad",
    coordinates: [77.3395, 28.6498],
    subjects: ["Science"],
    classes: ["6", "7", "8"],
    fee: 450,
  },
  {
    name: "Nitin Tomar",
    email: "nitintomar40@gmail.com",
    location: "Raj Nagar, Ghaziabad",
    coordinates: [77.4532, 28.6699],
    subjects: ["Mathematics"],
    classes: ["9", "10"],
    fee: 600,
  },
  {
    name: "Sonia Arora",
    email: "soniaarora41@gmail.com",
    location: "Sahibabad, Ghaziabad",
    coordinates: [77.3738, 28.6894],
    subjects: ["English"],
    classes: ["6", "7", "8", "9", "10"],
    fee: 500,
  },
  {
    name: "Manish Kapoor",
    email: "manishkapoor42@gmail.com",
    location: "Loni, Ghaziabad",
    coordinates: [77.2961, 28.7516],
    subjects: ["Hindi"],
    classes: ["6", "7", "8", "9", "10"],
    fee: 350,
  },
  {
    name: "Divya Saini",
    email: "divyasaini43@gmail.com",
    location: "Govindpuram, Ghaziabad",
    coordinates: [77.4445, 28.6942],
    subjects: ["Biology"],
    classes: ["11", "12"],
    fee: 700,
  },
  {
    name: "Rakesh Mishra",
    email: "rakeshmishra44@gmail.com",
    location: "Wave City, Ghaziabad",
    coordinates: [77.4864, 28.7225],
    subjects: ["Physics"],
    classes: ["11", "12"],
    fee: 800,
  },
  {
    name: "Anjali Srivastava",
    email: "anjalisrivastava45@gmail.com",
    location: "Vijay Nagar, Ghaziabad",
    coordinates: [77.4297, 28.6748],
    subjects: ["Commerce"],
    classes: ["11", "12"],
    fee: 650,
  },
];

const educationOptions = [
  [
    {
      degree: 'B.Ed',
      institution: 'Delhi University',
      year: 2018,
    },
    {
      degree: 'M.Sc Mathematics',
      institution: 'CCSU Meerut',
      year: 2020,
    },
  ],

  [
    {
      degree: 'B.Tech Computer Science',
      institution: 'AKTU Lucknow',
      year: 2019,
    },
  ],

  [
    {
      degree: 'MCA',
      institution: 'Amity University',
      year: 2021,
    },
  ],

  [
    {
      degree: 'M.Sc Physics',
      institution: 'IIT Roorkee',
      year: 2018,
    },
  ],

  [
    {
      degree: 'M.Sc Chemistry',
      institution: 'Delhi University',
      year: 2019,
    },
  ],

  [
    {
      degree: 'M.Sc Biology',
      institution: 'Banaras Hindu University',
      year: 2018,
    },
  ],

  [
    {
      degree: 'M.A English',
      institution: 'Jamia Millia Islamia',
      year: 2019,
    },
  ],

  [
    {
      degree: 'M.A Hindi',
      institution: 'Lucknow University',
      year: 2017,
    },
  ],

  [
    {
      degree: 'B.Com',
      institution: 'Delhi University',
      year: 2018,
    },
    {
      degree: 'M.Com',
      institution: 'Delhi University',
      year: 2020,
    },
  ],

  [
    {
      degree: 'MBA Finance',
      institution: 'IIM Lucknow',
      year: 2019,
    },
  ],

  [
    {
      degree: 'B.Sc',
      institution: 'CCSU Meerut',
      year: 2017,
    },
    {
      degree: 'B.Ed',
      institution: 'CCSU Meerut',
      year: 2019,
    },
  ],

  [
    {
      degree: 'M.Tech',
      institution: 'IIT Delhi',
      year: 2018,
    },
  ],
];

const experienceOptions = [
  [
    {
      title: 'Senior Faculty',
      organization: 'Aakash Institute',
      years: 7,
    },
  ],

  [
    {
      title: 'Physics Lecturer',
      organization: 'Allen Career Institute',
      years: 1,
    },
  ],

  [
    {
      title: 'Computer Science Teacher',
      organization: 'Delhi Public School',
      years: 3,
    },
  ],

  [
    {
      title: 'Mathematics Faculty',
      organization: 'FIITJEE',
      years: 9,
    },
  ],

  [
    {
      title: 'Chemistry Mentor',
      organization: 'Resonance',
      years: 7,
    },
  ],

  [
    {
      title: 'Biology Teacher',
      organization: 'VidyaGyan School',
      years: 7,
    },
  ],

  [
    {
      title: 'English Teacher',
      organization: 'Delhi Public School',
      years: 4,
    },
  ],

  [
    {
      title: 'Hindi Teacher',
      organization: 'Kendriya Vidyalaya',
      years: 5,
    },
  ],
];

for (const teacher of teacherData) {
  const user = await User.create({
    name: teacher.name,
    email: teacher.email,
    role: 'teacher',
    avatar: 'https://i.pravatar.cc/300',
  });

  await Teacher.create({
    userid: user._id,
    subjects: teacher.subjects,
    classes: teacher.classes,
    hourelyfee: teacher.fee,
    location: teacher.location,
    bio: `${teacher.subjects.join(', ')} teacher with 6+ years of experience.`,
    mode: ['online', 'offline'],
    education:
      educationOptions[Math.floor(Math.random() * educationOptions.length)],
    experienceDetails:
      experienceOptions[Math.floor(Math.random() * experienceOptions.length)],
    coordinates: {
      type: 'Point',
      coordinates: teacher.coordinates,
    },
    documents: [],
    rating: (Math.random() * 1 + 4).toFixed(1),
    totalReviews: Math.floor(Math.random() * 200 + 20),
  });

  console.log(`${teacher.name} inserted`);
}

console.log('✅ All teachers inserted');

process.exit();
