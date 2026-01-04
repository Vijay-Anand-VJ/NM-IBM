const express = require("express");
const cors = require("cors");
const app = express();
const carRoutes = require("./Routes/routes");

app.use(cors());
app.use(express.json());

// Mount routes
app.use("/cars", carRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Rental Car API running on port ${PORT}`));
