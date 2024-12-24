// RequestTable.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { requestData, Request } from "./RequestData"; // Import the data
import "./RequestTable.css";
import axios from "axios";

const RequestTable: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>(requestData);

  const handleViewInstruments = (
    instruments: { name: string; quantity: number }[]
  ) => {
    alert(
      "Instruments:\n" +
        instruments.map((item) => `${item.name}: ${item.quantity}`).join("\n")
    );
  };

  const handleAccept = async (id: number) => {
    try {
      await axios.post("http://localhost:5000/api/acceptrequest", { id });
      setRequests((prev) =>
        prev.map((request) =>
          request.id === id ? { ...request, status: "approved" } : request
        )
      );
      alert("Request approved successfully!");
    } catch (error) {
      console.error("Error approving request:", error);
      alert("Failed to approve the request.");
    }
  };

  const handleReject = async (id: number) => {
    try {
      await axios.post("http://localhost:5000/api/rejectrequest", { id });
      setRequests((prev) =>
        prev.map((request) =>
          request.id === id ? { ...request, status: "rejected" } : request
        )
      );
      alert("Request rejected successfully!");
    } catch (error) {
      console.error("Error rejecting request:", error);
      alert("Failed to reject the request.");
    }
  };

  const [togglebar, setTogglebar] = useState(false);
  const ShowHeader = () => {
    setTogglebar(!togglebar);
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

      <div className="container-3">
        <h2 className="section-title text-center">Teacher Section</h2>
        <table className="mytable">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>ID</th>
              <th>Department</th>
              <th>Session</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests
              .filter((request) => request.status === "pending")
              .map((request) => (
                <tr key={request.id}>
                  <td>{request.studentName}</td>
                  <td>{request.studentId}</td>
                  <td>{request.department}</td>
                  <td>{request.session}</td>
                  <td className="action-buttons">
                    <button
                      className="mybtn btn-view hover-effect"
                      onClick={() => handleViewInstruments(request.instruments)}
                    >
                      View Instruments
                    </button>
                    <button
                      className="mybtn btn-accept hover-effect"
                      onClick={() => handleAccept(request.id)}
                    >
                      Accept
                    </button>
                    <button
                      className="mybtn btn-reject hover-effect"
                      onClick={() => handleReject(request.id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <h2 className="section-title text-center">Instructor Section</h2>
        <table className="mytable">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>ID</th>
              <th>Department</th>
              <th>Session</th>
              <th>Instruments</th>
            </tr>
          </thead>
          <tbody>
            {requests
              .filter((request) => request.status === "approved")
              .map((request) => (
                <tr key={request.id}>
                  <td>{request.studentName}</td>
                  <td>{request.studentId}</td>
                  <td>{request.department}</td>
                  <td>{request.session}</td>
                  <td>
                    {request.instruments
                      .map((item) => `${item.name} (${item.quantity})`)
                      .join(", ")}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RequestTable;
