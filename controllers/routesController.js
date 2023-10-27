const { Route } = require("../models/routes");
exports.createRoute = async (req, res) => {
  try {
    const { from, to, price, duration, name, description } = req.body;
    const route = await Route.create({
      name,
      description,
      from,
      to,
      price,
      duration,
    });
    if (!route) {
      res.status(400).json({
        status: "failed",
        message: "Failed to create",
      });
    }
    res.status(200).json({
      status: "success",
      route,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
