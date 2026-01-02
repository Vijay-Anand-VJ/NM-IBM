# 🚗 Rental Car Management API

A simple **CRUD API** for managing rental cars, built with **Node.js**, **Express**, and **JSON file storage**.

This project allows you to:

* Add new cars
* Get all cars or a car by ID
* Update car details (full or partial)
* Delete a car

---

## 🗂 Folder Structure

```
Rental Car Management/
│── app.js
│── package.json
│── node_modules/
│
├── Controllers/
│   └── controller.js
│
├── Routes/
│   └── routes.js
│
└── data/
    └── cars.json
```

---

## ⚡ Features

* RESTful API endpoints
* Full CRUD operations
* Supports **PATCH** for updating or deleting single fields
* Uses **JSON file** as a database

---

## 🚀 Getting Started

1. Clone the repo:

```bash
git clone https://github.com/your-username/rental-car-management.git
cd rental-car-management
```

2. Install dependencies:

```bash
npm install
```

3. Run the API:

```bash
node app.js
```

The API will run on `http://localhost:3000`.

---

## 📌 API Endpoints

| Method | Endpoint  | Description                      |
| ------ | --------- | -------------------------------- |
| GET    | /cars     | Get all cars                     |
| GET    | /cars/:id | Get car by ID                    |
| POST   | /cars     | Add a new car                    |
| PUT    | /cars/:id | Update entire car                |
| PATCH  | /cars/:id | Update or delete single property |
| DELETE | /cars/:id | Delete a car                     |

---

## 🖼 Screenshots

Add your screenshots here:

![Screenshot 1](screenshots/screenshot1.png)
![Screenshot 2](screenshots/screenshot2.png)

> You can create a `screenshots/` folder and put your images there.

---

## ⚙️ Example JSON for POST / PATCH

**POST /cars**

```json
{
  "brand": "Toyota",
  "model": "Corolla",
  "year": 2020,
  "pricePerDay": 50
}
```

**PATCH /cars/1**

```json
{
  "pricePerDay": 60
}
```

---

## 📂 Notes

* JSON file acts as a database (`data/cars.json`)
* Make sure to **install dependencies** before running (`npm install`)

---

## 📌 License

This project is open-source. Feel free to use and modify!
