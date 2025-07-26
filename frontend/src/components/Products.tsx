import { useMemo, useState, type FunctionComponent } from "react";
import { successMassage } from "../Services/FeedbackService";
import { useCart } from "../Context/CartContext";
import { productsData, type Product } from "../../utils/productsData";

const DEFAULT_IMAGE =
  "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg";

const Products: FunctionComponent = () => {
  const initialProducts: Product[] = productsData;

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

        {filteredProducts.length === 0 && (
          <div className="text-center text-muted py-5">No products found.</div>
        )}
      </div>
    </div>
  );
};

export default Products;
