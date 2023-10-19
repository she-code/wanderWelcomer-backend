const { Place } = require("../models/place");
exports.createPlace = async (req, res) => {
  try {
    const { name, location, description, image, category } = req.body;
    const place = await Place.create({
      name,
      description,
      location,
      category,
      image,
    });
    if (!place) {
      res.status(400).json({
        status: "failed",
        message: "Failed to create",
      });
    }
    res.status(200).json({
      status: "success",
      place,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getAllPlaces = async (req, res) => {
  try {
    console.log(req.query);
    //filtering
    const queryObj = { ...req.query };
    const excludedfiels = ["page", "sort", "limit", "fields"];
    excludedfiels.forEach((el) => delete queryObj[el]);

    //advanced filtering
    // const queryStr = JSON.stringify(queryObj)
    // queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`)
    if (queryObj.name) {
      queryObj.name = {
        $regex: queryObj.name,
        $options: "i",
      };
    }

    const query = Place.find(queryObj);
    const places = await query;
    if (!places) {
      res.status(404).json({
        status: "failed",
        message: "no places found",
      });
    }
    res.status(200).json({
      status: "sucess",
      places,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

exports.getPlace = async (req, res) => {
  try {
    const id = req.params.id;
    const place = await Place.findById(id);
    if (!place) {
      res.status(404).json({
        status: "failed",
        message: "no place found with the given id",
      });
    }
    res.status(200).json({
      status: "sucess",
      place,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

exports.getPlacesByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const places = await Place.find({ where: { category: category } });
    if (!places) {
      res.status(404).json({
        status: "failed",
        message: "no places found",
      });
    }
    res.status(200).json({
      status: "sucess",
      places,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};
