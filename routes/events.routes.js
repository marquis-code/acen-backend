const { checkUser } = require("../middleware/auth.middleware");
const { Router } = require("express");
const {
  handle_new_event,
  get_all_events,
  get_one_event,
  delete_event,
  update_event,
} = require("../controllers/events.controller");

const router = Router();

router.post("/create-events", handle_new_event);

router.get("/", checkUser, get_all_events);

router.get("/:id", checkUser, get_one_event);

router.delete("/:id", checkUser, delete_event);

router.put("/:id", checkUser, update_event);

module.exports = router;