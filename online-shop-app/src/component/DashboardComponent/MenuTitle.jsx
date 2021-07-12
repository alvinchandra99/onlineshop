import React from "react";
import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <>
      <div className="row mb-2">
        <div className="col" style={{ textAlign: "right" }}>
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item">
              <Link to="/admin/dashboard">Home</Link>
            </li>
            <li className="breadcrumb-item active">Product</li>
          </ol>
        </div>
      </div>
    </>
  );
}
