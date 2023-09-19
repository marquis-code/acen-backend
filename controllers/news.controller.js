const News = require("../models/news.models");
const mongoose = require("mongoose");

module.exports.handle_new_news = async (req, res) => {
  try {
    const news = await News.findOne({
      title: req.body.title,
    });
    if (news) {
      return res.status(404).json({ errorMessage: `News with title ${req.body.title} Already exist.` });
    }

    const newNews = new NewsRoom({
      title: req.body.title,
      body: req.body.body,
      date: req.body.date,
      newsType: req.body.newsType
    });

    newNews
      .save()
      .then(() => {
        return res
          .status(200)
          .json({ successMessage: "News was successfully created" });
      })
      .catch(() => {
        return res.status(500).json({
          errorMessage:
            "Something went wrong while saving news. Please try again later",
        });
      });
  } catch (error) {
    return res.status(500).json({
      errorMessage: "Something went wrong. Please try again later",
    });
  }
};

module.exports.get_all_news = async (req, res) => {
  try {
    const news = await News.find();
    if (!news) {
      return res
        .status(500)
        .json({ errorMessage: "News not available" });
    }
    return res.status(200).json(news);
  } catch (error) {
    return res.status(500).json({
      errorMessage:
        "Something went wrong while fetching news. Please try again later",
    });
  }
};
module.exports.get_one_news = async (req, res) => {
  const _id = req.params.id;
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ errorMessage: "Invalid news ID" });
  }
  try {
    const news = await News.findById(_id);
    if (!news) {
      return res
        .status(404)
        .json({ errorMessage: "News does not exist" });
    }
    return res.status(200).json(newsRoom);
  } catch (error) {
    return res
      .status(500)
      .json({ errorMessage: "Something went wrong. Please try again later." });
  }
};

module.exports.delete_news = async (req, res) => {
  const _id = req.params.id;
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ errorMessage: "Invalid news room ID" });
  }
  try {
    let news = await News.findById(_id);
    await news.remove();
    return res.status(200).json({
      successMessage: "News was successfully removed",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ errorMessage: "Something went wrong. Please try again." });
  }
};

module.exports.update_news = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ errorMessage: "Invalid news ID" });
    }
    try {
      let news = await News.findById(req.params.id);
  
      if (!news) {
        return res.status(404).json({ errorMessage: "News not found" });
      }
  
      const data = {
        amount: req.body.amount || support.amount,
        title: req.body.title || news.title,
        body: req.body.body || news.body,
        date: req.body.date || news.date,
        newsType: req.body.newsType || news.newsType
      };
  
      news = await News.findByIdAndUpdate(req.params.id, data, {
        new: true,
      });
  
      return res.status(200).json({
        successMessage: "News details was successfully updated",
      });
    } catch (error) {
      return res.status(500).json({ errorMessage: "Something went wrong" });
    }
  };