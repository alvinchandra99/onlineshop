import React, { Component } from "react";

export default class AddressCard extends Component {
  render() {
    return (
      <div className="col-md-6">
        <article className="box mb-4">
          <h6>London, United Kingdom</h6>
          <p>Building: Nestone </p>
          <a href="#" className="btn btn-light">
            {" "}
            <i className="fa fa-pen"></i>{" "}
          </a>{" "}
          <a href="#" className="btn btn-light">
            {" "}
            <i className="text-danger fa fa-trash"></i>{" "}
          </a>
        </article>
      </div>
    );
  }
}
