const Joi = require("joi");

const productSchema = Joi.object({
  color: Joi.string().required(),
  price: Joi.number().required(),
  productId: Joi.string().required(),
  productImage: Joi.string().required(),
  productName: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required(),
  size: Joi.string().required(),
  type: Joi.string().optional(),
  category: Joi.string().optional(),
});

const addOrderSchema = {
  body: Joi.object().keys({
    products: Joi.array().items(productSchema).min(1),
    totalPrice: Joi.number().required(),
    phoneNumber: Joi.string()
      .pattern(/^[0-9]*$/)
      .length(8)
      .required(),
    clientFullName: Joi.string().required(),
    email: Joi.string().email().required(),
    region: Joi.string().required(),
    street: Joi.string().required(),
    building: Joi.string().required(),
    floor: Joi.string()
      .pattern(/^[0-9]*$/)
      .required(),
  }),
};

module.exports = {
  addOrderSchema,
};
