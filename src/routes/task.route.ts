import { Router } from "express";
import taskCreateValidation from "../validation/task.validation";
import * as taskController from "../controller/task.controller";

const router = Router();

router.post("/", taskCreateValidation, taskController.createPost);

export default router;
