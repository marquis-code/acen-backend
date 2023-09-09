const { checkUser } = require("../middleware/auth.middleware");
const { Router } = require("express");
const {
  handle_new_news,
  get_all_news,
  get_one_news,
  delete_news,
  update_news,
} = require("../controllers/news.controller");

const router = Router();

router.post("/create-news", handle_new_news);

router.get("/", checkUser, get_all_news);

router.get("/:id", checkUser, get_one_news);

router.delete("/:id", checkUser, delete_news);

router.put("/:id", checkUser, update_news);

module.exports = router;