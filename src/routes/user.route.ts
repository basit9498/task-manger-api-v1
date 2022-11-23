import { Router } from "express";

const router = Router();

router.get("/", (req, res, next) => {
  res.json({
    messsage: "User Router",
  });
});
export default router;
