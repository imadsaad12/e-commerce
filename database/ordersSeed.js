const mongoose = require("mongoose");
const Orders = require("../models/orderModel");
const logger = require("../utilities/logger");

const ordersData = [
  {
    clientFullName: "Samer ahmad toufic",
    phoneNumber: "+961 81 328 902",
    email: "samer.ahamad@gmail.com",
    address: {
      region: "chiyah",
      street: "hay madi",
      building: "nojom",
      floor: 4,
    },
    products: [
      {
        productId: "65b8c5ca2d521a903ba85ae7", // get id from your db
        productImage:
          "https://www.google.com/imgres?imgurl=https%3A%2F%2Fdecathlon.com.lb%2Fcdn%2Fshop%2Fproducts%2F8db81a69c458ecfded8a5949cbf14bda_f01c9d92-e8e9-42bf-8bbf-6cf774784619_675x.progressive.jpg%3Fv%3D1658977473&tbnid=w3pfpmIVs0pMgM&vet=12ahUKEwiA94Xz54SEAxV6UKQEHcaKCKsQMygCegQIARB5..i&imgrefurl=https%3A%2F%2Fdecathlon.com.lb%2Fproducts%2Fmens-short-sleeved-straight-cut-crew-neck-cotton-fitness-t-shirt-sportee&docid=xFsDHQnJHWDS7M&w=675&h=675&q=t-shirts&ved=2ahUKEwiA94Xz54SEAxV6UKQEHcaKCKsQMygCegQIARB5",
        color: "black",
        size: "meduim",
        quantity: 1,
      },
    ],
  },
  {
    clientFullName: "khalil ahmad fakih",
    phoneNumber: "+961 03 464 082",
    email: "khalil.fakih@gmail.com",
    address: {
      region: "rwes",
      street: "al azarye",
      building: "nejme",
      floor: 1,
    },
    products: [
      {
        productId: "65b8c5ca2d521a903ba85aee", // get id from your db
        productImage:
          "https://www.google.com/imgres?imgurl=https%3A%2F%2Fuk.shop.realmadrid.com%2Fcdn%2Fshop%2Fproducts%2FRMCFMZ0126_01_500x480.jpg%3Fv%3D1685530048&tbnid=An1se3_H-g3qzM&vet=12ahUKEwid0-vy6ISEAxVaZqQEHVJ8BmMQMygCegQIARBW..i&imgrefurl=https%3A%2F%2Fuk.shop.realmadrid.com%2Fproducts%2Frmcfmz0126-real-madrid-mens-home-shirt-23-24-white&docid=wQaeuixTxI-2YM&w=480&h=480&q=t-shirts%20real%20madrid%20white&hl=en-GB&ved=2ahUKEwid0-vy6ISEAxVaZqQEHVJ8BmMQMygCegQIARBW",
        color: "white",
        size: "large",
        quantity: 3,
      },
    ],
  },
];

mongoose.connect("mongodb://127.0.0.1:27017/e-commerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
async function seedDatabase() {
  try {
    await Product.deleteMany({});

    await Orders.insertMany(ordersData);

    logger.info("Seed data inserted successfully.");
  } catch (error) {
    logger.error("Error seeding database:", error);
  } finally {
    mongoose.disconnect();
  }
}

seedDatabase();
