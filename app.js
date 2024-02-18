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
const { AuthenticatedRouter } = require("./utilities/authenticated-route");
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
app.listen(4000, () => logger.info("Server is running on port 4000 . . ."));

{
  /* <html lang="en">

<body>
    <table>
        <tr>
            <td colspan="2">
                <h3>My brand</h3>
            </td>
        </tr>
        <tr>
            <td colspan="2">
                <h3>Thank you for your purchase !!</h3>
                <h5>We're getting your order ready to be shipped. We will notify you when it has been sent</h5>
            </td>
        </tr>
        <tr>
            <td colspan="2">
                <button>View Your Order</button>
            </td>
        </tr>
        <tr>
            <td colspan="2">
                <p>Order summary</p>
            </td>
        </tr>
        ${products
          .map(
            (product) => `
          <tr>
            <td colspan="2">
              <table>
                <tr>
                  <td style="display: flex;flex-direction: row;justify-content: flex-start;align-items: center;">
                    <img src="https://storage.googleapis.com/ecommerce-bucket-testing/${
                      product.productImage
                    }" />
                    <p style="font-weight: bold; margin-left: 15px;font-size: 14px;">${
                      product.productName
                    } x ${product.quantity}</p>
                  </td>
                  <td style="font-weight: bold;">$${product.price.toFixed(
                    2
                  )}</td>
                </tr>
              </table>
            </td>
          </tr>
        `
          )
          .join("")}
        <tr>
            <td colspan="2">
                <div class="separator"></div>
            </td>
        </tr>
        <tr>
            <td colspan="2">
                <table class="totals">
                    <tr>
                        <td>Subtotal</td>
                        <td>$${products
                          .reduce((acc, curr) => acc + curr.price, 0)
                          .toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>Shipping</td>
                        <td>$0.00</td>
                    </tr>
                    <tr>
                        <td>Taxes</td>
                        <td>$0.00</td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <div class="separator" style="width: 75%;"></div>
                        </td>
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td>$${products
                          .reduce((acc, curr) => acc + curr.price, 0)
                          .toFixed(2)} USD</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html> */
}
