// export interface Product {
//   id: number;
//   title: string;
//   description: string;
//   price: string;
//   image?: string;
// }

// export const productsData: Product[] = [
//   {
//     id: 1,
//     title: "Gaming Mouse",
//     description: "High precision RGB gaming mouse.",
//     price: "$49.99",
//     image: "",
//   },
//   {
//     id: 2,
//     title: "Mechanical Keyboard",
//     description: "Durable mechanical keyboard with blue switches.",
//     price: "$89.99",
//     image:
//       "https://www.bsavvi.co.uk/cdn/shop/files/k68-mechanical-gaming-keyboard-60percent-wireless-bluetooth-5-02-4ghz-bsavvi-1-34944275611941.jpg?v=1692923385",
//   },
//   {
//     id: 3,
//     title: "Gaming Headset",
//     description: "Surround sound headset with noise-canceling mic.",
//     price: "$69.99",
//     image:
//       "https://uk.hyperx.com/cdn/shop/files/hyperx_cloud_stinger_2_wireless_1_main.jpg?v=1724860525",
//   },
//   {
//     id: 4,
//     title: "Mouse Pad",
//     description: "Large RGB mouse pad with smooth surface.",
//     price: "$29.99",
//     image:
//       "https://www.inkedgaming.com/cdn/shop/products/SITE_ChooseYourSize_Split_6XLExtendedMousepad_3_2.jpg?v=1655610185",
//   },
//   {
//     id: 5,
//     title: "Gaming Chair",
//     description: "Ergonomic gaming chair with adjustable armrests.",
//     price: "$199.99",
//     image:
//       "https://img.nitro-concepts.com/images/GAGC-309/1f10cd7da179078b26bfadbebdb07c2c.jpg",
//   },
//   {
//     id: 6,
//     title: "Webcam",
//     description: "1080p HD webcam with built-in microphone.",
//     price: "$59.99",
//     image:
//       "https://www.cls.co.il/files/products/product366533_model0_image0_2025-01-13_05-03-23.jpg",
//   },
//   {
//     id: 7,
//     title: "External Hard Drive",
//     description: "Portable 2TB external hard drive.",
//     price: "$89.99",
//     image:
//       "https://www.minitool.com/images/uploads/2019/06/external-hard-disk-1.png",
//   },
//   {
//     id: 8,
//     title: "USB Hub",
//     description: "4-port USB hub with fast charging.",
//     price: "$19.99",
//     image:
//       "https://www.bug.co.il/images/site/products/64b7fb0d-7d00-4ccf-a9ba-82240667fdc1.jpg",
//   },
//   {
//     id: 9,
//     title: "Gaming Monitor",
//     description: "27-inch 144Hz gaming monitor with G-Sync.",
//     price: "$299.99",
//     image: "https://tzilzul.co.il/wp-content/uploads/2023/02/6KN895373.jpg",
//   },
//   {
//     id: 10,
//     title: "VR Headset",
//     description: "High-end VR headset with motion controllers.",
//     price: "$399.99",
//     image:
//       "https://www.virginmegastore.bh/medias/493385-main.jpg?context=bWFzdGVyfHJvb3R8NTM4MTV8aW1hZ2UvanBlZ3xhR1l3TDJneU5DOHhNRE00TVRVMU16WTVOamM1T0M4ME9UTXpPRFZmWDIxaGFXNHVhbkJufGM5NGU1YTBiMmZlYmQ0YzJlNWYyMTJiZjFkYTE1MzRiMTg0ODA0YzBmMzI0ZDNhZmU2ODExY2ZiZTY4YWJkMDM",
//   },
//   {
//     id: 11,
//     title: "Gaming Laptop",
//     description: "High-performance gaming laptop with RTX 3060.",
//     price: "$1299.99",
//     image:
//       "https://www.lenovo.com/medias/lenovo-laptop-legion-5-pro-16ach6-hero.png?context=bWFzdGVyfHJvb3R8MTQ2NjY4fGltYWdlL3BuZ3xoYzAvaDg1Lzk5Mjk1OTI2MjYyNzAucG5nfDkzYjE0N2QwYjM1ZDYxN2Q4YjI0ZDU1MzE5ZGEyM2U0NmQwYjI1NTc3ODc4N2QxZDYzYjE4MDU5Njg0MzI0",
//   },
//   {
//     id: 12,
//     title: "Gaming Console",
//     description: "Next-gen gaming console with 4K support.",
//     price: "$499.99",
//     image: "",
//   },
//   {
//     id: 13,
//     title: "Game Controller",
//     description: "Wireless game controller with customizable buttons.",
//     price: "$39.99",
//     image: "",
//   },
//   {
//     id: 14,
//     title: "Gaming Speakers",
//     description: "High-quality gaming speakers with deep bass.",
//     price: "$79.99",
//     image: "",
//   },

//   {
//     id: 15,
//     title: "Gaming Desk",
//     description: "Spacious gaming desk with cable management.",
//     price: "$249.99",
//     image: "",
//   },

//   {
//     id: 16,
//     title: "Gaming Backpack",
//     description: "Durable backpack with compartments for gaming gear.",
//     price: "$59.99",
//     image: "",
//   },
//   {
//     id: 17,
//     title: "Gaming Glasses",
//     description: "Blue light blocking gaming glasses.",
//     price: "$24.99",
//     image: "",
//   },
//   {
//     id: 18,
//     title: "Streaming Microphone",
//     description: "Professional USB microphone for streaming and podcasts.",
//     price: "$129.99",
//     image: "",
//   },
//   {
//     id: 19,
//     title: "Capture Card",
//     description: "4K capture card for recording and streaming gameplay.",
//     price: "$149.99",
//     image: "",
//   },
//   {
//     id: 20,
//     title: "Gaming Router",
//     description: "High-speed gaming router with QoS for lag-free gaming.",
//     price: "$199.99",
//     image: "",
//   },
//   {
//     id: 21,
//     title: "Gaming Chair Mat",
//     description: "Protective mat for gaming chairs.",
//     price: "$39.99",
//     image: "",
//   },
//   {
//     id: 22,
//     title: "LED Strip Lights",
//     description: "RGB LED strip lights for gaming setup.",
//     price: "$19.99",
//     image: "",
//   },
//   {
//     id: 23,
//     title: "Gaming Gloves",
//     description: "Comfortable gaming gloves for better grip.",
//     price: "$14.99",
//     image: "",
//   },
//   {
//     id: 24,
//     title: "Gaming Wrist Rest",
//     description: "Ergonomic wrist rest for gaming keyboards.",
//     price: "$12.99",
//     image: "",
//   },
// ];
