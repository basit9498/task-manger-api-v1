import { Router } from "express";
import isAuth from "../middleware/auth.middleware";

const router = Router();

router.get("/me", isAuth, (req, res, next) => {
  res.json({
    messsage: "User Router",
    user: req.user,
  });
});
export default router;
