import { Router } from "express";

const router = Router();

router.route("/").get((req, res, next) => {
  res.json({
    message: "project Route",
  });
});

export default router;
