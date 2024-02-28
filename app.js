const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const logApiHit = require("./middleware/api-logger");
const errorHandler = require("./middleware/error-handler");
const { setAuthorizationHeader } = require("./middleware/authenticate");
const logger = require("./utilities/logger");
const { connectToDatabase } = require("./database/connect-database");
const productsRoutes = require("./routes/productsRoutes");
const authenticationRoutes = require("./routes/authenticationRoutes");
const ordersRoutes = require("./routes/ordersRoutes");
const categoriesRoutes = require("./routes/categoriesRoutes");
const cookieParser = require("cookie-parser");
const corsOptions = { credentials: true, origin: true };

dotenv.config();

app.use(logApiHit);
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(setAuthorizationHeader);
connectToDatabase();

app.use("/products", productsRoutes);
app.use("/auth", authenticationRoutes);
app.use("/orders", ordersRoutes);
app.use("/categories", categoriesRoutes);

app.use(errorHandler);
app.use(express.static("build"));

app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "./build/index.html"));
});
app.listen(4000, () => logger.info("Server is running on port 4000 . . ."));
