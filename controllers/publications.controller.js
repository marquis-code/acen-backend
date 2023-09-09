const Publications = require("../models/publications.model");
const mongoose = require("mongoose");

module.exports.handle_new_publications = async (req, res) => {
  try {
    const publications = await Publications.findOne({
      title: req.body.title,
    });
    if (publications) {
      return res.status(404).json({ errorMessage: `Publication with title ${req.body.title} Already exist.` });
    }

    const publication = new Publications({
      title: req.body.title,
      body: req.body.body,
      publisher: req.body.publisher,
      co_editors: req.body.co_editors,
      member_benefits: req.body.member_benefits,
      publication_url: req.body.publication_url
    });

    publication
      .save()
      .then(() => {
        return res
          .status(200)
          .json({ successMessage: "Publication was successfully created" });
      })
      .catch(() => {
        return res.status(500).json({
          errorMessage:
            "Something went wrong while saving publications. Please try again later",
        });
      });
  } catch (error) {
    return res.status(500).json({
      errorMessage: "Something went wrong. Please try again later",
    });
  }
};

module.exports.get_all_publications = async (req, res) => {
  try {
    const publications = await Publications.find();
    if (!publications) {
      return res
        .status(500)
        .json({ errorMessage: "Publications not available" });
    }
    return res.status(200).json(news);
  } catch (error) {
    return res.status(500).json({
      errorMessage:
        "Something went wrong while fetching publication. Please try again later",
    });
  }
};
module.exports.get_one_publications = async (req, res) => {
  const _id = req.params.id;
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ errorMessage: "Invalid publication ID" });
  }
  try {
    const publication = await Publications.findById(_id);
    if (!publication) {
      return res
        .status(404)
        .json({ errorMessage: "Publication does not exist" });
    }
    return res.status(200).json(publication);
  } catch (error) {
    return res
      .status(500)
      .json({ errorMessage: "Something went wrong. Please try again later." });
  }
};

module.exports.delete_publications = async (req, res) => {
  const _id = req.params.id;
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ errorMessage: "Invalid publication ID" });
  }
  try {
    let publication = await Publications.findById(_id);
    await publication.remove();
    return res.status(200).json({
      successMessage: "Publication was successfully removed",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ errorMessage: "Something went wrong. Please try again." });
  }
};

module.exports.update_publications = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ errorMessage: "Invalid publication ID" });
    }
    try {
      let publication = await Publications.findById(req.params.id);
  
      if (!publication) {
        return res.status(404).json({ errorMessage: "Publication not found" });
      }
  
      const data = {
        title: req.body.title || publication.title,
        body: req.body.body || publication.body,
        publisher: req.body.publisher || publication.publisher,
        co_editors: req.body.co_editors || publication.co_editors,
        member_benefits: req.body.member_benefits || publication.member_benefits,
        publication_url: req.body.publication_url || publication.publication_url
      };
  
      publication = await Publications.findByIdAndUpdate(req.params.id, data, {
        new: true,
      });
  
      return res.status(200).json({
        successMessage: "Publication details was successfully updated",
      });
    } catch (error) {
      return res.status(500).json({ errorMessage: "Something went wrong" });
    }
  };