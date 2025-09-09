import { useEffect, useMemo, useState, type FunctionComponent } from "react";
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
      <hr />

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

      <div className="row">
        {filteredProducts.map((product) => (
          <div className="col-md-3 mb-4" key={product._id}>
            <div className="card h-100 shadow-sm">
              <img
                src={
                  "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg"
                }
                alt={product.title}
                style={{ height: "300px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5>{product.title}</h5>
                <p>{product.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold">{product.price}</span>
                  {isLoggedIn && (
                    <button
                      className="btn btn-sm btn-outline-dark"
                      onClick={() => {
                        successMassage(`${product.title} added to cart!`);
                      }}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
