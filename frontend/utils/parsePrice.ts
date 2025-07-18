export const parsePrice = (price: string): number =>
  parseFloat(price.replace("$", ""));
