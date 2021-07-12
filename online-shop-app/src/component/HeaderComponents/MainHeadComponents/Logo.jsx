import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Logo extends Component {
  render() {
    return (
      <div className="col-xl-2 col-lg-3 col-md-12">
        <Link to="/" className="brand-wrap">
          <img className="logo" src="/asset/images/logo.png?v=2.0" />
        </Link>
      </div>
    );
  }
}
