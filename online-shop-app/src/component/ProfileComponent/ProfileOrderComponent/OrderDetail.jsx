import React, { Component } from "react";
import OrderItem from "./OrderItem";
export default class OrderDetail extends Component {
  render() {
    return (
      <article className="card mb-4">
        <header className="card-header">
          <a href="#" className="float-right">
            {" "}
            <i className="fa fa-print"></i> Print
          </a>
          <strong className="d-inline-block mr-3">
            Order ID: {/* { this.props.orderId } */}
          </strong>
          <span>Order Date: {/* { this.props.orderDate } */}</span>
          <div className="card-body">
            <div className="row">
              <div className="col-md-8">
                <h6 className="text-muted">Delivery to</h6>
                <p>
                  {/* {this.props.name} */} <br />
                  {/* {this.props.email} */}
                  <br />
                  {/* {this.props.address} */}
                </p>
              </div>
              <div className="col-md-4">
                <h6 className="text-muted">Payment</h6>
                <span className="text-success">
                  {/* {this.props.payment}*/}
                </span>
                <p>
                  {/* {this.props.subtotal} */} <br />
                  {/* {this.props.shipping} */} <br />
                  <span className="b">{/* {this.props.total}  */}</span>
                </p>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-hover">
                <tbody>
                  <OrderItem />
                </tbody>
              </table>
            </div>
          </div>
        </header>
      </article>
    );
  }
}
