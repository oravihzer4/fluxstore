const Joi = require("joi");
const productValidate = (product) => {
  const urlRegex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
  const schema = Joi.object({
    title: Joi.string().min(2).max(256).required(),
    description: Joi.string().min(2).max(1024).required(),
    category: Joi.string().min(2).max(256).required(),
    price: Joi.number().min(0).required(),
    inStock: Joi.boolean(),
    image: Joi.object()
      .keys({
        url: Joi.string()
          .ruleset.regex(urlRegex)
          .rule({ message: "Image URL must be valid URL address" })
          .allow(""),
        alt: Joi.string().min(2).max(256).allow(""),
      })
      .required(),
  });
  return schema.validate(product, { abortEarly: false });
};
module.exports = productValidate;
