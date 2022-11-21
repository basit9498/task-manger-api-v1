import { Router } from "express";
import * as taskController from "../controller/task.controller";

const router = Router();

router.post("/", taskController.createPost);

export default router;
