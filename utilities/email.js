const nodemailer = require("nodemailer");

const extractProvider = (email) => {
  const regex = /@([a-zA-Z0-9.-]+)\./;
  const match = email.match(regex);

  return match ? match[1] : null;
};

const sendEmail = async () => {
  //   const provider = extractProvider("asds@gmail.com");
  const provider = "gmail";

  if (!provider) {
    throw new Error("Unable to determine email provider");
  }

  let transporter;

  if (provider === "gmail") {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "imad.alhaj.saad@gmail.com",
        pass: "aasasas",
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

  const mailOptions = {
    from: "imad.alhaj.saad@gmail.com",
    to: "saabhadi285@gmail.com",
    subject: "X",
    body: "asdasd",
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error:", error);
  }
};

module.exports = { sendEmail };
