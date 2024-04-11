import { Router } from "express";
import { getMovies, addMovies,addTheaterToMovie,getMoviesById,getTheater } from "../controllers/movieController.js";

const router = Router();

router.get("/getmovies", getMovies);
router.get("/gettheater", getTheater);
router.post("/addMovies", addMovies)
router.post("/addTheaters", addTheaterToMovie);
router.get("/getMoviesById/:id", getMoviesById);


export default router;