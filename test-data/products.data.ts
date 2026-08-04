export type Product = {
  name: string;
  price: string;
  descriptionSnippet: string;
};

export const PRODUCTS = {
  BACKPACK: {
    name: "Sauce Labs Backpack",
    price: "$29.99",
    descriptionSnippet: "carry.allTheThings()",
  },
  BIKE_LIGHT: {
    name: "Sauce Labs Bike Light",
    price: "$9.99",
    descriptionSnippet: "A red light isn't the only thing",
  },
  BOLT_TSHIRT: {
    name: "Sauce Labs Bolt T-Shirt",
    price: "$15.99",
    descriptionSnippet: "Get your testing superhero on",
  },
  FLEECE_JACKET: {
    name: "Sauce Labs Fleece Jacket",
    price: "$49.99",
    descriptionSnippet: "It's not every day that you come across",
  },
  ONESIE: {
    name: "Sauce Labs Onesie",
    price: "$7.99",
    descriptionSnippet: "Rib snap infant onesie",
  },
  RED_TSHIRT: {
    name: "Test.allTheThings() T-Shirt (Red)",
    price: "$15.99",
    descriptionSnippet: "This classic Sauce Labs t-shirt",
  },
} as const;
