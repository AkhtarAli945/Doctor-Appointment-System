import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoutes.js";
import doctorRouter from "./routes/doctorRoutes.js";
import userRouter from "./routes/userRoutes.js";


connectDB();
connectCloudinary();

const app = express();
const port = process.env.PORT || 4000;

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//API Endpoints
app.use("/api/admin", adminRouter);
app.use("/api/doctor",doctorRouter)
app.use("/api/user",userRouter)

app.get("/", (req, res) => {
  res.send("API Working Well");
});

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});






// import express from "express";
// import cors from "cors";
// import "dotenv/config";
// import connectDB from "./config/mongodb.js";
// import connectCloudinary from "./config/cloudinary.js";
// import adminRouter from "./routes/adminRoutes.js";
// import doctorRouter from "./routes/doctorRoutes.js";
// import userRouter from "./routes/userRoutes.js";

// connectDB();
// connectCloudinary();

// const app = express();
// const port = process.env.PORT || 4000;

// // Allowed frontend origins
// const allowedOrigins = [
//   "https://doctor-appointment-system-mu-lemon.vercel.app", // main frontend
//   "http://localhost:5173", // local dev (Vite default port)
// ];

// //Middleware
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // allow requests with no origin (like Postman, mobile apps, curl)
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS: " + origin));
//       }
//     },
//     credentials: true,
//   })
// );
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// //API Endpoints
// app.use("/api/admin", adminRouter);
// app.use("/api/doctor", doctorRouter);
// app.use("/api/user", userRouter);

// app.get("/", (req, res) => {
//   res.send("API Working Well");
// });

// app.listen(port, () => {
//   console.log(`🚀 Server is running on port ${port}`);
// });