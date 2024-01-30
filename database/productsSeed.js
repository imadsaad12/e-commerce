const mongoose = require("mongoose");
const Product = require("../models/productModel");
const logger = require("../utilities/logger");

const productsData = [
  {
    name: "T-shirt",
    description: "T-shirt with logo",
    price: 10.99,
    category: "T-shirts",
    sizes: [
      { size: "large", color: "blue", inStock: true },
      { size: "medium", color: "black", inStock: true },
      { size: "large", color: "yellow", inStock: false },
    ],
    images: [
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnOkXQE2G3_qhy62ULJM5PMfE4RX2TB5Ch2jiRdKpc-yRPZBJAZ73-_LeQ_uhTWTb3rP8&usqp=CAU",
        color: "black",
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2BSeetshh1PZ6ICxFR2E4iISsFjopI0BlogGTJrKTRM1_jyadncanf4cOHK_UJGl86qM&usqp=CAU",
        color: "blue",
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2yxgkztbz6Jfi3JdApqVQ8fvSzaFbkf__4ZVCw8METi_q8PCfOlFlkDBTEGKJ53JU5Iw&usqp=CAU",
        color: "yellow",
      },
    ],
  },
  {
    name: "Madrid shirt",
    description: "Real madrid shirt",
    price: 20.99,
    category: "T-shirts",
    sizes: [
      { size: "large", color: "white", inStock: true },
      { size: "medium", color: "black", inStock: true },
      { size: "large", color: "pink", inStock: false },
    ],
    images: [
      {
        url: "https://uk.shop.realmadrid.com/cdn/shop/products/RMCFMZ0126_01_500x480.jpg?v=1685530048",
        color: "white",
      },
      {
        url: "https://cdn.shopify.com/s/files/1/0405/9807/7603/files/RMCFYZ0049-01_533x.jpg?v=1699006267",
        color: "black",
      },
      {
        url: "https://cdn.shoplightspeed.com/shops/649488/files/39546748/image.jpg",
        color: "pink",
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

    await Product.insertMany(productsData);

    logger.info("Seed data inserted successfully.");
  } catch (error) {
    logger.error("Error seeding database:", error);
  } finally {
    mongoose.disconnect();
  }
}

seedDatabase();
