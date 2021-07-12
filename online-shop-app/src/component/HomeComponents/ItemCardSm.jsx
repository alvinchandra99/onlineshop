import React, { Component } from "react";
import CurrencyFormat from "react-currency-format";
import { Link } from "react-router-dom";

export default class itemCardSm extends Component {
  render() {
    return (
      <div className="col-xl-2 col-lg-3 col-md-4 col-6">
        <div href="#" className="card card-sm card-product-grid">
          <Link to="#" className="img-wrap">
            <img src={this.props.data.imgurl} alt="img"/>
          </Link>
          <figcaption className="info-wrap">
            <Link to="#" className="title">
              {this.props.data.name}
            </Link>
            <CurrencyFormat
              value={this.props.data.price}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"IDR "}
              renderText={(value) => <div className="price-wrap">{value}</div>}
            />
          </figcaption>
        </div>
      </div>
    );
  }
}
