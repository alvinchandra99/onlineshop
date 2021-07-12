import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class FooterMenu extends Component {
  render() {
    return (
      <>
        <aside className="col-md-4 col-12">
          <article className="mr-md-4">
            <h5 className="title">Contact us</h5>
            <ul className="list-icon">
              <li>
                <i className="icon fa fa-map-marker"> </i>542 Fake Street,
                Cityname 10021 Netheerlends
              </li>
              <li>
                <i className="icon fa fa-envelope"> </i> info@example.com
              </li>
              <li>
                <i className="icon fa fa-phone"> </i> (800) 060-0730, (800)
                060-0730
              </li>
              <li>
                <i className="icon fa fa-clock"> </i>Mon-Sat 10:00pm - 7:00pm
              </li>
            </ul>
          </article>
        </aside>
        <aside className="col-md col-6">
          <h5 className="title">Information</h5>
          <ul className="list-unstyled">
            <li>
              <Link to="/contact">About us</Link>
            </li>
          </ul>
        </aside>
        <aside className="col-md col-6">
          <h5 className="title">My Account</h5>
          <ul className="list-unstyled">
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/profile">My Orders</Link>
            </li>
          </ul>
        </aside>
        <aside className="col-md-4 col-12">
          <h5 className="title">Follow us on social media</h5>
          <div>
            <a href="/" className="btn btn-icon btn-outline-light">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="/" className="btn btn-icon btn-outline-light">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="/" className="btn btn-icon btn-outline-light">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="/" className="btn btn-icon btn-outline-light">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </aside>
      </>
    );
  }
}
