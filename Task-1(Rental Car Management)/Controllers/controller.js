const fs = require("fs");
const path = require("path");
const dataPath = path.join(__dirname, "../data/cars.json");

// Helper function to read JSON
const readData = () => {
  const jsonData = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(jsonData);
};

// Helper function to write JSON
const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// GET all cars
const getAllCars = (req, res) => {
  const cars = readData();
  res.json(cars);
};

// GET car by ID
const getCarById = (req, res) => {
  const cars = readData();
  const car = cars.find((c) => c.id === parseInt(req.params.id));
  if (!car) return res.status(404).json({ message: "Car not found" });
  res.json(car);
};

// CREATE new car
const createCar = (req, res) => {
  const cars = readData();
  const newCar = {
    id: cars.length ? cars[cars.length - 1].id + 1 : 1,
    ...req.body,
  };
  cars.push(newCar);
  writeData(cars);
  res.status(201).json(newCar);
};

// UPDATE car completely
const updateCar = (req, res) => {
  const cars = readData();
  const index = cars.findIndex((c) => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Car not found" });

  cars[index] = { id: cars[index].id, ...req.body };
  writeData(cars);
  res.json(cars[index]);
};

// PATCH car partially
const patchCar = (req, res) => {
  const cars = readData();
  const car = cars.find((c) => c.id === parseInt(req.params.id));
  if (!car) return res.status(404).json({ message: "Car not found" });

  Object.assign(car, req.body);
  writeData(cars);
  res.json(car);
};

// DELETE car
const deleteCar = (req, res) => {
  let cars = readData();
  const car = cars.find((c) => c.id === parseInt(req.params.id));
  if (!car) return res.status(404).json({ message: "Car not found" });

  cars = cars.filter((c) => c.id !== car.id);
  writeData(cars);
  res.json({ message: "Car deleted successfully" });
};

module.exports = {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  patchCar,
  deleteCar,
};
