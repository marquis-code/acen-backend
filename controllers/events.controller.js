const Events = require("../models/event.model");
const mongoose = require("mongoose");

module.exports.handle_new_event = async (req, res) => {
  try {
    const news = await Events.findOne({
      title: req.body.title,
    });
    if (news) {
      return res.status(404).json({ errorMessage: `Event with title ${req.body.title} Already exist.` });
    }

    const event = new Events({
      type: req.body.type,
      attendanceType: req.body.attendanceType,
      topic: req.body.topic,
      title: req.body.title,
      body: req.body.body,
      date: req.body.date,
      location: req.body.location
    });

    event
      .save()
      .then(() => {
        return res
          .status(200)
          .json({ successMessage: "Event was successfully created" });
      })
      .catch(() => {
        return res.status(500).json({
          errorMessage:
            "Something went wrong while saving event. Please try again later",
        });
      });
  } catch (error) {
    return res.status(500).json({
      errorMessage: "Something went wrong. Please try again later",
    });
  }
};

module.exports.get_all_events = async (req, res) => {
  try {
    const events = await Events.find();
    if (!events) {
      return res
        .status(500)
        .json({ errorMessage: "Events not available" });
    }
    return res.status(200).json(news);
  } catch (error) {
    return res.status(500).json({
      errorMessage:
        "Something went wrong while fetching events. Please try again later",
    });
  }
};
module.exports.get_one_event = async (req, res) => {
  const _id = req.params.id;
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ errorMessage: "Invalid event ID" });
  }
  try {
    const event = await Events.findById(_id);
    if (!event) {
      return res
        .status(404)
        .json({ errorMessage: "Event does not exist" });
    }
    return res.status(200).json(newsRoom);
  } catch (error) {
    return res
      .status(500)
      .json({ errorMessage: "Something went wrong. Please try again later." });
  }
};

module.exports.delete_event = async (req, res) => {
  const _id = req.params.id;
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ errorMessage: "Invalid event ID" });
  }
  try {
    let event = await Events.findById(_id);
    await event.remove();
    return res.status(200).json({
      successMessage: "Event was successfully removed",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ errorMessage: "Something went wrong. Please try again." });
  }
};

module.exports.update_event = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ errorMessage: "Invalid event ID" });
    }
    try {
      let event = await Events.findById(req.params.id);
  
      if (!event) {
        return res.status(404).json({ errorMessage: "Event not found" });
      }
  
      const data = {
        type: req.body.type || event.type,
        attendanceType: req.body.attendanceType || event.attendanceType,
        topic: req.body.topic || event.topic,
        title: req.body.title || event.title,
        body: req.body.body || event.body,
        date: req.body.date || event.date,
        location: req.body.location || event.location
      };
  
      event = await Events.findByIdAndUpdate(req.params.id, data, {
        new: true,
      });
  
      return res.status(200).json({
        successMessage: "Event details was successfully updated",
      });
    } catch (error) {
      return res.status(500).json({ errorMessage: "Something went wrong" });
    }
  };