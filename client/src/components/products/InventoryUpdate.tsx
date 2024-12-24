import React, { useState } from "react";
import { items as mockData, Item } from "./ItemData";
import { Link } from "react-router-dom";

const InventoryPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>(mockData);
  const [formData, setFormData] = useState<Item>({
    id: 0,
    name: "",
    quantity: 0,
    image: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const [togglebar, setTogglebar] = useState(false);
  const ShowHeader = () => {
    setTogglebar(!togglebar);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "quantity" || name === "id" ? parseInt(value) : value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData({ ...formData, image: URL.createObjectURL(file) });
    }
  };

  const handleAddOrUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (isUpdateMode) {
      // Update item
      setItems((prevItems) =>
        prevItems.map((item) => (item.id === formData.id ? formData : item))
      );
    } else {
      // Add new item
      setItems((prevItems) => [
        ...prevItems,
        { ...formData, id: prevItems.length + 1 },
      ]);
    }
    setIsModalOpen(false);
    resetForm();
  };

  const handleDelete = (id: number) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleRowClick = (item: Item) => {
    setFormData(item);
    setIsUpdateMode(true);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    resetForm();
    setIsUpdateMode(false);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({ id: 0, name: "", quantity: 0, image: "" });
  };

  return (
    <>
      <header className="header">
        <nav className="h-nav">
          <div className="h-nav-div">
            <h2 className="h-nav-div-h2">LabAssist</h2>
          </div>
          <div
            className={togglebar ? "nav-menu show" : "nav-menu"}
            id="nav-menu"
          >
            <button
              className="nav-menu-close-btn"
              id="nav-menu-close-btn"
              onClick={ShowHeader}
            >
              <i className="fa fa-window-close"></i>
            </button>
            <ul className="nav-menu-list">
              <li className="nav-menu-item">
                <Link to="/" className="nav-menu-link">
                  Home
                </Link>
              </li>
              <li className="nav-menu-item">
                <Link to="/login/profile" className="nav-menu-link">
                  Profile
                </Link>
              </li>
              <li className="nav-menu-item">
                <Link
                  to="/Registration"
                  id="home-login-btn"
                  className="nav-menu-link text-decoration-none text-white"
                >
                  Sign up/Login
                </Link>
              </li>
            </ul>
          </div>
          <button
            className="nav-menu-toggle-btn"
            id="toggle-btn"
            onClick={ShowHeader}
          >
            <i className="fa fa-bars" aria-hidden="true"></i>
          </button>
        </nav>
      </header>

      <div style={{ padding: "20px" }}>
        <h1>Inventory Management</h1>
        <button
          onClick={openAddModal}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          Add New Product
        </button>
        {/* Inventory Table */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "10px" }}>ID</th>
              <th style={{ border: "1px solid black", padding: "10px" }}>
                Product Name
              </th>
              <th style={{ border: "1px solid black", padding: "10px" }}>
                Quantity
              </th>
              <th style={{ border: "1px solid black", padding: "10px" }}>
                Image
              </th>
              <th style={{ border: "1px solid black", padding: "10px" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td style={{ border: "1px solid black", padding: "10px" }}>
                  {item.id}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleRowClick(item)}
                >
                  {item.name}
                </td>
                <td style={{ border: "1px solid black", padding: "10px" }}>
                  {item.quantity}
                </td>
                <td style={{ border: "1px solid black", padding: "10px" }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
                <td style={{ border: "1px solid black", padding: "10px" }}>
                  <button
                    onClick={() => handleDelete(item.id)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      borderRadius: "3px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Modal */}
        {isModalOpen && (
          <div
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "10px",
                width: "400px",
              }}
            >
              <h2>{isUpdateMode ? "Update Product" : "Add Product"}</h2>
              <form onSubmit={handleAddOrUpdate}>
                <div style={{ marginBottom: "10px" }}>
                  <label>Product Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", padding: "8px", margin: "5px 0" }}
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label>Quantity:</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", padding: "8px", margin: "5px 0" }}
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label>Product Image:</label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    style={{ width: "100%", padding: "8px", margin: "5px 0" }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#007BFF",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  {isUpdateMode ? "Update" : "Add"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "gray",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginLeft: "10px",
                  }}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default InventoryPage;
