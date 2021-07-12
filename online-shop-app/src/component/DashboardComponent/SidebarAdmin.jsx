import React, { Component } from "react";

import { Link } from "react-router-dom";
export default class SidebarAdmin extends Component {
  render() {
    return (
      <>
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
          <Link href="/admin/dashboard" className="brand-link"></Link>

          <div className="sidebar">
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
              <div className="image">
                <img
                  src=""
                  className="img-circle elevation-2"
                  alt="John Doe's Image"
                />
              </div>
              <div className="info">
                <Link href="#" className="d-block">
                  John Doe
                </Link>
              </div>
            </div>

            <div className="form-inline">
              <div className="input-group" data-widget="sidebar-search">
                <input
                  className="form-control form-control-sidebar"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <div className="input-group-append">
                  <button className="btn btn-sidebar">
                    <i className="fas fa-search fa-fw"></i>
                  </button>
                </div>
              </div>
            </div>

            <nav className="mt-2">
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="nav-icon fas fa-copy"></i>
                    <p>
                      Inventory Management
                      <i className="fas fa-angle-left right"></i>
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item ">
                      <a href="dashboard" className="nav-link active">
                        <i className="far fa-circle nav-icon "></i>
                        <p>Add Product</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        <i className="far fa-circle nav-icon"></i>
                        <p>Orders</p>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
      </>
    );
  }
}
