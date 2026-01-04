const express = require("express");
const router = express.Router();
const controller = require("../Controllers/controller");

// CRUD Endpoints
router.get("/", controller.getAllCars);
router.get("/:id", controller.getCarById);
router.post("/", controller.createCar);
router.put("/:id", controller.updateCar);
router.patch("/:id", controller.patchCar);
router.delete("/:id", controller.deleteCar);

module.exports = router;
