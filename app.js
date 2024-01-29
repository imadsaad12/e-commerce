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
const cookieParser = require("cookie-parser");
const { AuthenticatedRouter } = require("./utilities/authenticated-route");
const { sendEmail } = require("./utilities/email");
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
app.get("/orders", ordersRoutes(AuthenticatedRouter()));
app.get("/test", async () =>
  sendEmail({ email: "saabhadi285@gmail.com", subject: "nfo5o" })
);

app.use(errorHandler);
app.listen(4000, () => logger.info("Server is running on port 4000 . . ."));
