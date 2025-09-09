const normalizeProduct = async (rawProduct, userId) => {
  return {
    ...rawProduct,
    image: {
      url:
        rawProduct.image.url ||
        "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg",
      alt: rawProduct.image.alt || `${rawProduct.title} Product image`,
    },
    bizNumber: rawProduct.bizNumber || (await generateBizNumber()),
    user_id: rawProduct.user_id || userId,
  };
};

module.exports = normalizeProduct;
