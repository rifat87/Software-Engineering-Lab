import React, { useState } from "react";
import "./RequestTable.css";
import { Link } from "react-router-dom";

interface Request {
  id: number;
  studentName: string;
  studentId: string;
  department: string;
  session: string;
  instruments: { name: string; quantity: number }[];
  status: "pending" | "approved" | "rejected";
}

const RequestTable: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([
    {
      id: 1,
      studentName: "Md. Numanur Rahman",
      studentId: "2001011",
      department: "IRE",
      session: "2020-21",
      instruments: [
        { name: "Arduino UNO R3", quantity: 1 },
        { name: "IR Sensor", quantity: 2 },
        { name: "Servo Motor", quantity: 4 },
        { name: "ESP32", quantity: 1 },
      ],
      status: "pending",
    },
    {
      id: 2,
      studentName: "Md. Abeer Hasan",
      studentId: "2002039",
      department: "EdTE",
      session: "2021-21",
      instruments: [
        { name: "Arduino UNO R3", quantity: 2 },
        { name: "IR Sensor", quantity: 4 },
        { name: "Servo Motor", quantity: 4 },
        { name: "ESP32", quantity: 1 },
      ],
      status: "pending",
    },
  ]);

  const handleViewInstruments = (
    instruments: { name: string; quantity: number }[]
  ) => {
    alert(
      "Instruments:\n" +
        instruments.map((item) => `${item.name}: ${item.quantity}`).join("\n")
    );
  };

  const handleAccept = (id: number) => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === id ? { ...request, status: "approved" } : request
      )
    );
  };

  const handleReject = (id: number) => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === id ? { ...request, status: "rejected" } : request
      )
    );
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
