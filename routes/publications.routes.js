const { checkUser } = require("../middleware/auth.middleware");
const { Router } = require("express");
const {
  handle_new_publications,
  get_all_publications,
  get_one_publications,
  delete_publications,
  update_publications,
} = require("../controllers/publications.controller");

const router = Router();

router.post("/create-publications", handle_new_publications);

router.get("/", checkUser, get_all_publications);

router.get("/:id", checkUser, get_one_publications);

router.delete("/:id", checkUser, delete_publications);

router.put("/:id", checkUser, update_publications);

module.exports = router;