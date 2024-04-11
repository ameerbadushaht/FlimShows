import mongoose from "mongoose";
import express from "express";
import cors from "cors"; 
import authRoutes from "./src/routes/authRouter.js";
import movieRoutes from "./src/routes/movieRouter.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
await mongoose.connect(
  "mongodb+srv://movieShow:amr123@movieshow.ofbyk65.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
console.log("Database connected");

app.use("/auth", authRoutes);
app.use("/movies", movieRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
