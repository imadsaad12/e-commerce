const nodemailer = require("nodemailer");

const extractProvider = (email) => {
  const regex = /@([a-zA-Z0-9.-]+)\./;
  const match = email.match(regex);

  return match ? match[1] : null;
};

const sendEmail = async ({ email, subject }) => {
  const provider = extractProvider(email);

  if (!provider) {
    throw new Error("Unable to determine email provider");
  }

  let transporter;

  if (provider === "gmail") {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "imad.alhaj.saad@gmail.com",
        pass: "wtnb wjaq cvui cmuo",
      },
    });
  } else if (provider === "outlook") {
    transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: "adasd@outlook.com",
        pass: "aaasd@#$",
      },
    });
  } else {
    throw new Error("Unsupported email provider");
  }
  const dynamicHTML = (products) => `
  <html lang="en">

  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  
  <body style="width: 90%;height: 100vh;font-family: Arial, Helvetica, sans-serif;align-self: center;margin: 10px;">
  
      <div style="display: flex;flex-direction: column;justify-content: space-between;width: 100%;">
          <h2>My brand</h2>
          <div style="height: auto;">
              <h3 style="margin-top: 10px;">Thank you for your purchase !!</h3>
              <h5 style="color: lightgray;">We're getting your order ready to be shipped. We will notify you when it has
                  been sent</h5>
          </div>
          <div style="display: flex;flex-direction: row;align-items: center;width: 70%;margin-bottom: 20px;">
              <button
                  style="width: 150px;height: 50px;background-color: lightblue; color: white;border-radius: 10px;border-color: white;border:none;">
                  view your order</button>
          </div>
  
          <p>Order sumnmary</p>
          <div style="width: 100%;height: auto;display: flex;flex-direction: column;gap: 10px;">
              <div
                  style="display: flex;flex-direction: row;justify-content: space-between;align-items: center;height: 60px;">
                  <div
                      style="display: flex;flex-direction: row;justify-content: space-between;align-items: center;width: 42%;">
                      <img style="width: 50px;height: 50px;border-radius: 5px;"
                          src="https://guruofficialbrand.com/wp-content/uploads/2022/05/C52A75811-1536x1024.jpg" />
                      <p>T-shirt x 2</p>
                  </div>
                  <p>$ 30.10</p>
              </div>
              <div style="width: 80%;height: 1px;background-color: lightgray;align-self: center;"></div>
              <div style="width: 100%;height: auto;display: flex;flex-direction: column;gap: 10px;">
                  <div
                      style="display: flex;flex-direction: row;justify-content: space-between;align-items: center;height: 60px;">
                      <div
                          style="display: flex;flex-direction: row;justify-content: space-between;align-items: center;width: 42%;">
                          <img style="width: 50px;height: 50px;border-radius: 5px;"
                              src="https://guruofficialbrand.com/wp-content/uploads/2022/05/C52A75811-1536x1024.jpg" />
                          <p>T-shirt x 2</p>
                      </div>
                      <p>$ 30.10</p>
                  </div>
                  <div style="width: 80%;height: 1px;background-color: lightgray;align-self: center;"></div>
                  <div style="width: 100%;height: auto;display: flex;flex-direction: column;gap: 10px;">
                      <div
                          style="display: flex;flex-direction: row;justify-content: space-between;align-items: center;height: 60px;">
                          <div
                              style="display: flex;flex-direction: row;justify-content: space-between;align-items: center;width: 42%;">
                              <img style="width: 50px;height: 50px;border-radius: 5px;"
                                  src="https://guruofficialbrand.com/wp-content/uploads/2022/05/C52A75811-1536x1024.jpg" />
                              <p>T-shirt x 2</p>
                          </div>
                          <p>$ 30.10</p>
                      </div>
                      <div style="width: 80%;height: 1px;background-color: lightgray;align-self: center;"></div>
  
                  </div>
                  <div style="align-self: flex-end;width: 50%;margin-top: 25px;">
                      <div style="display: flex;flex-direction: row;justify-content: space-between;align-items: center;">
                          <p style="font-size: 13px; color: gray;">subTotoal</p>
                          <p style="font-size: 13px; ">$30.00</p>
                      </div>
                      <div style="display: flex;flex-direction: row;justify-content: space-between;align-items: center;">
                          <p style="font-size: 13px; color: gray;">Shipping</p>
                          <p style="font-size: 13px;">$0.00</p>
                      </div>
                      <div style="display: flex;flex-direction: row;justify-content: space-between;align-items: center;">
                          <p style="font-size: 13px; color: gray;">Taxes</p>
                          <p style="font-size: 13px;">$0.00</p>
                      </div>
                      <div style="width: 100%;height: 1px;background-color: lightgray;align-self: center;"></div>
                      <div style="display: flex;flex-direction: row;justify-content: space-between;align-items: center;">
                          <p style="font-size: 13px; color: gray;">Total</p>
                          <p style="font-size: 13px;">$30.00</p>
                      </div>
                  </div>
              </div>
  </body>
  
  </html>
`;

  const products = [{ name: "T-shirt", quantity: 3, price: "25$" }];

  const htmlTemplate = dynamicHTML(products);

  const mailOptions = {
    from: "imad.alhaj.saad@gmail.com",
    to: email,
    subject,
    html: htmlTemplate,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error:", error);
  }
};

module.exports = { sendEmail };
