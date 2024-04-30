const nodemailer = require("nodemailer");

const extractProvider = (email) => {
  const regex = /@([a-zA-Z0-9.-]+)\./;
  const match = email.match(regex);

  return match ? match[1] : null;
};

const sendEmail = async ({ email, products }) => {
  const provider = extractProvider(email);

  if (!provider) {
    throw new Error("Unable to determine email provider");
  }

  let transporter;
  transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
      user: "no-reply@pointnul.com",
      pass: "Password@123",
    },
  });
  // if (provider === "gmail") {
  //   transporter = nodemailer.createTransport({
  //     service: "gmail",
  //     auth: {
  //       user: "imad.alhaj.saad@gmail.com",
  //       pass: "wtnb wjaq cvui cmuo",
  //     },
  //   });
  // } else if (provider === "outlook") {
  //   transporter = nodemailer.createTransport({
  //     host: "smtp.office365.com",
  //     port: 587,
  //     secure: false,
  //     auth: {
  //       user: "adasd@outlook.com",
  //       pass: "aaasd@#$",
  //     },
  //   });
  // } else {
  //   throw new Error("Unsupported email provider");
  // }

  const generateDynamicHTML = (products) => `
  <html lang="en">
  <head>
  <style>
      body {
          width: 90%;
          height: 100vh;
          font-family: Arial, Helvetica, sans-serif;
          align-self: center;
          margin: 10px;
          color: rgb(92, 92, 92);
      }

      table {
          width: 100%;
      }

      th,
      td {
          padding: 10px;
          text-align: left;
      }

      h3 {
          margin-top: 10px;
          font-size: 1.5em;
      }

      h5 {
          color: rgb(188, 188, 188);
          font-weight: bold;
          font-size: 1.2em;
      }

      button {
          width: 120px;
          height: 40px;
          background-color: rgb(0, 185, 247);
          color: white;
          border-radius: 5px;
          border: none;
          font-size: 1em;
      }

      p {
          font-size: 1.2em;
          font-weight: bold;
      }

      img {
          width: 50px;
          height: 50px;
          border-radius: 5px;
      }

      .separator {
          width: 90%;
          height: 0.5px;
          background-color: lightgray;
          align-self: center;
      }


      .totals {
          width: 50%;
          margin-top: 25px;
      }

      .totals div {
          display: flex;
          justify-content: space-between;
          align-items: center;
      }

      .totals div:last-child {
          width: 100%;
          height: 1px;
          background-color: lightgray;
          align-self: center;
      }

      /* Responsive Font Sizes */
      @media only screen and (max-width: 600px) {
          .separator-for-total {
              width: 65%
          }

          h3 {
              font-size: 1.2em;
          }

          h5 {
              font-size: 1em;
          }

          button {
              font-size: 0.8em;
          }

          p {
              font-size: 1em;
          }
      }
  </style>
</head>
  <body>
      <table>
          <tr>
              <td colspan="2">
                  <h3>Point Null</h3>
              </td>
          </tr>
          <tr>
              <td colspan="2">
                  <h3>Thank you for your shopping with us !!</h3>
                  <h5>Your order is currently being prepared for shipment.We'll keep you updated and notify you as soon as it's on its way.</h5>
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
                      <img src="https://storage.googleapis.com/pointnul-image/${
                        product.productImage
                      }" />
                      <p style="font-weight: bold; margin-left: 30px;font-size: 14px;text-align: right;text-transform:capitalize">${
                        product.productName
                      } </p>
                    </td>
                    <td style="font-weight: bold;text-align: center;">x ${
                      product.quantity
                    }</td>
                    <td style="font-weight: bold;text-align: center;">$${product.price.toFixed(
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
                              <div class="separator" style="min-width: 200px;width:75%"></div>
                          </td>
                      </tr>
                      <tr>
                          <td style="font-weight:bold">Total</td>
                          <td style="font-weight:bold">$${products
                            .reduce((acc, curr) => acc + curr.price, 0)
                            .toFixed(2)}</td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
  </body>
  
  </html>
`;

  const htmlTemplate = generateDynamicHTML(products);

  const mailOptions1 = {
    from: "no-reply@pointnul.com",
    to: email,
    subject: "Your Order is on its way !!",
    html: htmlTemplate,
  };
  const mailOptions2 = {
    from: "no-reply@pointnul.com",
    to: "no-reply@pointnul.com",
    subject: "Your Order is on its way !!",
    html: htmlTemplate,
  };

  try {
    const info1 = await transporter.sendMail(mailOptions1);
    const info2 = await transporter.sendMail(mailOptions2);
    console.log("Email sent:", info1.response);
    console.log("Email sent:", info2.response);
  } catch (error) {
    console.error("Error:", error);
  }
};

module.exports = { sendEmail };
