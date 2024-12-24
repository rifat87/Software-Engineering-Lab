import React, { useState } from "react";
import { Item, items } from "./ItemData";
import ItemCard from "./ItemCard";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import axios from "axios";

interface SelectedItem {
  id: number;
  name: string;
  quantity: number;
}

const ProductPage: React.FC = () => {
  const [togglebar, setTogglebar] = useState(false);
  const ShowHeader = () => {
    setTogglebar(!togglebar);
  };

  const [currentPage, setCurrentPage] = useState(1);

  // Pagination settings
  const itemsPerPage = 9; // 9 cards per page
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  const handleSelect = (item: Item, quantity: number) => {
    if (quantity <= 0) return;

    setSelectedItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);

      if (existingItem) {
        // Update existing item
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      } else {
        // Add new item
        return [...prev, { id: item.id, name: item.name, quantity }];
      }
    });
  };

  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const handleClear = () => {
    setSelectedItems([]);
    setSelectedRow(null);
  };

  const handleDelete = () => {
    if (selectedRow !== null) {
      setSelectedItems((prev) =>
        prev.filter((_, index) => index !== selectedRow)
      );
      setSelectedRow(null);
    }
  };

  const handleSubmit = async () => {
    console.log("Submitting data:", selectedItems);

    try {
      const response = await axios.post("http://localhost:5000/api/submit-items", {
        selectedItems,
      });
      console.log("API Response:", response.data);
      alert("Data submitted successfully!");
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit data. Please try again.");
    }
  };



  // const handleSubmit = () => {
  //   console.log("Submitting data:", selectedItems);

  //   alert("Data submitted successfully!");
  // };

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
                <Link to="/Login/Profile" className="nav-menu-link">
                  Profile
                </Link>
              </li>
              <li className="nav-menu-item">
                <Link
                  to=""
                  id="home-login-btn"
                  className="nav-menu-link text-decoration-none text-white"
                >
                  LOGOUT
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

      <div className="container-fluid">
        <div className="row min-vh-100">
          {/* Left Navigation Column */}
          <nav className="col-md-2 bg-light p-3 border-end">
            <h4>Navigation</h4>
            <ul className="nav flex-column">
              <li className="nav-item">
                {/* <button className="text-decoration-none btn btn-outline-success ms-1 mb-2">
                  Profile
                </button> */}
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  data-mdb-button-init
                  data-mdb-ripple-init
                  className="text-decoration-none btn btn-outline-success ms-1 mb-2"
                >
                  Products
                </button>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  data-mdb-button-init
                  data-mdb-ripple-init
                  className="text-decoration-none btn btn-outline-success ms-1 mb-2"
                >
                  Categories
                </button>
              </li>
            </ul>
          </nav>

          {/* Middle Items Column */}
          <main
            className="col-md-7 p-3"
            style={{ maxHeight: "100vh", overflowY: "auto" }}
          >
            <h3 className="mb-4 text-center bg-dark text-white p-3">
              Available Items
            </h3>
            <div className="row">
              {items
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((item) => (
                  <ItemCard key={item.id} item={item} onSelect={handleSelect} />
                ))}
            </div>

            {/* Pagination */}
            <div className="d-flex justify-content-center mt-4">
              <nav aria-label="Page navigation">
                <ul className="pagination">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage((prev) => prev - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                  </li>

                  {[...Array(totalPages)].map((_, index) => (
                    <li
                      key={index + 1}
                      className={`page-item ${
                        currentPage === index + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}

                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage((prev) => prev + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </main>

          {/* Right Selected Items Column */}
          <aside className="col-md-3 bg-light p-3 border-start">
            <h4 className="bg-dark text-white text-center p-3">
              Selected Items
            </h4>
            <div className="table-responsive mb-3">
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedItems.length > 0 ? (
                    selectedItems.map((item, index) => (
                      <tr
                        key={item.id}
                        onClick={() => setSelectedRow(index)}
                        className={selectedRow === index ? "table-active" : ""}
                      >
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2} className="text-center">
                        No items selected
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="row g-2">
              <div className="col-4">
                <button
                  className="btn btn-danger w-100"
                  onClick={handleClear}
                  disabled={selectedItems.length === 0}
                >
                  Clear
                </button>
              </div>
              <div className="col-4">
                <button
                  className="btn btn-warning w-100"
                  onClick={handleDelete}
                  disabled={selectedRow === null}
                >
                  Delete
                </button>
              </div>
              <div className="col-4">
                <button
                  className="btn btn-success w-100"
                  onClick={handleSubmit}
                  disabled={selectedItems.length === 0}
                >
                  Submit
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
