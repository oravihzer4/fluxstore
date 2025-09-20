import React, {
  useEffect,
  useMemo,
  useState,
  type FunctionComponent,
} from "react";
import { successMassage } from "../Services/FeedbackService";
import { createProduct, deleteProduct } from "../Services/productsService";
// Delete product handler
const handleDeleteProduct = async (id: string) => {
  if (!window.confirm("Are you sure you want to delete this product?")) return;
  try {
    await deleteProduct(id);
    // Refresh products
    const res = await fetch(`${import.meta.env.VITE_API_BASE}products`);
    const data = await res.json();
    setProducts(data);
    successMassage("Product deleted successfully!");
  } catch (err: any) {
    successMassage("Failed to delete product");
  }
};
import { useCart } from "../Context/CartContext";

const DEFAULT_IMAGE =
  "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg";

type Product = {
  _id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  image?: string;
};

const Products: FunctionComponent = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState<Partial<Product>>({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });
  const [addImageAlt, setAddImageAlt] = useState<string>("");
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);
  const openAddModal = () => {
    setAddForm({ title: "", description: "", price: "", category: "" });
    setAddError(null);
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setAddError(null);
  };

  const handleAddChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "alt") {
      setAddImageAlt(value);
    } else {
      setAddForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddLoading(true);
    setAddError(null);
    try {
      // Send image as object
      const productToSend = {
        ...addForm,
        image: {
          url: addForm.image || "",
          alt: addImageAlt || "",
        },
      };
      await createProduct(productToSend);
      closeAddModal();
      // Refresh products
      const res = await fetch(`${import.meta.env.VITE_API_BASE}products`);
      const data = await res.json();
      setProducts(data);
      successMassage("Product added successfully!");
    } catch (err: any) {
      setAddError(err.response?.data || "Failed to add product");
    } finally {
      setAddLoading(false);
    }
  };
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

  // Edit product modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Product>>({});
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const [editProductId, setEditProductId] = useState<string | null>(null);

  const openEditModal = (product: Product) => {
    setEditProductId(product._id || "");
    setEditForm({ ...product });
    setEditError(null);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditError(null);
    setEditProductId(null);
    setEditForm({});
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "image") {
      setEditForm((prev) => ({
        ...prev,
        image:
          typeof prev.image === "object" && prev.image !== null
            ? { ...prev.image, url: value }
            : { url: value, alt: "" },
      }));
    } else if (name === "alt") {
      setEditForm((prev) => ({
        ...prev,
        image:
          typeof prev.image === "object" && prev.image !== null
            ? { ...prev.image, alt: value }
            : {
                url: typeof prev.image === "string" ? prev.image : "",
                alt: value,
              },
      }));
    } else {
      setEditForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editProductId) return;
    setEditLoading(true);
    setEditError(null);
    try {
      // Always send image as object
      const formToSend = {
        ...editForm,
        image:
          typeof editForm.image === "object" && editForm.image !== null
            ? editForm.image
            : {
                url: typeof editForm.image === "string" ? editForm.image : "",
                alt: "",
              },
      };
      await import("../Services/productsService").then(({ updateProduct }) =>
        updateProduct(editProductId, formToSend)
      );
      closeEditModal();
      // Refresh products
      const res = await fetch(`${import.meta.env.VITE_API_BASE}products`);
      const data = await res.json();
      setProducts(data);
      successMassage("Product updated successfully!");
    } catch (err: any) {
      setEditError(err.response?.data || "Failed to update product");
    } finally {
      setEditLoading(false);
    }
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
              <video
                src="https://www.w3schools.com/html/mov_bbb.mp4"
                className="rounded-2 shadow-lg w-100"
                style={{ height: "220px", objectFit: "cover" }}
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
            <h2 className="fw-bold mb-1">Our Products</h2>
            <p className="lead mb-0">
              Discover the latest and greatest in our store. Search, sort, and
              add to your cart!
            </p>
            {isAdmin && (
              <button
                className="btn btn-primary mt-3 px-4 py-2 fw-bold shadow-sm"
                onClick={openAddModal}
              >
                <i className="fa-solid fa-plus me-2"></i> Add Product
              </button>
            )}
            {/* Add Product Modal */}
            {showAddModal && (
              <div
                className="modal show d-block"
                tabIndex={-1}
                style={{ background: "#0008" }}
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <form onSubmit={handleAddSubmit}>
                      <div className="modal-header">
                        <h5 className="modal-title">Add Product</h5>
                        <button
                          type="button"
                          className="btn-close"
                          onClick={closeAddModal}
                        ></button>
                      </div>
                      <div className="modal-body">
                        {addError && (
                          <div className="alert alert-danger">{addError}</div>
                        )}
                        <div className="mb-3">
                          <label className="form-label">Title</label>
                          <input
                            type="text"
                            className="form-control"
                            name="title"
                            value={addForm.title || ""}
                            onChange={handleAddChange}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Category</label>
                          <input
                            type="text"
                            className="form-control"
                            name="category"
                            value={addForm.category || ""}
                            onChange={handleAddChange}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Description</label>
                          <textarea
                            className="form-control"
                            name="description"
                            value={addForm.description || ""}
                            onChange={handleAddChange}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Price</label>
                          <input
                            type="number"
                            className="form-control"
                            name="price"
                            value={addForm.price || ""}
                            onChange={handleAddChange}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Image URL</label>
                          <input
                            type="text"
                            className="form-control"
                            name="image"
                            value={addForm.image || ""}
                            onChange={handleAddChange}
                            placeholder="https://..."
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Image Alt Text</label>
                          <input
                            type="text"
                            className="form-control"
                            name="alt"
                            value={addImageAlt}
                            onChange={handleAddChange}
                            placeholder="Description for image"
                          />
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={closeAddModal}
                          disabled={addLoading}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn btn-success"
                          disabled={addLoading}
                        >
                          {addLoading ? "Adding..." : "Add Product"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
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
                      className="rounded-2 shadow-lg w-100"
                      style={{ height: "220px", objectFit: "cover" }}
                    />
                  </div>
                </div>
              );
            }
            items.push(
              <div className="col-md-4" key={product._id}>
                <div className="card h-100 border-0 shadow-lg product-card-hover rounded-2">
                  <img
                    src={
                      typeof product.image === "object" &&
                      product.image !== null
                        ? "url" in product.image &&
                          typeof product.image.url === "string" &&
                          product.image.url.trim() !== ""
                          ? product.image.url
                          : DEFAULT_IMAGE
                        : typeof product.image === "string" &&
                          product.image.trim() !== ""
                        ? product.image
                        : DEFAULT_IMAGE
                    }
                    alt={
                      typeof product.image === "object" &&
                      product.image !== null &&
                      "alt" in product.image
                        ? product.image.alt || product.title
                        : product.title
                    }
                    className="card-img-top rounded-2"
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
                      <div className="d-flex gap-2">
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
                            <i className="fa-solid fa-cart-plus me-2"></i> Add
                            to Cart
                          </button>
                        )}
                        {isAdmin && (
                          <div className="d-flex gap-1">
                            <button
                              className="btn btn-warning btn-xs py-1 px-2 rounded-1 shadow-sm"
                              style={{ fontSize: "0.85rem", minWidth: 0 }}
                              title="Edit Product"
                              onClick={() => openEditModal(product)}
                            >
                              <i className="fa-solid fa-pen-to-square me-1"></i>
                            </button>
                            <button
                              className="btn btn-danger btn-xs py-1 px-2 rounded-1 shadow-sm"
                              style={{ fontSize: "0.85rem", minWidth: 0 }}
                              title="Delete Product"
                              onClick={() => handleDeleteProduct(product._id)}
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          });
          return items;
        })()}
      </div>
      {/* Edit Product Modal */}
      {showEditModal && (
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
                  {editError && (
                    <div className="alert alert-danger">{editError}</div>
                  )}
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
                    <label className="form-label">Category</label>
                    <input
                      type="text"
                      className="form-control"
                      name="category"
                      value={editForm.category || ""}
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
                          : (editForm.image as any)?.url || ""
                      }
                      onChange={handleEditChange}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Image Alt Text</label>
                    <input
                      type="text"
                      className="form-control"
                      name="alt"
                      value={
                        typeof editForm.image === "object" &&
                        editForm.image !== null
                          ? (editForm.image as any)?.alt || ""
                          : ""
                      }
                      onChange={(e) => {
                        const alt = e.target.value;
                        setEditForm((prev) => ({
                          ...prev,
                          image:
                            typeof prev.image === "object" &&
                            prev.image !== null
                              ? { ...prev.image, alt }
                              : {
                                  url:
                                    typeof prev.image === "string"
                                      ? prev.image
                                      : "",
                                  alt,
                                },
                        }));
                      }}
                      placeholder="Description for image"
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
      <style>{`
        .product-card-hover:hover {
          box-shadow: 0 0 0.75rem 0.1rem #0d6efd33;
          transform: translateY(-2px) scale(1.03);
          transition: all 0.2s;
        }
        .btn-xs {
          font-size: 0.85rem !important;
          padding: 0.25rem 0.5rem !important;
          min-width: 0 !important;
        }
      `}</style>
    </div>
  );
};

export default Products;
