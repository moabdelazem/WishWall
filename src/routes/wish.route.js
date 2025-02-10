import { Router } from "express";
import { getWishes, createWish } from "../controllers/wish.controller.js";

const wishRouter = Router().get("/", getWishes).post("/", createWish);

export default wishRouter;
