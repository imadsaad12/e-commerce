const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const logApiHit = require("./middleware/api-logger");
const errorHandler = require("./middleware/error-handler");
const logger = require("./utilities/logger");
const { connectToDatabase } = require("./database/connect-database");
const productsRoutes = require("./routes/productsRoutes");

dotenv.config();

app.use(logApiHit);
app.use(cors());
app.use(express.json());
connectToDatabase();

app.use(errorHandler);
app.use("/products", productsRoutes);

app.listen(4000, () => logger.info("Server is running on port 4000 . . ."));
