import type { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getAllProducts,
  deleteProduct,
  updateProduct,
} from "../../Services/productsService";
import axios from "axios";
import type { Product } from "../../interfaces/products/Product";

const AdminProducts: FunctionComponent = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [editForm, setEditForm] = useState<Partial<Product>>({});
  const [editLoading, setEditLoading] = useState(false);
  const openEditModal = (product: Product) => {
    setEditProduct(product);
    setEditForm({
      title: product.title,
      description: product.description,
      price: product.price,
      image: product.image,
    });
  };

  const closeEditModal = () => {
    setEditProduct(null);
    setEditForm({});
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editProduct?._id) return;
    setEditLoading(true);
    updateProduct(editProduct._id, editForm)
      .then(() => {
        closeEditModal();
        fetchProducts();
      })
      .catch((err) => {
        setError(err.response?.data || "Failed to update product");
      })
      .finally(() => setEditLoading(false));
  };

  const fetchProducts = () => {
    setLoading(true);
    getAllProducts()
      .then((res) => {
        const data: any = res.data;
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (data && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data || "Failed to fetch products");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
    // Fetch orders for admin
    const token = localStorage.getItem("x-auth-token");
    axios
      .get(`${import.meta.env.VITE_API_BASE}orders`, {
        headers: { "x-auth-token": token || "" },
      })
      .then((res) => setOrders(res.data))
      .catch(() => setOrders([]));
  }, []);

  const handleDelete = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    deleteProduct(id)
      .then(() => {
        fetchProducts();
      })
      .catch((err) => {
        setError(err.response?.data || "Failed to delete product");
      });
  };

  return (
    <>
      {" "}
      <div className="container py-4">
        <h3 className="mb-4 fw-bold">Products</h3>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <>
            {/* Orders table removed. Only products table below. */}
            <div className="table-responsive">
              <h4 className="fw-bold mb-3">Products</h4>
              <table className="table table-bordered table-hover align-middle bg-white">
                <thead className="table-primary">
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, idx) => (
                    <tr key={product._id || idx}>
                      <td>{product.title}</td>
                      <td>{product.description}</td>
                      <td>{product.price}</td>
                      <td>
                        {product.image ? (
                          typeof product.image === "string" ? (
                            <img
                              src={product.image}
                              alt={product.title}
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: "8px",
                              }}
                            />
                          ) : (
                            <img
                              src={product.image.url}
                              alt={product.image.alt || product.title}
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: "8px",
                              }}
                            />
                          )
                        ) : (
                          <span>No Image</span>
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-primary btn-sm me-2"
                          onClick={() => openEditModal(product)}
                          disabled={!product._id}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            product._id && handleDelete(product._id)
                          }
                          disabled={!product._id}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="d-flex justify-content-center mt-5">
                <Link to="/adminDashboard" className="btn btn-danger">
                  Back to Admin Dashboard
                </Link>
              </div>
            </div>
          </>
        )}
        {/* Edit Modal */}
        {editProduct && (
          <div
            className="modal show d-block"
            tabIndex={-1}
            style={{ background: "#0008" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <form onSubmit={handleEditSubmit}>
                  <div className="modal-header">
                    <h5 className="modal-title">Edit Product</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={closeEditModal}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={editForm.title || ""}
                        onChange={handleEditChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        name="description"
                        value={editForm.description || ""}
                        onChange={handleEditChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Price</label>
                      <input
                        type="number"
                        className="form-control"
                        name="price"
                        value={editForm.price || ""}
                        onChange={handleEditChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Image URL</label>
                      <input
                        type="text"
                        className="form-control"
                        name="image"
                        value={
                          typeof editForm.image === "string"
                            ? editForm.image
                            : editForm.image?.url || ""
                        }
                        onChange={handleEditChange}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={closeEditModal}
                      disabled={editLoading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-success"
                      disabled={editLoading}
                    >
                      {editLoading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminProducts;
