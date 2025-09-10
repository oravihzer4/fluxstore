import React, {
  useEffect,
  useMemo,
  useState,
  type FunctionComponent,
} from "react";
import { successMassage } from "../Services/FeedbackService";
import { useCart } from "../Context/CartContext";

const DEFAULT_IMAGE =
  "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg";

type Product = {
  _id: string;
  title: string;
  description: string;
  price: string;
  image?: string;
};

const Products: FunctionComponent = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { addItem } = useCart();
  const isLoggedIn = Boolean(localStorage.getItem("x-auth-token"));
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("x-auth-token");
    if (token) {
      import("axios").then((axios) => {
        axios.default
          .get(`${import.meta.env.VITE_API_BASE}users/me`, {
            headers: { "x-auth-token": token },
          })
          .then((res) => {
            setIsAdmin(!!res.data?.isAdmin);
          })
          .catch(() => setIsAdmin(false));
      });
    } else {
      setIsAdmin(false);
    }
  }, []);

  useEffect(() => {
    console.log(import.meta.env.VITE_API_BASE);

    const fetchProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}products`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error ", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSort = (direction: "asc" | "desc") => {
    const sorted = [...products].sort((a, b) => {
      // Support both string and number price
      const priceA =
        typeof a.price === "string"
          ? parseFloat(a.price.replace(/[^\d.]/g, ""))
          : a.price;
      const priceB =
        typeof b.price === "string"
          ? parseFloat(b.price.replace(/[^\d.]/g, ""))
          : b.price;
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
    <div className="container py-5">
      <div className="row justify-content-center mb-4">
        <div className="col-12">
          <div className="d-flex flex-column align-items-center mb-3">
            <div className="w-100 px-0 mb-3">
              <img
                src="https://cdn.wccftech.com/wp-content/uploads/2023/11/WCCFps5blackfriday2023.jpg"
                alt="Advertisement"
                className="rounded-4 shadow-lg w-100"
                style={{ height: "220px", objectFit: "cover" }}
              />
            </div>
            <h2 className="fw-bold mb-1">Our Products</h2>
            <p className="lead mb-0">
              Discover the latest and greatest in our store. Search, sort, and
              add to your cart!
            </p>
            {isAdmin && (
              <button className="btn btn-primary mt-3 px-4 py-2 fw-bold shadow-sm">
                <i className="fa-solid fa-plus me-2"></i> Add Product
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 mb-4">
        <div className="input-group" style={{ maxWidth: "320px" }}>
          <span className="input-group-text bg-primary text-white border-0 fw-bold">
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
          <input
            type="text"
            className="form-control border-primary shadow-sm"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="dropdown">
          <select
            className="form-select border-primary shadow-sm fw-bold"
            style={{ minWidth: "180px", background: "#f8f9fa" }}
            onChange={(e) => handleSort(e.target.value as "asc" | "desc")}
            defaultValue="asc"
          >
            <option value="asc">Sort: Price Low to High</option>
            <option value="desc">Sort: Price High to Low</option>
          </select>
        </div>
      </div>
      <div className="row g-4">
        {(() => {
          const items: React.ReactElement[] = [];
          filteredProducts.forEach((product, idx) => {
            if (idx > 0 && idx % 6 === 0) {
              items.push(
                <div className="col-12" key={`ad-${idx}`}>
                  <div className="my-3 px-0">
                    <img
                      src="https://gamicsoft.sgp1.digitaloceanspaces.com/37213/ps.jpg"
                      alt="Advertisement"
                      className="rounded-4 shadow-lg w-100"
                      style={{ height: "220px", objectFit: "cover" }}
                    />
                  </div>
                </div>
              );
            }
            items.push(
              <div className="col-md-4" key={product._id}>
                <div className="card h-100 border-0 shadow-lg product-card-hover rounded-4">
                  <img
                    src={
                      typeof (product.image as any) === "object"
                        ? (product.image as any)?.url || DEFAULT_IMAGE
                        : product.image || DEFAULT_IMAGE
                    }
                    alt={
                      typeof (product.image as any) === "object"
                        ? (product.image as any)?.alt || product.title
                        : product.title
                    }
                    className="card-img-top rounded-4"
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column justify-content-between">
                    <h5 className="fw-bold mb-2">{product.title}</h5>
                    <p className=" mb-2" style={{ minHeight: 48 }}>
                      {product.description}
                    </p>
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <span className="fw-bold text-primary fs-5">
                        {product.price} $
                      </span>
                      {isLoggedIn && (
                        <button
                          className="btn btn-outline-success btn-sm px-3"
                          onClick={() => {
                            addItem({
                              id: product._id,
                              title: product.title,
                              price: product.price,
                              image: product.image || DEFAULT_IMAGE,
                              quantity: 1,
                            });
                            successMassage(`${product.title} added to cart!`);
                          }}
                        >
                          <i className="fa-solid fa-cart-plus me-2"></i> Add to
                          Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          });
          return items;
        })()}
      </div>
      <style>{`
        .product-card-hover:hover {
          box-shadow: 0 0 0.75rem 0.1rem #0d6efd33;
          transform: translateY(-2px) scale(1.03);
          transition: all 0.2s;
        }
      `}</style>
    </div>
  );
};

export default Products;
