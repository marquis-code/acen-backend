const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Member = require("../models/member.model");
const mongoose = require("mongoose");
module.exports.handle_new_member = async (req, res) => {
  try {
    const member = await Member.findOne({
      email: req.body.email,
    });
    if (member) {
      return res.status(404).json({
        errorMessage: `Member with Email ${req.body.email} already exist`,
      });
    }

    const salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newMember = new Member({
      title: req.body.title,
      password: hashedPassword,
      fname: req.body.fname,
      lname: req.body.lname,
      dob: req.body.dob,
      gender : req.body.gender,
      work_address_status: req.body.work_address_status,
      home_address: req.body.home_address,
      home_city : req.body.home_city,
      home_country : req.body.home_country,
      home_zip_code : req.body.home_zip_code,
      company_name: req.body.company_name,
      work_department: req.body.work_department,
      work_address: req.body.work_address,
      work_city: req.body.work_city,
      work_country: req.body.work_country,
      work_zip_code: req.body.work_zip_code,
      mailing_address_status: req.body.mailing_address_status,
      phone : req.body.phone,
      email : req.body.email,
      home_address: req.body.home_address,
      home_city : req.body.home_city,
      home_country : req.body.home_country,
      home_zip_code : req.body.home_zip_code,
      endocrine_networks : req.body.endocrine_networks,
      info_plattform : req.body.info_plattform,
      membership_attraction : req.body.membership_attraction,
      membership_category: req.body.membership_category,
      membership_type : req.body.membership_type,
      subscription_type : req.body.subscription_type,
      society_official_journals : req.body.society_official_journals,
      is_proposed_member : req.body.is_proposed_member,
      accept_privacy_policy: req.body.accept_privacy_policy,
      mailing_preference : req.body.mailing_preference,
      postal_email_status : req.body.postal_email_status,
      membership_directory_inclusion_status : req.body.membership_directory_inclusion_status,
      media_queries_contact_status : req.body.media_queries_contact_status,
      payment_status : req.body.payment_status
    });

    newMember
      .save()
      .then(() => {
        return res
          .status(200)
          .json({ successMessage: 'Hurry! now you are successfully registred as a member. Please login.' });
      })
      .catch((error) => {
        return res.status(500).json({
          errorMessage:
            "Something went wrong while saving Member. Please try again later",
        });
      });
  } catch (error) {
    return res.status(500).json({
      errorMessage: "Something went wrong. Please try again later",
    });
  }
};

module.exports.login_member = async (req, res) => {
  const { email, password } = req.body;

  try {
    const member = await Member.findOne({ email });
    if (!member) {
      return res.status(404).json({
        message: "Member not found. Invalid login credentials.",
        success: false,
      });
    }

    let auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(404).json({
        message: "Member not found. Invalid login credentials.",
        success: false,
      });
    }

    let token = jwt.sign(
      {
        id: member._id
      },
      process.env.MEMBER_JWT_SECRET,
      { expiresIn: "3 days" }
    );

    let result = {
      email: member.email,
      token: `Bearer ${token}`,
      expiresIn: 168,
    };

    return res.status(200).json({ ...result, successMessage: '"You are now logged in."' });
  } catch (error) {
    let errors = handleErrors(error);
    return res.json({
      errors,
    });
  }
};

module.exports.get_all_members = async (req, res) => {
  try {
    const members = await Member.find();
    if (!members) {
      return res.status(500).json({ errorMessage: "Members not available" });
    }
    return res.status(200).json(members);
  } catch (error) {
    return res.status(500).json({
      errorMessage:
        "Something went wrong while fetching Members. Please try again later",
    });
  }
};
module.exports.get_one_member = async (req, res) => {
  const _id = req.params.id;
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ errorMessage: "Invalid Member ID" });
  }
  try {
    const member = await Member.findById(_id);
    if (!member) {
      return res.status(404).json({ errorMessage: "Member does not exist" });
    }
    return res.status(200).json(member);
  } catch (error) {
    return res
      .status(500)
      .json({ errorMessage: "Something went wrong. Please try again later." });
  }
};

module.exports.delete_member = async (req, res) => {
  const _id = req.params.id;
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ errorMessage: "Invalid Member ID" });
  }
  try {
    let member = await Member.findById(_id);
    await member.remove();
    return res.status(200).json({
      successMessage: "Member was successfully removed",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ errorMessage: "Something went wrong. Please try again." });
  }
};

module.exports.update_member = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ errorMessage: "Invalid member ID" });
  }
  try {
    let member = await Member.findById(req.params.id);

    if (!member) {
      return res.status(404).json({ errorMessage: "Member not found" });
    }

    const data = {
      prefix: req.body.prefix || member.prefix,
     
      title: req.body.title || member.title,
      fname: req.body.fname || member.fname,
      lname: req.body.lname || member.lname,
      dob: req.body.dob || member.dob,
      gender : req.body.gender || member.gender,
      work_address_status: req.body.work_address_status || member.work_address,
      home_address: req.body.home_address || member.home_address,
      home_city : req.body.home_city || member.home_city,
      home_country : req.body.home_country || member.home_country,
      home_zip_code : req.body.home_zip_code || member.home_zip_code,
      company_name: req.body.company_name || member.company_name,
      work_department: req.body.work_department || member.work_department,
      work_address: req.body.work_address || member.work_address,
      work_city: req.body.work_city || member.work_city,
      work_country: req.body.work_country || member.work_country,
      work_zip_code: req.body.work_zip_code || member.work_zip_code,
      mailing_address_status: req.body.mailing_address_status || member.mailing_address_status,
      phone : req.body.phone || member.phone,
      email : req.body.email || member.email,
      home_address: req.body.home_address || member.home_address,
      home_city : req.body.home_city || member.home_city,
      home_country : req.body.home_country || member.home_country,
      home_zip_code : req.body.home_zip_code || member.home_zip_code,
      endocrine_networks : req.body.endocrine_networks || member.end,
      info_plattform : req.body.info_plattform || member.info_plattform,
      membership_attraction : req.body.membership_attraction || member.membership_attraction,
      membership_category: req.body.membership_category || member.membership_category,
      membership_type : req.body.membership_type || member.membership_type,
      subscription_type : req.body.subscription_type || member.subscription_type,
      society_official_journals : req.body.society_official_journals || member.society_official_journals,
      is_proposed_member : req.body.is_proposed_member || member.is_proposed_member,
      accept_privacy_policy: req.body.accept_privacy_policy || member.accept_privacy_policy,
      mailing_preference : req.body.mailing_preference || member.mailing_preference,
      postal_email_status : req.body.postal_email_status || member.postal_email_status,
      membership_directory_inclusion_status : req.body.membership_directory_inclusion_status || member.membership_directory_inclusion_status,
      media_queries_contact_status : req.body.media_queries_contact_status || member.media_queries_contact_status,
      payment_status : req.body.payment_status || member.payment_status
    };

    member = await Member.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });

    return res.status(200).json({
      successMessage: "Member details was successfully updated",
    });
  } catch (error) {
    return res.status(500).json({ errorMessage: "Something went wrong" });
  }
};
