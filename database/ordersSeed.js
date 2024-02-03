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
        productId: "65b93b2ec79619d4fb53ad14", // get id from your db
        productImage:
          "https://decathlon.com.lb/cdn/shop/products/8db81a69c458ecfded8a5949cbf14bda_f01c9d92-e8e9-42bf-8bbf-6cf774784619_675x.progressive.jpg?v=1658977473",
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
        productId: "65b93b2ec79619d4fb53ad1b", // get id from your db
        productImage:
          "https://uk.shop.realmadrid.com/cdn/shop/products/RMCFMZ0126_01_500x480.jpg?v=1685530048",
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
    await Orders.deleteMany({});

    await Orders.insertMany(ordersData);

    logger.info("Seed data inserted successfully.");
  } catch (error) {
    logger.error("Error seeding database:", error);
  } finally {
    mongoose.disconnect();
  }
}

seedDatabase();
