import React, { Component } from "react";
import Service from "../../../service/Service";

export default class ProfileInfo extends Component {
  render() {
    return (
      <>
        <article className="card mb-3">
          <div className="card-body">
            <figure className="icontext">
              <div className="icon">
                <img
                  className="rounded-circle img-sm border"
                  src="http://localhost:3000/asset/avatar.png"
                />
              </div>
              <div className="text">
                <strong>
                  {this.props.user.firstName + " " + this.props.user.lastName}
                </strong>
                <br />
                <p className="mb-2"> {this.props.user.username} </p>
              </div>
            </figure>
            <hr />
            <p>
              <i className="fa fa-map-marker text-muted"></i> &nbsp; My address:
              <br />
              {this.props.user.address}
            </p>
            <article className="card-group card-stat">
              <figure className="card bg">
                <div className="p-3">
                  <h4 className="title" name="numOrder">
                    {this.props.orders}
                  </h4>
                  <span>Order(s)</span>
                </div>
              </figure>
              <figure className="card bg">
                <div className="p-3">
                  <h4 className="title">5</h4>
                  <span>Wishlists</span>
                </div>
              </figure>
              <figure className="card bg">
                <div className="p-3">
                  <h4 className="title">12</h4>
                  <span>Awaiting delivery</span>
                </div>
              </figure>
              <figure className="card bg">
                <div className="p-3">
                  <h4 className="title">50</h4>
                  <span>Delivered items</span>
                </div>
              </figure>
            </article>
          </div>
        </article>
      </>
    );
  }
}
