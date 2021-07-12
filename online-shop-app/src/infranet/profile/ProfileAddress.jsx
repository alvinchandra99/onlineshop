import React, { Component } from "react";
import AddressCard from "../../component/ProfileComponent/AddressCard";
export default class ProfileAddress extends Component {
  render() {
    return (
      <>
        <a href="#" className="btn btn-light mb-3">
          {" "}
          <i className="fa fa-plus"></i> Add new address{" "}
        </a>
        <div className="row">
          <AddressCard />
        </div>
      </>
    );
  }
}
