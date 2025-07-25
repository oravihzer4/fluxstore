import { useMemo, useState, type FunctionComponent } from "react";
import { successMassage } from "../Services/FeedbackService";
import { useCart } from "../Context/CartContext";

interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  image?: string;
}

const DEFAULT_IMAGE = "https://www.kpfinder.com/assets/default_product.jpg";

const Products: FunctionComponent = () => {
  const initialProducts: Product[] = [
    {
      id: 1,
      title: "Gaming Mouse",
      description: "High precision RGB gaming mouse.",
      price: "$49.99",
      image:
        "https://www.mytrendyphone.eu/images/6D-4-Speed-DPI-RGB-Gaming-Mouse-G5-Black-05042021-01-p.webp",
    },
    {
      id: 2,
      title: "Mechanical Keyboard",
      description: "Durable mechanical keyboard with blue switches.",
      price: "$89.99",
      image:
        "https://www.bsavvi.co.uk/cdn/shop/files/k68-mechanical-gaming-keyboard-60percent-wireless-bluetooth-5-02-4ghz-bsavvi-1-34944275611941.jpg?v=1692923385",
    },
    {
      id: 3,
      title: "Gaming Headset",
      description: "Surround sound headset with noise-canceling mic.",
      price: "$69.99",
      image:
        "https://uk.hyperx.com/cdn/shop/files/hyperx_cloud_stinger_2_wireless_1_main.jpg?v=1724860525",
    },
    {
      id: 4,
      title: "Mouse Pad",
      description: "Large RGB mouse pad with smooth surface.",
      price: "$29.99",
      image:
        "https://www.inkedgaming.com/cdn/shop/products/SITE_ChooseYourSize_Split_6XLExtendedMousepad_3_2.jpg?v=1655610185",
    },
    {
      id: 5,
      title: "Gaming Chair",
      description: "Ergonomic gaming chair with adjustable armrests.",
      price: "$199.99",
      image:
        "https://img.nitro-concepts.com/images/GAGC-309/1f10cd7da179078b26bfadbebdb07c2c.jpg",
    },
    {
      id: 6,
      title: "Webcam",
      description: "1080p HD webcam with built-in microphone.",
      price: "$59.99",
      image:
        "https://www.cls.co.il/files/products/product366533_model0_image0_2025-01-13_05-03-23.jpg",
    },
    {
      id: 7,
      title: "External Hard Drive",
      description: "Portable 2TB external hard drive.",
      price: "$89.99",
      image:
        "https://www.minitool.com/images/uploads/2019/06/external-hard-disk-1.png",
    },
    {
      id: 8,
      title: "USB Hub",
      description: "4-port USB hub with fast charging.",
      price: "$19.99",
      image:
        "https://www.bug.co.il/images/site/products/64b7fb0d-7d00-4ccf-a9ba-82240667fdc1.jpg",
    },
    {
      id: 9,
      title: "Gaming Monitor",
      description: "27-inch 144Hz gaming monitor with G-Sync.",
      price: "$299.99",
      image: "https://tzilzul.co.il/wp-content/uploads/2023/02/6KN895373.jpg",
    },
    {
      id: 10,
      title: "VR Headset",
      description: "High-end VR headset with motion controllers.",
      price: "$399.99",
      image:
        "https://www.virginmegastore.bh/medias/493385-main.jpg?context=bWFzdGVyfHJvb3R8NTM4MTV8aW1hZ2UvanBlZ3xhR1l3TDJneU5DOHhNRE00TVRVMU16WTVOamM1T0M4ME9UTXpPRFZmWDIxaGFXNHVhbkJufGM5NGU1YTBiMmZlYmQ0YzJlNWYyMTJiZjFkYTE1MzRiMTg0ODA0YzBmMzI0ZDNhZmU2ODExY2ZiZTY4YWJkMDM",
    },
    {
      id: 11,
      title: "Gaming Laptop",
      description: "High-performance gaming laptop with RTX 3060.",
      price: "$1299.99",
      image:
        "https://www.lenovo.com/medias/lenovo-laptop-legion-5-pro-16ach6-hero.png?context=bWFzdGVyfHJvb3R8MTQ2NjY4fGltYWdlL3BuZ3xoYzAvaDg1Lzk5Mjk1OTI2MjYyNzAucG5nfDkzYjE0N2QwYjM1ZDYxN2Q4YjI0ZDU1MzE5ZGEyM2U0NmQwYjI1NTc3ODc4N2QxZDYzYjE4MDU5Njg0MzI0",
    },
    {
      id: 12,
      title: "Gaming Console",
      description: "Next-gen gaming console with 4K support.",
      price: "$499.99",
      image: "",
    },
    {
      id: 13,
      title: "Game Controller",
      description: "Wireless game controller with customizable buttons.",
      price: "$39.99",
      image: "",
    },
    {
      id: 14,
      title: "Gaming Speakers",
      description: "High-quality gaming speakers with deep bass.",
      price: "$79.99",
      image: "",
    },

    {
      id: 15,
      title: "Gaming Desk",
      description: "Spacious gaming desk with cable management.",
      price: "$249.99",
      image: "",
    },

    {
      id: 16,
      title: "Gaming Backpack",
      description: "Durable backpack with compartments for gaming gear.",
      price: "$59.99",
      image: "",
    },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");

  const { addItem } = useCart();

  const handleSort = (direction: "asc" | "desc") => {
    const sorted = [...products].sort((a, b) => {
      const priceA = parseFloat(a.price.replace("$", ""));
      const priceB = parseFloat(b.price.replace("$", ""));
      return direction === "asc" ? priceA - priceB : priceB - priceA;
    });
    setProducts(sorted);
  };

  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return products;
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
    );
  }, [products, searchTerm]);

  return (
    <div className="container my-4">
      {/* Search + Sort */}
      <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-2 mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: "300px" }}
        />
        <select
          className="form-select"
          onChange={(e) => handleSort(e.target.value as "asc" | "desc")}
          style={{ maxWidth: "200px" }}
        >
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="row">
        {filteredProducts.map((product) => (
          <div className="col-md-3 mb-4" key={product.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={product.image?.trim() ? product.image : DEFAULT_IMAGE}
                alt={product.title}
                style={{ height: "300px", objectFit: "cover" }}
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  if (target.src !== DEFAULT_IMAGE) {
                    target.src = DEFAULT_IMAGE;
                  }
                }}
              />
              <div className="card-body">
                <h5>{product.title}</h5>
                <p>{product.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold">{product.price}</span>
                  <button
                    className="btn btn-sm btn-outline-dark"
                    onClick={() => {
                      addItem({
                        ...product,
                        image: product.image || DEFAULT_IMAGE,
                        quantity: 1,
                      });
                      successMassage(`${product.title} added to cart!`);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* No results */}
        {filteredProducts.length === 0 && (
          <div className="text-center text-muted py-5">No products found.</div>
        )}
      </div>
    </div>
  );
};

export default Products;
