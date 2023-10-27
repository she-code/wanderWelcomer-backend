const { CommitteApplication } = require("../models/committeApplications");

exports.applyCommitte = async (req, res) => {
  try {
    const { reason, userId, image, committeType } = req.body;
    const application = await CommitteApplication.create({
      reason,
      committeType,
      image,
      user: userId,
    });
    if (!application) {
      res.status(400).json({
        status: "failed",
        message: "Unable to create",
      });
      return;
    }
    res.status(200).json({
      status: "success",
      application,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

exports.getAllApplications = async (req, res) => {
  try {
    const applications = await CommitteApplication.find();
    if (!applications) {
      res.status(404).json({
        status: "failed",
        message: "no applications found",
      });
      return;
    }
    res.status(200).json({
      status: "sucess",
      applications,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

exports.getPendingApplication = async (req, res) => {
  try {
    const applications = await CommitteApplication.find({ status: "pending" });
    if (!applications) {
      res.status(404).json({
        status: "failed",
        message: "no applications found",
      });
      return;
    }
    res.status(200).json({
      status: "sucess",
      result: applications.length,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

exports.updateApplication = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    const application = await CommitteApplication.findById(applicationId);
    if (!application) {
      res.status(404).json({
        status: "failed",
        message: "no application found",
      });
      return;
    }
    application.status = status;
    const updatedApplication = await application.save();
    if (!updatedApplication) {
      res.status(400).json({
        status: "failed",
        message: "unable to update",
      });
      return;
    }
    res.status(200).json({
      status: "sucess",
      updatedApplication,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};
