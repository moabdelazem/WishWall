import { Router } from "express";
import { getWishes, createWish } from "../controllers/wish.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createWishSchema } from "../schemas/wish.schema.js";

const router = Router();

router.get("/", getWishes);
router.post("/", validate(createWishSchema), createWish);

export default router;
