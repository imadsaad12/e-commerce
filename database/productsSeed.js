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
        url: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fdecathlon.com.lb%2Fcdn%2Fshop%2Fproducts%2F8db81a69c458ecfded8a5949cbf14bda_f01c9d92-e8e9-42bf-8bbf-6cf774784619_675x.progressive.jpg%3Fv%3D1658977473&tbnid=w3pfpmIVs0pMgM&vet=12ahUKEwiA94Xz54SEAxV6UKQEHcaKCKsQMygCegQIARB5..i&imgrefurl=https%3A%2F%2Fdecathlon.com.lb%2Fproducts%2Fmens-short-sleeved-straight-cut-crew-neck-cotton-fitness-t-shirt-sportee&docid=xFsDHQnJHWDS7M&w=675&h=675&q=t-shirts&ved=2ahUKEwiA94Xz54SEAxV6UKQEHcaKCKsQMygCegQIARB5",
        color: "black",
      },
      {
        url: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-77sy6fs%2Fimages%2Fstencil%2F1280x1280%2Fproducts%2F1011%2F3106%2FCotton_Tshirt-Turquoise-Front__80337.1677509966.jpg%3Fc%3D2&tbnid=1CoLumJ3qy4XyM&vet=12ahUKEwiA94Xz54SEAxV6UKQEHcaKCKsQMygBegQIARB2..i&imgrefurl=https%3A%2F%2Fraffisport.com%2Ft-shirts%2Fcotton-round-neck-t-shirt-blank-t-shirt%2F&docid=WdN069RW4YYZ6M&w=1280&h=1280&q=t-shirts&ved=2ahUKEwiA94Xz54SEAxV6UKQEHcaKCKsQMygBegQIARB2",
        color: "blue",
      },
      {
        url: "https://www.google.com/imgres?imgurl=https%3A%2F%2Ftshirtssouthafrica.com%2Fwp-content%2Fuploads%2FYellow.jpg&tbnid=klAtpHRbTDKGnM&vet=12ahUKEwib5czK6ISEAxWbdqQEHRN8B8AQMygCegQIARB7..i&imgrefurl=https%3A%2F%2Ftshirtssouthafrica.com%2Fproduct%2Fyellow-t-shirt%2F&docid=PbRvzy5ogYj8mM&w=2048&h=2048&q=t-shirts&hl=en-GB&ved=2ahUKEwib5czK6ISEAxWbdqQEHRN8B8AQMygCegQIARB7",
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
        url: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fuk.shop.realmadrid.com%2Fcdn%2Fshop%2Fproducts%2FRMCFMZ0126_01_500x480.jpg%3Fv%3D1685530048&tbnid=An1se3_H-g3qzM&vet=12ahUKEwid0-vy6ISEAxVaZqQEHVJ8BmMQMygCegQIARBW..i&imgrefurl=https%3A%2F%2Fuk.shop.realmadrid.com%2Fproducts%2Frmcfmz0126-real-madrid-mens-home-shirt-23-24-white&docid=wQaeuixTxI-2YM&w=480&h=480&q=t-shirts%20real%20madrid%20white&hl=en-GB&ved=2ahUKEwid0-vy6ISEAxVaZqQEHVJ8BmMQMygCegQIARBW",
        color: "white",
      },
      {
        url: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0405%2F9807%2F7603%2Ffiles%2FRMCFYZ0049-01_533x.jpg%3Fv%3D1699006267&tbnid=_uasr-NYZvnW6M&vet=12ahUKEwjinKaE6YSEAxV0UqQEHfLHCZMQMygCegQIARBU..i&imgrefurl=https%3A%2F%2Fus.shop.realmadrid.com%2Fproducts%2Frmcfmz0134-mens-third-shirt-23-24-black&docid=E3o0bK_mX_7WDM&w=533&h=533&q=t-shirts%20real%20madrid%20black&hl=en-GB&ved=2ahUKEwjinKaE6YSEAxV0UqQEHfLHCZMQMygCegQIARBU",
        color: "black",
      },
      {
        url: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.shoplightspeed.com%2Fshops%2F649488%2Ffiles%2F39546748%2Fimage.jpg&tbnid=rsqPRb6MS5fVlM&vet=12ahUKEwjEjriU6YSEAxWJdaQEHU8QCCgQMygMegQIARBj..i&imgrefurl=https%3A%2F%2Fwww.soccerium.com%2F008-adidas-real-madrid-2018-2019-away-jersey.html&docid=zmjpS34ki8jTzM&w=1000&h=1000&q=t-shirts%20real%20madrid%20pink&hl=en-GB&ved=2ahUKEwjEjriU6YSEAxWJdaQEHU8QCCgQMygMegQIARBj",
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
