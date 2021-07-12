import React, { Component } from "react";

export default class OrderItem extends Component {
  render() {
    return (
      <tr>
        <td width="65">
          <img src=/* {this.props.url} */'#' className="img-xs border" />
        </td>
        <td>
          <p className="title mb-0">{/* {this.props.productName} */}</p>
          <var className="price text-muted">{/* {this.props.price} */}</var>
        </td>
        <td width="250">
          <a href="#" className="btn btn-outline-primary">
            Cancel order
          </a>
        </td>
      </tr>
    );
  }
}
